import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './admin/auth/authContext';
import AuthGuard from './admin/auth/AuthGuard';

// Admin Imports
import LoginPage from './admin/auth/LoginPage';
import VerifyPage from './admin/auth/VerifyPage';
import AdminLayout from './admin/dashboard/AdminLayout';
import DashboardOverview from './admin/dashboard/DashboardOverview';
import BlogManager from './admin/dashboard/BlogManager';
import BlogEditor from './admin/dashboard/BlogEditor';
import UpdatesManager from './admin/dashboard/UpdatesManager';
import UpdateEditor from './admin/dashboard/UpdateEditor';
import FileManager from './admin/dashboard/FileManager';
import TestimonialsManager from './admin/dashboard/TestimonialsManager';
import MessagesManager from './admin/dashboard/MessagesManager';
import Settings from './admin/dashboard/Settings';

// Public Imports
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ClinicalPage from './pages/ClinicalPage';
import EducationPage from './pages/EducationPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import TestimonialsPage from './pages/TestimonialsPage';
import UpdatesPage from './pages/UpdatesPage';
import GalleryPage from './pages/GalleryPage';
import ChatPage from './pages/ChatPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/clinical" element={<ClinicalPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostPage />} />
          <Route path="/reviews" element={<TestimonialsPage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="/files" element={<GalleryPage />} />
          <Route path="/chat/:sessionId?" element={<ChatPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Admin Auth Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/verify" element={<VerifyPage />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin" element={<AuthGuard><AdminLayout /></AuthGuard>}>
            <Route path="dashboard" element={<DashboardOverview />} />
            <Route path="blog" element={<BlogManager />} />
            <Route path="blog/new" element={<BlogEditor />} />
            <Route path="blog/edit/:id" element={<BlogEditor />} />
            <Route path="updates" element={<UpdatesManager />} />
            <Route path="updates/new" element={<UpdateEditor />} />
            <Route path="updates/edit/:id" element={<UpdateEditor />} />
            <Route path="files" element={<FileManager />} />
            <Route path="testimonials" element={<TestimonialsManager />} />
            <Route path="messages" element={<MessagesManager />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Redirect /admin to dashboard */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          
          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
