import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Save, Send, Bold, Italic, Underline, 
  Heading2, Heading3, List, ListOrdered, Quote, 
  Link as LinkIcon, Image, Code 
} from 'lucide-react';
import { getBlogPosts, saveBlogPost } from '../../utils/storage';

const BlogEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const editorRef = useRef(null);

  const [post, setPost] = useState({
    title: '',
    slug: '',
    category: 'Surgery',
    summary: '',
    body: '',
    tags: '',
    image_url: '',
    author: 'Dr. Shafaqat Ali',
    published: false,
    pinned: false,
  });

  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const categories = ['Surgery', 'AI', 'Medical Education', 'Reflections'];

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    if (id && id !== 'new') {
      const posts = await getBlogPosts();
      const existingPost = posts.find((p) => p.id === id);
      if (existingPost) {
        setPost(existingPost);
        if (editorRef.current) {
          editorRef.current.innerHTML = existingPost.body || '';
        }
      }
    }
    setInitialLoad(false);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSave = async (publish = false) => {
    setLoading(true);
    const currentBody = editorRef.current?.innerHTML || '';
    
    const postData = {
      ...post,
      body: currentBody,
      slug: post.slug || generateSlug(post.title),
      published: publish,
      pinned: post.pinned || false,
    };

    try {
      await saveBlogPost(postData);
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Error saving post. Please try again.');
    }
    
    setLoading(false);
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleImageInsert = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const handleLinkInsert = () => {
    const url = prompt('Enter link URL:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const ToolbarButton = ({ icon: Icon, command, value, onClick }) => (
    <button
      type="button"
      onClick={() => onClick ? onClick() : execCommand(command, value)}
      className="p-2 hover:bg-gray-100 rounded transition-colors"
      title={command}
    >
      <Icon className="w-4 h-4" />
    </button>
  );

  if (initialLoad) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/admin/blog')}
          className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Posts
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave(false)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            Publish
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white rounded-xl shadow-md p-6">
        {/* Title Input */}
        <input
          type="text"
          placeholder="Post title..."
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value, slug: generateSlug(e.target.value) })}
          className="w-full text-3xl font-display font-bold border-0 border-b border-gray-200 pb-4 mb-6 focus:outline-none focus:border-accent"
        />

        {/* Category & Status */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
            <select
              value={post.category}
              onChange={(e) => setPost({ ...post, category: e.target.value })}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPost({ ...post, published: false })}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  !post.published 
                    ? 'bg-yellow-100 text-yellow-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Draft
              </button>
              <button
                type="button"
                onClick={() => setPost({ ...post, published: true })}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  post.published 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                Published
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Pinned</label>
            <button
              type="button"
              onClick={() => setPost({ ...post, pinned: !post.pinned })}
              className={`px-4 py-2 rounded-lg transition-colors ${
                post.pinned 
                  ? 'bg-accent text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {post.pinned ? 'Pinned' : 'Not Pinned'}
            </button>
          </div>
        </div>

        {/* Rich Text Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-50 rounded-t-lg border border-b-0 border-gray-200">
          <ToolbarButton icon={Bold} command="bold" />
          <ToolbarButton icon={Italic} command="italic" />
          <ToolbarButton icon={Underline} command="underline" />
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          <ToolbarButton icon={Heading2} command="formatBlock" value="h2" />
          <ToolbarButton icon={Heading3} command="formatBlock" value="h3" />
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          <ToolbarButton icon={List} command="insertUnorderedList" />
          <ToolbarButton icon={ListOrdered} command="insertOrderedList" />
          <ToolbarButton icon={Quote} command="formatBlock" value="blockquote" />
          <div className="w-px h-6 bg-gray-300 mx-1"></div>
          <ToolbarButton icon={LinkIcon} onClick={handleLinkInsert} />
          <ToolbarButton icon={Image} onClick={handleImageInsert} />
          <ToolbarButton icon={Code} command="formatBlock" value="pre" />
        </div>

        {/* Editor Content */}
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[400px] p-4 border border-gray-200 rounded-b-lg focus:outline-none prose-editor"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {/* Tags & Excerpt */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              placeholder="surgery, ai, education"
              value={post.tags || ''}
              onChange={(e) => setPost({ ...post, tags: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Excerpt (short description)
            </label>
            <input
              type="text"
              placeholder="Brief summary of the post..."
              value={post.summary || ''}
              onChange={(e) => setPost({ ...post, summary: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Cover Image URL
          </label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={post.image_url || ''}
            onChange={(e) => setPost({ ...post, image_url: e.target.value })}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;