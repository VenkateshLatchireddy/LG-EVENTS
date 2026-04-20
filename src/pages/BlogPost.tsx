import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

// React Icons Imports
import { 
  FaCalendarAlt, 
  FaUser, 
  FaClock, 
  FaHeart, 
  FaCommentDots, 
  FaShareAlt,
  FaArrowLeft,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaLink,
  FaChevronRight
} from 'react-icons/fa';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  authorBio: string;
  date: string;
  readTime: number;
  image: string;
  category: string;
  tags: string[];
  likes: number;
  comments: { name: string; comment: string; date: string }[];
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [liked, setLiked] = useState<boolean>(false);
  const [commentName, setCommentName] = useState<string>('');
  const [commentText, setCommentText] = useState<string>('');

  useEffect(() => {
    setTimeout(() => {
      const postData: BlogPost = {
        id: id || '1',
        title: '10 Wedding Planning Tips for 2025',
        content: `...`, // (your long content remains unchanged)
        author: 'Sarah Johnson',
        authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        authorBio: 'Sarah is our Creative Director with over 15 years of experience in wedding planning. She has planned over 200 weddings and loves helping couples create their dream day.',
        date: 'December 1, 2024',
        readTime: 8,
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200',
        category: 'Wedding Tips',
        tags: ['Wedding', 'Planning', 'Tips', '2025 Trends'],
        likes: 234,
        comments: [
          { name: 'Emily Watson', comment: 'These tips are so helpful! Thank you for sharing.', date: 'December 2, 2024' },
          { name: 'Jessica Miller', comment: 'Starting my planning now and this gives me confidence!', date: 'December 3, 2024' }
        ]
      };
      setPost(postData);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentName && commentText && post) {
      const newComment = {
        name: commentName,
        comment: commentText,
        date: new Date().toLocaleDateString()
      };
      setPost({
        ...post,
        comments: [newComment, ...post.comments]
      });
      setCommentName('');
      setCommentText('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
          <Link to="/blog" className="btn-primary">Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Lakshmi Ganapathi Events Blog</title>
        <meta name="description" content={post.content.substring(0, 160)} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
        </div>
        <div className="relative h-full flex items-end pb-16">
          <div className="container-custom">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <button
                onClick={() => navigate('/blog')}
                className="inline-flex items-center gap-2 text-white mb-6 hover:text-primary transition-colors"
              >
                <FaArrowLeft size={20} />
                Back to Blog
              </button>

              <div className="flex flex-wrap gap-4 text-white mb-6">
                <span className="bg-primary px-4 py-1.5 rounded-full text-sm font-medium">{post.category}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-5xl leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <FaUser size={18} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt size={18} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock size={18} />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="prose prose-lg max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-full text-sm transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Author Bio */}
              <div className="bg-gray-50 rounded-2xl p-8 mt-12 flex gap-6">
                <img src={post.authorAvatar} alt={post.author} className="w-20 h-20 rounded-full object-cover flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-xl mb-2">{post.author}</h3>
                  <p className="text-gray-600 leading-relaxed">{post.authorBio}</p>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-16">
                <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                  <FaCommentDots size={28} className="text-primary" />
                  Comments ({post.comments.length})
                </h3>

                {/* Comment Form */}
                <form onSubmit={handleComment} className="bg-white border border-gray-200 rounded-2xl p-8 mb-10 shadow-sm">
                  <h4 className="font-semibold text-lg mb-6">Leave a Comment</h4>
                  <div className="space-y-5">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                      required
                    />
                    <textarea
                      rows={5}
                      placeholder="Share your thoughts..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                      required
                    />
                    <button type="submit" className="btn-primary px-8 py-3 text-base">
                      Post Comment
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-8">
                  {post.comments.map((comment, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6">
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-semibold text-lg">{comment.name}</span>
                        <span className="text-sm text-gray-500">{comment.date}</span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{comment.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="sticky top-24 space-y-8">
                
                {/* Share Buttons */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-5">Share This Post</h3>
                  <div className="grid grid-cols-4 gap-3">
                    <button className="aspect-square bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center">
                      <FaFacebookF size={22} />
                    </button>
                    <button className="aspect-square bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-all flex items-center justify-center">
                      <FaTwitter size={22} />
                    </button>
                    <button className="aspect-square bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition-all flex items-center justify-center">
                      <FaLinkedinIn size={22} />
                    </button>
                    <button onClick={handleShare} className="aspect-square bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition-all flex items-center justify-center">
                      <FaLink size={22} />
                    </button>
                  </div>
                </div>

                {/* Like Button */}
                <button
                  onClick={() => setLiked(!liked)}
                  className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-semibold text-lg transition-all ${
                    liked 
                      ? 'bg-red-50 text-red-600 border border-red-200' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <FaHeart size={24} className={liked ? 'fill-red-600' : ''} />
                  {liked ? 'Liked' : 'Like'} ({post.likes + (liked ? 1 : 0)})
                </button>

                {/* Related Posts */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold mb-5">Related Posts</h3>
                  <div className="space-y-6">
                    {[
                      { title: 'How to Plan a Successful Corporate Event', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200' },
                      { title: 'Top 5 Birthday Party Themes for 2025', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=200' }
                    ].map((related, idx) => (
                      <Link key={idx} to="/blog/2" className="group flex gap-4">
                        <img src={related.image} alt="" className="w-20 h-20 rounded-xl object-cover" />
                        <div className="flex-1">
                          <h4 className="font-semibold leading-tight group-hover:text-primary transition-colors line-clamp-3">
                            {related.title}
                          </h4>
                          <div className="flex items-center gap-1 text-primary mt-2 text-sm">
                            Read more <FaChevronRight size={14} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;