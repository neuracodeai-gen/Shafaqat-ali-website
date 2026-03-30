import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Star, Check } from 'lucide-react';
import { getTestimonials, saveTestimonial, deleteTestimonial } from '../../utils/storage';

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    quote: '',
    image_url: '',
    rating: 5,
    approved: false,
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    const data = await getTestimonials();
    setTestimonials(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveTestimonial(formData);
      setShowModal(false);
      setEditingItem(null);
      setFormData({ name: '', role: '', company: '', quote: '', image_url: '', rating: 5, approved: false });
      await loadTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this testimonial?')) {
      await deleteTestimonial(id);
      await loadTestimonials();
    }
  };

  const handleToggleApproved = async (item) => {
    await saveTestimonial({ ...item, approved: !item.approved });
    await loadTestimonials();
  };

  const filteredTestimonials = testimonials.filter((t) => {
    const matchesSearch = t.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       t.quote?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                          (filter === 'approved' && t.approved) || 
                          (filter === 'pending' && !t.approved);
    return matchesSearch && matchesFilter;
  });

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-gold fill-gold' : 'text-gray-300'}`} />
    ));
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">Testimonials</h1>
          <p className="text-gray-500 mt-1">Manage patient and colleague testimonials</p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({ name: '', role: '', company: '', quote: '', image_url: '', rating: 5, approved: false });
            setShowModal(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search testimonials..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'approved', 'pending'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === status
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredTestimonials.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex">{renderStars(item.rating)}</div>
                <button
                  onClick={() => handleToggleApproved(item)}
                  className={`p-1 rounded ${item.approved ? 'text-green-500' : 'text-gray-400'}`}
                >
                  <Check className="w-4 h-4" />
                </button>
              </div>
              <p className="text-gray-600 mb-4 line-clamp-3">{item.quote}</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-primary">{item.name}</p>
                  {item.role && <p className="text-sm text-gray-500">{item.role}{item.company && `, ${item.company}`}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(item)} className="p-2 text-gray-500 hover:text-accent">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-500 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No testimonials yet</h3>
          <p className="text-gray-500">Add testimonials to show on the website.</p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-lg"
          >
            <h2 className="text-2xl font-bold text-primary mb-4">
              {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                    placeholder="e.g., Patient"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Quote *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Image URL</label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="p-1"
                    >
                      <Star className={`w-6 h-6 ${star <= formData.rating ? 'text-gold fill-gold' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="approved"
                  checked={formData.approved}
                  onChange={(e) => setFormData({ ...formData, approved: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="approved" className="text-sm text-gray-600">Approved (show on website)</label>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsManager;