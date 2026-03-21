// Storage utility for localStorage operations
// TODO: Replace localStorage with backend API

const STORAGE_KEYS = {
  BLOG_POSTS: 'drshafaqat_blog_posts',
  UPDATES: 'drshafaqat_updates',
  FILES: 'drshafaqat_files',
  SETTINGS: 'drshafaqat_settings',
  AUTH_SESSION: 'drshafaqat_auth_session',
  ACTIVITY_LOG: 'drshafaqat_activity_log',
};

// Generic storage functions
export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    return false;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

// Blog posts
export const getBlogPosts = () => getItem(STORAGE_KEYS.BLOG_POSTS) || [];

export const saveBlogPost = (post) => {
  const posts = getBlogPosts();
  const existingIndex = posts.findIndex((p) => p.id === post.id);
  
  if (existingIndex >= 0) {
    posts[existingIndex] = { ...post, updatedAt: new Date().toISOString() };
  } else {
    posts.push({ ...post, id: Date.now().toString(), createdAt: new Date().toISOString() });
  }
  
  setItem(STORAGE_KEYS.BLOG_POSTS, posts);
  logActivity(existingIndex >= 0 ? 'Updated blog post' : 'Created blog post', post.title);
  return post.id;
};

export const deleteBlogPost = (id) => {
  const posts = getBlogPosts();
  const filtered = posts.filter((p) => p.id !== id);
  setItem(STORAGE_KEYS.BLOG_POSTS, filtered);
  logActivity('Deleted blog post', id);
};

// Updates
export const getUpdates = () => getItem(STORAGE_KEYS.UPDATES) || [];

export const saveUpdate = (update) => {
  const updates = getUpdates();
  const existingIndex = updates.findIndex((u) => u.id === update.id);
  
  if (existingIndex >= 0) {
    updates[existingIndex] = { ...update, updatedAt: new Date().toISOString() };
  } else {
    updates.push({ ...update, id: Date.now().toISOString(), createdAt: new Date().toISOString() });
  }
  
  setItem(STORAGE_KEYS.UPDATES, updates);
  logActivity(existingIndex >= 0 ? 'Updated announcement' : 'Created announcement', update.title);
  return update.id;
};

export const deleteUpdate = (id) => {
  const updates = getUpdates();
  const filtered = updates.filter((u) => u.id !== id);
  setItem(STORAGE_KEYS.UPDATES, filtered);
  logActivity('Deleted announcement', id);
};

// Files
export const getFiles = () => getItem(STORAGE_KEYS.FILES) || [];

export const saveFile = (file) => {
  const files = getFiles();
  files.push({
    ...file,
    id: Date.now().toString(),
    uploadedAt: new Date().toISOString(),
  });
  setItem(STORAGE_KEYS.FILES, files);
  logActivity('Uploaded file', file.name);
  return file.id;
};

export const deleteFile = (id) => {
  const files = getFiles();
  const filtered = files.filter((f) => f.id !== id);
  setItem(STORAGE_KEYS.FILES, filtered);
  logActivity('Deleted file', id);
};

// Settings
export const getSettings = () => {
  const settings = getItem(STORAGE_KEYS.SETTINGS);
  return settings || {
    displayName: 'Dr. Shafaqat Ali',
    email: 'drshafaqatali123@gmail.com',
    tagline: 'Consultant General Surgeon | Medical Educationist | AI in Healthcare Innovator',
    contactEmail: 'drshafaqatali123@gmail.com',
    showBlog: true,
    showTestimonials: true,
  };
};

export const saveSettings = (settings) => {
  setItem(STORAGE_KEYS.SETTINGS, settings);
  logActivity('Updated settings', '');
};

// Activity log
export const logActivity = (action, detail) => {
  const activities = getItem(STORAGE_KEYS.ACTIVITY_LOG) || [];
  activities.unshift({
    id: Date.now().toString(),
    action,
    detail,
    timestamp: new Date().toISOString(),
  });
  // Keep only last 50 activities
  setItem(STORAGE_KEYS.ACTIVITY_LOG, activities.slice(0, 50));
};

export const getActivities = () => getItem(STORAGE_KEYS.ACTIVITY_LOG) || [];

export { STORAGE_KEYS };
