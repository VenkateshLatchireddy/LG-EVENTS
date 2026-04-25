import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import {
  Heart,
  Share2,
  ArrowLeft,
  CheckCircle,
  Phone,
  Mail,
  Link as LinkIcon,
  Sparkles,
  Camera,
  Award,
} from 'lucide-react';
import { FaFacebook, FaTwitter, FaWhatsapp } from 'react-icons/fa';

interface EventDetail {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  location: string;
  image: string;
  gallery: string[];
  category: string;
  guests: number;
  duration: string;
  price: number;
  featured: boolean;
  rating: number;
  reviews: number;
  highlights: string[];
  schedule: { time: string; activity: string }[];
  vendors: { name: string; type: string }[];
}

// Move the data outside the component to avoid recreation on each render
const getEventData = (id: string): EventDetail => ({
  id: id || '1',
  title: 'లక్ష్మీ గణపతి ఈవెంట్స్',
  description: 'మీ ప్రతి వేడుకను అత్యంత అందంగా, అద్భుతంగా మరియు యాదుగా చేసే నిపుణుల బృందం.',
  longDescription: `తూర్పు గోదావరిలో ప్రముఖ ఈవెంట్ నిర్వాహక సంస్థ లక్ష్మీ గణపతి ఈవెంట్స్‌కు స్వాగతం. మేము వివాహాలు, నామకరణాలు (బాలాష్టమి), సీమంతం, పుట్టినరోజు వేడుకలు, లంగా ఓణి (హాఫ్ సారీ) ఫంక్షన్లు, హౌస్ వార్మింగ్ సెరిమోనీలు మరియు అన్ని రకాల శుభ సందర్భాలను అత్యంత వైభవంగా నిర్వహిస్తాము.

వివాహం అనేది జీవితంలోని అతి ముఖ్యమైన సందర్భం. మేము సాంప్రదాయ విధానంతో పాటు ఆధునిక అలంకరణలను అందిస్తాము. పూల అలంకరణలు, మండప డెకరేషన్, బారాత్ ఏర్పాట్లు, విందు భోజనం, లైవ్ మ్యూజిక్, DJ, మేళతాళాలు - అన్నింటినీ ఒకే తాటిపై నిర్వహిస్తాము.

నామకరణం అంటే శిశువుకు పేరు పెట్టే శుభ సందర్భం. ఈ సందర్భాన్ని పూలతో, రంగులతో, సంప్రదాయ వాయిద్యాలతో అలరించడం మా ప్రత్యేకత. పుట్టినరోజు వేడుకలు, లంగా ఓణి ఫంక్షన్లు కూడా మేము అత్యంత ఆకర్షణీయంగా నిర్వహిస్తాము.

మా దగ్గర 50+ రకాల థీమ్ డెకరేషన్లు ఉన్నాయి - బాలీవుడ్ థీమ్, రాజస్థానీ థీమ్, ఫ్లోరల్ గార్డెన్ థీమ్, రాయల్ పింక్ థీమ్, మరెన్నో. మీకు నచ్చిన థీమ్ ప్రకారం మేము అలంకరణలు చేస్తాము.`,
  date: '',
  location: 'తూర్పు గోదావరి',
  image: 'https://res.cloudinary.com/dqgjdxwgw/image/upload/v1777042940/pexels-nikku0109-33885310_kxuauo.jpg',
  gallery: [
    'https://res.cloudinary.com/dqgjdxwgw/image/upload/v1777052802/IMG-20260424-WA0102_jpgfi6.jpg',
    'https://res.cloudinary.com/dqgjdxwgw/image/upload/v1777052801/IMG-20260424-WA0101_ofq0w5.jpg',
    'https://res.cloudinary.com/dqgjdxwgw/image/upload/v1777052801/IMG-20260424-WA0106_ggeg2w.jpg',
    'https://res.cloudinary.com/dqgjdxwgw/image/upload/v1777052797/IMG-20260424-WA0113_xbnceg.jpg',
    'https://res.cloudinary.com/dqgjdxwgw/image/upload/v1777052796/IMG-20260424-WA0109_knrjgy.jpg',
    'https://res.cloudinary.com/dqgjdxwgw/image/upload/v1777053106/IMG-20260424-WA0094_qazxbj.jpg',
    'https://res.cloudinary.com/dqgjdxwgw/image/upload/v1777053106/IMG-20260424-WA0093_x16kpf.jpg',
    'https://res.cloudinary.com/dqgjdxwgw/image/upload/v1777053104/IMG-20260424-WA0095_kr1xka.jpg'
  ],
  category: 'ఈవెంట్ నిర్వహణ',
  guests: 500,
  duration: 'అనుకూల సమయం',
  price: 25000,
  featured: true,
  rating: 4.9,
  reviews: 128,
  highlights: [
    '🌸 50+ రకాల థీమ్ డెకరేషన్లు - పూల అలంకరణలు, మండప డెకర్, బ్యాక్‌డ్రాప్ డిజైన్లు',
    '🎵 లైవ్ మ్యూజిక్, DJ, మేళతాళాలు, నాట్య ప్రదర్శనల ఏర్పాటు',
    '🍽️ 100+ రకాల వంటకాలతో కూడిన క్యాటరింగ్ - శాకాహార, మాంసాహార ప్రత్యేకతలు',
    '📸 ప్రొఫెషనల్ ఫోటోగ్రఫీ & సినిమాటిక్ వీడియోగ్రఫీ టీం',
    '🚗 అతిథుల కోసం లగ్జరీ బస్సులు, కార్లు, టెంపో ట్రావెలర్ల ఏర్పాటు',
    '⚡ లాస్ట్ మినిట్ ప్లానింగ్ - 24 గంటలలోపు ఈవెంట్ ఏర్పాటు చేసే సౌకర్యం',
    '👥 30+ మంది నిపుణుల బృందం - ప్రతి వివరాన్ని పర్యవేక్షించడానికి',
    '🌐 రాజమండ్రి, విశాఖ, విజయవాడ, హైదరాబాద్, తిరుపతిలలో నెట్వర్క్'
  ],
  schedule: [],
  vendors: []
});

const Services: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [liked, setLiked] = useState<boolean>(false);
  const [showShare, setShowShare] = useState<boolean>(false);

  useEffect(() => {
    // Set data immediately
    const eventData = getEventData(id || '1');
    setEvent(eventData);
    setLoading(false);
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('లింక్ కాపీ చేయబడింది!');
  };

  // Phone number constant
  const phoneNumber = '+919542256678';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">ఈవెంట్ కనుగొనబడలేదు</h2>
          <Link to="/events" className="btn-primary">ఈవెంట్లకు తిరిగి వెళ్ళు</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>లక్ష్మీ గణపతి ఈవెంట్స్ | తూర్పు గోదావరి</title>
        <meta name="description" content={event.description} />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={event.image}
            alt="లక్ష్మీ గణపతి ఈవెంట్స్"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        <div
          className="absolute top-0 left-0 w-72 h-72 opacity-15 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at top left, #FF6B35, transparent 70%)' }}
        />

        <div className="relative min-h-screen flex flex-col justify-center">
          <div className="pl-8 md:pl-16 lg:pl-24 pr-8 py-24 max-w-3xl">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => navigate('/events')}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-10 transition-colors text-sm tracking-wide"
            >
              <ArrowLeft size={16} />
              ఈవెంట్లకు తిరిగి వెళ్ళు
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="mb-4">
                <span
                  className="text-sm font-semibold tracking-[0.2em] uppercase inline-block px-3 py-1 rounded-full"
                  style={{ 
                    color: '#FF6B35',
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  తూర్పు గోదావరి
                </span>
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-2"
                style={{ fontFamily: 'serif', textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
              >
                లక్ష్మీ గణపతి
              </h1>
              <h2
                className="text-3xl md:text-4xl font-bold mb-8"
                style={{ color: '#FF6B35', fontFamily: 'serif', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}
              >
                ఈవెంట్స్
              </h2>

              <div className="relative mb-8">
                <div
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                  style={{ backgroundColor: '#FF6B35' }}
                />
                <p
                  className="pl-5 text-lg md:text-xl text-white/90 leading-relaxed italic"
                  style={{ fontFamily: 'serif' }}
                >
                  "పెళ్లి, నామకరణం, పుట్టినరోజు, లంగా ఓణి <br />
                  మీ ప్రతి శుభవేళను మేం అద్భుతంగా మలుస్తాం."
                </p>
              </div>

              <p className="text-white/70 text-base mb-10 leading-relaxed">
                మీ జీవితంలోని ప్రతి విశేష క్షణాన్ని మరపురానిదిగా చేయడమే మా సేవ.<br />
                ప్రేమతో ప్లాన్ చేస్తాం, అందంగా అమలు చేస్తాం.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105 hover:shadow-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B35, #2D1B4E)',
                    boxShadow: '0 8px 32px rgba(255,107,53,0.4)'
                  }}
                >
                  <Sparkles size={18} />
                  మీ వేడుక బుక్ చేయండి
                </Link>
                {/* Updated "కోట్ అడగండి" button with phone dialer */}
                <a
                  href={`tel:${phoneNumber}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold border-2 border-white/40 text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/10"
                >
                  <Phone size={18} />
                  కోట్ అడగండి
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Award size={28} style={{ color: '#FF6B35' }} />
                    <h2 className="text-3xl font-bold text-gray-800">మా గురించి</h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed text-lg">
                      తూర్పు గోదావరిలో  ప్రముఖ ఈవెంట్ నిర్వాహక సంస్థ లక్ష్మీ గణపతి ఈవెంట్స్‌కు స్వాగతం. మేము <span className="font-semibold" style={{ color: '#FF6B35' }}>వివాహాలు, నామకరణాలు (బాలాష్టమి), సీమంతం, పుట్టినరోజు వేడుకలు, లంగా ఓణి (హాఫ్ సారీ) ఫంక్షన్లు, హౌస్ వార్మింగ్ సెరిమోనీలు</span> మరియు అన్ని రకాల శుభ సందర్భాలను అత్యంత వైభవంగా నిర్వహిస్తాము.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      వివాహం అనేది జీవితంలోని అతి ముఖ్యమైన సందర్భం. మేము సాంప్రదాయ విధానంతో పాటు ఆధునిక <span className="font-semibold" style={{ color: '#FF6B35' }}>పూల అలంకరణలు, మండప డెకరేషన్, బారాత్ ఏర్పాట్లు, విందు భోజనం, లైవ్ మ్యూజిక్, DJ, మేళతాళాలు</span> - అన్నింటినీ ఒకే తాటిపై నిర్వహిస్తాము.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      నామకరణం అంటే శిశువుకు పేరు పెట్టే శుభ సందర్భం. ఈ సందర్భాన్ని పూలతో, రంగులతో, సంప్రదాయ వాయిద్యాలతో అలరించడం మా ప్రత్యేకత. పుట్టినరోజు వేడుకలు, లంగా ఓణి ఫంక్షన్లు కూడా మేము అత్యంత ఆకర్షణీయంగా నిర్వహిస్తాము.
                    </p>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      మా దగ్గర <span className="font-semibold" style={{ color: '#FF6B35' }}>50+ రకాల థీమ్ డెకరేషన్లు</span> ఉన్నాయి - బాలీవుడ్ థీమ్, రాజస్థానీ థీమ్, ఫ్లోరల్ గార్డెన్ థీమ్, రాయల్ పింక్ థీమ్, మరెన్నో. మీకు నచ్చిన థీమ్ ప్రకారం మేము అలంకరణలు చేస్తాము.
                    </p>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles size={24} style={{ color: '#FF6B35' }} />
                    <h3 className="text-2xl font-bold text-gray-800">మా విశేషతలు</h3>
                  </div>
                  <div
                    className="rounded-2xl p-6"
                    style={{ background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)' }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {event.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <CheckCircle
                            size={20}
                            className="flex-shrink-0 mt-0.5"
                            style={{ color: '#FF6B35' }}
                          />
                          <span className="text-gray-700 text-sm leading-relaxed">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-24 space-y-6"
              >
                {/* CTA Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 border" style={{ borderColor: '#FFE4D6' }}>
                  <div className="text-center mb-5">
                    <p className="text-2xl font-bold mb-1" style={{ color: '#FF6B35' }}>
                      మీ వేడుక ప్లాన్ చేద్దాం!
                    </p>
                    <p className="text-gray-500 text-sm">
                      ఈరోజే సంప్రదించండి — ఉచిత కన్సల్టేషన్
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="block w-full text-center py-3 rounded-full font-bold text-white mb-3 transition-all hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #FF6B35, #2D1B4E)',
                      boxShadow: '0 4px 16px rgba(255,107,53,0.35)'
                    }}
                  >
                    వేడుక బుక్ చేయండి
                  </Link>
                  {/* Updated "కోట్ అడగండి" button with phone dialer */}
                  <a
                    href={`tel:${phoneNumber}`}
                    className="block w-full text-center py-3 rounded-full font-bold border-2 transition-all"
                    style={{ borderColor: '#FF6B35', color: '#FF6B35' }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = '#FF6B35';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                      (e.currentTarget as HTMLAnchorElement).style.color = '#FF6B35';
                    }}
                  >
                    <Phone size={16} className="inline mr-2" />
                    కోట్ అడగండి
                  </a>
                </div>

                {/* Like & Share */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setLiked(!liked)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-colors text-sm ${
                      liked ? 'bg-orange-50 text-orange-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Heart size={16} className={liked ? 'fill-orange-500' : ''} />
                    నచ్చింది
                  </button>

                  <div className="relative flex-1">
                    <button
                      onClick={() => setShowShare(!showShare)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm"
                    >
                      <Share2 size={16} />
                      షేర్ చేయండి
                    </button>
                    {showShare && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl p-3 z-10 border border-gray-100">
                        <div className="space-y-1">
                          <button
                            onClick={handleShare}
                            className="w-full flex items-center gap-3 px-3 py-2 hover:bg-orange-50 rounded-lg transition-colors text-sm"
                          >
                            <LinkIcon size={15} style={{ color: '#FF6B35' }} />
                            లింక్ కాపీ చేయండి
                          </button>
                          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                            <FaWhatsapp size={15} className="text-green-500" />
                            వాట్సాప్
                          </button>
                          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                            <FaFacebook size={15} className="text-blue-600" />
                            ఫేస్‌బుక్
                          </button>
                          <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                            <FaTwitter size={15} className="text-sky-500" />
                            ట్విట్టర్
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact card */}
                <div
                  className="rounded-2xl p-6 text-white"
                  style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #2D1B4E 100%)' }}
                >
                  <h3 className="text-xl font-bold mb-2">సహాయం కావాలా?</h3>
                  <p className="mb-4 opacity-90 text-sm">
                    మా నిపుణులు మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్నారు
                  </p>
                  <div className="space-y-3">
                    <a href={`tel:${phoneNumber}`} className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity">
                      <Phone size={16} className="flex-shrink-0" />
                      <span>+91 9542256678</span>
                    </a>
                    <div className="flex items-center gap-3 text-sm">
                      <Mail size={16} className="flex-shrink-0" />
                      <span>yogeshrayudu5556@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-16" style={{ background: '#FFF7ED' }}>
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Camera size={28} style={{ color: '#FF6B35' }} />
              <h2 className="text-3xl font-bold text-gray-800">మా ఫోటో గ్యాలరీ</h2>
            </div>
            <p className="text-gray-500">మేం అమలు చేసిన అద్భుతమైన కార్యక్రమాల కొన్ని సందర్భాలు</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {event.gallery.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="relative overflow-hidden rounded-xl cursor-pointer group"
                style={{ aspectRatio: '1 / 1' }}
                onClick={() => window.open(img, '_blank')}
              >
                <img
                  src={img}
                  alt={`గ్యాలరీ ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium">పూర్తి సైజ్ చూడండి</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .container-custom {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .loader {
          width: 48px;
          height: 48px;
          border: 4px solid #e2e8f0;
          border-top: 4px solid #FF6B35;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .btn-primary {
          background: linear-gradient(135deg, #FF6B35, #2D1B4E);
          color: white;
          padding: 12px 24px;
          border-radius: 9999px;
          font-weight: 600;
          transition: all 0.3s;
        }
        .btn-primary:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 24px rgba(255,107,53,0.3);
        }
      `}</style>
    </>
  );
};

export default Services;