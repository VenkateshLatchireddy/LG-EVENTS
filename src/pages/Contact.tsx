import React, { useState, useRef,  } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// React Icons Imports
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaCheckCircle,
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaArrowRight,
  FaUsers,
  FaCommentDots,
  FaStar,
  FaQuoteLeft,
  FaBirthdayCake,
  FaRing,
  FaChalkboard,
  FaGift,
  FaTrophy
} from 'react-icons/fa';

import { 
  MdErrorOutline,
  MdCalendarToday,
  MdEvent,
  MdLocalOffer,
  MdBusinessCenter,
} from 'react-icons/md';

interface FormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: number;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  message?: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guests: 50,
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string>('');
  const [submitError, ] = useState<string>('');
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const eventTypes = [
    { value: 'Wedding', label: 'Wedding', icon: FaRing, color: 'from-pink-500 to-rose-500' },
    { value: 'Reception', label: 'Reception', icon: MdBusinessCenter, color: 'from-blue-500 to-indigo-500' },
    { value: 'Birthday Party', label: 'Birthday Party', icon: FaBirthdayCake, color: 'from-purple-500 to-pink-500' },
    { value: 'Anniversary/Retirement', label: 'Anniversary/Retirement', icon: FaGift, color: 'from-red-500 to-orange-500' },
    { value: 'Naming Ceremony', label: 'Naming Ceremony', icon: FaChalkboard, color: 'from-cyan-500 to-blue-500' },
    { value: 'Half Sree Ceremony', label: 'Half Saree Ceremony', icon: MdLocalOffer, color: 'from-green-500 to-emerald-500' },
    { value: 'Haldi Ceremony', label: 'Haldi Ceremony', icon: FaTrophy, color: 'from-yellow-500 to-amber-500' },
    { value: 'Other', label: 'Other', icon: MdEvent, color: 'from-gray-500 to-gray-700' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!formData.eventType) newErrors.eventType = 'Please select an event type';
    if (!formData.eventDate) newErrors.eventDate = 'Please select an event date';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatWhatsAppMessage = () => {
    const message = `*LAKSHMI GANAPATHI EVENTS - New Inquiry*%0A%0A
*📋 EVENT DETAILS*%0A
━━━━━━━━━━━━━━━━━━━━%0A
*Name:* ${formData.name}%0A
*Phone:* ${formData.phone}%0A
*Email:* ${formData.email || 'Not provided'}%0A
*Event Type:* ${formData.eventType}%0A
*Event Date:* ${formData.eventDate}%0A
*Expected Guests:* ${formData.guests}+%0A
*Message:* ${formData.message}%0A%0A
━━━━━━━━━━━━━━━━━━━━%0A
*Ready to plan an amazing event!*`;
    
    return message;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const message = formatWhatsAppMessage();
    const phoneNumber = '918142244668';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      window.open(whatsappUrl, '_blank');
      
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          eventType: '',
          eventDate: '',
          guests: 50,
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'range' ? parseInt(value) : value
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const contactInfo = [
    { 
      icon: FaMapMarkerAlt, 
      title: 'Visit Us', 
      details: ['New Street', 'Rajahmundry', 'Andhra Pradesh'],
      color: 'text-red-500'
    },
    { 
      icon: FaPhone, 
      title: 'Call Us', 
      details: ['+91 81422 46688'],
      action: '+918142246688',
      color: 'text-green-500'
    },
    { 
      icon: FaEnvelope, 
      title: 'Email Us', 
      details: ['LakshmiGanapathiEvents@gmail.com'],
      action: 'mailto:LakshmiGanapathiEvents@gmail.com',
      color: 'text-blue-500'
    },
    { 
      icon: FaClock, 
      title: 'Working Hours', 
      details: ['Monday - Friday: 9AM - 8PM', 'Saturday: 10AM - 6PM', 'Sunday: By Appointment'],
      color: 'text-purple-500'
    }
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: 'https://facebook.com', color: 'hover:bg-blue-600', label: 'Facebook' },
    { icon: FaInstagram, href: 'https://instagram.com', color: 'hover:bg-pink-600', label: 'Instagram' },
    { icon: FaWhatsapp, href: 'https://wa.me/918142244688', color: 'hover:bg-green-600', label: 'WhatsApp' }
  ];

  // Animation variants with proper TypeScript typing
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Lakshmi Ganapathi Events | Let's Plan Your Dream Event</title>
        <meta name="description" content="Get in touch with our event planning experts. Free consultation, customized quotes, and professional advice for your next event." />
        <meta name="keywords" content="contact event planner, event consultation, book event planner" />
      </Helmet>

      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[45vh] min-h-[350px] overflow-hidden pt-24">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        >
          <img 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        </motion.div>
        <div className="relative h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl text-left"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-4"
            >
              <span className="bg-primary/20 backdrop-blur-sm rounded-full px-4 py-2 text-primary font-semibold text-sm">
                Let's Connect
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Let's Start Your <span className="text-primary">Journey</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl">
              Ready to create an unforgettable event? Contact us today for a free consultation 
              and let our experts bring your vision to life.
            </p>
          </motion.div>
        </div>
        
        {/* Animated Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white" ref={sectionRef}>
        <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Contact Form */}
            <motion.div
              variants={fadeUpVariant}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-primary to-secondary px-8 py-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Send Us a Message</h2>
                <p className="text-white/90">Fill out the form and we'll get back to you within 24 hours</p>
              </div>
              
              <div className="p-8">
                {showSuccess ? (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-2xl p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <FaCheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">Message Sent!</h3>
                    <p className="text-green-600">Redirecting to WhatsApp...</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field - Required */}
                    <motion.div variants={fadeUpVariant}>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'transform scale-[1.02]' : ''}`}>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField('')}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            errors.name 
                              ? 'border-red-500 bg-red-50' 
                              : focusedField === 'name' 
                                ? 'border-primary shadow-lg' 
                                : 'border-gray-200 hover:border-primary/50'
                          }`}
                          placeholder="Enter your full name"
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-red-500 text-xs mt-1 flex items-center gap-1"
                          >
                            <MdErrorOutline size={12} /> {errors.name}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>

                    {/* Phone Field - Required */}
                    <motion.div variants={fadeUpVariant}>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className={`relative transition-all duration-300 ${focusedField === 'phone' ? 'transform scale-[1.02]' : ''}`}>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField('')}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            errors.phone 
                              ? 'border-red-500 bg-red-50' 
                              : focusedField === 'phone' 
                                ? 'border-primary shadow-lg' 
                                : 'border-gray-200 hover:border-primary/50'
                          }`}
                          placeholder="8142244668"
                        />
                        {errors.phone && (
                          <motion.p
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-red-500 text-xs mt-1 flex items-center gap-1"
                          >
                            <MdErrorOutline size={12} /> {errors.phone}
                          </motion.p>
                        )}
                      </div>
                    </motion.div>

                    {/* Email Field - Optional */}
                    <motion.div variants={fadeUpVariant}>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Email Address <span className="text-gray-400 text-xs">(Optional)</span>
                      </label>
                      <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'transform scale-[1.02]' : ''}`}>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField('')}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            focusedField === 'email' 
                              ? 'border-primary shadow-lg' 
                              : 'border-gray-200 hover:border-primary/50'
                          }`}
                          placeholder="your@email.com"
                        />
                      </div>
                    </motion.div>

                    {/* Event Type - Required with Cards */}
                    <motion.div variants={fadeUpVariant}>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Event Type <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {eventTypes.map((event) => (
                          <motion.button
                            key={event.value}
                            type="button"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setFormData(prev => ({ ...prev, eventType: event.value }));
                              if (errors.eventType) setErrors(prev => ({ ...prev, eventType: undefined }));
                            }}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 flex items-center gap-2 ${
                              formData.eventType === event.value
                                ? `bg-gradient-to-r ${event.color} border-transparent text-white shadow-lg`
                                : 'border-gray-200 hover:border-primary/50 bg-white'
                            }`}
                          >
                            <event.icon size={18} />
                            <span className="text-sm font-medium">{event.label}</span>
                          </motion.button>
                        ))}
                      </div>
                      {errors.eventType && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-red-500 text-xs mt-1 flex items-center gap-1"
                        >
                          <MdErrorOutline size={12} /> {errors.eventType}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Event Date */}
                    <motion.div variants={fadeUpVariant}>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Event Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 ${
                            errors.eventDate 
                              ? 'border-red-500 bg-red-50' 
                              : 'border-gray-200 hover:border-primary/50 focus:border-primary focus:shadow-lg'
                          }`}
                          min={new Date().toISOString().split('T')[0]}
                        />
                        <MdCalendarToday className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                      {errors.eventDate && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-red-500 text-xs mt-1 flex items-center gap-1"
                        >
                          <MdErrorOutline size={12} /> {errors.eventDate}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Expected Guests */}
                    <motion.div variants={fadeUpVariant}>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Expected Guests
                      </label>
                      <div className="flex items-center gap-4">
                        <FaUsers size={24} className="text-primary" />
                        <input
                          type="range"
                          name="guests"
                          min="10"
                          max="1000"
                          step="10"
                          value={formData.guests}
                          onChange={handleChange}
                          className="flex-1 h-2 rounded-lg appearance-none cursor-pointer bg-gradient-to-r from-primary to-secondary"
                        />
                        <motion.span 
                          key={formData.guests}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="font-bold text-primary text-lg min-w-[60px] text-center"
                        >
                          {formData.guests}+
                        </motion.span>
                      </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div variants={fadeUpVariant}>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'transform scale-[1.02]' : ''}`}>
                        <textarea
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField('')}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-300 resize-none ${
                            errors.message 
                              ? 'border-red-500 bg-red-50' 
                              : focusedField === 'message' 
                                ? 'border-primary shadow-lg' 
                                : 'border-gray-200 hover:border-primary/50'
                          }`}
                          placeholder="Tell us about your event vision, requirements, and any special requests..."
                        />
                        <FaCommentDots className="absolute right-4 bottom-4 text-gray-300" size={20} />
                      </div>
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-red-500 text-xs mt-1 flex items-center gap-1"
                        >
                          <MdErrorOutline size={12} /> {errors.message}
                        </motion.p>
                      )}
                    </motion.div>
                    
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-50 border border-red-500 rounded-xl p-4 text-red-700"
                      >
                        {submitError}
                      </motion.div>
                    )}
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          ></motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send via WhatsApp
                          <FaWhatsapp size={20} />
                        </>
                      )}
                    </motion.button>
                    
                    <p className="text-xs text-gray-500 text-center mt-4">
                      By submitting, you'll be redirected to WhatsApp to send your inquiry
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
            
            {/* Contact Information */}
            <motion.div
              variants={staggerContainer}
              className="space-y-6"
            >
              {/* Quick Contact Card */}
              <motion.div
                variants={fadeUpVariant}
                className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-white relative overflow-hidden group"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"
                />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">Quick Response</h3>
                  <p className="mb-6 opacity-90">
                    Get a free consultation within 30 minutes during business hours
                  </p>
                  <div className="flex gap-4 items-center">
                    <FaWhatsapp size={32} />
                    <div>
                      <p className="font-semibold">WhatsApp Us</p>
                      <p className="text-sm opacity-90">+91 81422 46688</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Contact Info Cards */}
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={fadeUpVariant}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                    >
                      <info.icon className={`text-primary ${info.color}`} size={28} />
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-gray-800">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-600 text-sm mb-1">{detail}</p>
                      ))}
                      {info.action && (
                        <motion.a
                          href={info.title === 'Call Us' ? `tel:${info.action}` : info.action}
                          whileHover={{ x: 5 }}
                          className="inline-flex items-center gap-2 text-primary font-semibold text-sm mt-2"
                        >
                          {info.title === 'Call Us' ? 'Call Now' : 'Send Email'}
                          <FaArrowRight size={12} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Social Media */}
              <motion.div
                variants={fadeUpVariant}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-800">Connect With Us</h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center ${social.color} transition-all duration-300 hover:text-white text-gray-600`}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
              
              {/* Google Map */}
              <motion.div
                variants={fadeUpVariant}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d61183.16738981602!2d81.74239848888062!3d17.000378036214588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37a6b0c266f56b%3A0x6e8e58f0d55e810!2sRajahmundry%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1713175811654!5m2!1sen!2sin" 
                  width="100%" 
                  height="250"  
                  style={{ border: 0 }} 
                  allowFullScreen
                  loading="lazy" 
                  title="Lakshmi Ganapathi Events Location"
                  className="w-full"
                ></iframe>
              </motion.div>

              {/* Testimonial Card */}
              <motion.div
                variants={fadeUpVariant}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 relative overflow-hidden"
              >
                <FaQuoteLeft className="absolute -right-4 -top-4 text-purple-200" size={60} />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">
                    "They made our wedding absolutely perfect! Every detail was handled with care and professionalism."
                  </p>
                  <p className="font-bold text-gray-800">- Priya & Rajesh</p>
                  <p className="text-sm text-gray-500">Wedding Client</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Contact;