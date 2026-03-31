import { supahbase } from '../lib/supabase';

const useSupabase = false;

const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    return null;
  }
};

const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    return false;
  }
};

const STORAGE_KEYS = {
  BLOG_POSTS: 'drshafaqat_blog_posts',
  UPDATES: 'drshafaqat_updates',
  FILES: 'drshafaqat_files',
  SETTINGS: 'drshafaqat_settings',
  ACTIVITY_LOG: 'drshafaqat_activity_log',
  TESTIMONIALS: 'drshafaqat_testimonials',
  GALLERY: 'drshafaqat_gallery',
  CHAT_SESSIONS: 'drshafaqat_chat_sessions',
  CHAT_MESSAGES: 'drshafaqat_chat_messages',
  CONTACT_MESSAGES: 'drshafaqat_contact_messages',
};

export const getBlogPosts = async () => {
  if (!useSupabase) return getItem(STORAGE_KEYS.BLOG_POSTS) || [];
  try {
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    return getItem(STORAGE_KEYS.BLOG_POSTS) || [];
  }
};

export const saveBlogPost = async (post) => {
  if (!useSupabase) {
    const posts = getItem(STORAGE_KEYS.BLOG_POSTS) || [];
    const existingIndex = posts.findIndex((p) => p.id === post.id);
    if (existingIndex >= 0) {
      posts[existingIndex] = { ...post, updated_at: new Date().toISOString() };
    } else {
      posts.push({ ...post, id: Date.now().toString(), created_at: new Date().toISOString() });
    }
    setItem(STORAGE_KEYS.BLOG_POSTS, posts);
    return post.id;
  }
  try {
    const postData = { title: post.title, slug: post.slug || post.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-'), summary: post.summary, body: post.body, category: post.category, tags: post.tags, image_url: post.image_url, author: post.author || 'Dr. Shafaqat Ali', published: post.published, pinned: post.pinned, updated_at: new Date().toISOString() };
    if (post.id) {
      const { error } = await supabase.from('blog_posts').update(postData).eq('id', post.id);
      if (error) throw error;
    } else {
      postData.created_at = new Date().toISOString();
      const { data, error } = await supabase.from('blog_posts').insert(postData).select().single();
      if (error) throw error;
    }
    return post.id;
  } catch (error) {
    const posts = getItem(STORAGE_KEYS.BLOG_POSTS) || [];
    const existingIndex = posts.findIndex((p) => p.id === post.id);
    if (existingIndex >= 0) posts[existingIndex] = { ...post, updated_at: new Date().toISOString() };
    else posts.push({ ...post, id: Date.now().toString(), created_at: new Date().toISOString() });
    setItem(STORAGE_KEYS.BLOG_POSTS, posts);
    return post.id;
  }
};

export const deleteBlogPost = async (id) => {
  if (!useSupabase) {
    const posts = getItem(STORAGE_KEYS.BLOG_POSTS) || [];
    setItem(STORAGE_KEYS.BLOG_POSTS, posts.filter((p) => p.id !== id));
    return;
  }
  try {
    await supabase.from('blog_posts').delete().eq('id', id);
  } catch (error) {
    const posts = getItem(STORAGE_KEYS.BLOG_POSTS) || [];
    setItem(STORAGE_KEYS.BLOG_POSTS, posts.filter((p) => p.id !== id));
  }
};

export const getUpdates = async () => {
  if (!useSupabase) return getItem(STORAGE_KEYS.UPDATES) || [];
  try {
    const { data, error } = await supabase.from('updates').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    return getItem(STORAGE_KEYS.UPDATES) || [];
  }
};

export const saveUpdate = async (update) => {
  if (!useSupabase) {
    const updates = getItem(STORAGE_KEYS.UPDATES) || [];
    const existingIndex = updates.findIndex((u) => u.id === update.id);
    if (existingIndex >= 0) updates[existingIndex] = { ...update, updated_at: new Date().toISOString() };
    else updates.push({ ...update, id: Date.now().toString(), created_at: new Date().toISOString() });
    setItem(STORAGE_KEYS.UPDATES, updates);
    return update.id;
  }
  try {
    const updateData = { title: update.title, body: update.body, category: update.category || 'General', pinned: update.pinned, updated_at: new Date().toISOString() };
    if (update.id) {
      const { error } = await supabase.from('updates').update(updateData).eq('id', update.id);
      if (error) throw error;
    } else {
      updateData.created_at = new Date().toISOString();
      const { data, error } = await supabase.from('updates').insert(updateData).select().single();
      if (error) throw error;
    }
    return update.id;
  } catch (error) {
    const updates = getItem(STORAGE_KEYS.UPDATES) || [];
    const existingIndex = updates.findIndex((u) => u.id === update.id);
    if (existingIndex >= 0) updates[existingIndex] = { ...update, updated_at: new Date().toISOString() };
    else updates.push({ ...update, id: Date.now().toString(), created_at: new Date().toISOString() });
    setItem(STORAGE_KEYS.UPDATES, updates);
    return update.id;
  }
};

export const deleteUpdate = async (id) => {
  if (!useSupabase) {
    const updates = getItem(STORAGE_KEYS.UPDATES) || [];
    setItem(STORAGE_KEYS.UPDATES, updates.filter((u) => u.id !== id));
    return;
  }
  try {
    await supabase.from('updates').delete().eq('id', id);
  } catch (error) {
    const updates = getItem(STORAGE_KEYS.UPDATES) || [];
    setItem(STORAGE_KEYS.UPDATES, updates.filter((u) => u.id !== id));
  }
};

export const getSettings = async () => {
  if (!useSupabase) {
    const settings = getItem(STORAGE_KEYS.SETTINGS);
    return settings || { display_name: 'Dr. Shafaqat Ali', email: 'drshafaqatali123@gmail.com', tagline: 'Consultant General Surgeon', contact_email: 'drshafaqatali123@gmail.com', show_blog: true, show_testimonials: true };
  }
  try {
    const { data, error } = await supabase.from('settings').select('*').limit(1).single();
    if (error) throw error;
    return data || { display_name: 'Dr. Shafaqat Ali', email: 'drshafaqatali123@gmail.com', tagline: 'Consultant General Surgeon', contact_email: 'drshafaqatali123@gmail.com', show_blog: true, show_testimonials: true };
  } catch (error) {
    const settings = getItem(STORAGE_KEYS.SETTINGS);
    return settings || { display_name: 'Dr. Shafaqat Ali', email: 'drshafaqatali123@gmail.com', tagline: 'Consultant General Surgeon', contact_email: 'drshafaqatali123@gmail.com', show_blog: true, show_testimonials: true };
  }
};

export const saveSettings = async (settings) => {
  if (!useSupabase) {
    setItem(STORAGE_KEYS.SETTINGS, settings);
    return;
  }
  try {
    const existing = await getSettings();
    const settingsData = { display_name: settings.display_name, email: settings.email, tagline: settings.tagline, contact_email: settings.contact_email, show_blog: settings.show_blog, show_testimonials: settings.show_testimonials, updated_at: new Date().toISOString() };
    if (existing.id) await supabase.from('settings').update(settingsData).eq('id', existing.id);
    else await supabase.from('settings').insert(settingsData);
  } catch (error) {
    setItem(STORAGE_KEYS.SETTINGS, settings);
  }
};

export const getFiles = async () => {
  if (!useSupabase) return getItem(STORAGE_KEYS.FILES) || [];
  try {
    const { data, error } = await supabase.from('files').select('*').order('uploaded_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    return getItem(STORAGE_KEYS.FILES) || [];
  }
};

export const saveFile = async (file) => {
  if (!useSupabase) {
    const files = getItem(STORAGE_KEYS.FILES) || [];
    files.push({ ...file, id: Date.now().toString(), uploaded_at: new Date().toISOString() });
    setItem(STORAGE_KEYS.FILES, files);
    return file.id;
  }
  try {
    const fileData = { ...file, uploaded_at: new Date().toISOString() };
    const { data, error } = await supabase.from('files').insert(fileData).select().single();
    if (error) throw error;
    return data.id;
  } catch (error) {
    const files = getItem(STORAGE_KEYS.FILES) || [];
    files.push({ ...file, id: Date.now().toString(), uploaded_at: new Date().toISOString() });
    setItem(STORAGE_KEYS.FILES, files);
    return file.id;
  }
};

export const deleteFile = async (id) => {
  if (!useSupabase) {
    const files = getItem(STORAGE_KEYS.FILES) || [];
    setItem(STORAGE_KEYS.FILES, files.filter((f) => f.id !== id));
    return;
  }
  try {
    await supabase.from('files').delete().eq('id', id);
  } catch (error) {
    const files = getItem(STORAGE_KEYS.FILES) || [];
    setItem(STORAGE_KEYS.FILES, files.filter((f) => f.id !== id));
  }
};

export const logActivity = async (action, detail) => {
  if (!useSupabase) {
    const activities = getItem(STORAGE_KEYS.ACTIVITY_LOG) || [];
    activities.unshift({ id: Date.now().toString(), action, detail, timestamp: new Date().toISOString() });
    setItem(STORAGE_KEYS.ACTIVITY_LOG, activities.slice(0, 50));
    return;
  }
  try {
    await supabase.from('activity_log').insert({ action, detail, timestamp: new Date().toISOString() });
  } catch (error) {}
};

export const getActivities = async () => {
  if (!useSupabase) return getItem(STORAGE_KEYS.ACTIVITY_LOG) || [];
  try {
    const { data, error } = await supabase.from('activity_log').select('*').order('timestamp', { ascending: false }).limit(50);
    if (error) throw error;
    return data || [];
  } catch (error) {
    return getItem(STORAGE_KEYS.ACTIVITY_LOG) || [];
  }
};

export const getContactMessages = async () => {
  if (!useSupabase) return getItem(STORAGE_KEYS.CONTACT_MESSAGES) || [];
  try {
    const { data, error } = await supabase.from('contact_messages').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    return getItem(STORAGE_KEYS.CONTACT_MESSAGES) || [];
  }
};

export const saveContactMessage = async (message) => {
  if (!useSupabase) {
    const messages = getItem(STORAGE_KEYS.CONTACT_MESSAGES) || [];
    messages.unshift({ ...message, id: Date.now().toString(), read: false, replied: false, created_at: new Date().toISOString() });
    setItem(STORAGE_KEYS.CONTACT_MESSAGES, messages);
    return message.id;
  }
  try {
    const messageData = { name: message.name, email: message.email, subject: message.subject, message: message.message, read: false, replied: false, created_at: new Date().toISOString() };
    const { data, error } = await supabase.from('contact_messages').insert(messageData).select().single();
    if (error) throw error;
    return data.id;
  } catch (error) {
    const messages = getItem(STORAGE_KEYS.CONTACT_MESSAGES) || [];
    messages.unshift({ ...message, id: Date.now().toString(), read: false, replied: false, created_at: new Date().toISOString() });
    setItem(STORAGE_KEYS.CONTACT_MESSAGES, messages);
    return message.id;
  }
};

export const markContactMessageRead = async (id) => {
  if (!useSupabase) {
    const messages = getItem(STORAGE_KEYS.CONTACT_MESSAGES) || [];
    const idx = messages.findIndex(m => m.id === id);
    if (idx >= 0) messages[idx].read = true;
    setItem(STORAGE_KEYS.CONTACT_MESSAGES, messages);
    return;
  }
  try {
    await supabase.from('contact_messages').update({ read: true }).eq('id', id);
  } catch (error) {}
};

export const deleteContactMessage = async (id) => {
  if (!useSupabase) {
    const messages = getItem(STORAGE_KEYS.CONTACT_MESSAGES) || [];
    setItem(STORAGE_KEYS.CONTACT_MESSAGES, messages.filter(m => m.id !== id));
    return;
  }
  try {
    await supabase.from('contact_messages').delete().eq('id', id);
  } catch (error) {
    const messages = getItem(STORAGE_KEYS.CONTACT_MESSAGES) || [];
    setItem(STORAGE_KEYS.CONTACT_MESSAGES, messages.filter(m => m.id !== id));
  }
};

export const getChatSessions = async () => {
  if (!useSupabase) return getItem(STORAGE_KEYS.CHAT_SESSIONS) || [];
  try {
    const { data, error } = await supabase.from('chat_sessions').select('*').order('last_message_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    return getItem(STORAGE_KEYS.CHAT_SESSIONS) || [];
  }
};

export const getOrCreateChatSession = async (userEmail, userName = '') => {
  if (!useSupabase) {
    const sessions = getItem(STORAGE_KEYS.CHAT_SESSIONS) || [];
    let session = sessions.find(s => s.user_email === userEmail);
    if (!session) {
      session = { id: Date.now().toString(), session_id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, user_name: userName, user_email: userEmail, last_message: null, last_message_at: new Date().toISOString(), unread_admin_count: 0, unread_user_count: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      sessions.push(session);
      setItem(STORAGE_KEYS.CHAT_SESSIONS, sessions);
    }
    return session;
  }
  try {
    let { data: session } = await supabase.from('chat_sessions').select('*').eq('user_email', userEmail).single();
    if (!session) {
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const { data, error } = await supabase.from('chat_sessions').insert({ session_id: sessionId, user_name: userName, user_email: userEmail, unread_admin_count: 0, unread_user_count: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }).select().single();
      if (error) throw error;
      session = data;
    }
    return session;
  } catch (error) {
    const sessions = getItem(STORAGE_KEYS.CHAT_SESSIONS) || [];
    let session = sessions.find(s => s.user_email === userEmail);
    if (!session) {
      session = { id: Date.now().toString(), session_id: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, user_name: userName, user_email: userEmail, last_message: null, last_message_at: new Date().toISOString(), unread_admin_count: 0, unread_user_count: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      sessions.push(session);
      setItem(STORAGE_KEYS.CHAT_SESSIONS, sessions);
    }
    return session;
  }
};

export const sendChatMessage = async (sessionId, sender, senderName, message) => {
  if (!useSupabase) {
    const messages = getItem(STORAGE_KEYS.CHAT_MESSAGES) || [];
    const newMsg = { id: Date.now().toString(), session_id: sessionId, sender, sender_name: senderName, message, read: false, created_at: new Date().toISOString() };
    messages.push(newMsg);
    setItem(STORAGE_KEYS.CHAT_MESSAGES, messages);
    const sessions = getItem(STORAGE_KEYS.CHAT_SESSIONS) || [];
    const sessionIdx = sessions.findIndex(s => s.session_id === sessionId);
    if (sessionIdx >= 0) {
      sessions[sessionIdx].last_message = message;
      sessions[sessionIdx].last_message_at = new Date().toISOString();
      sessions[sessionIdx].updated_at = new Date().toISOString();
      if (sender === 'user') sessions[sessionIdx].unread_admin_count = (sessions[sessionIdx].unread_admin_count || 0) + 1;
      else sessions[sessionIdx].unread_user_count = (sessions[sessionIdx].unread_user_count || 0) + 1;
      setItem(STORAGE_KEYS.CHAT_SESSIONS, sessions);
    }
    return newMsg;
  }
  try {
    const messageData = { session_id: sessionId, sender, sender_name: senderName, message, read: false, created_at: new Date().toISOString() };
    const { data, error } = await supabase.from('chat_messages').insert(messageData).select().single();
    if (error) throw error;
    await supabase.from('chat_sessions').update({ last_message: message, last_message_at: new Date().toISOString(), updated_at: new Date().toISOString() }).eq('session_id', sessionId);
    return data;
  } catch (error) {
    const messages = getItem(STORAGE_KEYS.CHAT_MESSAGES) || [];
    const newMsg = { id: Date.now().toString(), session_id: sessionId, sender, sender_name: senderName, message, read: false, created_at: new Date().toISOString() };
    messages.push(newMsg);
    setItem(STORAGE_KEYS.CHAT_MESSAGES, messages);
    return newMsg;
  }
};

export const getChatMessages = async (sessionId) => {
  if (!useSupabase) {
    const allMessages = getItem(STORAGE_KEYS.CHAT_MESSAGES) || [];
    return allMessages.filter(m => m.session_id === sessionId);
  }
  try {
    const { data, error } = await supabase.from('chat_messages').select('*').eq('session_id', sessionId).order('created_at', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (error) {
    const allMessages = getItem(STORAGE_KEYS.CHAT_MESSAGES) || [];
    return allMessages.filter(m => m.session_id === sessionId);
  }
};

export const markChatMessagesRead = async (sessionId, sender) => {
  if (!useSupabase) {
    const messages = getItem(STORAGE_KEYS.CHAT_MESSAGES) || [];
    const updatedMessages = messages.map(m => m.session_id === sessionId && m.sender !== sender ? { ...m, read: true } : m);
    setItem(STORAGE_KEYS.CHAT_MESSAGES, updatedMessages);
    const sessions = getItem(STORAGE_KEYS.CHAT_SESSIONS) || [];
    const sessionIdx = sessions.findIndex(s => s.session_id === sessionId);
    if (sessionIdx >= 0) {
      sessions[sessionIdx].unread_admin_count = 0;
      sessions[sessionIdx].unread_user_count = 0;
      setItem(STORAGE_KEYS.CHAT_SESSIONS, sessions);
    }
    return;
  }
  try {
    await supabase.from('chat_messages').update({ read: true }).eq('session_id', sessionId).eq('sender', sender === 'admin' ? 'user' : 'admin');
    await supabase.from('chat_sessions').update({ unread_admin_count: 0, unread_user_count: 0 }).eq('session_id', sessionId);
  } catch (error) {}
};

export const getTestimonials = async () => {
  if (!useSupabase) return getItem(STORAGE_KEYS.TESTIMONIALS) || [];
  try {
    const { data, error } = await supabase.from('testimonials').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    return getItem(STORAGE_KEYS.TESTIMONIALS) || [];
  }
};

export const saveTestimonial = async (testimonial) => {
  if (!useSupabase) {
    const testimonials = getItem(STORAGE_KEYS.TESTIMONIALS) || [];
    const existingIndex = testimonials.findIndex((t) => t.id === testimonial.id);
    if (existingIndex >= 0) testimonials[existingIndex] = { ...testimonial, updated_at: new Date().toISOString() };
    else testimonials.push({ ...testimonial, id: Date.now().toString(), created_at: new Date().toISOString() });
    setItem(STORAGE_KEYS.TESTIMONIALS, testimonials);
    return testimonial.id;
  }
  try {
    const data = { ...testimonial, updated_at: new Date().toISOString() };
    if (testimonial.id) {
      const { error } = await supabase.from('testimonials').update(data).eq('id', testimonial.id);
      if (error) throw error;
    } else {
      data.created_at = new Date().toISOString();
      const { data: newData, error } = await supabase.from('testimonials').insert(data).select().single();
      if (error) throw error;
    }
    return testimonial.id;
  } catch (error) {
    const testimonials = getItem(STORAGE_KEYS.TESTIMONIALS) || [];
    const existingIndex = testimonials.findIndex((t) => t.id === testimonial.id);
    if (existingIndex >= 0) testimonials[existingIndex] = { ...testimonial, updated_at: new Date().toISOString() };
    else testimonials.push({ ...testimonial, id: Date.now().toString(), created_at: new Date().toISOString() });
    setItem(STORAGE_KEYS.TESTIMONIALS, testimonials);
    return testimonial.id;
  }
};

export const deleteTestimonial = async (id) => {
  if (!useSupabase) {
    const testimonials = getItem(STORAGE_KEYS.TESTIMONIALS) || [];
    setItem(STORAGE_KEYS.TESTIMONIALS, testimonials.filter((t) => t.id !== id));
    return;
  }
  try {
    await supabase.from('testimonials').delete().eq('id', id);
  } catch (error) {
    const testimonials = getItem(STORAGE_KEYS.TESTIMONIALS) || [];
    setItem(STORAGE_KEYS.TESTIMONIALS, testimonials.filter((t) => t.id !== id));
  }
};

export const getGallery = async () => {
  if (!useSupabase) return getItem(STORAGE_KEYS.GALLERY) || [];
  try {
    const { data, error } = await supabase.from('gallery').select('*').order('order_index', { ascending: true });
    if (error) throw error;
    return data || [];
  } catch (error) {
    return getItem(STORAGE_KEYS.GALLERY) || [];
  }
};

export const saveGalleryItem = async (item) => {
  if (!useSupabase) {
    const gallery = getItem(STORAGE_KEYS.GALLERY) || [];
    const existingIndex = gallery.findIndex((g) => g.id === item.id);
    if (existingIndex >= 0) gallery[existingIndex] = { ...item, updated_at: new Date().toISOString() };
    else gallery.push({ ...item, id: Date.now().toString(), created_at: new Date().toISOString() });
    setItem(STORAGE_KEYS.GALLERY, gallery);
    return item.id;
  }
  try {
    const data = { ...item, updated_at: new Date().toISOString() };
    if (item.id) {
      const { error } = await supabase.from('gallery').update(data).eq('id', item.id);
      if (error) throw error;
    } else {
      data.created_at = new Date().toISOString();
      const { data: newData, error } = await supabase.from('gallery').insert(data).select().single();
      if (error) throw error;
    }
    return item.id;
  } catch (error) {
    const gallery = getItem(STORAGE_KEYS.GALLERY) || [];
    const existingIndex = gallery.findIndex((g) => g.id === item.id);
    if (existingIndex >= 0) gallery[existingIndex] = { ...item, updated_at: new Date().toISOString() };
    else gallery.push({ ...item, id: Date.now().toString(), created_at: new Date().toISOString() });
    setItem(STORAGE_KEYS.GALLERY, gallery);
    return item.id;
  }
};

export const deleteGalleryItem = async (id) => {
  if (!useSupabase) {
    const gallery = getItem(STORAGE_KEYS.GALLERY) || [];
    setItem(STORAGE_KEYS.GALLERY, gallery.filter((g) => g.id !== id));
    return;
  }
  try {
    await supabase.from('gallery').delete().eq('id', id);
  } catch (error) {
    const gallery = getItem(STORAGE_KEYS.GALLERY) || [];
    setItem(STORAGE_KEYS.GALLERY, gallery.filter((g) => g.id !== id));
  }
};
