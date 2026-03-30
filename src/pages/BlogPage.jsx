import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import { getBlogPosts } from '../utils/storage';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const loadedPosts = await getBlogPosts();
    const publishedPosts = loadedPosts.filter(p => p.published);
    setPosts(publishedPosts.length > 0 ? publishedPosts : getDefaultPosts());
    setLoading(false);
  };

  const getDefaultPosts = () => [
    {
      id: '1',
      title: 'The Future of AI in Surgical Practice',
      category: 'AI',
      summary: 'Exploring how artificial intelligence is transforming surgical decision-making and patient outcomes.',
      body: 'Artificial intelligence is revolutionizing surgical practice...',
      created_at: '2024-03-15',
      tags: 'ai, surgery, innovation',
    },
    {
      id: '2',
      title: 'Advances in Laparoscopic Surgery',
      category: 'Surgery',
      summary: 'New techniques and technologies in minimally invasive surgery are improving patient recovery times.',
      body: 'Laparoscopic surgery has come a long way...',
      created_at: '2024-02-28',
      tags: 'laparoscopy, surgery, minimally invasive',
    },
    {
      id: '3',
      title: 'Medical Education in the Digital Age',
      category: 'Medical Education',
      summary: 'How technology is reshaping how we teach and train the next generation of surgeons.',
      body: 'Digital transformation in medical education...',
      created_at: '2024-01-15',
      tags: 'education, digital, training',
    },
    {
      id: '4',
      title: 'Reflections on 15 Years of Surgical Practice',
      category: 'Reflections',
      summary: 'Lessons learned and insights gained from over a decade in surgical practice.',
      body: 'Looking back at my journey in surgery...',
      created_at: '2023-12-10',
      tags: 'reflections, career, surgery',
    },
  ];

  const categories = ['all', 'Surgery', 'AI', 'Medical Education', 'Reflections'];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || post.category === filter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary hero-pattern">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Blog & Insights
            </h1>
            <p className="text-xl text-gray-300">
              Thoughts on surgery, medical education, and AI in healthcare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent bg-white"
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    filter === category
                      ? 'bg-accent text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          {!loading && filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-primary mb-3">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.summary}
                    </p>
                    
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-medium"
                    >
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : !loading ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No posts found matching your criteria.</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Newsletter */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-display font-bold text-primary mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-6">
              Subscribe to get notified about new articles and insights.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
              />
              <button className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPage;