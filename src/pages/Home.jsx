import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Stethoscope, GraduationCap, Cpu, Calendar, ChevronRight } from 'lucide-react';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import { getUpdates, getSettings } from '../utils/storage';

const Home = () => {
  const [updates, setUpdates] = useState([]);
  const [settings, setSettings] = useState({});

  useEffect(() => {
    const loadedUpdates = getUpdates();
    const pinnedUpdates = loadedUpdates.filter(u => u.pinned).slice(0, 3);
    setUpdates(pinnedUpdates.length > 0 ? pinnedUpdates : getDefaultUpdates());
    
    const loadedSettings = getSettings();
    setSettings(loadedSettings);
  }, []);

  const getDefaultUpdates = () => [
    {
      id: '1',
      title: 'Workshop on AI in Healthcare',
      category: 'Workshop',
      date: '2024-03-15',
      body: 'Join us for an interactive workshop exploring the integration of artificial intelligence in modern healthcare practices.'
    },
    {
      id: '2',
      title: 'New Publication: Future of Surgical AI',
      category: 'Publication',
      date: '2024-02-28',
      body: 'Published a comprehensive review on the emerging role of AI in surgical decision-making.'
    },
    {
      id: '3',
      title: 'Advanced Laparoscopic Training Program',
      category: 'Project',
      date: '2024-01-10',
      body: 'Launching a new training program for surgical residents focused on minimally invasive techniques.'
    }
  ];

  const features = [
    {
      icon: Stethoscope,
      title: 'Clinical Expertise',
      description: 'Comprehensive surgical care with over 15 years of experience in laparoscopic and open procedures.',
    },
    {
      icon: GraduationCap,
      title: 'Medical Education',
      description: 'Dedicated to training the next generation of surgeons through structured programs and mentorship.',
    },
    {
      icon: Cpu,
      title: 'AI Innovation',
      description: 'Pioneering the integration of artificial intelligence to enhance patient outcomes and safety.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-pattern overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary/80"></div>
        
        <div className="container-custom relative z-10 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight mb-6">
                Dr. Shafaqat Ali
              </h1>
              <p className="text-xl md:text-2xl text-accent font-medium mb-4">
                Consultant General Surgeon | Medical Educationist | AI in Healthcare
              </p>
              <p className="text-lg text-gray-300 mb-8 max-w-lg">
                Bridging surgical excellence with cutting-edge technology to transform patient care and medical education.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/clinical"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-light transition-all"
                >
                  Explore My Work
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary transition-all"
                >
                  Get In Touch
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
            >
              <div className="relative">
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden">
                  <img src="/shafaqat.png" alt="Dr. Shafaqat Ali" className="w-full h-full object-cover rounded-full" />
                </div>
                
                {/* Floating badges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-3"
                >
                  <p className="text-sm font-bold text-primary">15+ Years</p>
                  <p className="text-xs text-gray-500">Experience</p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute -top-4 -right-4 bg-gold rounded-lg shadow-lg p-3"
                >
                  <p className="text-sm font-bold text-white">5000+</p>
                  <p className="text-xs text-white/80">Surgeries</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-white/50 rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-display font-bold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest Updates */}
      {updates.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                  Latest Updates
                </h2>
                <p className="text-gray-600">Stay informed with recent announcements and news</p>
              </div>
              <Link
                to="/blog"
                className="hidden md:flex items-center gap-2 text-accent hover:text-accent-light transition-colors"
              >
                View All
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {updates.map((update, index) => (
                <motion.div
                  key={update.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-background rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
                >
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium mb-3">
                    {update.category}
                  </span>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {update.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {update.body}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {update.date ? new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                    </span>
                    <Link
                      to="/blog"
                      className="text-accent hover:text-accent-light text-sm font-medium"
                    >
                      Read More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-primary circuit-pattern">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
              Ready to Collaborate?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're seeking expert surgical care, medical education partnership, or AI healthcare innovation, let's connect.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-light transition-all"
              >
                <Calendar className="w-5 h-5" />
                Book a Consultation
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-primary transition-all"
              >
                Propose Collaboration
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
