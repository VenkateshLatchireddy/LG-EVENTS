import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Sparkles,
  Trophy,
  Gift,
  Star,
  Flower2,
  Home,
  Baby
} from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// ========== CLOUDINARY FUNCTION ==========
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

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  imagePublicId: string;
  category: string;
  guests: number;
  duration: string;
}

const Events: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;

  const categories = [
    { id: 'all', name: 'All Events', icon: Sparkles, color: 'bg-gradient-to-r from-primary to-secondary' },
    { id: 'wedding', name: 'Weddings', icon: Star, color: 'bg-pink-500' },
    { id: 'haldi', name: 'Haldi', icon: Flower2, color: 'bg-orange-500' },
    { id: 'half-saree', name: 'Half Saree', icon: Gift, color: 'bg-purple-500' },
    { id: 'housewarming', name: 'Housewarmings', icon: Home, color: 'bg-green-500' },
    { id: 'naming-ceremony', name: 'Naming Ceremonies', icon: Baby, color: 'bg-yellow-500' },
    { id: 'charity', name: 'Charity', icon: Trophy, color: 'bg-red-500' },
  ];

  const events: Event[] = [
    {
      id: '1',
      title: 'Grand Wedding Celebration',
      description: 'Experience the most elegant wedding celebration with premium catering, live music, and stunning decorations.',
      date: 'December 15, 2024',
      location: 'River Bay Convention Hall',
      imagePublicId: 'eventsmarriagejkdncn',
      category: 'wedding',
      guests: 350,
      duration: '1 day'
    },
    {
      id: '2',
      title: 'House Inauguration Ceremony',
      description: 'Traditional housewarming ceremony featuring Vedic rituals, family blessings, and joyous celebrations with loved ones.',
      date: 'January 20, 2025',
      location: 'Divancheruvu',
      imagePublicId: 'housewarmingggggggg',
      category: 'housewarming',
      guests: 200,
      duration: '6 hours'
    },
    {
      id: '3',
      title: 'Half Saree Ceremony',
      description: 'Beautiful Half Saree ceremony with traditional rituals, elegant attire, music, and joyful family celebrations.',
      date: 'December 31, 2024',
      location: 'GSP CONVENTION AC FUNCTION HALL',
      imagePublicId: 'halfsareee',
      category: 'half-saree',
      guests: 1000,
      duration: '10 hours'
    },
    {
      id: '4',
      title: 'Simple Classic Wedding',
      description: 'Grand wedding celebration with traditional rituals, vibrant decorations, live music, and delicious feast for all.',
      date: 'February 10, 2025',
      location: 'S V Function Hall Rajahmundry',
      imagePublicId: 'simpleclassicwedding',
      category: 'wedding',
      guests: 250,
      duration: '1 day'
    },
    {
      id: '5',
      title: 'Haldi Celebrations',
      description: 'Vibrant Haldi ceremony with turmeric paste, traditional songs, colorful decor, and joyful family moments.',
      date: 'April 12, 2025',
      location: 'Venkatadri Gardens Rajahmundry',
      imagePublicId: 'haldicelebrationsbhfnncbf',
      category: 'haldi',
      guests: 150,
      duration: '5 hours'
    },
    {
      id: '6',
      title: 'Naming Ceremony',
      description: 'Sacred naming ceremony with Vedic chants, family blessings, cradle ceremony, and traditional rituals.',
      date: 'March 5, 2025',
      location: 'Navabharat Nagar Rajahmundry',
      imagePublicId: 'namingcerenomy',
      category: 'naming-ceremony',
      guests: 800,
      duration: '6 hours'
    },
    {
      id: '7',
      title: 'Vintage Wedding Celebration',
      description: 'Romantic vintage-themed wedding with old traditional attire, swing band, and elegant decor.',
      date: 'May 20, 2025',
      location: 'Subhamasthu Function Hall',
      imagePublicId: 'eventsmarriage2ncjdhh',
      category: 'wedding',
      guests: 550,
      duration: '1 day'
    },
    {
      id: '8',
      title: 'House Warming Celebration',
      description: 'Traditional housewarming function featuring griha pravesham, holy fire ritual, and celebrations with loved ones.',
      date: 'June 15, 2025',
      location: 'Morampudi Rd, Gandhipuram',
      imagePublicId: 'housewarming',
      category: 'housewarming',
      guests: 400,
      duration: '6 hours'
    },
    {
      id: '9',
      title: 'Grand Haldi',
      description: 'Traditional Haldi ceremony with turmeric paste application, folk songs, dance, and colorful floral decorations.',
      date: 'October 31, 2025',
      location: 'Three star mini function hall',
      imagePublicId: 'grandhaldibnchfnfhhjf',
      category: 'haldi',
      guests: 300,
      duration: '7 hours'
    },
    {
      id: '10',
      title: 'Annual Charity Program',
      description: 'Divine Sri Ram Navami celebration featuring Ramayana chanting, free meal service, devotional music, and charity.',
      date: 'November 25, 2025',
      location: 'Jam Peta, Rajahmundry',
      imagePublicId: 'jaisrirambvcdghjdehjhfjdjdj',
      category: 'charity',
      guests: 350,
      duration: '10 hours'
    },
    {
      id: '11',
      title: 'New Baby Naming Ceremony',
      description: 'Traditional naming ceremony featuring priest rituals, baby naming, family blessings, and joyful gathering with loved ones.',
      date: 'August 8, 2025',
      location: 'Airport Rd, kontamuru',
      imagePublicId: 'namingvhjdhhfbf',
      category: 'naming-ceremony',
      guests: 300,
      duration: '5 hours'
    },
    {
      id: '12',
      title: 'New House Opening Celebration',
      description: 'Traditional house inauguration featuring griha pravesham, holy fire ritual, and joyous family gathering together.',
      date: 'September 30, 2025',
      location: 'Airport Rd, kontamuru',
      imagePublicId: 'houseopeningbcjfhj',
      category: 'housewarming',
      guests: 400,
      duration: '6 hours'
    },
  ];

  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    return filtered;
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerVariant = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Our Events - Lakshmi Ganapathi Events | Premium Event Management</title>
        <meta name="description" content="Explore our portfolio of successful events including weddings, housewarmings, half saree, haldi, naming ceremonies, and charity events." />
        <meta name="keywords" content="event portfolio, wedding gallery, housewarming, half saree, haldi, naming ceremony" />
      </Helmet>

{/* Hero Section - Responsive height with proper padding */}
<section className="relative min-h-[400px] md:min-h-[450px] lg:min-h-[500px] overflow-hidden pt-24 md:pt-28 pb-12 md:pb-16">
  <div className="absolute inset-0">
    <img 
      src="https://res.cloudinary.com/dqgjdxwgw/image/upload/q_auto/f_auto/v1776593304/stagemmjfjfjf.jpg"
      alt="Events Hero"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
  </div>
  <div className="relative h-full flex flex-col justify-center items-start pl-6 md:pl-12">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-3xl text-left"
    >
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 font-['Playfair_Display'] tracking-tight uppercase">
        LAKSHMI GANAPATHI <span className="text-primary">Events</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed font-light tracking-wide max-w-2xl">
        Discover our portfolio of successful events. Each event is uniquely crafted to exceed expectations 
        and create lasting memories for our clients.
      </p>
    </motion.div>
  </div>
</section>

      {/* Category Filters */}
      <section className="py-6 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 lg:gap-3 justify-center lg:justify-start">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 lg:px-5 py-2 lg:py-2.5 rounded-full font-semibold text-sm lg:text-base transition-all duration-300 flex items-center gap-1 lg:gap-2 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? `${category.color} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:shadow-md'
                }`}
              >
                <category.icon size={16} className="hidden sm:block" />
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden text-xs">{category.name.split(' ')[0]}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid View */}
      <section className="py-16">
        <div className="container-custom">
          {/* Results Count */}
          <div className="mb-8 flex justify-between items-center">
            <p className="text-gray-600">
              Showing <span className="font-bold text-primary">{currentEvents.length}</span> of{' '}
              <span className="font-bold">{filteredEvents.length}</span> events
            </p>
            {filteredEvents.length > 0 && (
              <p className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </p>
            )}
          </div>

          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <h3 className="text-2xl font-bold mb-2">No Events Found</h3>
              <p className="text-gray-600">Try selecting a different category</p>
            </motion.div>
          ) : (
            <>
              <motion.div
                variants={staggerVariant}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {currentEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    variants={fadeUpVariant}
                    whileHover={{ y: -10 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="relative overflow-hidden">
                      <LazyLoadImage
                        src={getCloudinaryUrl(event.imagePublicId, 800, 600)}
                        alt={event.title}
                        effect="blur"
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar size={16} className="mr-2 text-primary" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin size={16} className="mr-2 text-primary" />
                          {event.location}
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Users size={16} className="mr-2 text-primary" />
                          {event.guests} Guests
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock size={16} className="mr-2 text-primary" />
                          {event.duration}
                        </div>
                      </div>
                      <Link
                        to={`/services`}
                        className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all duration-300 flex items-center gap-2 w-full justify-center"
                      >
                        View Details
                        <Eye size={16} />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
                        currentPage === i + 1
                          ? 'bg-primary text-white shadow-md'
                          : 'border border-gray-300 hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Events;