import { useState, useRef, useEffect } from "react";

type VideoPlayerProps = {
  src: string;
  title?: string;
  autoplay?: boolean;
};

export default function VideoPlayer({
  src,
  title,
  autoplay = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPseudoFullscreen, setIsPseudoFullscreen] = useState(false);

  const getVideoSrc = (src: string) => {
    if (src.startsWith("http")) {
      return src;
    }
    return `./videos/${src}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateDuration);

    // Pokud je autoplay, spustit video
    if (autoplay) {
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }

    // ESC klávesa pro zavření pseudo fullscreen
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isPseudoFullscreen) {
        setIsPseudoFullscreen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateDuration);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [autoplay, isPseudoFullscreen]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const time = parseFloat(e.target.value);
    video.currentTime = time;
    setCurrentTime(time);
  };

  const togglePseudoFullscreen = () => {
    setIsPseudoFullscreen(!isPseudoFullscreen);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Pseudo fullscreen overlay
  if (isPseudoFullscreen) {
    return (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#000",
          zIndex: 9999,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <video
            ref={videoRef}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={getVideoSrc(src)} type="video/mp4" />
            <source src={getVideoSrc(src)} type="video/webm" />
            Váš prohlížeč nepodporuje video element.
          </video>

          {/* Jen tlačítko pro zavření */}
          <button
            onClick={togglePseudoFullscreen}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "rgba(0,0,0,0.7)",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  // Normální zobrazení
  return (
    <div style={{ margin: "20px 0" }}>
      {title && (
        <h3 style={{ marginBottom: "10px", color: "#333" }}>{title}</h3>
      )}

      <div
        ref={containerRef}
        style={{
          position: "relative",
          backgroundColor: "#000",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          <source src={getVideoSrc(src)} type="video/mp4" />
          <source src={getVideoSrc(src)} type="video/webm" />
          Váš prohlížeč nepodporuje video element.
        </video>

        {/* Custom ovládací prvky */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
            padding: "20px 15px 15px",
            color: "white",
          }}
        >
          {/* Progress bar */}
          <div style={{ marginBottom: "10px" }}>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              style={{
                width: "100%",
                height: "4px",
                background: "#333",
                outline: "none",
                cursor: "pointer",
              }}
            />
          </div>

          {/* Ovládací tlačítka */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "5px",
                }}
              >
                {isPlaying ? "⏸️" : "▶️"}
              </button>

              {/* Čas */}
              <span style={{ fontSize: "14px" }}>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              {/* Pseudo Fullscreen tlačítko */}
              <button
                onClick={togglePseudoFullscreen}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: "5px",
                }}
              >
                ⛶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
