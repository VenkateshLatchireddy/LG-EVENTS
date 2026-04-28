import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Award, 

  Calendar, 
  Heart, 
  Target, 
  Eye, 
  TrendingUp,
  ArrowRight,
  Star,
  Quote,
  Trophy,
  Sparkles
} from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  expertise: string[];
}

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const About: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Yogesh Rayudu',
      position: 'Event Organizer',
      bio: 'With over 05 years of experience in event planning, Yogesh Rayudu has orchestrated some of the most prestigious events in Rajahmundry. His creative vision and attention to detail have made Lakshmi Ganapathi Events a household name.',
      image: 'https://res.cloudinary.com/dqgjdxwgw/image/upload/v1777040462/C9aHd-8PyPF_WEBP_va596o.jpg',
      social: {
        facebook: '#',
        instagram: 'https://www.instagram.com/_ammadi_rayudu_?igsh=a2Izc24ybmdubGVw',
        linkedin: '#'
      },
      expertise: ['Creative Planning', 'Wedding Planning', 'Event Design' , 'Flower Decoration']
    },
  ];

  const milestones: Milestone[] = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Lakshmi Ganapathi Events was established in Rajahmundry with a vision to create unforgettable celebrations',
      icon: Calendar
    },
    {
      year: '2021',
      title: 'First Major Award',
      description: 'Received "Best Event Planner in Rajahmundry" award from local industry association',
      icon: Award
    },
    {
      year: '2022',
      title: 'City\'s Most Trusted',
      description: 'We grew to become the most trusted event management company in Rajahmundry city',
      icon: TrendingUp
    },
    {
      year: '2023',
      title: '500th Event',
      description: 'Celebrated our 500th successful event milestone with families across Godavari district',
      icon: Trophy
    },
    {
      year: '2024',
      title: 'Excellence Award',
      description: 'Recognized as "Best Event Planning Service" by Rajahmundry Business Excellence Awards',
      icon: Star
    },
    {
      year: '2025',
      title: 'Community Leaders',
      description: 'Honored as top event planners in East Godavari district for outstanding service',
      icon: Heart
    }
  ];

  const coreValues = [
    {
      title: 'Excellence',
      description: 'We strive for perfection in every event we plan',
      icon: Award
    },
    {
      title: 'Creativity',
      description: 'Innovative solutions for unique event experiences',
      icon: Eye
    },
    {
      title: 'Integrity',
      description: 'Honest and transparent business practices',
      icon: Target
    },
    {
      title: 'Client First',
      description: 'Your satisfaction is our top priority',
      icon: Heart
    }
  ];

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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
        <title>About Us - Lakshmi Ganapathi Events | Rajahmundry's Premier Event Planners</title>
        <meta name="description" content="Learn about Lakshmi Ganapathi Events - Rajahmundry's most trusted event management company. Creating unforgettable celebrations since 2015 with 500+ successful events." />
        <meta name="keywords" content="about event planner, event management company, Rajahmundry events" />
      </Helmet>

      {/* Hero Section - Left Aligned */}
      <section className="relative overflow-hidden pt-24 pb-12 min-h-[420px] lg:min-h-[50vh]">
        <div className="absolute inset-0">
          <img 
            src="https://res.cloudinary.com/dqgjdxwgw/image/upload/v1776605372/Aboutbdhdhdhdcg.jpg"
            alt="About Us Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
        </div>
        <div className="relative min-h-[420px] lg:min-h-[50vh] flex items-center px-4 sm:px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-3xl text-left"
          >
            <div className="inline-flex items-center gap-2 bg-primary/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4">
              <Sparkles size={14} className="text-primary" />
              <span className="text-primary text-xs font-semibold tracking-wide">OUR STORY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              About
              <span className="block text-primary">Lakshmi Ganapathi Events</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-xl">
              We're passionate about creating extraordinary events that leave lasting impressions.
              With over a decade of experience, we've mastered the art of celebration in Rajahmundry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section - Compact */}
      <section className="py-12 md:py-16">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
            >
              <span className="text-primary font-semibold text-sm">Our Story</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2 mb-4">
                Crafting Unforgettable 
                <span className="text-primary"> Experiences</span> Since 2020
              </h2>
              <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                <p>
                  Lakshmi Ganapathi Events was born in Rajahmundry with a simple idea: every event deserves to be extraordinary. 
                  What started as a small team of passionate planners has grown into the most trusted event management company in the city.
                </p>
                <p>
                  Over the past 10 years, we've had the privilege of planning over 500 events, from intimate gatherings to grand celebrations. 
                  Each event has taught us something new and helped us refine our craft.
                </p>
                <p>
                  Today, we're proud to be recognized as leaders in creative event planning across Godavari district, 
                  known for our attention to detail, innovative concepts, and unwavering commitment to client satisfaction.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all inline-flex items-center gap-2">
                  Work With Us
                  <ArrowRight size={16} />
                </Link>
                <Link to="/events" className="border-2 border-primary text-primary px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary hover:text-white transition-all inline-flex items-center gap-2">
                  View Our Work
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <img
                    src="https://res.cloudinary.com/dqgjdxwgw/image/upload/q_auto/f_auto/v1776605800/LGEbdhdbhjfhn.png"
                    alt="Event Planning"
                    className="rounded-xl shadow-lg w-full h-48 object-cover"
                  />
                  <img
                    src="https://res.cloudinary.com/dqgjdxwgw/image/upload/q_auto/f_auto/v1776606355/file_0000000021f4720b81ca6d600c4db2ab_ymfjlj.png"
                    alt="Event Decoration"
                    className="rounded-xl shadow-lg w-full h-36 object-cover"
                  />
                </div>
                <div className="space-y-3 mt-6">
                  <img
                    src="https://res.cloudinary.com/dqgjdxwgw/image/upload/q_auto/f_auto/v1776606793/1776606678634_mdzxua.png"
                    alt="Event Celebration"
                    className="rounded-xl shadow-lg w-full h-36 object-cover"
                  />
                  <img
                    src="https://res.cloudinary.com/dqgjdxwgw/image/upload/q_auto/f_auto/v1776606798/file_00000000bdc8720b8df4f64260cc85b3_hexpoc.png"
                    alt="Event Music"
                    className="rounded-xl shadow-lg w-full h-48 object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Compact */}
      <section className="py-10 bg-light">
        <div className="container-custom px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="bg-white rounded-xl p-5 shadow-md text-center group hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-colors">
                <Target className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Our Mission</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To create extraordinary event experiences that exceed expectations, 
                bring people together, and leave lasting memories in every celebration.
              </p>
            </motion.div>
            
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUpVariant}
              className="bg-white rounded-xl p-5 shadow-md text-center group hover:shadow-lg transition-all"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary transition-colors">
                <Eye className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold mb-2">Our Vision</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                To be Rajahmundry's most trusted and innovative event management company, 
                setting new standards for creativity and client satisfaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values - Compact */}
      <section className="py-12">
        <div className="container-custom px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-8"
          >
            <span className="text-primary font-semibold text-sm">What Drives Us</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1">Our Core <span className="text-primary">Values</span></h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                whileHover={{ y: -5 }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-base font-bold mb-1">{value.title}</h3>
                <p className="text-gray-500 text-xs">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Timeline - Compact */}
      <section className="py-10 bg-light">
        <div className="container-custom px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-8"
          >
            <span className="text-primary font-semibold text-sm">Our Journey</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1">Key <span className="text-primary">Milestones</span></h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                whileHover={{ y: -3 }}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <milestone.icon className="text-white" size={18} />
                  </div>
                  <span className="text-primary font-bold text-xl">{milestone.year}</span>
                </div>
                <h3 className="font-bold text-base mb-1">{milestone.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Compact, 3 Members Only */}
      <section className="py-12">
        <div className="container-custom px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-8"
          >
            <span className="text-primary font-semibold text-sm">Meet The Team</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-1">Our <span className="text-primary">Experts</span></h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
              Passionate professionals dedicated to making your event perfect
            </p>
          </motion.div>

          <motion.div
            variants={staggerVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={fadeUpVariant}
                whileHover={{ y: -5 }}
                className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all"
                onClick={() => setSelectedMember(member)}
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <p className="text-xs">Click to learn more</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-base font-bold mb-0.5">{member.name}</h3>
                  <p className="text-primary text-xs font-semibold mb-2">{member.position}</p>
                  <div className="flex justify-center gap-2">
                    {member.social.facebook && (
                      <a href={member.social.facebook} className="text-gray-400 hover:text-primary transition-colors">
                        <FaFacebook size={14} />
                      </a>
                    )}
                    {member.social.instagram && (
                      <a href={member.social.instagram} className="text-gray-400 hover:text-primary transition-colors">
                        <FaInstagram size={14} />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a href={member.social.linkedin} className="text-gray-400 hover:text-primary transition-colors">
                        <FaLinkedin size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => setSelectedMember(null)}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-md w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm p-1.5 rounded-full text-white hover:bg-primary transition-colors z-10 text-sm"
                >
                  ✕
                </button>
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-bold mb-1">{selectedMember.name}</h2>
                  <p className="text-primary font-semibold text-sm mb-3">{selectedMember.position}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{selectedMember.bio}</p>
                  
                  <div className="mb-4">
                    <h3 className="font-bold text-sm mb-2">Areas of Expertise</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedMember.expertise.map((exp, idx) => (
                        <span key={idx} className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs">
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {selectedMember.social.facebook && (
                      <a href={selectedMember.social.facebook} className="bg-gray-100 p-1.5 rounded-full hover:bg-primary hover:text-white transition-colors">
                        <FaFacebook size={14} />
                      </a>
                    )}
                    {selectedMember.social.instagram && (
                      <a href={selectedMember.social.instagram} className="bg-gray-100 p-1.5 rounded-full hover:bg-primary hover:text-white transition-colors">
                        <FaInstagram size={14} />
                      </a>
                    )}
                    {selectedMember.social.linkedin && (
                      <a href={selectedMember.social.linkedin} className="bg-gray-100 p-1.5 rounded-full hover:bg-primary hover:text-white transition-colors">
                        <FaLinkedin size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Testimonials Highlight - Compact */}
      <section className="py-10 bg-light">
        <div className="container-custom px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-bold">What Our <span className="text-primary">Clients Say</span></h2>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Rahul Kumar', role: 'Wedding Client', text: 'Lakshmi Ganapathi Events made our dream wedding a reality! Every detail was perfect.' },
              { name: 'Sridevi', role: 'Haldi Ceremony', text: 'The haldi ceremony was beautifully organized with vibrant decor and joyful ambiance.' },
              { name: 'Ajay Kumar', role: 'Housewarming', text: 'The most professional event team I have ever worked with in Rajahmundry.' }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUpVariant}
                className="bg-white rounded-xl p-4 shadow-md"
              >
                <Quote className="text-primary mb-2" size={24} />
                <p className="text-gray-600 text-sm mb-3 italic">"{testimonial.text}"</p>
                <p className="font-bold text-sm">{testimonial.name}</p>
                <p className="text-xs text-gray-500">{testimonial.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      <section className="py-10">
        <div className="container-custom px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUpVariant}
            className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-center text-white"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-2">Ready to Create Something Amazing?</h2>
            <p className="text-sm mb-4 opacity-90">
              Let's work together to make your next event extraordinary
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary px-5 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-all">
              Start Your Journey
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default About;