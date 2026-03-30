import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Megaphone, Pin } from 'lucide-react';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import { getUpdates } from '../utils/storage';

const UpdatesPage = () => {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadUpdates();
  }, []);

  const loadUpdates = async () => {
    setLoading(true);
    const data = await getUpdates();
    setUpdates(data);
    setLoading(false);
  };

  const filteredUpdates = updates.filter(u => filter === 'all' || u.category === filter);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const categoryColors = {
    Workshop: 'bg-purple-100 text-purple-700',
    Publication: 'bg-blue-100 text-blue-700',
    Project: 'bg-green-100 text-green-700',
    General: 'bg-gray-100 text-gray-700',
  };

  const categories = ['all', 'Workshop', 'Publication', 'Project', 'General'];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-primary hero-pattern">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Latest Updates
            </h1>
            <p className="text-xl text-gray-300">
              News, announcements, and what's new
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  filter === cat ? 'bg-accent text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {!loading && filteredUpdates.length > 0 ? (
            <div className="space-y-4">
              {filteredUpdates.map((update, index) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {update.pinned && <Pin className="w-4 h-4 text-gold" />}
                        <span className={`inline-block px-3 py-1 rounded-full text-xs ${categoryColors[update.category] || categoryColors.General}`}>
                          {update.category || 'General'}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-primary mb-2">{update.title}</h3>
                      <p className="text-gray-600 mb-3">{update.body}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {formatDate(update.created_at)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : !loading ? (
            <div className="text-center py-16">
              <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No updates yet</p>
            </div>
          ) : (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UpdatesPage;