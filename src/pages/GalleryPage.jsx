import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image, Video, FileText, File, Download } from 'lucide-react';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import { getFiles } from '../utils/storage';

const GalleryPage = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    const data = await getFiles();
    setFiles(data);
    setLoading(false);
  };

  const getFileType = (file) => {
    if (file.type?.startsWith('image/')) return 'image';
    if (file.type?.startsWith('video/')) return 'video';
    if (file.type?.includes('pdf') || file.type?.includes('document') || file.type?.includes('word')) return 'document';
    return 'other';
  };

  const FileIcon = ({ type }) => {
    switch (type) {
      case 'image': return <Image className="w-12 h-12 text-purple-500" />;
      case 'video': return <Video className="w-12 h-12 text-red-500" />;
      case 'document': return <FileText className="w-12 h-12 text-blue-500" />;
      default: return <File className="w-12 h-12 text-gray-500" />;
    }
  };

  const filteredFiles = files.filter(f => {
    const fileType = getFileType(f);
    return filter === 'all' || fileType === filter;
  });

  const categories = ['all', 'image', 'video', 'document'];

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
              Files & Resources
            </h1>
            <p className="text-xl text-gray-300">
              Educational materials, documents, and media files
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="flex gap-2 flex-wrap mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  filter === cat ? 'bg-accent text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {!loading && filteredGallery.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredGallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedImage(item)}
                  className="aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer group"
                >
                  {item.image_url ? (
                    <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image className="w-12 h-12 text-gray-300" />
                    </div>
                  )}
                  {item.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2">
                      <p className="text-white text-sm truncate">{item.title}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          ) : !loading ? (
            <div className="text-center py-16">
              <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No gallery items yet</p>
            </div>
          ) : (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
          )}
        </div>
      </section>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="max-w-4xl w-full"
            onClick={e => e.stopPropagation()}
          >
            {selectedImage.image_url && (
              <img src={selectedImage.image_url} alt={selectedImage.title} className="w-full max-h-[80vh] object-contain rounded-lg" />
            )}
            {selectedImage.title && (
              <p className="text-white text-center mt-4">{selectedImage.title}</p>
            )}
            {selectedImage.description && (
              <p className="text-gray-400 text-center mt-2">{selectedImage.description}</p>
            )}
          </motion.div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
};

export default GalleryPage;