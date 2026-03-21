import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Users, Video, Download, Award, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

const EducationPage = () => {
  const features = [
    {
      icon: GraduationCap,
      title: 'Structured Training Programs',
      description: 'Comprehensive surgical education covering fundamentals to advanced techniques with hands-on training.',
    },
    {
      icon: BookOpen,
      title: 'Evidence-Based Curriculum',
      description: 'Curriculum grounded in latest research and clinical guidelines, regularly updated to reflect advances in medicine.',
    },
    {
      icon: Users,
      title: 'Mentorship',
      description: 'One-on-one guidance from experienced surgeons to nurture the next generation of medical professionals.',
    },
  ];

  const courses = [
    {
      title: 'Advanced Laparoscopic Surgery',
      description: 'Master minimally invasive surgical techniques with our comprehensive training program.',
      duration: '3 months',
      level: 'Advanced',
    },
    {
      title: 'AI in Healthcare Fundamentals',
      description: 'Understanding artificial intelligence applications in modern medical practice.',
      duration: '6 weeks',
      level: 'Intermediate',
    },
    {
      title: 'Surgical Ethics & Communication',
      description: 'Essential skills for effective patient interaction and ethical decision-making.',
      duration: '2 weeks',
      level: 'Beginner',
    },
    {
      title: 'Emergency Surgery Protocols',
      description: 'Rapid assessment and management of acute surgical conditions.',
      duration: '4 weeks',
      level: 'Advanced',
    },
  ];

  const resources = [
    'Surgical Guidelines Manual',
    'AI in Medicine Research Papers',
    'Case Study Collections',
    'Video Lecture Series',
    'Assessment Templates',
  ];

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
              Medical Education & AI Literacy
            </h1>
            <p className="text-xl text-gray-300">
              Empowering healthcare professionals with knowledge and skills for tomorrow's medicine.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 shadow-md"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Literacy Panel */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 md:p-12 text-white"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-4">
                  AI Literacy as a Patient Safety Competency
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  In an era where artificial intelligence is transforming healthcare, understanding AI's capabilities and limitations is essential for every medical professional. This competency includes:
                </p>
                <ul className="space-y-3">
                  {[
                    'Understanding AI algorithms and their outputs',
                    'Critical evaluation of AI-generated recommendations',
                    'Recognizing AI limitations and potential biases',
                    'Maintaining clinical judgment alongside AI tools',
                    'Effective communication with patients about AI use',
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-gold mt-0.5" />
                      <span className="text-gray-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="w-48 h-48 rounded-full bg-white/10 flex items-center justify-center">
                  <BookOpen className="w-24 h-24 text-accent" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">
            Courses & Workshops
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((course, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-primary">{course.title}</h3>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs">
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Video className="w-4 h-4" />
                    {course.duration}
                  </span>
                  <button className="text-accent hover:text-accent-light font-medium flex items-center gap-1">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-primary mb-4">
                Downloadable Resources
              </h2>
              <p className="text-gray-600 mb-6">
                Access our collection of educational materials, research papers, and clinical guides.
              </p>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-background rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <Download className="w-5 h-5 text-accent" />
                    <span className="text-gray-700">{resource}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-background rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Newsletter Signup
              </h3>
              <p className="text-gray-600 mb-4">
                Stay updated with the latest in medical education and AI in healthcare.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                />
                <button className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary circuit-pattern">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Interested in Collaborating?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Partner with us for medical education programs or AI integration projects.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-light transition-all"
          >
            <Mail className="w-5 h-5" />
            Get In Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EducationPage;
