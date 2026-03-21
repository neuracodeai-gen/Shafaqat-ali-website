import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, Search, Trash2, Copy, Image, Video, FileText, 
  X, Play, File, Check 
} from 'lucide-react';
import { getFiles, saveFile, deleteFile } from '../../utils/storage';

const FileManager = () => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const fileInputRef = useRef(null);
  const dropZoneRef = useRef(null);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = () => {
    const loadedFiles = getFiles();
    setFiles(loadedFiles);
  };

  const getFileType = (file) => {
    if (file.type?.startsWith('image/')) return 'image';
    if (file.type?.startsWith('video/')) return 'video';
    if (file.type?.includes('pdf') || file.type?.includes('document') || file.type?.includes('word')) return 'document';
    return 'other';
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleFileUpload = async (uploadedFiles) => {
    setUploading(true);
    setUploadProgress(0);

    const newFiles = [];
    const total = uploadedFiles.length;

    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      
      // Convert to base64 for localStorage (in production, upload to cloud storage)
      const reader = new FileReader();
      
      await new Promise((resolve) => {
        reader.onload = () => {
          const fileData = {
            name: file.name,
            type: file.type,
            size: file.size,
            data: reader.result, // base64
            mimeType: file.type,
          };
          newFiles.push(fileData);
          setUploadProgress(((i + 1) / total) * 100);
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }

    newFiles.forEach((fileData) => {
      saveFile(fileData);
    });

    loadFiles();
    setUploading(false);
    setUploadProgress(0);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileUpload(droppedFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this file?')) {
      deleteFile(id);
      loadFiles();
    }
  };

  const handleCopyLink = (file) => {
    navigator.clipboard.writeText(file.data);
    // Show toast notification
    alert('Link copied to clipboard!');
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const fileType = getFileType(file);
    const matchesFilter = filter === 'all' || fileType === filter;
    return matchesSearch && matchesFilter;
  });

  const FileIcon = ({ type }) => {
    switch (type) {
      case 'image':
        return <Image className="w-8 h-8 text-purple-500" />;
      case 'video':
        return <Video className="w-8 h-8 text-red-500" />;
      case 'document':
        return <FileText className="w-8 h-8 text-blue-500" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">Files & Media</h1>
          <p className="text-gray-500 mt-1">Manage your uploaded files and media</p>
        </div>
      </div>

      {/* Upload Area */}
      <div
        ref={dropZoneRef}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center cursor-pointer transition-colors ${
          uploading
            ? 'border-accent bg-accent/5'
            : 'border-gray-300 hover:border-accent hover:bg-gray-50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={(e) => handleFileUpload(e.target.files)}
          className="hidden"
          accept="image/*,video/*,.pdf,.doc,.docx"
        />
        
        {uploading ? (
          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
              <Upload className="w-8 h-8 text-accent animate-pulse" />
            </div>
            <p className="text-gray-600 mb-2">Uploading...</p>
            <div className="w-full max-w-xs mx-auto bg-gray-200 rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold text-accent">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-400">
              Images (JPG, PNG, WebP, SVG), Documents (PDF, DOCX), Videos (MP4, MOV, WebM)
            </p>
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
          />
        </div>
        
        <div className="flex gap-2">
          {['all', 'image', 'video', 'document'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                filter === type
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Files Grid */}
      {filteredFiles.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredFiles.map((file) => {
            const fileType = getFileType(file);
            return (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden group"
              >
                {/* Preview */}
                <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                  {fileType === 'image' ? (
                    <img
                      src={file.data}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : fileType === 'video' ? (
                    <button
                      onClick={() => setSelectedVideo(file)}
                      className="relative"
                    >
                      <Video className="w-16 h-16 text-gray-400" />
                      <Play className="absolute inset-0 m-auto w-8 h-8 text-white" />
                    </button>
                  ) : (
                    <FileIcon type={fileType} />
                  )}
                  
                  {/* Actions overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleCopyLink(file)}
                      className="p-2 bg-white rounded-full text-gray-700 hover:text-accent"
                      title="Copy link"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="p-2 bg-white rounded-full text-gray-700 hover:text-red-500"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-sm font-medium text-primary truncate">{file.name}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{formatFileSize(file.size)}</span>
                    <span className="text-xs text-gray-400">{formatDate(file.uploadedAt)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <File className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No files uploaded yet</h3>
          <p className="text-gray-500">Upload your first file to get started.</p>
        </div>
      )}

      {/* Video Player Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-10 right-0 text-white hover:text-gray-300"
              >
                <X className="w-8 h-8" />
              </button>
              <video
                src={selectedVideo.data}
                controls
                className="w-full rounded-lg"
                autoPlay
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FileManager;
