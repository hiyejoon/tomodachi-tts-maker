import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { Volume2, Play, Pause, Download, Zap } from "lucide-react";

/**
 * Tomodachi Life TTS Maker - Y2K Retro Design
 * Design Philosophy: Playful, vibrant, chunky buttons with tactile feedback
 * Colors: Bright yellow (#FFD700), Electric blue (#0066FF), Hot pink (#FF1493), Cyan (#00FFFF)
 * Typography: Fredoka (display), Quicksand (body)
 */

interface VoiceParams {
  text: string;
  pitch: number;
  speed: number;
  quality: number;
  tone: number;
  accent: number;
  intonation: number;
  lang: string;
}

export default function Home() {
  const [text, setText] = useState("Hello! I'm a Tomodachi!");
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Voice parameters
  const [pitch, setPitch] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [quality, setQuality] = useState(50);
  const [tone, setTone] = useState(50);
  const [accent, setAccent] = useState(50);
  const [intonation, setIntonation] = useState(1);
  const [language, setLanguage] = useState("useng");

  const languages = [
    { code: "useng", name: "🇺🇸 US English" },
    { code: "eueng", name: "🇪🇺 EU English" },
    { code: "spanish", name: "🇪🇸 Spanish" },
    { code: "german", name: "🇩🇪 German" },
    { code: "french", name: "🇫🇷 French" },
  ];

  const generateSpeech = async () => {
    if (!text.trim()) return;

    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        text: text,
        pitch: pitch.toString(),
        speed: speed.toString(),
        quality: quality.toString(),
        tone: tone.toString(),
        accent: accent.toString(),
        intonation: intonation.toString(),
        lang: language,
      });

      const response = await fetch(
        `https://talkmodachi.dylanpdx.io/tts?${params}`
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("Error generating speech:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const a = document.createElement("a");
      a.href = audioUrl;
      a.download = `tomodachi-tts-${Date.now()}.wav`;
      a.click();
    }
  };

  const randomizeVoice = () => {
    setPitch(Math.floor(Math.random() * 100));
    setSpeed(Math.floor(Math.random() * 100));
    setQuality(Math.floor(Math.random() * 100));
    setTone(Math.floor(Math.random() * 100));
    setAccent(Math.floor(Math.random() * 100));
    setIntonation(Math.floor(Math.random() * 4) + 1);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, []);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: "url(/images/hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for content readability */}
      <div className="min-h-screen bg-black/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className="text-6xl font-bold mb-4"
              style={{
                color: "#0066FF",
                textShadow: "3px 3px 0 rgba(255, 215, 0, 0.5)",
                fontFamily: '"Fredoka", sans-serif',
              }}
            >
              🎤 Tomodachi Life TTS Maker
            </h1>
            <p
              className="text-xl"
              style={{
                color: "#FF1493",
                fontFamily: '"Quicksand", sans-serif',
                fontWeight: 600,
              }}
            >
              Make your Miis say anything!
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Text Input */}
            <div className="lg:col-span-2">
              <div
                className="p-8 rounded-3xl border-4"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#0066FF",
                  boxShadow: "0 8px 0 rgba(0, 102, 255, 0.3)",
                }}
              >
                <label
                  className="block text-2xl font-bold mb-4"
                  style={{
                    color: "#0066FF",
                    fontFamily: '"Fredoka", sans-serif',
                  }}
                >
                  What should they say?
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full h-32 p-4 border-4 rounded-2xl resize-none focus:outline-none focus:ring-4"
                  style={{
                    borderColor: "#0066FF",
                    backgroundColor: "#FFFACD",
                    color: "#0066FF",
                    fontFamily: '"Quicksand", sans-serif',
                    fontSize: "16px",
                  }}
                  placeholder="Enter text here..."
                />
                <p
                  className="mt-2 text-sm"
                  style={{ color: "#FF1493", fontFamily: '"Quicksand", sans-serif' }}
                >
                  {text.length} characters
                </p>
              </div>

              {/* Voice Parameters */}
              <div
                className="mt-8 p-8 rounded-3xl border-4"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#FF1493",
                  boxShadow: "0 8px 0 rgba(255, 20, 147, 0.3)",
                }}
              >
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{
                    color: "#FF1493",
                    fontFamily: '"Fredoka", sans-serif',
                  }}
                >
                  🎛️ Voice Parameters
                </h2>

                <div className="grid grid-cols-2 gap-6">
                  {/* Pitch */}
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      style={{
                        color: "#0066FF",
                        fontFamily: '"Fredoka", sans-serif',
                      }}
                    >
                      Pitch: {pitch}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={pitch}
                      onChange={(e) => setPitch(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Speed */}
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      style={{
                        color: "#0066FF",
                        fontFamily: '"Fredoka", sans-serif',
                      }}
                    >
                      Speed: {speed}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Quality */}
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      style={{
                        color: "#0066FF",
                        fontFamily: '"Fredoka", sans-serif',
                      }}
                    >
                      Quality: {quality}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Tone */}
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      style={{
                        color: "#0066FF",
                        fontFamily: '"Fredoka", sans-serif',
                      }}
                    >
                      Tone: {tone}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={tone}
                      onChange={(e) => setTone(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Accent */}
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      style={{
                        color: "#0066FF",
                        fontFamily: '"Fredoka", sans-serif',
                      }}
                    >
                      Accent: {accent}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={accent}
                      onChange={(e) => setAccent(Number(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Intonation */}
                  <div>
                    <label
                      className="block text-sm font-bold mb-2"
                      style={{
                        color: "#0066FF",
                        fontFamily: '"Fredoka", sans-serif',
                      }}
                    >
                      Intonation: {intonation}
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <button
                          key={i}
                          onClick={() => setIntonation(i)}
                          className="flex-1 py-2 border-3 rounded-lg font-bold transition-all"
                          style={{
                            backgroundColor:
                              intonation === i ? "#FFD700" : "#FFFFFF",
                            borderColor: "#0066FF",
                            color: "#0066FF",
                            fontFamily: '"Fredoka", sans-serif',
                          }}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Randomize Button */}
                <button
                  onClick={randomizeVoice}
                  className="btn-retro mt-6 w-full flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: "#FFD700",
                    color: "#0066FF",
                    borderColor: "#0066FF",
                  }}
                >
                  <Zap size={20} />
                  Randomize Voice
                </button>
              </div>
            </div>

            {/* Right Column - Language & Player */}
            <div className="flex flex-col gap-8">
              {/* Language Selection */}
              <div
                className="p-8 rounded-3xl border-4"
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#00FFFF",
                  boxShadow: "0 8px 0 rgba(0, 255, 255, 0.3)",
                }}
              >
                <label
                  className="block text-lg font-bold mb-4"
                  style={{
                    color: "#00FFFF",
                    fontFamily: '"Fredoka", sans-serif',
                  }}
                >
                  🌍 Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-3 border-3 rounded-xl"
                  style={{
                    borderColor: "#00FFFF",
                    backgroundColor: "#FFFACD",
                    color: "#0066FF",
                    fontFamily: '"Quicksand", sans-serif',
                    fontWeight: 600,
                  }}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Audio Player */}
              {audioUrl && (
                <div
                  className="p-8 rounded-3xl border-4"
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#FF1493",
                    boxShadow: "0 8px 0 rgba(255, 20, 147, 0.3)",
                  }}
                >
                  <label
                    className="block text-lg font-bold mb-4"
                    style={{
                      color: "#FF1493",
                      fontFamily: '"Fredoka", sans-serif',
                    }}
                  >
                    🎵 Audio Player
                  </label>
                  <audio
                    ref={audioRef}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full mb-4"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={togglePlayPause}
                      className="btn-retro flex-1 flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: isPlaying ? "#00FFFF" : "#FFD700",
                        color: "#0066FF",
                        borderColor: "#0066FF",
                      }}
                    >
                      {isPlaying ? (
                        <>
                          <Pause size={20} />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play size={20} />
                          Play
                        </>
                      )}
                    </button>
                    <button
                      onClick={downloadAudio}
                      className="btn-retro flex-1 flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: "#00FF00",
                        color: "#0066FF",
                        borderColor: "#0066FF",
                      }}
                    >
                      <Download size={20} />
                      Download
                    </button>
                  </div>
                </div>
              )}

              {/* Generate Button */}
              <button
                onClick={generateSpeech}
                disabled={isLoading || !text.trim()}
                className="btn-retro w-full text-xl py-4 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: isLoading ? "#FFE4B5" : "#FF1493",
                  color: "#FFFFFF",
                  borderColor: "#0066FF",
                  opacity: isLoading || !text.trim() ? 0.6 : 1,
                }}
              >
                <Volume2 size={24} />
                {isLoading ? "Generating..." : "Generate Speech"}
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p
              className="text-sm"
              style={{
                color: "#0066FF",
                fontFamily: '"Quicksand", sans-serif',
              }}
            >
              Powered by{" "}
              <a
                href="https://github.com/dylanpdx/talkmodachi"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline hover:opacity-80"
              >
                Talkmodachi
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
