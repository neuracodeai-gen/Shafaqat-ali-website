import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User } from 'lucide-react';
import { getSettings, saveSettings } from '../../utils/storage';

const Settings = () => {
  const [settings, setSettings] = useState({
    displayName: '',
    email: '',
    tagline: '',
    contactEmail: '',
    showBlog: true,
    showTestimonials: true,
  });

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const loadedSettings = await getSettings();
    setSettings({
      displayName: loadedSettings.display_name || '',
      email: loadedSettings.email || '',
      tagline: loadedSettings.tagline || '',
      contactEmail: loadedSettings.contact_email || '',
      showBlog: loadedSettings.show_blog ?? true,
      showTestimonials: loadedSettings.show_testimonials ?? true,
    });
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await saveSettings({
      display_name: settings.displayName,
      email: settings.email,
      tagline: settings.tagline,
      contact_email: settings.contactEmail,
      show_blog: settings.showBlog,
      show_testimonials: settings.showTestimonials,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-primary">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your profile and website preferences</p>
      </div>

      <div className="max-w-3xl">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6"
        >
          <h2 className="text-xl font-semibold text-primary mb-6 flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile
          </h2>

          <div className="flex items-start gap-6 mb-6">
            <img src="/shafaqat.png" alt="Dr. Shafaqat Ali" className="w-20 h-20 rounded-full object-cover" />
            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Display Name</label>
                <input
                  type="text"
                  value={settings.displayName}
                  onChange={(e) => setSettings({ ...settings, displayName: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400 mt-1">Contact email cannot be changed</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Website Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6"
        >
          <h2 className="text-xl font-semibold text-primary mb-6">Website Settings</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Homepage Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                placeholder="Your professional tagline"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Contact Email (shown on site)</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
              />
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <div>
                <p className="font-medium text-primary">Show Blog Section</p>
                <p className="text-sm text-gray-500">Display blog posts on the public website</p>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, showBlog: !settings.showBlog })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.showBlog ? 'bg-accent' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                    settings.showBlog ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-gray-100">
              <div>
                <p className="font-medium text-primary">Show Testimonials Section</p>
                <p className="text-sm text-gray-500">Display testimonials on the public website</p>
              </div>
              <button
                type="button"
                onClick={() => setSettings({ ...settings, showTestimonials: !settings.showTestimonials })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  settings.showTestimonials ? 'bg-accent' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                    settings.showTestimonials ? 'translate-x-6' : 'translate-x-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-light transition-colors disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          
          {saved && (
            <p className="mt-3 text-green-600 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Settings saved successfully!
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;