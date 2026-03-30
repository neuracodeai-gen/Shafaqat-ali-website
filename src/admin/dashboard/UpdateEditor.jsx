import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { getUpdates, saveUpdate } from '../../utils/storage';

const UpdateEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [update, setUpdate] = useState({
    title: '',
    category: 'General',
    body: '',
    pinned: false,
  });

  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const categories = ['Workshop', 'Publication', 'Project', 'General'];

  useEffect(() => {
    loadUpdate();
  }, [id]);

  const loadUpdate = async () => {
    if (id && id !== 'new') {
      const updates = await getUpdates();
      const existingUpdate = updates.find((u) => u.id === id);
      if (existingUpdate) {
        setUpdate(existingUpdate);
      }
    }
    setInitialLoad(false);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await saveUpdate({
        ...update,
        id: id && id !== 'new' ? id : undefined,
      });
      navigate('/admin/updates');
    } catch (error) {
      console.error('Error saving update:', error);
      alert('Error saving update. Please try again.');
    }
    setLoading(false);
  };

  if (initialLoad) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/admin/updates')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Updates
        </button>

        <button
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Editor */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-display font-bold text-primary mb-6">
          {id && id !== 'new' ? 'Edit Update' : 'New Update'}
        </h1>

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Title</label>
          <input
            type="text"
            placeholder="Update title..."
            value={update.title}
            onChange={(e) => setUpdate({ ...update, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
          />
        </div>

        {/* Category & Date */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
            <select
              value={update.category}
              onChange={(e) => setUpdate({ ...update, category: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-600">Pin to Homepage</label>
            <button
              type="button"
              onClick={() => setUpdate({ ...update, pinned: !update.pinned })}
              className={`w-12 h-6 rounded-full transition-colors ${
                update.pinned ? 'bg-accent' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                  update.pinned ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Content</label>
          <textarea
            rows={6}
            placeholder="Write your update..."
            value={update.body}
            onChange={(e) => setUpdate({ ...update, body: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateEditor;