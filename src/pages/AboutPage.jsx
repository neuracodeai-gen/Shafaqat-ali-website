import { motion } from 'framer-motion';
import { Award, Users, BookOpen, Lightbulb, Stethoscope, GraduationCap, Cpu } from 'lucide-react';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

const AboutPage = () => {
  const achievements = [
    { number: '5000+', label: 'Surgeries Performed' },
    { number: '15+', label: 'Years Experience' },
    { number: '50+', label: 'Publications' },
    { number: '1000+', label: 'Students Trained' },
  ];

  const roles = [
    { icon: Stethoscope, title: 'Consultant General Surgeon', description: 'Providing expert surgical care with focus on minimally invasive techniques' },
    { icon: GraduationCap, title: 'Medical Educationist', description: 'Training and mentoring the next generation of healthcare professionals' },
    { icon: Cpu, title: 'AI in Healthcare Innovator', description: 'Pioneering the integration of artificial intelligence in medical practice' },
  ];

  const philosophy = [
    { title: 'Patient Care', description: 'Every patient deserves compassionate, evidence-based care that prioritizes their wellbeing and recovery.' },
    { title: 'Teaching', description: 'Knowledge grows when shared. I am committed to empowering medical professionals with skills and insights.' },
    { title: 'Innovation', description: 'Embracing technology while maintaining the human touch in medicine is essential for progress.' },
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
              About Dr. Shafaqat Ali
            </h1>
            <p className="text-xl text-gray-300">
              A distinguished Consultant General Surgeon, Medical Educationist, and AI in Healthcare Innovator dedicated to advancing medical science and patient care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-accent/20 to-gold/20 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-8xl font-display font-bold text-white">SA</span>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-2xl -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-gold/20 rounded-2xl -z-10"></div>
            </motion.div>

            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-primary mb-6">
                A Passion for Healing & Teaching
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Dr. Shafaqat Ali is a highly respected Consultant General Surgeon with over 15 years of experience in performing complex surgical procedures. His expertise spans laparoscopic surgery, hernia repairs, thyroid surgeries, and emergency surgical interventions.
                </p>
                <p>
                  Beyond his clinical practice, Dr. Ali is deeply committed to medical education. He has trained hundreds of medical students and surgical residents, developing innovative teaching methodologies that combine traditional expertise with modern technological advances.
                </p>
                <p>
                  In recent years, Dr. Ali has emerged as a leading voice in the integration of artificial intelligence in healthcare. He advocates for evidence-based AI implementation that enhances rather than replaces the human elements of medical care.
                </p>
                <p>
                  His vision is to create a healthcare ecosystem where technology and human compassion work hand in hand to deliver optimal patient outcomes.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Key Roles */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">
              Professional Roles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {roles.map((role, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md"
                >
                  <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <role.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {role.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {role.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-16">
            <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">
              Achievements at a Glance
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {achievements.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-md text-center"
                >
                  <p className="text-4xl font-display font-bold text-accent mb-2">
                    {item.number}
                  </p>
                  <p className="text-gray-600 text-sm">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div>
            <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">
              Philosophy of Care
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {philosophy.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-primary rounded-xl p-8 text-white"
                >
                  <h3 className="text-xl font-display font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-2xl md:text-3xl font-display text-primary italic mb-6">
              "Medicine is not just about treating diseases—it's about caring for people. Technology amplifies our ability to care, never replaces it."
            </p>
            <p className="text-accent font-medium">— Dr. Shafaqat Ali</p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
