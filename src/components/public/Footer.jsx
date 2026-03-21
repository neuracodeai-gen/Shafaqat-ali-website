import { Link } from 'react-router-dom';
import { Stethoscope, GraduationCap, Mail, Phone, MapPin, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
                SA
              </div>
              <div>
                <span className="font-display font-bold text-xl">Dr. Shafaqat Ali</span>
                <p className="text-xs text-gray-400">Consultant General Surgeon</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A leading Consultant General Surgeon, Medical Educationist, and AI in Healthcare Innovator dedicated to advancing surgical care and medical education.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-accent transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/clinical" className="text-gray-400 hover:text-accent transition-colors">
                  Clinical Practice
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-gray-400 hover:text-accent transition-colors">
                  Education & AI
                </Link>
              </li>
              <li>
                <Link to="/ai" className="text-gray-400 hover:text-accent transition-colors">
                  AI & Innovation
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-gray-400">
                <Stethoscope className="w-4 h-4 text-accent" />
                Laparoscopic Surgery
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Stethoscope className="w-4 h-4 text-accent" />
                Hernia Repair
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Stethoscope className="w-4 h-4 text-accent" />
                Thyroid Surgery
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Stethoscope className="w-4 h-4 text-accent" />
                Emergency Surgery
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <GraduationCap className="w-4 h-4 text-accent" />
                Medical Education
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-accent mt-0.5" />
                <span>Healthcare City, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-accent" />
                <a href="mailto:drshafaqatali123@gmail.com" className="hover:text-accent transition-colors">
                  drshafaqatali123@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-accent" />
                <span>+92 300 1234567</span>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Dr. Shafaqat Ali. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm">
              Built with purpose. Driven by evidence.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
