import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import {
  FaHeart,
  FaShareAlt,
  FaArrowLeft,
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaInstagram,
} from 'react-icons/fa';

interface ReelVideo {
  id: string;
  publicId: string;
  title: string;
  description: string;
  likes: number;
}

const CLOUD_NAME = 'dqgjdxwgw';

const getCloudinaryVideoUrl = (publicId: string) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto/f_auto/${publicId}.mp4`;

const getCloudinaryThumbnailUrl = (publicId: string) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_auto/f_auto/so_0/${publicId}.jpg`;

const reels: ReelVideo[] = [
  { id: '1', publicId: 'reel11111111', title: 'Grand Wedding Setup', description: 'Beautiful mandap decoration with fresh flowers', likes: 1234 },
  { id: '2', publicId: 'reel22222222', title: 'Haldi Ceremony', description: 'Vibrant haldi celebration with traditional songs', likes: 2345 },
  { id: '3', publicId: 'reel33333333', title: 'Half Saree Function', description: 'Elegant half saree ceremony with family', likes: 3456 },
  { id: '4', publicId: 'reel444444', title: 'Housewarming Pooja', description: 'Sacred housewarming rituals and celebrations', likes: 4567 },
  { id: '5', publicId: 'reel555555', title: 'Wedding Celebration', description: 'Fun and festive wedding party with friends and family', likes: 5678 },
];

/* ============================================
   DESKTOP VIEW
   ============================================ */
const DesktopView: React.FC = () => {
  const navigate = useNavigate();
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const handlePlayPause = useCallback((reelId: string) => {
    const video = videoRefs.current[reelId];
    const isCurrentlyPlaying = playingVideoId === reelId;

    if (isCurrentlyPlaying) {
      if (video) video.pause();
      setPlayingVideoId(null);
    } else {
      if (playingVideoId && videoRefs.current[playingVideoId]) {
        const prevVideo = videoRefs.current[playingVideoId];
        if (prevVideo) prevVideo.pause();
      }
      if (video) {
        video.muted = false;
        video.currentTime = 0;
        video.play().catch(err => console.log('Play error:', err));
        setPlayingVideoId(reelId);
      }
    }
  }, [playingVideoId]);

  useEffect(() => {
    return () => {
      Object.values(videoRefs.current).forEach(video => {
        if (video) video.pause();
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate('/blog')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm mb-6"
        >
          <FaArrowLeft size={14} /> Back to Blog
        </button>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Event <span className="text-primary">Reels</span>
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Click on any reel to watch our latest event highlights
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {reels.map((reel) => {
            const isPlaying = playingVideoId === reel.id;
            const isHovered = hoveredVideoId === reel.id;
            const showButton = !isPlaying || (isPlaying && isHovered);

            return (
              <div
                key={reel.id}
                className="relative group"
                onMouseEnter={() => setHoveredVideoId(reel.id)}
                onMouseLeave={() => setHoveredVideoId(null)}
              >
                <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-gray-900 shadow-lg">
                  <video
                    ref={(el) => { if (el) videoRefs.current[reel.id] = el; }}
                    src={getCloudinaryVideoUrl(reel.publicId)}
                    poster={getCloudinaryThumbnailUrl(reel.publicId)}
                    className="w-full h-full object-cover"
                    loop
                    playsInline
                    muted
                    preload="metadata"
                  />

                  {showButton && (
                    <button
                      onClick={() => handlePlayPause(reel.id)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity hover:bg-black/40"
                    >
                      <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white text-2xl transition-transform hover:scale-110">
                        {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
                      </div>
                    </button>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="text-sm font-semibold">{reel.title}</h3>
                      <p className="text-xs text-gray-300 mt-0.5 line-clamp-2">{reel.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <FaHeart className="text-red-400 text-xs" />
                        <span className="text-xs">{reel.likes}</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full text-[10px] text-white font-medium">
                    📱 Reel
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* ============================================
   MOBILE VIEW
   ============================================ */
const MobileView: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});
  const [videoPlayingStates, setVideoPlayingStates] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartY = useRef(0);
  const touchCurrentY = useRef(0); // ✅ NEW: track current touch position via ref

  useEffect(() => {
    const initialLikes: Record<string, number> = {};
    reels.forEach(reel => { initialLikes[reel.id] = reel.likes; });
    setLikesCount(initialLikes);
  }, []);

  // Monitor video playing state
  useEffect(() => {
    const interval = setInterval(() => {
      const newStates: Record<number, boolean> = {};
      videoRefs.current.forEach((video, idx) => {
        if (video) newStates[idx] = !video.paused;
      });
      setVideoPlayingStates(newStates);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Handle video playback when active index changes
  useEffect(() => {
    const currentVideo = videoRefs.current[activeIndex];

    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== activeIndex) video.pause();
    });

    if (currentVideo) {
      currentVideo.muted = muted;
      currentVideo.currentTime = 0;
      currentVideo.play().catch(() => {});
    }
  }, [activeIndex, muted]);

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < reels.length) setActiveIndex(idx);
  }, []);

  // ✅ FIXED: reset dragOffset and record start position via ref
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchCurrentY.current = e.touches[0].clientY;
    setIsDragging(true);
    setDragOffset(0);
  };

  // ✅ FIXED: removed isDragging state check (it's async, causes missed events)
  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentY.current = e.touches[0].clientY;
    const offset = touchCurrentY.current - touchStartY.current;
    setDragOffset(offset);
  };

  // ✅ FIXED: use ref value instead of stale dragOffset state
  const handleTouchEnd = () => {
    const offset = touchCurrentY.current - touchStartY.current;
    setIsDragging(false);
    setDragOffset(0);
    if (offset < -50) goTo(activeIndex + 1);      // swipe up → next reel
    else if (offset > 50) goTo(activeIndex - 1);  // swipe down → prev reel
  };

  const handleLike = (id: string) => {
    const isLiked = liked[id];
    setLiked(prev => ({ ...prev, [id]: !isLiked }));
    setLikesCount(prev => ({ ...prev, [id]: isLiked ? prev[id] - 1 : prev[id] + 1 }));
    if ('vibrate' in navigator) navigator.vibrate(50);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied!');
  };

  const togglePlayPause = (idx: number) => {
    const video = videoRefs.current[idx];
    if (video) {
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div
      className="bg-black overflow-hidden"
      style={{
        marginTop: '72px',
        height: 'calc(100dvh - 72px - 56px)',
      }}
    >
      {/* Header */}
      <div className="absolute top-[72px] left-0 right-0 z-30 px-4 pt-3 pb-8 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/blog')}
            className="text-white pointer-events-auto w-8 h-8 flex items-center justify-center bg-black/30 rounded-full active:scale-95 transition-transform"
          >
            <FaArrowLeft size={18} />
          </button>
          <p className="text-white font-bold text-[11px] tracking-widest">LAKSHMI GANAPATHI REELS</p>
          <button
            onClick={() => window.open('https://instagram.com', '_blank')}
            className="text-white pointer-events-auto w-8 h-8 flex items-center justify-center bg-black/30 rounded-full active:scale-95 transition-transform"
          >
            <FaInstagram size={16} />
          </button>
        </div>
      </div>

      {/* Swipe Container */}
      <div
        className="relative w-full h-full overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(calc(${-activeIndex * 100}% + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
          }}
        >
          {reels.map((reel, idx) => {
            const isActive = idx === activeIndex;
            const isPlaying = videoPlayingStates[idx] || false;

            return (
              <div
                key={reel.id}
                className="absolute w-full h-full"
                style={{ top: `${idx * 100}%` }}
                onClick={() => togglePlayPause(idx)}
              >
                <video
                  ref={(el) => { videoRefs.current[idx] = el; }}
                  src={getCloudinaryVideoUrl(reel.publicId)}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  muted={muted}
                  preload="auto"
                  onPlay={() => setVideoPlayingStates(prev => ({ ...prev, [idx]: true }))}
                  onPause={() => setVideoPlayingStates(prev => ({ ...prev, [idx]: false }))}
                  onEnded={() => setVideoPlayingStates(prev => ({ ...prev, [idx]: false }))}
                />

                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

                {/* Play Button - ONLY shows when video is PAUSED and ACTIVE */}
                {isActive && !isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">
                    <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center">
                      <FaPlay className="text-white text-2xl ml-1" />
                    </div>
                  </div>
                )}

                {/* Right Side Actions */}
                <div
                  className="absolute right-3 bottom-28 z-10 flex flex-col items-center gap-5"
                  onClick={e => e.stopPropagation()}
                >
                  <button onClick={() => handleLike(reel.id)} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
                    <div className="w-11 h-11 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <FaHeart size={22} className={liked[reel.id] ? 'text-red-500 fill-red-500' : 'text-white'} />
                    </div>
                    <span className="text-white text-[10px] font-semibold drop-shadow">
                      {formatNumber(likesCount[reel.id] || reel.likes)}
                    </span>
                  </button>

                  <button onClick={handleShare} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
                    <div className="w-11 h-11 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <FaShareAlt size={18} className="text-white" />
                    </div>
                    <span className="text-white text-[10px] font-semibold drop-shadow">Share</span>
                  </button>

                  <button onClick={() => setMuted(!muted)} className="flex flex-col items-center gap-1 active:scale-90 transition-transform">
                    <div className="w-11 h-11 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center">
                      {muted ? <FaVolumeMute size={18} className="text-white" /> : <FaVolumeUp size={18} className="text-white" />}
                    </div>
                  </button>
                </div>

                {/* Bottom Info */}
                <div className="absolute left-4 right-16 bottom-6 z-10 pointer-events-none">
                  <h2 className="text-white font-bold text-base mb-1 drop-shadow">{reel.title}</h2>
                  <p className="text-white/70 text-xs leading-snug">{reel.description}</p>
                </div>

                {/* Progress Dots */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 pointer-events-none">
                  {reels.map((_, dotIdx) => (
                    <div
                      key={dotIdx}
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: 3,
                        height: dotIdx === activeIndex ? 20 : 6,
                        background: dotIdx === activeIndex ? '#fff' : 'rgba(255,255,255,0.35)',
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sound ON Indicator */}
      {!muted && (
        <div className="absolute bottom-24 left-4 z-20 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full text-white text-[10px] flex items-center gap-1 pointer-events-none">
          <FaVolumeUp size={10} />
          <span>Sound ON</span>
        </div>
      )}
    </div>
  );
};

/* ============================================
   MAIN COMPONENT
   ============================================ */
const BlogPost: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isClient) return null;

  return (
    <>
      <Helmet>
        <title>Event Reels - Lakshmi Ganapathi Events</title>
        <meta name="description" content="Watch our latest event highlights." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <style>{`
          @media (max-width: 767px) {
            footer { display: none !important; }
          }
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </Helmet>
      {isMobile ? <MobileView /> : <DesktopView />}
    </>
  );
};

export default BlogPost;