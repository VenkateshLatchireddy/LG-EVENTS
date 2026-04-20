export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  gallery?: string[];
  category: EventCategory;
  guests: number;
  duration: string;
  price?: number;
  features: string[];
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  duration: string;
  features: string[];
  images: string[];
  category: ServiceCategory;
  popular: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  avatar: string;
  eventType: string;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  social: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  expertise: string[];
}

export interface GalleryImage {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  eventId?: string;
  date: string;
  width: number;
  height: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: number;
  budget: string;
  message: string;
  newsletter: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  readTime: number;
}

export type EventCategory = 'wedding' | 'corporate' | 'birthday' | 'anniversary' | 'conference' | 'party' | 'charity';
export type ServiceCategory = 'planning' | 'decoration' | 'catering' | 'entertainment' | 'photography' | 'venue' | 'transport';

export interface NavLink {
  path: string;
  name: string;
  icon?: React.ReactNode;
  submenu?: NavLink[];
}

export interface Statistic {
  number: string;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year' | 'one-time';
  features: string[];
  recommended?: boolean;
  buttonText: string;
}