import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Heart, Share2, Copy, Check, MapPin, Sparkles } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// ========== CLOUDINARY CONFIGURATION ==========
const CLOUD_NAME = 'dqgjdxwgw';

const getCloudinaryUrl = (publicId: string, width?: number, height?: number) => {
  const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  
  let transformations = 'q_auto/f_auto';
  
  if (width && height) {
    transformations = `c_fill,w_${width},h_${height},${transformations}`;
  } else if (width) {
    transformations = `w_${width},${transformations}`;
  } else if (height) {
    transformations = `h_${height},${transformations}`;
  }
  
  return `${baseUrl}/${transformations}/${publicId}`;
};
// =============================================

interface GalleryImage {
  id: string;
  publicId: string;
  category: string;
  likes: number;
}

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [showShareMenu, setShowShareMenu] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const WEBSITE_URL = 'https://lakshmiganapathievents.com';

  const categories = [
    { id: 'all', name: 'All Photos', count: 12, icon: Sparkles },
    { id: 'wedding', name: 'Weddings', count: 2, icon: Heart },
    { id: 'haldi', name: 'Haldi', count: 2, icon: Sparkles },
    { id: 'half-saree', name: 'Half Saree', count: 2, icon: Sparkles },
    { id: 'housewarming', name: 'Housewarmings', count: 2, icon: MapPin },
    { id: 'naming-ceremony', name: 'Naming Ceremonies', count: 2, icon: Sparkles },
    { id: 'reception', name: 'Receptions', count: 2, icon: Sparkles },
  ];

  // Gallery Images with Cloudinary Public IDs - 12 images total
  const galleryImages: GalleryImage[] = [
    // Weddings (2 images)
    { id: '1', publicId: 'Gallerybcjfbgfb', category: 'wedding', likes: 234 },
    { id: '2', publicId: 'stagemmjfjfjf', category: 'wedding', likes: 189 },
    // Haldi (2 images)
    { id: '3', publicId: 'haldinchfnbgdfh', category: 'haldi', likes: 156 },
    { id: '4', publicId: 'grandhaldibnchfnfhhjf', category: 'haldi', likes: 198 },
    // Half Saree (2 images)
    { id: '5', publicId: 'halfsareebchdbhfhjdf', category: 'half-saree', likes: 234 },
    { id: '6', publicId: 'halfsareeeeeee', category: 'half-saree', likes: 189 },
    // Housewarmings (2 images)
    { id: '7', publicId: 'housewarmingbdhhdgdjhjd', category: 'housewarming', likes: 145 },
    { id: '8', publicId: 'housewarmingfshhdfhf', category: 'housewarming', likes: 167 },
    // Naming Ceremonies (2 images)
    { id: '9', publicId: 'gallerybbchjdbbgdh', category: 'naming-ceremony', likes: 156 },
    { id: '10', publicId: 'namingceremonybcjfbjjfhfj', category: 'naming-ceremony', likes: 178 },
    // Receptions (2 images)
    { id: '11', publicId: 'eventgbgkkkllkkk', category: 'reception', likes: 198 },
    { id: '12', publicId: 'receptionsghdhhjdhdfhj', category: 'reception', likes: 167 },
  ];

  const filteredImages = useMemo(() => {
    if (selectedCategory !== 'all') {
      return galleryImages.filter(img => img.category === selectedCategory);
    }
    return galleryImages;
  }, [selectedCategory]);

  const handleLike = (imageId: string) => {
    setLikedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
    
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(WEBSITE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn('Clipboard copy failed', error);
    }
  };

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerVariant = {
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Event Gallery - Lakshmi Ganapathi Events | Premium Event Gallery</title>
        <meta name="description" content="Browse our stunning event gallery featuring weddings, haldi, half saree, housewarmings, naming ceremonies, and charity events in Rajahmundry." />
        <meta name="keywords" content="event gallery, wedding photos, haldi ceremony, half saree function, housewarming, naming ceremony" />
      </Helmet>

{/* Hero Section - Fixed with proper bottom padding */}
<section className="relative min-h-[400px] md:min-h-[450px] lg:min-h-[500px] overflow-hidden pt-24 pb-12 md:pb-16 lg:pb-20">
  <div className="absolute inset-0">
    <img 
      src={getCloudinaryUrl('gallerybbchdjdh', 1600)}
      alt="Gallery Hero"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
  </div>
  <div className="relative h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl"
    >
      <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
        <Sparkles size={14} className="text-primary" />
        <span className="text-primary text-xs font-semibold tracking-wide">OUR MEMORIES</span>
      </div>
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 leading-tight text-left font-['Playfair_Display']">
        Lakshmi Ganapathi <span className="text-primary">Gallery</span>
      </h1>
      <div className="flex items-center gap-2 mb-5 text-gray-200">
        <MapPin size={18} className="text-primary flex-shrink-0" />
        <span className="text-base sm:text-lg font-semibold">Rajahmundry, Andhra Pradesh</span>
      </div>
      <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl text-left">
        Explore our portfolio of unforgettable moments captured from events we've planned and executed with love.
      </p>
    </motion.div>
  </div>
</section>

      {/* Category Filter */}
      <section className="py-6 bg-white shadow-lg sticky top-16 z-40">
        <div className="container-custom px-4">
          <div className="flex flex-wrap gap-2 justify-center items-center">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 whitespace-nowrap text-sm ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className={`ml-1.5 text-xs ${
                  selectedCategory === category.id ? 'text-white/80' : 'text-gray-400'
                }`}>
                  ({category.count})
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid - Simple Cards */}
      <section className="py-16 bg-light">
        <div className="container-custom px-4">
          {filteredImages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-2xl font-bold mb-2">No Photos Found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={staggerVariant}
                initial="hidden"
                animate="visible"
                className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-5 space-y-5"
              >
                {filteredImages.map((image) => (
                  <motion.div
                    key={image.id}
                    variants={fadeUpVariant}
                    whileHover={{ y: -5 }}
                    className="break-inside-avoid group"
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <LazyLoadImage
                          src={getCloudinaryUrl(image.publicId, 500, 500)}
                          alt="Gallery"
                          effect="blur"
                          className="w-full h-auto group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                        
                        {/* Category Badge */}
                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs text-white font-semibold tracking-wide z-10">
                          {categories.find(c => c.id === image.category)?.name}
                        </div>
                      </div>
                      
                      {/* Like & Share Buttons - Only these */}
                      <div className="p-3 bg-white flex items-center justify-end gap-4">
                        {/* Like Button */}
                        <button 
                          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors"
                          onClick={() => handleLike(image.id)}
                        >
                          <Heart 
                            size={18} 
                            className={`transition-all ${likedImages.includes(image.id) ? 'fill-red-500 text-red-500' : ''}`}
                          />
                          <span>{image.likes + (likedImages.includes(image.id) ? 1 : 0)}</span>
                        </button>

                        {/* Share Button */}
                        <div className="relative">
                          <button 
                            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-amber-500 transition-colors"
                            onClick={() => setShowShareMenu(showShareMenu === image.id ? null : image.id)}
                          >
                            <Share2 size={18} />
                            Share
                          </button>

                          {/* Share Menu */}
                          <AnimatePresence>
                            {showShareMenu === image.id && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 5 }}
                                className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg shadow-xl p-2 min-w-[120px] z-50"
                              >
                                <button
                                  onClick={() => {
                                    copyToClipboard();
                                    setShowShareMenu(null);
                                  }}
                                  className="flex items-center gap-2 text-white text-xs hover:text-amber-500 transition-colors w-full px-2 py-1.5 rounded-md hover:bg-white/10"
                                >
                                  {copied ? (
                                    <>
                                      <Check size={14} />
                                      Copied!
                                    </>
                                  ) : (
                                    <>
                                      <Copy size={14} />
                                      Copy Link
                                    </>
                                  )}
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Gallery;