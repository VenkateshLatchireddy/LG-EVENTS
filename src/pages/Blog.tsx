import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
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

const reels: ReelVideo[] = [
  { id: '1', publicId: 'reel11111111', title: 'Grand Wedding Setup', description: 'Beautiful mandap decoration with fresh flowers', likes: 1234 },
  { id: '2', publicId: 'reel22222222', title: 'Haldi Ceremony', description: 'Vibrant haldi celebration with traditional songs', likes: 2345 },
  { id: '3', publicId: 'reel33333333', title: 'Half Saree Function', description: 'Elegant half saree ceremony with family', likes: 3456 },
  { id: '4', publicId: 'reel444444', title: 'Housewarming Pooja', description: 'Sacred housewarming rituals and celebrations', likes: 4567 },
];

/* ─────────────────────────────────────────────
   SINGLE REEL SLIDE (MOBILE)
───────────────────────────────────────────── */
interface ReelItemProps {
  reel: ReelVideo;
  isActive: boolean;
  muted: boolean;
  onToggleMute: () => void;
  liked: boolean;
  onLike: () => void;
  onShare: () => void;
}

const ReelItem: React.FC<ReelItemProps> = ({
  reel, isActive, muted, onToggleMute, liked, onLike, onShare,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showTapIcon, setShowTapIcon] = useState(false);
  const tapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isActive) {
      video.muted = muted;
      video.currentTime = 0;
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      video.pause();
      setPlaying(false);
    }
  }, [isActive]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  const handleTap = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) { video.pause(); setPlaying(false); }
    else { video.play().catch(() => {}); setPlaying(true); }
    setShowTapIcon(true);
    if (tapTimer.current) clearTimeout(tapTimer.current);
    tapTimer.current = setTimeout(() => setShowTapIcon(false), 700);
  };

  return (
    <div className="relative w-full h-full bg-black select-none" onClick={handleTap}>
      <video
        ref={videoRef}
        src={getCloudinaryVideoUrl(reel.publicId)}
        className="w-full h-full object-cover"
        loop playsInline preload="metadata"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

      <AnimatePresence>
        {showTapIcon && (
          <motion.div
            key="tap"
            initial={{ opacity: 1, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.4 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center">
              {playing ? <FaPause className="text-white text-2xl" /> : <FaPlay className="text-white text-2xl ml-1" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute right-3 bottom-20 z-10 flex flex-col items-center gap-5" onClick={e => e.stopPropagation()}>
        <button onClick={onLike} className="flex flex-col items-center gap-1">
          <motion.div whileTap={{ scale: 1.4 }} className="w-11 h-11 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
            <FaHeart size={22} className={liked ? 'text-red-500' : 'text-white'} />
          </motion.div>
          <span className="text-white text-[10px] font-semibold drop-shadow">{liked ? reel.likes + 1 : reel.likes}</span>
        </button>

        <button onClick={onShare} className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
            <FaShareAlt size={18} className="text-white" />
          </div>
          <span className="text-white text-[10px] font-semibold drop-shadow">Share</span>
        </button>

        <button onClick={onToggleMute} className="flex flex-col items-center gap-1">
          <div className="w-11 h-11 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center">
            {muted ? <FaVolumeMute size={18} className="text-white" /> : <FaVolumeUp size={18} className="text-white" />}
          </div>
        </button>
      </div>

      <div className="absolute left-4 right-20 bottom-6 z-10 pointer-events-none">
        <h2 className="text-white font-bold text-base mb-1 drop-shadow">{reel.title}</h2>
        <p className="text-white/70 text-xs leading-snug">{reel.description}</p>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   DESKTOP CARD
   FIX: video element always starts muted=true and autoPlay=false.
        Only when user explicitly clicks Play do we unmute + play.
        This prevents any background audio on page load.
───────────────────────────────────────────── */
interface DesktopCardProps {
  reel: ReelVideo;
  idx: number;
  currentlyPlayingId: string | null;
  onPlay: (id: string | null) => void;
}

const DesktopCard: React.FC<DesktopCardProps> = ({ reel, idx, currentlyPlayingId, onPlay }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const isPlaying = currentlyPlayingId === reel.id;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      // Unmute only on explicit user-initiated play
      video.muted = false;
      video.currentTime = 0;
      video.play().catch(() => {
        // If browser blocks unmuted play, fall back to muted
        video.muted = true;
        video.play().catch(() => {});
      });
    } else {
      // Always pause AND re-mute when not playing
      // This ensures no background audio leaks ever
      video.pause();
      video.muted = true;
      video.currentTime = 0;
    }
  }, [isPlaying]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Toggle: if this card is playing, stop it; else play it
    onPlay(isPlaying ? null : reel.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: idx * 0.1 }}
      className="relative group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <div className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black shadow-lg">
        {/*
          KEY FIX:
          - muted={true}  → always start muted so browser never autoplays audio
          - autoPlay={false} → never autoplay
          - preload="metadata" → only load thumbnail frame, not full video
          We control play/mute entirely via the useEffect above.
        */}
        <video
          ref={videoRef}
          src={getCloudinaryVideoUrl(reel.publicId)}
          className="w-full h-full object-cover"
          loop
          playsInline
          autoPlay={false}
          muted={true}
          preload="metadata"
        />

        {/* Overlay: always show play when not playing, show pause only on hover when playing */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300
            ${isPlaying && !hovered ? 'bg-transparent opacity-0' : 'bg-black/30 opacity-100'}`}
        >
          <div className={`w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white text-2xl hover:scale-110 transition-transform
            ${isPlaying && !hovered ? 'hidden' : 'flex'}`}>
            {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
          </div>
        </div>

        {/* Info on hover */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 pointer-events-none
          ${hovered ? 'opacity-100' : 'opacity-0'}`}>
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
    </motion.div>
  );
};

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const BlogPost: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(false);
  const [liked, setLiked] = useState<Record<string, boolean>>({});
  const [dragOffset, setDragOffset] = useState(0);
  // null = nothing playing on desktop (no autoplay ever)
  const [currentlyPlayingDesktopId, setCurrentlyPlayingDesktopId] = useState<string | null>(null);
  const dragStartY = useRef(0);
  const isDragging = useRef(false);

  const goTo = useCallback((idx: number) => {
    if (idx >= 0 && idx < reels.length) { setActiveIndex(idx); setDragOffset(0); }
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    dragStartY.current = e.touches[0].clientY;
    isDragging.current = true;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    setDragOffset(e.touches[0].clientY - dragStartY.current);
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    if (dragOffset < -60) goTo(activeIndex + 1);
    else if (dragOffset > 60) goTo(activeIndex - 1);
    setDragOffset(0);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    alert('Link copied!');
  };
  const handleLike = (id: string) => {
    setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    if ('vibrate' in navigator) navigator.vibrate(50);
  };

  return (
    <>
      <Helmet>
        <title>Event Reels - Lakshmi Ganapathi Events</title>
        <meta name="description" content="Watch our latest event highlights." />
        <style type="text/css">{`
          @media (max-width: 767px) {
            footer { display: none !important; }
          }
        `}</style>
      </Helmet>

      {/* ══ DESKTOP ══ */}
      <div className="hidden md:block min-h-screen bg-gradient-to-b from-white to-gray-50 pt-24 pb-12">
        <div className="container-custom px-4 max-w-7xl mx-auto">
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {reels.map((reel, idx) => (
              <DesktopCard
                key={reel.id}
                reel={reel}
                idx={idx}
                currentlyPlayingId={currentlyPlayingDesktopId}
                onPlay={setCurrentlyPlayingDesktopId}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ══ MOBILE ══ */}
      <div
        className="md:hidden bg-black overflow-hidden"
        style={{
          marginTop: '72px',
          height: 'calc(100dvh - 72px - 56px)',
        }}
      >
        <div className="absolute top-[72px] left-0 right-0 z-30 px-4 pt-3 pb-8 bg-gradient-to-b from-black/70 to-transparent pointer-events-none">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate('/blog')} className="text-white pointer-events-auto w-8 h-8 flex items-center justify-center bg-black/30 rounded-full">
              <FaArrowLeft size={18} />
            </button>
            <p className="text-white font-bold text-[11px] tracking-widest">LAKSHMI GANAPATHI REELS</p>
            <button onClick={() => window.open('https://instagram.com', '_blank')} className="text-white pointer-events-auto w-8 h-8 flex items-center justify-center bg-black/30 rounded-full">
              <FaInstagram size={16} />
            </button>
          </div>
        </div>

        <div
          className="relative w-full h-full"
          style={{ touchAction: 'none' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              transform: `translateY(calc(${-activeIndex * 100}% + ${dragOffset}px))`,
              transition: isDragging.current ? 'none' : 'transform 0.38s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              willChange: 'transform',
            }}
          >
            {reels.map((reel, idx) => (
              <div key={reel.id} style={{ position: 'absolute', top: `${idx * 100}%`, width: '100%', height: '100%' }}>
                <ReelItem
                  reel={reel}
                  isActive={idx === activeIndex}
                  muted={muted}
                  onToggleMute={() => setMuted(m => !m)}
                  liked={!!liked[reel.id]}
                  onLike={() => handleLike(reel.id)}
                  onShare={handleShare}
                />
              </div>
            ))}
          </div>

          <div className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-1.5 pointer-events-none">
            {reels.map((_, idx) => (
              <div
                key={idx}
                className="rounded-full transition-all duration-300"
                style={{
                  width: 3,
                  height: idx === activeIndex ? 20 : 6,
                  background: idx === activeIndex ? '#fff' : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
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