'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Swiper imports for Swiper 12
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination,  } from 'swiper/modules';

// Swiper CSS imports - only need these once
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/parallax';

// Lucide React imports
import { 
  Calendar, 
  Users, 

  ArrowRight,
  Star,
  Music,
  Camera,
  Utensils,
  Mic,
  CheckCircle,
  Play,
  Quote,
  TrendingUp,
  Heart,
  Globe,
  Baby,
  Flower2,
  Share2,
  Eye,
  Copy,
  Check
} from 'lucide-react';

interface Service {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
  eventType: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  guests: string;
  image: string;
  category: string;
  description: string;
  views?: number;
  likes?: number;
  shares?: number;
}

const Home: React.FC = () => {
  const [showShareMenu, setShowShareMenu] = useState<Event | null>(null);
  const [copied, setCopied] = useState(false);
  const [likedStates, setLikedStates] = useState<Record<string, boolean>>({});

  const handleLike = (id: string) => {
    setLikedStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (event: Event) => {
    setShowShareMenu(event);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.warn('Clipboard copy failed', error);
    }
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  // Cloudinary helper function
  const getCloudinaryUrl = (publicId: string, width?: number, height?: number) => {
    const cloudName = 'dqgjdxwgw';
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;

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
    const getCloudinaryVideoUrl = (publicId: string) => {
      const cloudName = 'dqgjdxwgw';
      return `https://res.cloudinary.com/${cloudName}/video/upload/${publicId}.mp4`;
    };


  const services: Service[] = [
    { 
      icon: Music, 
      title: 'Live Music & Entertainment', 
      description: 'Professional sound systems, live bands, DJs, and performers for unforgettable experiences',
      features: ['Professional DJs', 'Live Bands', 'Sound Systems', 'Lighting Effects']
    },
    { 
      icon: Camera, 
      title: 'Photography & Videography', 
      description: 'Capture every precious moment with our expert photographers and cinematographers',
      features: ['Professional Cameras', 'Drone Shots', 'Same-day Edits', 'Photo Booths']
    },
    { 
      icon: Utensils, 
      title: 'Premium Catering', 
      description: 'Exquisite dining experiences with customized menus by world-class chefs',
      features: ['Custom Menus', 'Dietary Options','Pure Veg Based','Pure Non-Veg Based', 'Live Stations', 'Bar Service']
    },
    { 
      icon: Mic, 
      title: 'Entertainment', 
      description: 'World-class entertainment including performers, magicians, and celebrity hosts',
      features: ['Celebrity Hosts', 'Experienced Anchors', 'Magicians','Live Screening','Projector Show', 'Dancers', 'Fireworks']
    },
{ 
  icon: Flower2, 
  title: 'Flower Decoration', 
  description: 'Exquisite floral arrangements and stunning flower decorations that transform any venue into a breathtaking paradise for your special moments',
  features: ['Wedding Flower Decor', 'Stage Flower Arrangements', 'Fresh Flower Mandaps', 'Table Centerpieces', 'Welcome Flower Gates', 'Flower Backdrops']
},
{ 
  icon: Baby, 
  title: 'Baby Birth & Birthday Celebrations', 
  description: 'Magical baby showers, heartwarming birth celebrations, and unforgettable birthday parties with special baby-themed decorations and personalized touches',
  features: ['Baby-Themed Decor', 'Customized Cakes', 'Return Gifts', 'Photography', 'Entertainment', 'Venue Decoration']
},
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Arjun Chalamala',
      role: 'Wedding Client',
      content: 'Absolutely incredible! They made our wedding day perfect. Every detail was handled with care and professionalism. The team went above and beyond our expectations.',
      rating: 5,
      image: 'https://res.cloudinary.com/dqgjdxwgw/image/upload/q_auto/f_auto/v1776350502/arjun.jpg',
      eventType: 'Wedding'
    },
    {
      name: 'Sridevi Byreddy',
      role: 'Haldi Ceremony Client',
      content: 'The Haldi ceremony was beautifully organized with vibrant decor, joyful ambiance, and perfect attention to every detail. It made our special day even more memorable!',
      rating: 5,
      image: 'https://res.cloudinary.com/dqgjdxwgw/image/upload/v1776350811/sridevihchjfjdjdj.jpg',
      eventType: 'Haldi Ceremony'
    },
    {
      name: 'David Jacob Paul',
      role: 'Half Saree Ceremony',
      content: 'My daughter\'s half saree ceremony was magical! The team went above and beyond expectations. Everything was perfect from start.',
      rating: 5,
      image: 'https://res.cloudinary.com/dqgjdxwgw/image/upload/q_auto/f_auto/v1776351679/halfsareee.jpg',
      eventType: 'Half Saree'
    },
    {
      name: 'Akhila Priya Orugallu',
      role: 'Naming Ceremony',
      content: 'Our baby naming ceremony was celebrated perfectly. Thank you for making it so special! The arrangements were truly beautiful.',
      rating: 5,
      image: 'https://res.cloudinary.com/dqgjdxwgw/image/upload/q_auto/f_auto/v1776352071/kidnaming.jpg',
      eventType: 'Naming Ceremony'
    },
    {
      name: 'Nanditha Nagalla',
      role: 'Birthday Celebration',
      content: 'Flawless execution of my friend’s birthday celebration. The team managed everything perfectly and beautifully.',
      rating: 5,
      image: 'https://res.cloudinary.com/dqgjdxwgw/image/upload/q_auto/f_auto/v1776352311/nanditha.jpg',
      eventType: 'Birthday'
    },
  ];

  const featuredEvents: Event[] = [
    {
      id: 'grand-wedding',
      title: 'Grand Wedding',
      date: 'December 15, 2024',
      guests: '550+',
      image: getCloudinaryUrl('events/wedding', 800, 600),
      category: 'Wedding',
      description: 'Luxury wedding with 350 guests featuring live music, premium catering, and stunning decorations.'
    },
    {
      id: 'haldi-ceremony',
      title: 'Haldi Ceremony',
      date: 'January 20, 2025',
      guests: '150+',
      image: getCloudinaryUrl('events/haldi', 800, 600),
      category: 'Haldi',
      description: 'A vibrant haldi ceremony filled with traditional rituals, joyful music, colorful decor, and celebrations with family and friends.'
    },
    {
      id: 'half-saree-ceremony',
      title: 'Half Saree Ceremony',
      date: 'December 31, 2024',
      guests: '200+',
      image: getCloudinaryUrl('events/half', 800, 600),
      category: 'Half Saree',
      description: 'A traditional half saree ceremony celebrating the coming-of-age of a young girl, featuring cultural rituals, elegant attire, music, and joyful gatherings with family and friends.'
    },
    {
      id: 'housewarming-ceremony',
      title: 'Housewarming Ceremony',
      date: 'February 20, 2025',
      guests: '100+',
      image: getCloudinaryUrl('housewarming', 800, 600),
      category: 'Housewarming',
      description: 'A traditional housewarming ceremony celebrating the inauguration of a new home with rituals, blessings, and joyful gatherings with family and friends.'
    },
    {
      id: 'naming-ceremony',
      title: 'Naming Ceremony',
      date: 'February 10, 2025',
      guests: '80+',
      image: getCloudinaryUrl('kidssssssssnjfjhfjkfjjfjnnbvbb', 800, 600),
      category: 'Kids Ceremony',
      description: 'A beautiful naming ceremony celebrating a newborn with traditional rituals, blessings, and joyful gatherings with family and friends.'
    },
    {
      id: 'birthday-bash',
      title: 'Birthday Bash',
      date: 'April 12, 2025',
      guests: '150+',
      image: getCloudinaryUrl('events/birthday.jpg', 800, 600),
      category: 'Birthday',
      description: 'Milestone birthday celebration with themed decorations and entertainment.'
    },
  ];

  const [featuredHighlights] = useState<Event[]>(() => [
    {
      id: 'highlight-wedding',
      title: 'Wedding Reception',
      date: 'March 3, 2025',
      guests: '450+',
      image: getCloudinaryUrl('happyweddingggggggbdkfkkif', 800, 600),
      category: 'Wedding',
      description: 'Elegant reception with warm lighting, dance floor, and memorable entertainment.',
      views: 4826,
      likes: 327,
      shares: 84,
    },
    {
      id: 'highlight-haldi',
      title: 'Haldi Celebration',
      date: 'April 1, 2025',
      guests: '180+',
      image: getCloudinaryUrl('sridevihchjfjdjdj', 800, 600),
      category: 'Haldi',
      description: 'A colorful haldi celebration filled with joy, music, and smiles.',
      views: 3914,
      likes: 268,
      shares: 63,
    },
    {
      id: 'highlight-half-saree',
      title: 'Half Saree Event',
      date: 'May 12, 2025',
      guests: '220+',
      image: getCloudinaryUrl('halfsareeeeeee', 800, 600),
      category: 'Half Saree',
      description: 'A beautiful half saree ceremony with traditional customs and elegant décor.',
      views: 5738,
      likes: 412,
      shares: 97,
    },
    {
      id: 'highlight-housewarming',
      title: 'Housewarming Party',
      date: 'June 8, 2025',
      guests: '120+',
      image: getCloudinaryUrl('housewarmingggggggg', 800, 600),
      category: 'Housewarming',
      description: 'A warm housewarming event with intimate family celebrations and modern décor.',
      views: 3247,
      likes: 219,
      shares: 51,
    },
    {
      id: 'highlight-naming',
      title: 'Naming Ceremony',
      date: 'July 18, 2025',
      guests: '90+',
      image: getCloudinaryUrl('happyweddingggggggnckcjfc', 800, 600),
      category: 'Naming',
      description: 'A heartfelt naming ceremony with beautiful rituals and loving family moments.',
      views: 4182,
      likes: 286,
      shares: 59,
    },
    {
      id: 'highlight-birthday',
      title: 'Birthday Celebration',
      date: 'August 25, 2025',
      guests: '160+',
      image: getCloudinaryUrl('birthdayyyyyyyy', 800, 600),
      category: 'Birthday',
      description: 'A fun-filled birthday celebration with festive lighting and joyful vibes.',
      views: 5261,
      likes: 374,
      shares: 88,
    },
  ]);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const fadeLeftVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const fadeRightVariant = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const scaleVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } }
  };

  return (
    <>
{/* Hero Section - COMPLETELY REWRITTEN */}
<div className="relative w-full min-h-screen overflow-hidden pt-24 lg:pt-28">
  {/* Video Background - Desktop & Mobile versions */}
  <div className="absolute top-0 left-0 w-full h-full">
    {/* Desktop Video - Hidden on mobile */}
    <video
      autoPlay
      muted
      loop
      playsInline
      className="hidden md:block w-full h-full object-cover"
    >
      <source src={getCloudinaryVideoUrl('indianmarriage2')} type="video/mp4" />
    </video>
    
    {/* Mobile Video - Vertical/Portrait version - Visible only on mobile */}
    <video
      autoPlay
      muted
      loop
      playsInline
      className="block md:hidden w-full h-full object-cover"
    >
      <source src={getCloudinaryVideoUrl('indianmarriagev')} type="video/mp4" />
      {/* Fallback to desktop video if mobile version not available */}
      <source src={getCloudinaryVideoUrl('indianmarriage2')} type="video/mp4" />
    </video>
    
    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/60"></div>
  </div>

  {/* Content */}
  <div className="relative z-10 h-full flex items-center">
    <div className="w-full pl-6 pr-4 sm:pl-12 sm:pr-8 md:pl-16 md:pr-12 lg:pl-24 lg:pr-16">
      <div className="max-w-2xl">
        <div className="inline-block mb-4">
          <span className="bg-amber-500/20 backdrop-blur-sm rounded-full px-4 py-2 text-amber-400 text-sm font-semibold">
            Premium Event Management
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
          Creating
          <span className="text-amber-500"> Unforgettable</span>
          <br />
          Moments
        </h1>
        
<p className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 max-w-xl leading-relaxed tracking-wide">
  మీ <span className="text-primary font-semibold">కలలను నిజం చేసే</span> బాధ్యత మాది. 
  <span className="text-orange-400 font-semibold"> చిన్న సమావేశాలు</span> మొదలు 
  <span className="text-primary font-semibold"> గొప్ప వేడుకలు</span> వరకు, 
  మేము <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent font-bold">
    రాజమండ్రిలో అత్యుత్తమ ఈవెంట్ అనుభవాలు
  </span> అందిస్తాము. ప్రతి క్షణాన్ని 
  <span className="italic text-white"> మరపురానిదిగా</span> మారుస్తాం.
</p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            href="/contact" 
            className="bg-gradient-to-r from-amber-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
          >
            Plan Your Event
            <ArrowRight size={16} />
          </Link>
          <Link 
            href="/events" 
            className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2 border border-white/30"
          >
            <Play size={14} />
            Watch Demo
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap gap-4 mt-8">
          {['Trusted by 500+ Clients', 'Award Winning Service', '24/7 Support'].map((badge, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <CheckCircle className="text-amber-500 w-3.5 h-3.5" />
              <span className="text-white text-xs sm:text-sm">{badge}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  {/* Scroll Indicator */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:block">
    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
      <div className="w-1 h-2 bg-white rounded-full mt-2 animate-bounce"></div>
    </div>
  </div>
</div>


{/* Services Section - Premium Redesign (Original Color Palette) */}
<section className="py-8 relative overflow-hidden bg-light">
  {/* Animated Background Elements */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl opacity-30"></div>
    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl opacity-30"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full filter blur-3xl"></div>
  </div>

  <div className="container-custom relative z-10">
    {/* Section Header with Enhanced Design */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUpVariant}
      className="text-center mb-8"
    >
      <div className="inline-block mb-2">
        <span className="bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-xs sm:text-sm font-semibold px-3 py-1 sm:px-4 sm:py-1.5 rounded-full">
          ✨ What We Offer
        </span>
      </div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
        Premium Event <span className="text-primary">Services</span>
      </h2>
      <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto mb-3 rounded-full"></div>
      <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
        <span className="text-primary font-semibold">"పెళ్లిళ్లు పండగలా, పండగలు పెళ్లిలా..."</span> గోదావరి తీరాన గర్వంగా నిలిచిన లక్ష్మీ గణపతి ఈవెంట్స్, మీ ప్రతి శుభకార్యాన్ని వైభవంగా, ఆడంబరంగా నిర్వహిస్తుంది.
      </p>
    </motion.div>

    {/* Services Grid - Compact Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleVariant}
          whileHover={{ y: -5 }}
          className="group relative"
        >
          {/* Card Glow Effect on Hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition duration-500"></div>
          
          <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-100 h-full">
            {/* Top Accent Bar */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            
            <div className="p-5 sm:p-6 flex flex-col h-full">
              {/* Icon and Title in Row */}
              <div className="flex items-start gap-4 mb-3">
                <div className="relative flex-shrink-0">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur-md opacity-0 group-hover:opacity-50 transition duration-500"></div>
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                    <service.icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-lg sm:text-xl font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text transition-all duration-300 mt-1">
                  {service.title}
                </h3>
              </div>
              
              {/* Description */}
              <p className="text-gray-500 mb-3 leading-relaxed text-xs sm:text-sm flex-grow">
                {service.description}
              </p>
              
              {/* Features List - Compact */}
              <div className="space-y-1.5 mb-4">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs group/feature">
                    <div className="relative flex-shrink-0">
                      <CheckCircle size={14} className="text-primary transition-transform group-hover/feature:scale-110" />
                    </div>
                    <span className="text-gray-600 group-hover/feature:text-gray-800 transition-colors line-clamp-1">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Bottom Decorative Element */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* View All Services CTA */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="text-center mt-8"
    >
      <Link
        href="/services"
        className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm sm:text-base font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:scale-105 group"
      >
        <span>View All Services</span>
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  </div>
</section>

      {/* Featured Events Section with Cloudinary Images */}
      <section className="py-10">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-8"
          >
            <span className="text-primary font-semibold text-lg">Recent Showcases</span>
            <h2 className="section-title">Featured <span className="text-primary">Events</span></h2>
            <p className="section-subtitle italic font-montserrat text-gray-600">
              "వివాహమేమంటే ఇద్దరు హృదయాల కలయిక, ఇద్దరు జీవితాల సంయోగం"<br/>
              <span className="text-sm font-poppins not-italic">Two hearts united, two lives bound together in eternal celebration.</span>
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleVariant}
                whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              >
                <div className="relative overflow-hidden h-80">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <p className="text-sm text-primary mb-1">{event.category}</p>
                      <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                      <p className="text-sm mb-2">{event.date}</p>
                      <p className="text-sm mb-3">{event.guests} Guests</p>
                      <p className="text-sm line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {event.category}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/events" className="btn-primary inline-flex items-center gap-2 group">
              View All Events
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

{/* Mobile-First Event Moments - WhatsApp Optimized */}
{/* ============================================
   MOBILE-FIRST EVENT HIGHLIGHTS WITH SCROLLING TEXT TICKERS
   ============================================ */}
<section className="relative overflow-hidden bg-gradient-to-br from-secondary via-secondary to-primary pt-5 pb-5 md:pt-6 md:pb-6">
  {/* Decorative Background */}
  <div className="absolute inset-0 opacity-5">
    <div className="absolute top-0 left-0 w-72 h-72 bg-yellow-400 rounded-full filter blur-3xl"></div>
    <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full filter blur-3xl"></div>
  </div>

  <div className="container-custom px-4 relative z-10">
    
    {/* ========== TOP SCROLLER - SCROLLING RIGHT ========== */}
    <div className="mb-3 overflow-hidden whitespace-nowrap rounded-full bg-white/10 py-3 backdrop-blur-sm">
      <div className="animate-scroll-right inline-flex items-center gap-8">
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          🎉 500+ Happy Weddings Completed
        </span>
        <span className="inline-flex items-center gap-2 text-white text-sm">
          ✨
        </span>
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          🌸 1000+ Traditional Ceremonies
        </span>
        <span className="inline-flex items-center gap-2 text-white text-sm">
          ✨
        </span>
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          🎂 2000+ Birthday Celebrations
        </span>
        <span className="inline-flex items-center gap-2 text-white text-sm">
          ✨
        </span>
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          🏆 Best Event Planner 2025 - Rajahmundry
        </span>
        <span className="inline-flex items-center gap-2 text-white text-sm">
          ✨
        </span>
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          🌿 50+ Theme Decorations Available
        </span>
        <span className="inline-flex items-center gap-2 text-white text-sm">
          ✨
        </span>
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          ⚡ 24/7 Emergency Support
        </span>
        <span className="inline-flex items-center gap-2 text-white text-sm">
          ✨
        </span>
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          🚗 Free Guest Transportation Available
        </span>
      </div>
    </div>

    {/* Continuous right-to-left event carousel */}
    <div className="relative -mx-4 px-4">
      <Swiper
        modules={[Autoplay]}
        loop
        grabCursor
        allowTouchMove
        simulateTouch
        threshold={4}
        touchRatio={1}
        shortSwipes
        longSwipes
        longSwipesRatio={0.15}
        resistanceRatio={0.7}
        speed={6500}
        slidesPerView={1.08}
        spaceBetween={16}
        onTouchStart={(swiper) => {
          swiper.autoplay.stop();
        }}
        onTouchEnd={(swiper) => {
          swiper.slideToClosest(320);
          window.setTimeout(() => swiper.autoplay.start(), 450);
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
          520: { slidesPerView: 1.55, spaceBetween: 18 },
          768: { slidesPerView: 2.25, spaceBetween: 20 },
          1024: { slidesPerView: 3.15, spaceBetween: 22 },
          1280: { slidesPerView: 3.45, spaceBetween: 22 },
        }}
        className="event-moments-swiper !overflow-visible !pb-8"
      >
        {featuredHighlights.map((event, idx) => (
          <SwiperSlide key={event.id} className="!h-auto">
            <motion.article
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.05, 0.2) }}
              className="group/card flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/25 bg-white/95 shadow-[0_24px_60px_-28px_rgba(10,8,28,0.75)] backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_-25px_rgba(10,8,28,0.9)]"
            >
              <div className="relative h-60 overflow-hidden bg-secondary/20 sm:h-64">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover/card:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/15" />

                <span className="absolute left-4 top-4 rounded-full border border-white/25 bg-black/25 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                  {event.category}
                </span>

                <div className="absolute right-4 top-4 flex gap-2">
                  <button
                    type="button"
                    aria-label={likedStates[event.id] ? `Unlike ${event.title}` : `Like ${event.title}`}
                    aria-pressed={Boolean(likedStates[event.id])}
                    onClick={() => handleLike(event.id)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white hover:text-secondary active:scale-95"
                  >
                    <Heart
                      size={17}
                      className={likedStates[event.id] ? 'fill-red-500 text-red-500' : ''}
                    />
                  </button>
                  <button
                    type="button"
                    aria-label={`Share ${event.title}`}
                    onClick={() => handleShare(event)}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-black/25 text-white backdrop-blur-md transition hover:scale-105 hover:bg-white hover:text-secondary active:scale-95"
                  >
                    <Share2 size={17} />
                  </button>
                </div>

                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[11px] font-medium text-white/90">
                  <span className="inline-flex items-center gap-1.5">
                    <Eye size={13} />
                    {formatNumber(event.views || 0)} views
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Heart
                      size={13}
                      className={likedStates[event.id] ? 'fill-red-500 text-red-500' : ''}
                    />
                    {formatNumber((event.likes || 0) + (likedStates[event.id] ? 1 : 0))}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Share2 size={13} />
                    {formatNumber(event.shares || 0)}
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-bold tracking-tight text-slate-900">
                  {event.title}
                </h3>
                <p className="mt-1.5 min-h-10 line-clamp-2 text-xs leading-relaxed text-slate-500">
                  {event.description}
                </p>

                <div className="my-4 h-px bg-gradient-to-r from-slate-200 via-slate-100 to-transparent" />

                <div className="mb-4 flex flex-wrap gap-2 text-[11px] font-medium text-slate-600">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5">
                    <Calendar size={13} className="text-primary" />
                    {event.date}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1.5">
                    <Users size={13} className="text-primary" />
                    {event.guests} guests
                  </span>
                </div>

                <Link
                  href="/events"
                  className="mt-auto flex items-center justify-between rounded-2xl bg-gradient-to-r from-primary to-secondary px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/15 transition hover:shadow-xl hover:shadow-primary/25 active:scale-[0.98]"
                >
                  Explore this event
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </motion.article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    <p className="mt-1 text-center text-[11px] font-medium text-white/45 lg:hidden">
      Drag to explore · autoplay resumes automatically
    </p>

    {/* ========== BOTTOM SCROLLER - SCROLLING LEFT ========== */}
    <div className="overflow-hidden whitespace-nowrap py-3 mt-6 bg-white/10 backdrop-blur-sm rounded-full">
      <div className="animate-scroll-left inline-flex items-center gap-8">
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          📞 Call Us: +91 95422 56678
        </span>
        <span className="inline-flex items-center gap-2 text-white text-sm">
          ◆
        </span>
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          💬 24/7 Free Consultation Available
        </span>
        <span className="inline-flex items-center gap-2 text-white text-sm">
          ◆
        </span>
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          🎯 100% Client Satisfaction Guaranteed
        </span>
        <span className="inline-flex items-center gap-2 text-white text-sm">
          ◆
        </span>
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          📍 Serving Rajahmundry & Nearby Cities
        </span>
        <span className="inline-flex items-center gap-2 text-white text-sm">
          ◆
        </span>
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          🌟 5000+ Happy Families
        </span>
        <span className="inline-flex items-center gap-2 text-white text-sm">
          ◆
        </span>
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          💝 Free Event Planning Guide
        </span>
        <span className="inline-flex items-center gap-2 text-white text-sm">
          ◆
        </span>
        <span className="inline-flex items-center gap-2 text-yellow-400 text-sm font-medium">
          🏅 Award Winning Service Since 2016
        </span>
      </div>
    </div>

    {/* View All Button */}
    <div className="mt-4 text-center">
      <Link 
        href="/events" 
        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-white/20 transition-all active:scale-95 border border-white/20"
      >
        View All Events
        <ArrowRight size={14} />
      </Link>
    </div>
  </div>

  {/* Share Menu Modal */}
  <AnimatePresence>
    {showShareMenu && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
        onClick={() => setShowShareMenu(null)}
      >
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="bg-white rounded-t-3xl w-full max-w-md p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="text-lg font-bold mb-4 text-center">Share this moment</h3>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <button 
              onClick={() => {
                window.open(`https://wa.me/?text=${encodeURIComponent('Check out this event!')}`, '_blank');
                setShowShareMenu(null);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-green-50 active:scale-95 transition-all"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.614-.916-2.21-.242-.579-.487-.5-.669-.51-.173-.01-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </div>
              <span className="text-xs">WhatsApp</span>
            </button>
            <button 
              onClick={() => {
                window.open(`https://www.instagram.com/`, '_blank');
                setShowShareMenu(null);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-pink-50 active:scale-95 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </div>
              <span className="text-xs">Instagram</span>
            </button>
            <button 
              onClick={() => {
                copyToClipboard(window.location.href);
                setTimeout(() => setShowShareMenu(null), 1500);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 active:scale-95 transition-all"
            >
              <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
                {copied ? <Check className="w-6 h-6 text-white" /> : <Copy className="w-6 h-6 text-white" />}
              </div>
              <span className="text-xs">{copied ? 'Copied!' : 'Copy Link'}</span>
            </button>
            <button 
              onClick={() => {
                copyToClipboard('Check out Lakshmi Ganapathi Events!');
                setShowShareMenu(null);
              }}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-blue-50 active:scale-95 transition-all"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.5 4v16h19V4h-19zm2 2h15v12h-15V6zm2 2v2h11V8h-11zm0 4v2h7v-2h-7z"/>
                </svg>
              </div>
              <span className="text-xs">Message</span>
            </button>
          </div>
          <button 
            onClick={() => setShowShareMenu(null)}
            className="w-full py-3 rounded-xl bg-gray-100 text-gray-600 font-semibold active:scale-95 transition-all"
          >
            Cancel
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</section>
{/* Testimonials Section - Clean Auto-Slide */}
<section className="py-8 md:py-12 bg-light">
  <div className="container-custom px-4">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-6 md:mb-8"
    >
      <span className="text-primary font-semibold text-sm">Testimonials</span>
      <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
        What Our <span className="text-primary">Clients Say</span>
      </h2>
      <p className="text-gray-500 text-xs md:text-sm max-w-2xl mx-auto">
        Hear from our happy clients about their unforgettable experiences
      </p>
    </motion.div>

    {/* Auto-Slide Swiper */}
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={20}
      slidesPerView={1.1}
      centeredSlides={false}
      pagination={{ clickable: true }}
      autoplay={{ 
        delay: 4000, 
        disableOnInteraction: false,
        pauseOnMouseEnter: true
      }}
      loop={true}
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 }
      }}
      className="pb-12"
    >
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <div className="bg-white rounded-2xl p-6 shadow-md h-full">
            {/* Quote Icon */}
            <Quote className="text-primary/10 mb-4" size={32} />
            
            {/* Rating Stars */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}
                />
              ))}
            </div>
            
            {/* Testimonial Text */}
            <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
              "{testimonial.content}"
            </p>
            
            {/* Client Info */}
            <div className="flex items-center gap-3">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-10 h-10 rounded-full object-cover border border-primary"
                loading="lazy"
              />
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">{testimonial.name}</h3>
                <p className="text-gray-400 text-xs">{testimonial.role}</p>
              </div>
            </div>
            
            {/* Event Type */}
            <div className="mt-3">
              <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                {testimonial.eventType} Event
              </span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</section>

      {/* Why Choose Us Section */}
      <section className="pt-8 pb-4 md:pt-10 md:pb-5">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeLeftVariant}
            >
              <span className="text-primary font-semibold text-lg">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                We Make Your Events
                <span className="text-primary"> Extraordinary</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                With over 10 years of experience and thousands of successful events, we've mastered the art 
                of creating unforgettable experiences. Our dedicated team works tirelessly to ensure every 
                detail is perfect, leaving you free to enjoy your special moments.
              </p>
              
              <div className="space-y-4">
                {[
                  { icon: Heart, title: 'Personalized Approach', description: 'Every event is unique and we tailor our services to your vision' },
                  { icon: Users, title: 'Expert Team', description: 'Professional planners, designers, and coordinators at your service' },
                  { icon: TrendingUp, title: 'Proven Track Record', description: '500+ successful events with 100% client satisfaction' },
                  { icon: Globe, title: 'Last-Minute Planning?', description: 'We organize events quickly without compromising quality.' 
}
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-4 group"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Link href="/about" className="btn-primary inline-flex items-center gap-2 mt-8 group">
                Learn More About Us
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeRightVariant}
              className="relative"
            >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src={getCloudinaryUrl('slide1', 400, 400)}
                  alt="Event Planning"
                  className="rounded-2xl shadow-lg w-full h-64 object-contain bg-white"
                  loading="lazy"
                />
                <img
                  src={getCloudinaryUrl('slide2', 400, 300)}
                  alt="Event Decoration"
                  className="rounded-2xl shadow-lg w-full h-48 object-contain bg-white"
                  loading="lazy"
                />
              </div>

              <div className="space-y-4 mt-8">
                <img
                  src={getCloudinaryUrl('slide3sddfgfd', 400, 300)}
                  alt="Event Celebration"
                  className="rounded-2xl shadow-lg w-full h-48 object-contain bg-white"
                  loading="lazy"
                />
                <img
                  src={getCloudinaryUrl('gdfhjfhhfjfj', 400, 400)}
                  alt="Event Music"
                  className="rounded-2xl shadow-lg w-full h-64 object-contain bg-white"
                  loading="lazy"
                />
              </div>
            </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>


    </>
  );
};

export default Home;
