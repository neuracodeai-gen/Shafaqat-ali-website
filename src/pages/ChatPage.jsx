import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, User, Bot, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import { 
  getChatMessages, 
  sendChatMessage, 
  markChatMessagesRead, 
  getOrCreateChatSession 
} from '../utils/storage';

const ChatPage = () => {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const lastMessageCountRef = useRef(0);

  const userName = localStorage.getItem('chat_user_name') || '';
  const userEmail = localStorage.getItem('chat_user_email') || '';

  useEffect(() => {
    if (sessionId) {
      loadChat();
    }
  }, [sessionId]);

  useEffect(() => {
    if (!loading && messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (!sessionId || loading) return;
    
    const interval = setInterval(async () => {
      try {
        const currentSessionId = sessionId || (await getOrCreateChatSession(userEmail, userName)).session_id;
        const msgs = await getChatMessages(currentSessionId);
        
        if (msgs.length !== lastMessageCountRef.current) {
          setMessages(msgs);
          lastMessageCountRef.current = msgs.length;
          if (currentSessionId) {
            await markChatMessagesRead(currentSessionId, 'user');
          }
          scrollToBottom();
        }
      } catch (e) {
        // Silent fail on polling
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, [sessionId, loading, userEmail, userName]);

  const loadChat = async () => {
    setLoading(true);
    try {
      let currentSessionId = sessionId;
      
      if (!currentSessionId && userEmail) {
        const sess = await getOrCreateChatSession(userEmail, userName);
        currentSessionId = sess.session_id;
      }

      if (currentSessionId) {
        const msgs = await getChatMessages(currentSessionId);
        setMessages(msgs);
        lastMessageCountRef.current = msgs.length;
        await markChatMessagesRead(currentSessionId, 'user');
      }
    } catch (error) {
      console.error('Error loading chat:', error);
    }
    setLoading(false);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 50);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const currentSessionId = sessionId || (await getOrCreateChatSession(userEmail, userName)).session_id;
      await sendChatMessage(currentSessionId, 'user', userName || 'User', newMessage.trim());
      setNewMessage('');
      const msgs = await getChatMessages(currentSessionId);
      setMessages(msgs);
      lastMessageCountRef.current = msgs.length;
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setSending(false);
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        </div>
      </div>
    );
  }

  if (!sessionId && !userEmail) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="pt-32 pb-16 bg-primary hero-pattern">
          <div className="container-custom">
            <Link to="/contact" className="inline-flex items-center gap-2 text-accent hover:text-accent-light">
              <ArrowLeft className="w-4 h-4" /> Back to Contact
            </Link>
          </div>
        </section>
        <section className="section-padding bg-background">
          <div className="container-custom text-center py-16">
            <h2 className="text-2xl font-bold text-primary mb-4">No Chat Session</h2>
            <p className="text-gray-600 mb-6">Please start a chat from the contact page.</p>
            <Link to="/contact" className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-light">
              Go to Contact Page
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="pt-24 pb-4 bg-primary hero-pattern">
        <div className="container-custom">
          <Link to="/contact" className="inline-flex items-center gap-2 text-accent hover:text-accent-light">
            <ArrowLeft className="w-4 h-4" /> Back to Contact
          </Link>
        </div>
      </section>

      <section className="flex-1 bg-background">
        <div className="container-custom h-[calc(100vh-200px)]">
          <div className="bg-white rounded-xl shadow-md h-full flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">Dr. Shafaqat Ali</h3>
                <p className="text-sm text-gray-500">Online</p>
              </div>
            </div>

            <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>Start a conversation with Dr. Shafaqat Ali</p>
                </div>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${msg.sender === 'user' ? 'order-2' : ''}`}>
                      <div className={`rounded-lg p-3 ${
                        msg.sender === 'user' 
                          ? 'bg-accent text-white' 
                          : 'bg-gray-100 text-primary'
                      }`}>
                        <p>{msg.message}</p>
                      </div>
                      <p className={`text-xs text-gray-400 mt-1 ${
                        msg.sender === 'user' ? 'text-right' : ''
                      }`}>
                        {formatTime(msg.created_at)}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-gray-200">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  disabled={sending || !newMessage.trim()}
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-light disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChatPage;