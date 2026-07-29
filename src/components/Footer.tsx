"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Heart,
  Award,
  Shield,
  Users,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import LGE_LOGO from "../assets/LGE.jpg";

interface SocialLink {
  icon: React.ElementType;
  href: string;
  color: string;
  name: string;
}

interface QuickLink {
  name: string;
  path: string;
}

interface FooterProps {
  year: number;
}

const Footer: React.FC<FooterProps> = ({ year }) => {
  const quickLinks: QuickLink[] = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "About Us", path: "/about" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const services: string[] = [
    "Wedding Planning",
    "Haldi Ceremony",
    "Birthday Parties",
    "Anniversary Celebrations",
    "Housewarming Ceremony",
    "Naming Ceremony",
    "Half Saree Ceremony",
  ];

  const socialLinks: SocialLink[] = [
    {
      icon: FaInstagram,
      href: "https://www.instagram.com/lg_events.rjy?igsh=NzVhajdmNW5hMGs=",
      color: "hover:text-pink-500",
      name: "Instagram",
    },
    {
      icon: FaYoutube,
      href: "https://www.youtube.com/@lalampadma-hj5ip",
      color: "hover:text-red-500",
      name: "YouTube",
    },
    {
      icon: FaFacebook,
      href: "https://facebook.com",
      color: "hover:text-blue-500",
      name: "Facebook",
    },
  ];

  // Animation Variants
  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }, // Add 'as const'
    },
  };

  return (
    <footer className="relative overflow-hidden bg-black pt-7 pb-20 text-white sm:pt-8 md:pb-16 lg:pt-8 lg:pb-6">
      {/* Soft Elegant Glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-16 left-20 w-[420px] h-[420px] bg-amber-500 rounded-full filter blur-[130px]"></div>
        <div className="absolute bottom-12 right-16 w-[380px] h-[380px] bg-yellow-600 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="container-custom relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <motion.div
          className="mb-5 grid grid-cols-1 gap-8 sm:grid-cols-2 md:mb-6 lg:grid-cols-4 lg:gap-10"
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div variants={itemVariant}>
            <div className="flex items-center gap-3 mb-5">
              <motion.div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 shadow-2xl"
                whileHover={{ rotate: 8, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={LGE_LOGO}
                  alt="Lakshmi Ganapathi Events"
                  className="w-full h-full object-cover rounded-2xl"
                  sizes="56px"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </motion.div>

              <div className="leading-none">
                <div className="text-2xl font-bold tracking-wider text-amber-300 font-playfair">
                  LAKSHMI GANAPATHI
                </div>
                <div className="text-[11px] font-semibold tracking-[3.5px] text-amber-500 mt-1">
                  EVENTS
                </div>
              </div>
            </div>

            <p className="text-gray-300 text-[15px] leading-relaxed mb-7">
              Rajahmundry's premier event management company, delivering
              <span className="text-amber-400 font-medium"> excellence</span> in
              every celebration. Trusted by families across the Godavari
              district for
              <span className="text-yellow-300">✨ memorable weddings</span>,
              <span className="text-yellow-300"> 🎊 ceremonies</span>, and
              <span className="text-yellow-300"> 🎂 birthday events</span>.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariant}>
            <h3 className="text-lg font-semibold mb-5 text-amber-400 tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.path}
                  variants={itemVariant}
                  transition={{ delay: index * 0.03 }}
                >
                  <Link
                    href={link.path}
                    className="group flex items-center gap-2 text-gray-300 hover:text-amber-400 transition-all duration-300 text-[15px]"
                  >
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Our Services */}
          <motion.div variants={itemVariant}>
            <h3 className="text-lg font-semibold mb-5 text-amber-400 tracking-wide">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li
                  key={index}
                  className="text-gray-300 text-[15px] flex items-center gap-2 group"
                  variants={itemVariant}
                  transition={{ delay: index * 0.04 }}
                >
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full group-hover:scale-125 transition-transform" />
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Get In Touch */}
          <motion.div variants={itemVariant}>
            <h3 className="text-lg font-semibold mb-5 text-amber-400 tracking-wide">
              Get In Touch
            </h3>
            <div className="space-y-5 text-sm">
              <motion.div
                className="flex items-start gap-3"
                variants={itemVariant}
              >
                <MapPin
                  size={19}
                  className="text-amber-400 mt-1 flex-shrink-0"
                />
                <span className="text-gray-300">
                  Rajahmundry, Andhra Pradesh
                </span>
              </motion.div>

              <motion.div
                className="flex items-start gap-3"
                variants={itemVariant}
              >
                <Phone
                  size={19}
                  className="text-amber-400 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-gray-300">+91 95422 56678</p>
                  <p className="text-gray-500 text-xs">24/7 Support</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3"
                variants={itemVariant}
              >
                <Mail size={19} className="text-amber-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 break-all">
                    yogeshrayudu5556@gmail.com
                  </p>
                  <p className="text-gray-500 text-xs">
                    lakshmiganapathievents@gmail.com
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start gap-3"
                variants={itemVariant}
              >
                <Clock
                  size={19}
                  className="text-amber-400 mt-1 flex-shrink-0"
                />
                <div>
                  <p className="text-gray-300">Mon - Sun: 9AM - 8PM</p>
                  <p className="text-gray-500 text-xs">Emergency: 24/7</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="mt-4 flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className={`rounded-xl bg-zinc-900 p-3 transition-all duration-300 hover:bg-zinc-800 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          className="border-t border-zinc-900 py-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm">
            <div className="flex items-center gap-2 text-gray-400 hover:text-amber-300 transition-colors">
              <Shield size={18} className="text-amber-400" />
              Secure Payments
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-amber-300 transition-colors">
              <Award size={18} className="text-amber-400" />
              Best Event Planner 2025 - Rajahmundry
            </div>
            <div className="flex items-center gap-2 text-gray-400 hover:text-amber-300 transition-colors">
              <Users size={18} className="text-amber-400" />
              5000+ Happy Clients
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-900 pt-4 text-center">
          <p className="text-gray-500 text-sm">
            © {year} Lakshmi Ganapathi Events. All rights reserved. Made with{" "}
            <Heart size={14} className="inline text-red-500" /> by Lakshmi
            Ganapathi Events Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
