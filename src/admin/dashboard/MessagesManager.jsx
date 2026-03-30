import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Send, User, Trash2, Check } from 'lucide-react';
import { 
  getContactMessages, 
  deleteContactMessage, 
  markContactMessageRead, 
  getChatSessions, 
  getChatMessages, 
  sendChatMessage, 
  markChatMessagesRead
} from '../../utils/storage';

const MessagesManager = () => {
  const [view, setView] = useState('contacts');
  const [contactMessages, setContactMessages] = useState([]);
  const [chatSessions, setChatSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const lastMessageCountRef = useRef(0);
  const lastContactCountRef = useRef(0);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!loading && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (view === 'chat' && selectedSession) {
      loadChatMessages();
    }
  }, [view, selectedSession]);

  useEffect(() => {
    if (view === 'contacts') {
      const interval = setInterval(async () => {
        try {
          const msgs = await getContactMessages();
          if (msgs.length !== lastContactCountRef.current) {
            setContactMessages(msgs);
            lastContactCountRef.current = msgs.length;
          }
        } catch (e) {}
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [view]);

  useEffect(() => {
    if (view !== 'chat' || !selectedSession) return;
    
    const interval = setInterval(async () => {
      try {
        const sess = await getChatSessions();
        setChatSessions(sess);
        
        if (selectedSession) {
          const msgs = await getChatMessages(selectedSession.session_id);
          if (msgs.length !== lastMessageCountRef.current) {
            setMessages(msgs);
            lastMessageCountRef.current = msgs.length;
            await markChatMessagesRead(selectedSession.session_id, 'admin');
            scrollToBottom();
          }
        }
      } catch (e) {}
    }, 2000);
    
    return () => clearInterval(interval);
  }, [view, selectedSession]);

  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }, 100);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const [contacts, chats] = await Promise.all([
        getContactMessages(),
        getChatSessions(),
      ]);
      setContactMessages(contacts || []);
      setChatSessions(chats || []);
      lastContactCountRef.current = (contacts || []).length;
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const loadChatMessages = async () => {
    if (!selectedSession) return;
    try {
      const msgs = await getChatMessages(selectedSession.session_id);
      setMessages(msgs);
      lastMessageCountRef.current = msgs.length;
      await markChatMessagesRead(selectedSession.session_id, 'admin');
    } catch (error) {
      console.error('Error loading chat messages:', error);
    }
  };

  const handleSelectSession = (session) => {
    setSelectedSession(session);
    setMessages([]);
    lastMessageCountRef.current = 0;
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Delete this message?')) {
      await deleteContactMessage(id);
      await loadData();
    }
  };

  const handleMarkRead = async (id) => {
    await markContactMessageRead(id);
    await loadData();
  };

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedSession || sending) return;

    setSending(true);
    try {
      await sendChatMessage(selectedSession.session_id, 'admin', 'Dr. Shafaqat Ali', newMessage.trim());
      setNewMessage('');
      await loadChatMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setSending(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const unreadContacts = contactMessages.filter(m => !m.read).length;
  const unreadChats = chatSessions.reduce((sum, s) => sum + (s.unread_admin_count || 0), 0);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-primary">Messages</h1>
          <p className="text-gray-500 mt-1">Manage contact messages and live chats</p>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setView('contacts')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'contacts'
                ? 'bg-accent text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Mail className="w-4 h-4" />
            Contact Forms
            {unreadContacts > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadContacts}</span>
            )}
          </button>
          <button
            onClick={() => setView('chat')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              view === 'chat'
                ? 'bg-accent text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <MessageCircle className="w-4 h-4" />
            Live Chat
            {unreadChats > 0 && (
              <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{unreadChats}</span>
            )}
          </button>
        </div>
      </div>

      {view === 'contacts' ? (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {contactMessages.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {contactMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-4 hover:bg-gray-50 ${!msg.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-primary">{msg.name}</h3>
                        {!msg.read && (
                          <span className="px-2 py-0.5 bg-accent text-white text-xs rounded-full">New</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{msg.email}</p>
                      {msg.subject && (
                        <p className="text-sm text-accent">{msg.subject}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">{msg.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{formatDate(msg.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {!msg.read && (
                        <button
                          onClick={() => handleMarkRead(msg.id)}
                          className="p-2 text-gray-500 hover:text-accent"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteContact(msg.id)}
                        className="p-2 text-gray-500 hover:text-red-500"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No messages yet</h3>
              <p className="text-gray-500">Contact form submissions will appear here.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-250px)]">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <button onClick={loadData} className="text-sm text-accent hover:text-accent-light">Refresh</button>
              <h3 className="font-semibold text-primary">Conversations</h3>
            </div>
            <div className="overflow-y-auto h-full">
              {chatSessions.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {chatSessions.map((session) => (
                    <button
                      key={session.id}
                      onClick={() => handleSelectSession(session)}
                      className={`w-full p-4 text-left hover:bg-gray-50 ${
                        selectedSession?.id === session.id ? 'bg-accent/10' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                          <User className="w-4 h-4 text-accent" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-primary truncate">
                            {session.user_name || session.user_email}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {session.last_message || 'No messages yet'}
                          </p>
                        </div>
                        {session.unread_admin_count > 0 && (
                          <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                            {session.unread_admin_count}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p>No active chats</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-md flex flex-col">
            {selectedSession ? (
              <>
                <div className="p-4 border-b border-gray-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">
                      {selectedSession.user_name || selectedSession.user_email}
                    </h3>
                    <p className="text-xs text-gray-500">{selectedSession.user_email}</p>
                  </div>
                </div>

                <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                      <p>Start the conversation</p>
                    </div>
                  ) : (
                    messages.map((msg, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${msg.sender === 'admin' ? 'order-2' : ''}`}>
                          <div className={`rounded-lg p-3 ${
                            msg.sender === 'admin'
                              ? 'bg-accent text-white'
                              : 'bg-gray-100 text-primary'
                          }`}>
                            <p>{msg.message}</p>
                          </div>
                          <p className={`text-xs text-gray-400 mt-1 ${
                            msg.sender === 'admin' ? 'text-right' : ''
                          }`}>
                            {formatTime(msg.created_at)}
                          </p>
                        </div>
                      </motion.div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendChat} className="p-4 border-t border-gray-200">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your reply..."
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
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p>Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesManager;