import { useState, useRef, useEffect, useMemo } from "react";
import { Volume2, VolumeX, Music, AlertCircle } from "lucide-react";
import Button from "../../../ui/Button";

// Online romantic music URLs - works immediately!
// You can easily replace these with your own music URLs
// The URLs must support CORS (Cross-Origin Resource Sharing)
const MUSIC_URLS = [
  // Option 1: Free music from Archive.org (usually CORS-enabled)
  // "https://archive.org/download/testmp3testfile/mpthreetest.mp3",
  // Option 2: Your own music file (place in public folder) - uncomment to use
  "/maaudio.mp3",
  // Option 3: Your own online URL - uncomment and add your URL
  // "https://your-music-url.com/romantic-song.mp3",
];

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [musicUrl, setMusicUrl] = useState(MUSIC_URLS[0]);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    // Check if audio can play
    const checkAudio = async () => {
      try {
        await audio.play();
        audio.pause();
        audio.currentTime = 0;
        setHasError(false);
      } catch (error) {
        // Audio file might not exist or autoplay blocked
        setHasError(true);
      }
    };

    if (isPlaying) {
      setIsLoading(true);
      audio.play()
        .then(() => {
          setIsLoading(false);
          setHasError(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setHasError(true);
          console.log("Audio play failed. The music URL might not be accessible or CORS is blocked.");
          console.log("You can:", "1) Use a different online URL, 2) Add a local file to public folder, 3) Check browser console for CORS errors");
        });
    } else {
      audio.pause();
    }
  }, [isPlaying, volume]);

  // Try to load audio on mount and try fallback URLs if needed
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let currentUrlIndex = 0;

    const tryLoadAudio = (urlIndex) => {
      if (urlIndex >= MUSIC_URLS.length) {
        setHasError(true);
        return;
      }

      const url = MUSIC_URLS[urlIndex];
      audio.src = url;
      audio.load();

      const handleCanPlay = () => {
        setHasError(false);
        setMusicUrl(url);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleError);
      };

      const handleError = () => {
        // Try next URL
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleError);
        tryLoadAudio(urlIndex + 1);
      };

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);
    };

    tryLoadAudio(0);
  }, []); // Empty dependency array is fine - MUSIC_URLS is constant

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={musicUrl}
        loop
        preload="auto"
        crossOrigin="anonymous"
        onError={() => {
          console.log("Audio failed to load. The URL might not support CORS or the file doesn't exist.");
        }}
      />

      {/* Music control button */}
      {showControls && (
        <div className="fixed top-6 right-6 z-50 animate-elegant-fade-in">
          <div className="glass-effect rounded-full p-3 realistic-shadow border border-primary/20 flex items-center gap-3 group">
            <div className="relative">
              <Button
                onClick={togglePlay}
                variant="ghost"
                size="icon"
                className="w-10 h-10 rounded-full hover:bg-primary/10 transition-all duration-300"
                disabled={isLoading}
                title={hasError ? "Music not available. Try a different URL or add a local file." : isPlaying ? "Pause music" : "Play music"}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : isPlaying ? (
                  <Volume2 className="w-5 h-5 text-primary" />
                ) : (
                  <VolumeX className="w-5 h-5 text-muted-foreground" />
                )}
              </Button>
              {hasError && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full border-2 border-background" title="Music file not found" />
              )}
            </div>

            {/* Volume slider */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Music className="w-4 h-4 text-muted-foreground" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                disabled={hasError}
                className="w-20 h-1 bg-primary/20 rounded-full appearance-none cursor-pointer accent-primary disabled:opacity-50"
                style={{
                  background: `linear-gradient(to right, hsl(350 80% 55%) 0%, hsl(350 80% 55%) ${volume * 100}%, rgba(0,0,0,0.1) ${volume * 100}%)`,
                }}
              />
            </div>

            {/* Error message tooltip */}
            {hasError && (
              <div className="absolute top-full right-0 mt-2 p-2 bg-destructive/90 text-destructive-foreground text-xs rounded-lg shadow-lg max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>Music unavailable. Try a different URL or add local file</span>
                </div>
              </div>
            )}

            {/* Close button */}
            <Button
              onClick={() => setShowControls(false)}
              variant="ghost"
              size="icon"
              className="w-6 h-6 rounded-full hover:bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <span className="text-xs text-muted-foreground">×</span>
            </Button>
          </div>
        </div>
      )}

      {/* Show music button if hidden */}
      {!showControls && (
        <Button
          onClick={() => setShowControls(true)}
          className="fixed top-6 right-6 z-50 rounded-full w-12 h-12 glass-effect realistic-shadow border border-primary/20"
          size="icon"
        >
          <Music className="w-5 h-5 text-primary" />
        </Button>
      )}
    </>
  );
};

export default BackgroundMusic;
