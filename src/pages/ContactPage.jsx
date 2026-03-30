import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Calendar, Users, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import { saveContactMessage, getOrCreateChatSession } from '../utils/storage';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startChat, setStartChat] = useState(false);
  const [chatSessionId, setChatSessionId] = useState(null);

  const subjects = [
    'General Inquiry',
    'Consultation Request',
    'Medical Education Partnership',
    'AI Collaboration',
    'Speaking Engagement',
    'Media Inquiry',
  ];

  const roles = [
    'Patient',
    'Medical Professional',
    'Researcher',
    'Institution Representative',
    'Media',
    'Other',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await saveContactMessage(formData);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to send message. Please try again.');
    }
    setLoading(false);
  };

  const handleStartChat = async () => {
    if (!formData.name || !formData.email) {
      alert('Please enter your name and email to start a chat.');
      return;
    }
    setLoading(true);
    try {
      const session = await getOrCreateChatSession(formData.email, formData.name);
      setChatSessionId(session.session_id);
      setStartChat(true);
    } catch (error) {
      console.error('Error starting chat:', error);
      alert('Failed to start chat. Please try again.');
    }
    setLoading(false);
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
              Get In Touch
            </h1>
            <p className="text-xl text-gray-300">
              Whether you're seeking expert surgical care, medical education partnership, or AI healthcare collaboration.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-display font-bold text-primary mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Location</h3>
                    <p className="text-gray-600">Healthcare City, Pakistan</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Email</h3>
                    <a href="mailto:drshafaqatali123@gmail.com" className="text-gray-600 hover:text-accent">
                      drshafaqatali123@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Phone</h3>
                    <p className="text-gray-600">+92 300 1234567</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Book a Consultation</h3>
                    <p className="text-sm text-gray-500">Schedule an appointment</p>
                  </div>
                </a>
                
                <a
                  href="#"
                  className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Propose a Collaboration</h3>
                    <p className="text-sm text-gray-500">Discuss partnership opportunities</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-xl shadow-md p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Message Sent!</h3>
                    <p className="text-gray-600 mb-6">
                      Thank you for reaching out. I'll get back to you soon.
                    </p>
                    <button
                      onClick={() => {
                        setFormData({ name: '', email: '', role: '', subject: '', message: '' });
                        setSubmitted(false);
                      }}
                      className="px-6 py-2 bg-accent text-white rounded-lg hover:bg-accent-light"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : startChat ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-primary mb-2">Chat Started!</h3>
                    <p className="text-gray-600 mb-4">
                      Your chat session has been created. You can now chat with Dr. Shafaqat Ali.
                    </p>
                    <Link
                      to={`/chat/${chatSessionId}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-light"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Open Chat
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-display font-bold text-primary mb-6">
                      Send a Message
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Role/Institution</label>
                          <select
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                          >
                            <option value="">Select role</option>
                            {roles.map((role) => (
                              <option key={role} value={role}>{role}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
                          <select
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                          >
                            <option value="">Select subject</option>
                            {subjects.map((subject) => (
                              <option key={subject} value={subject}>{subject}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent resize-none"
                          placeholder="How can I help you?"
                        />
                      </div>
                      
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-accent text-white rounded-lg hover:bg-accent-light transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <Send className="w-5 h-5" />
                        {loading ? 'Sending...' : 'Send Message'}
                      </button>
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or</span>
                        </div>
                      </div>
                      
                      <button
                        type="button"
                        onClick={handleStartChat}
                        disabled={loading}
                        className="w-full py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <MessageCircle className="w-5 h-5" />
                        {loading ? 'Starting...' : 'Start Live Chat'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;