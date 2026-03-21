import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Scissors, Heart, Shield, Brain, Baby, Activity, 
  Clock, CheckCircle, ArrowRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';

const ClinicalPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const services = [
    {
      icon: Scissors,
      title: 'Laparoscopic Cholecystectomy',
      description: 'Minimally invasive gallbladder removal using advanced laparoscopic techniques for faster recovery.',
    },
    {
      icon: Heart,
      title: 'Hernia Repair',
      description: 'Comprehensive hernia treatment including inguinal, femoral, umbilical, and incisional hernias using both open and laparoscopic approaches.',
    },
    {
      icon: Brain,
      title: 'Thyroidectomy',
      description: 'Surgical removal of thyroid nodules and tumors with precise surgical planning and post-operative care.',
    },
    {
      icon: Baby,
      title: 'Breast Surgery',
      description: 'Diagnostic and therapeutic breast surgeries including lumpectomy, mastectomy, and breast conservation procedures.',
    },
    {
      icon: Activity,
      title: 'Emergency Laparotomy',
      description: '24/7 emergency surgical services for acute abdominal conditions including perforation, obstruction, and peritonitis.',
    },
    {
      icon: Shield,
      title: 'Diabetic Foot Care',
      description: 'Specialized surgical management of diabetic foot ulcers, infections, and preventive care.',
    },
    {
      icon: Scissors,
      title: 'Perianal Surgery',
      description: 'Treatment for hemorrhoids, fistulas, fissures, and pilonidal disease with advanced surgical techniques.',
    },
    {
      icon: Heart,
      title: 'Appendectomy',
      description: 'Laparoscopic and open appendectomy for acute and complicated appendicitis.',
    },
    {
      icon: Activity,
      title: 'Incision & Drainage',
      description: 'Surgical management of abscesses and infected collections across all body regions.',
    },
    {
      icon: Shield,
      title: 'NSTI Management',
      description: 'Comprehensive treatment of Necrotizing Soft Tissue Infections with aggressive surgical debridement.',
    },
  ];

  const faqs = [
    {
      question: 'How do I prepare for surgery?',
      answer: 'Your surgical team will provide detailed pre-operative instructions including fasting guidelines, medication adjustments, and what to bring on the day of surgery.',
    },
    {
      question: 'What is the recovery time for laparoscopic surgery?',
      answer: 'Most laparoscopic procedures allow patients to return to normal activities within 1-2 weeks, with full recovery in 4-6 weeks depending on the procedure.',
    },
    {
      question: 'Will I have visible scars?',
      answer: 'Laparoscopic surgery uses small incisions (5-12mm) resulting in minimal scarring. Open surgeries may have larger scars that fade over time.',
    },
    {
      question: 'What are the risks of general surgery?',
      answer: 'All surgeries carry some risks including infection, bleeding, and reactions to anesthesia. Your surgeon will discuss specific risks for your procedure during consultation.',
    },
    {
      question: 'How do I schedule a consultation?',
      answer: 'You can book a consultation through our contact page or by calling our office directly. Bring any relevant medical records and imaging to your appointment.',
    },
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
              Clinical Practice
            </h1>
            <p className="text-xl text-gray-300">
              Expert surgical care with a focus on minimally invasive techniques and patient-centered outcomes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-4">
              Surgical Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive surgical care across a wide range of conditions using state-of-the-art techniques and equipment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-primary mb-6">
                Why Choose Our Surgical Services?
              </h2>
              <div className="space-y-4">
                {[
                  'Board-certified surgeon with 15+ years of experience',
                  'Advanced laparoscopic and minimally invasive techniques',
                  'State-of-the-art surgical facilities',
                  'Comprehensive pre and post-operative care',
                  'Personalized treatment plans',
                  '24/7 emergency surgical services',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-background rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-primary mb-4">
                Patient Journey
              </h3>
              <div className="space-y-4">
                {[
                  { step: '1', title: 'Consultation', desc: 'Comprehensive evaluation and discussion of treatment options' },
                  { step: '2', title: 'Planning', desc: 'Personalized surgical plan with pre-operative preparation' },
                  { step: '3', title: 'Surgery', desc: 'Expert surgical care with advanced techniques' },
                  { step: '4', title: 'Recovery', desc: 'Dedicated post-operative care and follow-up' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-primary mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden shadow-md"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between"
                >
                  <span className="font-semibold text-primary">{faq.question}</span>
                  <ArrowRight className={`w-5 h-5 text-accent transition-transform ${openFaq === index ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    className="px-6 pb-4"
                  >
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary circuit-pattern">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold text-white mb-4">
            Need Surgical Consultation?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to discuss your surgical needs and treatment options.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-light transition-all"
          >
            Get In Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClinicalPage;
