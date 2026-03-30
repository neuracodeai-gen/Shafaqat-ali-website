-- Drop all tables if they exist
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS chat_sessions CASCADE;
DROP TABLE IF EXISTS chat_messages CASCADE;
DROP TABLE IF EXISTS contact_messages CASCADE;
DROP TABLE IF EXISTS activity_log CASCADE;
DROP TABLE IF EXISTS files CASCADE;
DROP TABLE IF EXISTS settings CASCADE;
DROP TABLE IF EXISTS updates CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Blog Posts
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE,
    summary TEXT,
    body TEXT,
    category VARCHAR(100),
    tags TEXT,
    image_url TEXT,
    author VARCHAR(255),
    published BOOLEAN DEFAULT false,
    pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Updates
CREATE TABLE updates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    body TEXT,
    category VARCHAR(100),
    pinned BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings
CREATE TABLE settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    display_name VARCHAR(255),
    email VARCHAR(255),
    tagline TEXT,
    contact_email VARCHAR(255),
    show_blog BOOLEAN DEFAULT true,
    show_testimonials BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Files
CREATE TABLE files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100),
    url TEXT,
    size INTEGER,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity Log
CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(255) NOT NULL,
    detail TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    replied BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat Messages
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255) NOT NULL,
    sender VARCHAR(50) NOT NULL,
    sender_name VARCHAR(255),
    message TEXT NOT NULL,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chat Sessions
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255) UNIQUE NOT NULL,
    user_name VARCHAR(255),
    user_email VARCHAR(255),
    last_message TEXT,
    last_message_at TIMESTAMPTZ DEFAULT NOW(),
    unread_admin_count INTEGER DEFAULT 0,
    unread_user_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    company VARCHAR(255),
    quote TEXT NOT NULL,
    image_url TEXT,
    rating INTEGER DEFAULT 5,
    approved BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery
CREATE TABLE gallery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255),
    description TEXT,
    image_url TEXT NOT NULL,
    category VARCHAR(100),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings
INSERT INTO settings (display_name, email, tagline, contact_email, show_blog, show_testimonials)
VALUES ('Dr. Shafaqat Ali', 'drshafaqatali123@gmail.com', 'Consultant General Surgeon | Medical Educationist | AI in Healthcare Innovator', 'drshafaqatali123@gmail.com', true, true);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Public read updates" ON updates FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (approved = true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Anyone insert contact" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full blog_posts" ON blog_posts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full updates" ON updates FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full settings" ON settings FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full files" ON files FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full activity" ON activity_log FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full contact" ON contact_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anyone chat messages" ON chat_messages FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Anyone chat sessions" ON chat_sessions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full testimonials" ON testimonials FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full gallery" ON gallery FOR ALL USING (true) WITH CHECK (true);