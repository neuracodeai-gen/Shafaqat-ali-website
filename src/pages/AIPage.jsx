import { motion } from 'framer-motion';
import { Cpu, Brain, Lightbulb, Shield, ArrowRight, Users, Code, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

const AIPage = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Assisted Diagnostics',
      description: 'Leveraging machine learning algorithms to enhance diagnostic accuracy and early detection.',
    },
    {
      icon: Shield,
      title: 'Patient Safety Focus',
      description: 'Implementing AI solutions that prioritize patient safety and reduce medical errors.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Research',
      description: 'Conducting cutting-edge research on AI applications in surgical practice.',
    },
    {
      icon: Cpu,
      title: 'Clinical Decision Support',
      description: 'Developing systems that assist clinicians in making evidence-based decisions.',
    },
  ];

  const projects = [
    {
      title: 'Surgical AI Copilot',
      description: 'An intelligent assistant that provides real-time guidance during surgical procedures, helping surgeons with decision-making and technique optimization.',
      status: 'In Development',
    },
    {
      title: 'AI Literacy Curriculum',
      description: 'A comprehensive training program to help healthcare professionals understand and effectively use AI tools in their practice.',
      status: 'Active',
    },
    {
      title: 'Multi-Agent Healthcare System',
      description: 'A collaborative AI system where multiple specialized agents work together to provide comprehensive patient care support.',
      status: 'Research Phase',
    },
  ];

  const insights = [
    {
      title: 'Critical Evaluation of AI',
      quote: 'Agreement between multiple AI models does not constitute independent verification due to overlapping training data.',
      author: 'Dr. Shafaqat Ali',
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-primary circuit-pattern">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              AI & Innovation
            </h1>
            <p className="text-xl text-gray-300">
              Pioneering the responsible integration of artificial intelligence in healthcare for better patient outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding bg-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-6">
              <Lightbulb className="w-16 h-16 text-gold mx-auto" />
            </div>
            <blockquote className="text-2xl md:text-3xl font-display text-white italic mb-6">
              "{insights[0].quote}"
            </blockquote>
            <p className="text-accent font-medium">— {insights[0].author}</p>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">
            AI Projects
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-background rounded-xl p-6 shadow-md"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-accent" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Active' ? 'bg-green-100 text-green-700' :
                    project.status === 'In Development' ? 'bg-blue-100 text-blue-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-8 md:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-display font-bold mb-4">
                  Let's Collaborate
                </h2>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Interested in AI healthcare research, partnerships, or implementation projects? 
                  I work with healthcare institutions, tech companies, and academic researchers 
                  to advance responsible AI in medicine.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-accent" />
                    <span>Healthcare Institutions</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-accent" />
                    <span>Technology Partners</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Database className="w-5 h-5 text-accent" />
                    <span>Research Organizations</span>
                  </li>
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-light transition-all"
                >
                  Start a Conversation
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              
              <div className="flex justify-center">
                <div className="w-64 h-64 rounded-full bg-white/10 flex items-center justify-center">
                  <Brain className="w-32 h-32 text-accent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AIPage;
