import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import { getTestimonials } from '../utils/storage';

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    setLoading(true);
    const data = await getTestimonials();
    setTestimonials(data.filter(t => t.approved));
    setLoading(false);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-gold fill-gold' : 'text-gray-300'}`} />
    ));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-primary hero-pattern">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Testimonials
            </h1>
            <p className="text-xl text-gray-300">
              What people say about working with me
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          {!loading && testimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-md p-6"
                >
                  <Quote className="w-8 h-8 text-accent/20 mb-4" />
                  <div className="flex mb-3">{renderStars(t.rating || 5)}</div>
                  <p className="text-gray-600 mb-4 italic">"{t.quote}"</p>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-primary">{t.name}</p>
                    {t.role && <p className="text-sm text-gray-500">{t.role}{t.company && `, ${t.company}`}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : !loading ? (
            <div className="text-center py-16">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No testimonials yet</p>
            </div>
          ) : (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;