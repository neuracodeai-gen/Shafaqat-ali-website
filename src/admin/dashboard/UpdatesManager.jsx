import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Pin, Calendar, Megaphone } from 'lucide-react';
import { getUpdates, deleteUpdate, saveUpdate } from '../../utils/storage';

const UpdatesManager = () => {
  const [updates, setUpdates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUpdates();
  }, []);

  const loadUpdates = async () => {
    setLoading(true);
    const loadedUpdates = await getUpdates();
    setUpdates(loadedUpdates);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this update?')) {
      await deleteUpdate(id);
      loadUpdates();
    }
  };

  const handleTogglePin = async (update) => {
    const updatedUpdate = { ...update, pinned: !update.pinned };
    await saveUpdate(updatedUpdate);
    loadUpdates();
  };

  const filteredUpdates = updates.filter((update) => {
    const matchesSearch = update.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || update.category === filter;
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const categoryColors = {
    Workshop: 'bg-purple-100 text-purple-700',
    Publication: 'bg-blue-100 text-blue-700',
    Project: 'bg-green-100 text-green-700',
    General: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">Updates & Announcements</h1>
          <p className="text-gray-500 mt-1">Manage your news and announcements</p>
        </div>
        
        <Link
          to="/admin/updates/new"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Update
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search updates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {['all', 'Workshop', 'Publication', 'Project', 'General'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Updates List */}
      {!loading && filteredUpdates.length > 0 ? (
        <div className="grid gap-4">
          {filteredUpdates.map((update) => (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-primary">{update.title}</h3>
                    {update.pinned && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gold/20 text-gold rounded-full text-xs">
                        <Pin className="w-3 h-3" /> Pinned
                      </span>
                    )}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs ${categoryColors[update.category] || categoryColors.General}`}>
                      {update.category || 'General'}
                    </span>
                  </div>
                  
                  {update.body && (
                    <p className="text-gray-600 mb-3 line-clamp-2">{update.body}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(update.created_at)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleTogglePin(update)}
                    className={`p-2 rounded-lg transition-colors ${
                      update.pinned 
                        ? 'text-gold bg-gold/10' 
                        : 'text-gray-500 hover:text-gold hover:bg-gold/10'
                    }`}
                    title={update.pinned ? 'Unpin from homepage' : 'Pin to homepage'}
                  >
                    <Pin className="w-4 h-4" />
                  </button>
                  <Link
                    to={`/admin/updates/edit/${update.id}`}
                    className="p-2 text-gray-500 hover:text-accent transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(update.id)}
                    className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : !loading ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Megaphone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No updates yet</h3>
          <p className="text-gray-500 mb-6">Create your first update to share news with your audience.</p>
          <Link
            to="/admin/updates/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Update
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default UpdatesManager;