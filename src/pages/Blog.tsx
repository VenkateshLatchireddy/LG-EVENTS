import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// React Icons Imports
import { 
  FaHeart, 
  FaShareAlt,
  FaArrowLeft,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaInstagram
} from 'react-icons/fa';

interface ReelVideo {
  id: string;
  publicId: string;
  title: string;
  description: string;
  likes: number;
}

const BlogPost: React.FC = () => {
  const navigate = useNavigate();
  
  // Reel states
  const [currentReelIndex, setCurrentReelIndex] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(false);
  // FIX 2: Default muted to false (volume ON by default)
  const [muted, setMuted] = useState<boolean>(false);
  const [desktopPlayingIndex, setDesktopPlayingIndex] = useState<number | null>(null);
  // FIX 1: Track which desktop video is hovered to show overlay
  const [desktopHoveredIndex, setDesktopHoveredIndex] = useState<number | null>(null);
  const [reelLiked, setReelLiked] = useState<Record<string, boolean>>({});
  const [showShareMenu, setShowShareMenu] = useState<boolean>(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const desktopVideoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cloudinary config
  const CLOUD_NAME = 'dqgjdxwgw';
  
  const getCloudinaryVideoUrl = (publicId: string) => {
    return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto/f_auto/${publicId}.mp4`;
  };

  // Reels data - Replace with your actual Cloudinary public IDs
  const reels: ReelVideo[] = [
    { id: '1', publicId: 'reel11111111', title: 'Grand Wedding Setup', description: 'Beautiful mandap decoration with fresh flowers', likes: 1234 },
    { id: '2', publicId: 'reel22222222', title: 'Haldi Ceremony', description: 'Vibrant haldi celebration with traditional songs', likes: 2345 },
    { id: '3', publicId: 'reel33333333', title: 'Half Saree Function', description: 'Elegant half saree ceremony with family', likes: 3456 },
    { id: '4', publicId: 'reel444444', title: 'Housewarming Pooja', description: 'Sacred housewarming rituals and celebrations', likes: 4567 },
  ];

  // Handle mobile video playback when index changes (only after user interaction)
  useEffect(() => {
    const currentVideo = videoRefs.current[currentReelIndex];
    if (currentVideo && playing) {
      currentVideo.play().catch(err => console.log('Playback failed:', err));
    }
    
    videoRefs.current.forEach((video, idx) => {
      if (idx !== currentReelIndex && video) {
        video.pause();
      }
    });
  }, [currentReelIndex, playing]);

  // Handle swipe detection for mobile
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentReelIndex < reels.length - 1) {
          setCurrentReelIndex(prev => prev + 1);
          setPlaying(false);
        } else if (diff < 0 && currentReelIndex > 0) {
          setCurrentReelIndex(prev => prev - 1);
          setPlaying(false);
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentReelIndex, reels.length]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareMenu(false);
    alert('Link copied!');
  };

  // Mobile reel functions - requires user interaction
  const togglePlay = () => {
    const video = videoRefs.current[currentReelIndex];
    if (video) {
      if (playing) {
        video.pause();
        setPlaying(false);
      } else {
        video.muted = muted;
        video.play().catch(err => console.log('Mobile play failed:', err));
        setPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    const video = videoRefs.current[currentReelIndex];
    if (video) {
      const nextMuted = !muted;
      video.muted = nextMuted;
      setMuted(nextMuted);
      if (!nextMuted && !playing) {
        video.play().catch(err => console.log('Mobile unmute failed:', err));
        setPlaying(true);
      }
    }
  };

  // Desktop functions - no auto-play, requires click
  const stopAllDesktopVideos = () => {
    desktopVideoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
      }
    });
  };

  // FIX 1: handleDesktopPlay now properly hides button while playing
  const handleDesktopPlay = (idx: number) => {
    const video = desktopVideoRefs.current[idx];
    if (!video) return;

    const isCurrentlyPlaying = desktopPlayingIndex === idx && !video.paused;

    stopAllDesktopVideos();

    if (isCurrentlyPlaying) {
      video.pause();
      setDesktopPlayingIndex(null);
    } else {
      video.muted = false;
      video.play().catch(err => console.log('Desktop play failed:', err));
      setDesktopPlayingIndex(idx);
    }
  };

  const handleReelLike = () => {
    const currentReel = reels[currentReelIndex];
    setReelLiked(prev => ({
      ...prev,
      [currentReel.id]: !prev[currentReel.id]
    }));
    
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  return (
    <>
      <Helmet>
        <title>Event Reels - Lakshmi Ganapathi Events</title>
        <meta name="description" content="Watch our latest event highlights including weddings, haldi, half saree, and housewarming ceremonies in stunning vertical videos." />
      </Helmet>

      {/* DESKTOP VIEW - Grid Layout (No auto-play, requires click) */}
      <div className="hidden md:block min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* Header with Back Button */}
        <div className="container-custom px-4 py-6">
          <button
            onClick={() => navigate('/blog')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm mb-6"
          >
            <FaArrowLeft size={14} />
            Back to Blog
          </button>
          
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Event <span className="text-primary">Reels</span>
            </h1>
            <p className="text-gray-500 max-w-md mx-auto">
              Watch our latest event highlights and memorable moments
            </p>
          </div>

          {/* 
            FIX 1: Desktop Reels Grid
            - Play button is HIDDEN when video is playing
            - Play button SHOWS on hover (via group-hover) OR when video is paused/not started
            - This mimics YouTube Shorts / Instagram Reels behavior
          */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {reels.map((reel, idx) => {
              const isPlaying = desktopPlayingIndex === idx;
              const isHovered = desktopHoveredIndex === idx;

              return (
                <motion.div
                  key={reel.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setDesktopHoveredIndex(idx)}
                  onMouseLeave={() => setDesktopHoveredIndex(null)}
                >
                  <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black shadow-lg">
                    <video
                      ref={el => { desktopVideoRefs.current[idx] = el; }}
                      src={getCloudinaryVideoUrl(reel.publicId)}
                      className="w-full h-full object-cover"
                      loop
                      playsInline
                      autoPlay={false}
                      preload="metadata"
                      onEnded={() => setDesktopPlayingIndex(null)}
                      onClick={() => handleDesktopPlay(idx)}
                    />

                    {/* 
                      Overlay logic:
                      - When playing AND not hovered → overlay hidden (no button, no dark bg)
                      - When playing AND hovered → show semi-transparent overlay + pause icon
                      - When NOT playing → always show overlay + play icon
                    */}
                    <button
                      type="button"
                      onClick={() => handleDesktopPlay(idx)}
                      className={`absolute inset-0 flex items-center justify-center transition-all duration-300
                        ${isPlaying
                          ? isHovered
                            ? 'bg-black/30 opacity-100'         // playing + hovered: show pause
                            : 'bg-transparent opacity-0 pointer-events-none' // playing + not hovered: fully hidden
                          : 'bg-black/30 opacity-100'           // not playing: always show play
                        }
                      `}
                    >
                      <div className={`w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white text-2xl transition-transform hover:scale-110
                        ${isPlaying && !isHovered ? 'hidden' : 'flex'}
                      `}>
                        {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
                      </div>
                    </button>

                    {/* Info overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white pointer-events-none">
                        <h3 className="text-sm font-semibold">{reel.title}</h3>
                        <p className="text-xs text-gray-300 mt-0.5 line-clamp-2">{reel.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="flex items-center gap-1 text-xs">
                            <FaHeart className="text-red-500" /> {reel.likes}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-2 right-2 bg-black/50 px-2 py-0.5 rounded-full text-[10px] text-white">
                      📱 Reel
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 
        MOBILE VIEW - Instagram Style Reels (Full Screen)
        Navbar: bg-black py-3 + logo h-12 = 72px top
        Bottom nav bar: py-2 + icon/text ~56px bottom
        Reel must fit exactly in between — no overflow, nothing hidden.
      */}
      <div
        className="md:hidden relative w-full overflow-hidden bg-black"
        style={{ 
          height: 'calc(100dvh - 72px - 56px)',  /* total screen minus top navbar and bottom nav */
          marginTop: '72px'                        /* push below top navbar */
        }}
      >
        {/* Small in-reel header row for back/title/instagram — sits at very top of reel area */}
        <div className="absolute top-0 left-0 right-0 z-20 px-4 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex items-center justify-between py-3">
            <button onClick={() => navigate('/blog')} className="text-white">
              <FaArrowLeft size={20} />
            </button>
            <div className="text-center">
              <h1 className="text-white font-bold text-xs tracking-wide">LAKSHMI GANAPATHI EVENTS</h1>
              <p className="text-white/60 text-[8px]">Event Highlights</p>
            </div>
            <button className="text-white">
              <FaInstagram size={20} />
            </button>
          </div>
        </div>

        {/* Reels Container */}
        <div 
          ref={containerRef}
          className="relative h-full w-full"
          style={{ touchAction: 'pan-y' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReelIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {/* FIX 2: muted={muted} starts as false (volume ON) */}
              <video
                ref={el => { videoRefs.current[currentReelIndex] = el; }}
                src={getCloudinaryVideoUrl(reels[currentReelIndex].publicId)}
                className="w-full h-full object-cover"
                loop
                playsInline
                muted={muted}
                preload="metadata"
                onClick={togglePlay}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

              {/* Play/Pause Overlay - Only show when paused */}
              {!playing && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                    <FaPlay className="text-white text-xl ml-1" />
                  </div>
                </div>
              )}

              {/* Right Side Actions */}
              <div
                className="absolute right-3 bottom-24 z-10 flex flex-col gap-5"
              >
                <button onClick={handleReelLike} className="flex flex-col items-center gap-0.5">
                  <div className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <FaHeart size={20} className={reelLiked[reels[currentReelIndex].id] ? 'text-red-500 fill-red-500' : 'text-white'} />
                  </div>
                  <span className="text-white text-[10px] font-medium">
                    {reelLiked[reels[currentReelIndex].id] 
                      ? reels[currentReelIndex].likes + 1 
                      : reels[currentReelIndex].likes}
                  </span>
                </button>

                <div className="relative">
                  <button onClick={() => setShowShareMenu(!showShareMenu)} className="flex flex-col items-center gap-0.5">
                    <div className="w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <FaShareAlt size={18} className="text-white" />
                    </div>
                    <span className="text-white text-[10px] font-medium">Share</span>
                  </button>

                  {showShareMenu && (
                    <div className="absolute right-full mr-2 bottom-0 bg-gray-900 rounded-xl p-2 min-w-[100px] shadow-xl">
                      <button onClick={handleShare} className="w-full text-left px-3 py-1.5 text-white text-xs hover:bg-gray-800 rounded-lg">Copy Link</button>
                      <button className="w-full text-left px-3 py-1.5 text-white text-xs hover:bg-gray-800 rounded-lg">WhatsApp</button>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Info + Sound Toggle */}
              <div
                className="absolute left-3 right-16 bottom-6 z-10"
              >
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-white font-bold text-sm mb-0.5">{reels[currentReelIndex].title}</h2>
                    <p className="text-white/70 text-[11px] leading-tight">{reels[currentReelIndex].description}</p>
                  </div>
                  {/* FIX 2: Icon shows VolumeUp (on) by default since muted starts false */}
                  <button 
                    onClick={toggleMute}
                    className="w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 ml-2"
                  >
                    {muted 
                      ? <FaVolumeMute className="text-white text-xs" /> 
                      : <FaVolumeUp className="text-white text-xs" />
                    }
                  </button>
                </div>
              </div>

              {/* Progress Dots */}
              <div className="absolute top-20 right-2 z-10 flex flex-col gap-1.5">
                {reels.map((_, idx) => (
                  <div
                    key={idx}
                    className={`rounded-full transition-all duration-300 ${
                      idx === currentReelIndex 
                        ? 'h-5 w-1 bg-white' 
                        : 'h-1.5 w-1 bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Swipe Hint */}
          <div
            className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
          >
            <div className="flex flex-col items-center gap-0.5">
              <div className="w-6 h-6 border border-white/30 rounded-full flex items-center justify-center">
                <div className="w-0.5 h-2 bg-white/50 rounded-full animate-bounce"></div>
              </div>
              <p className="text-white/40 text-[8px]">Swipe</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default BlogPost;