import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Megaphone, 
  FolderOpen, 
  Settings, 
  LogOut,
  User,
  MessageSquare,
  Star
} from 'lucide-react';
import { useAuth } from '../auth/authContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard Overview', path: '/admin/dashboard' },
    { icon: FileText, label: 'Blog Posts', path: '/admin/blog' },
    { icon: Megaphone, label: 'Updates / Announcements', path: '/admin/updates' },
    { icon: FolderOpen, label: 'Files & Media', path: '/admin/files' },
    { icon: Star, label: 'Testimonials', path: '/admin/testimonials' },
    { icon: MessageSquare, label: 'Messages', path: '/admin/messages' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-primary text-white flex flex-col z-50">
      {/* Logo/Avatar */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src="/shafaqat.png" alt="Dr. Shafaqat Ali" className="w-12 h-12 rounded-full object-cover" />
          <div>
            <h2 className="font-display font-bold text-lg">Admin Panel</h2>
            <p className="text-xs text-gray-400">Dr. Shafaqat Ali</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-accent/20 text-accent border-l-4 border-accent'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-300 hover:bg-red-500/20 hover:text-red-400 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
