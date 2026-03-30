import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Tag } from 'lucide-react';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import { getBlogPosts } from '../utils/storage';

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    setLoading(true);
    try {
      const posts = await getBlogPosts();
      const foundPost = posts.find(p => p.id === id);
      if (foundPost) {
        setPost(foundPost);
      } else {
        setNotFound(true);
      }
    } catch (error) {
      console.error('Error loading post:', error);
      setNotFound(true);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-16 bg-primary hero-pattern">
          <div className="container-custom">
            <Link to="/blog" className="inline-flex items-center gap-2 text-accent hover:text-accent-light">
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="container-custom text-center py-16">
            <h2 className="text-2xl font-bold text-primary mb-4">Post Not Found</h2>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-light">
              View All Posts
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary hero-pattern">
        <div className="container-custom">
          <Link to="/blog" className="inline-flex items-center gap-2 text-accent hover:text-accent-light mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-3xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                {post.category}
              </span>
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                {formatDate(post.created_at)}
              </span>
            </div>

            <h1 className="text-4xl font-display font-bold text-primary mb-6">
              {post.title}
            </h1>

            {post.summary && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {post.summary}
              </p>
            )}

            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />

            {post.tags && (
              <div className="flex items-center gap-2 mt-8 pt-8 border-t border-gray-200">
                <Tag className="w-4 h-4 text-gray-500" />
                <div className="flex flex-wrap gap-2">
                  {post.tags.split(',').map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                      {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPostPage;