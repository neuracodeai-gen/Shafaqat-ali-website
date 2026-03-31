import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, User, Bot, ArrowLeft, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import { 
  getChatMessages, 
  sendChatMessage, 
  markChatMessagesRead, 
  getOrCreateChatSession,
  saveTestimonial
} from '../utils/storage';

const ChatPage = () => {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [review, setReview] = useState({ name: '', quote: '', rating: 5, role: '' });
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
      } catch (e) {}
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

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await saveTestimonial({
        name: review.name || userName || 'Anonymous',
        quote: review.quote,
        rating: review.rating,
        role: review.role,
        approved: false,
      });
      setReviewSubmitted(true);
      setTimeout(() => {
        setShowReviewModal(false);
        setReviewSubmitted(false);
        setReview({ name: '', quote: '', rating: 5, role: '' });
      }, 2000);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
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
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowReviewModal(true)}
              className="text-accent hover:text-accent-light text-sm underline"
            >
              Leave a Review
            </button>
          </div>
        </div>
      </section>

      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-primary">Leave a Review</h2>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {reviewSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-green-600 font-semibold">Thank you for your review!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={review.name}
                    onChange={(e) => setReview({ ...review, name: e.target.value })}
                    placeholder={userName || 'Your name'}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Your Review *</label>
                  <textarea
                    required
                    rows={3}
                    value={review.quote}
                    onChange={(e) => setReview({ ...review, quote: e.target.value })}
                    placeholder="Share your experience..."
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReview({ ...review, rating: star })}
                        className="p-1"
                      >
                        <Star className={`w-6 h-6 ${star <= review.rating ? 'text-gold fill-gold' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Role (optional)</label>
                  <input
                    type="text"
                    value={review.role}
                    onChange={(e) => setReview({ ...review, role: e.target.value })}
                    placeholder="e.g., Patient, Colleague"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-accent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-accent text-white rounded-lg hover:bg-accent-light"
                >
                  Submit Review
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ChatPage;