import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Megaphone, FolderOpen, Clock, ArrowRight } from 'lucide-react';
import { useAuth } from '../auth/authContext';
import { getBlogPosts, getUpdates, getFiles, getActivities } from '../../utils/storage';

const DashboardOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalUpdates: 0,
    totalFiles: 0,
    lastLogin: null,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [posts, updates, files, recentActivities] = await Promise.all([
        getBlogPosts(),
        getUpdates(),
        getFiles(),
        getActivities(),
      ]);

      setStats({
        totalPosts: posts.length,
        totalUpdates: updates.length,
        totalFiles: files.length,
        lastLogin: user?.loginTime || null,
      });

      setActivities(recentActivities.slice(0, 5));
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statCards = [
    { label: 'Total Blog Posts', value: stats.totalPosts, icon: FileText, color: 'bg-blue-500' },
    { label: 'Total Updates Posted', value: stats.totalUpdates, icon: Megaphone, color: 'bg-green-500' },
    { label: 'Files Uploaded', value: stats.totalFiles, icon: FolderOpen, color: 'bg-purple-500' },
    { 
      label: 'Last Login', 
      value: stats.lastLogin ? formatDate(stats.lastLogin) : 'N/A', 
      icon: Clock, 
      color: 'bg-orange-500' 
    },
  ];

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Welcome Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 mb-8 text-white"
      >
        <h1 className="text-3xl font-display font-bold mb-2">
          Welcome back, {user?.user || 'Dr. Shafaqat Ali'} 👋
        </h1>
        <p className="text-gray-300">Here's what's happening with your website today.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Link to="/admin/blog">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-md border-l-4 border-accent cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-primary">+ New Blog Post</h3>
                <p className="text-sm text-gray-500">Create a new article</p>
              </div>
              <ArrowRight className="w-5 h-5 text-accent" />
            </div>
          </motion.div>
        </Link>
        
        <Link to="/admin/updates">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-md border-l-4 border-gold cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-primary">+ New Update</h3>
                <p className="text-sm text-gray-500">Post an announcement</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gold" />
            </div>
          </motion.div>
        </Link>
        
        <Link to="/admin/files">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-500 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-primary">+ Upload File</h3>
                <p className="text-sm text-gray-500">Add media or documents</p>
              </div>
              <ArrowRight className="w-5 h-5 text-green-500" />
            </div>
          </motion.div>
        </Link>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-md"
      >
        <h2 className="text-xl font-display font-bold text-primary mb-6">Recent Activity</h2>
        
        {activities.length > 0 ? (
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-accent"></div>
                <div className="flex-1">
                  <p className="text-sm text-primary">{activity.action}</p>
                  {activity.detail && (
                    <p className="text-xs text-gray-500">{activity.detail}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">{formatDate(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No recent activity</p>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardOverview;