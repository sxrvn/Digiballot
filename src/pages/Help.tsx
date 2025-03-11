import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Book, MessageCircle, FileText, HelpCircle, 
  ChevronDown, Phone, Mail, ExternalLink, ArrowRight, 
  CheckCircle, X, AlertTriangle 
} from 'lucide-react';

export const Help: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [activeChatbot, setActiveChatbot] = useState(false);
  const [messageSubmitted, setMessageSubmitted] = useState(false);

  const filteredArticles = popularArticles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedbackSubmitted(true);
    setTimeout(() => setFeedbackSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Help Center Header */}
        <div className="bg-gradient-to-r from-gray-900 to-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              How can we help you?
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto"
            >
              <div className="relative mt-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-4 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-300 focus:outline-none text-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap justify-center gap-4">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="px-4 py-2 rounded-lg hover:bg-gray-100 flex items-center"
                >
                  <link.icon className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{link.label}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Help Categories */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Help Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {helpCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                  className="bg-white rounded-xl shadow-md p-6 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                    <category.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <a
                    href={category.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
      </div>

        {/* Video Tutorial Section */}
        <div className="bg-white py-16" id="tutorial">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Watch Tutorial
            </h2>
            <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/demo-video-id"
                title="DigiBallot Tutorial"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <p className="mt-6 text-center text-gray-600">
              Learn how to use DigiBallot in this comprehensive video guide
            </p>
          </div>
        </div>

        {/* Popular Articles */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Popular Articles
          </h2>
            {searchQuery && (
              <div className="mb-6 text-center">
                <p className="text-gray-600">
                  Showing results for: <span className="font-medium">{searchQuery}</span>
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article, index) => (
                  <motion.a
                    key={article.title}
                    href={article.link}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="flex-1">
                      <div className="flex items-start mb-4">
                        <div className="p-2 rounded-lg bg-blue-100 mr-4">
                          <FileText className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{article.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100">
                      <span className="text-sm text-gray-500">Last updated: {article.updated}</span>
                      <div className="inline-flex items-center text-blue-600">
                        Read more <ExternalLink className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </motion.a>
                ))
              ) : (
                <div className="col-span-2 bg-white rounded-xl shadow-md p-8 text-center">
                  <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                  <p className="text-gray-600">
                    We couldn't find any articles matching "{searchQuery}". Try a different search term or browse the categories above.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transform transition-transform ${
                        activeFaq === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: activeFaq === index ? 'auto' : 0,
                      opacity: activeFaq === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                      {faq.helpfulLinks && (
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-2">Related articles:</p>
                          <ul className="space-y-1">
                            {faq.helpfulLinks.map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <a href={link.url} className="text-sm text-blue-600 hover:text-blue-800 flex items-center">
                                  <ArrowRight className="w-3 h-3 mr-2" />
                                  {link.title}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Need More Help?
                </h2>
                <p className="text-gray-600 mb-8">
                  Our support team is here to assist you with any questions or concerns about the voting process.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                      <Phone className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Call us at</p>
                      <p className="text-lg font-medium text-gray-900">Toll-free: 1800-XXX-XXXX</p>
                      <p className="text-sm text-gray-500">Available 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email us at</p>
                      <p className="text-lg font-medium text-gray-900">support@digiballot.in</p>
                      <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Feedback Form */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Send us a message</h3>
                {messageSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-medium text-gray-900 mb-2">Thank you for your message!</h4>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    setMessageSubmitted(true);
                    setTimeout(() => setMessageSubmitted(false), 5000);
                  }} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Your comments (optional)
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Tell us what we can improve..."
                      ></textarea>
              </div>
                    <button
                      type="submit"
                      className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Chatbot */}
      <div className="fixed bottom-6 right-6">
        {activeChatbot ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-white rounded-lg shadow-xl w-96 overflow-hidden"
          >
            <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
              <div className="flex items-center">
                <MessageCircle className="w-5 h-5 mr-2" />
                <span className="font-medium">Support Chat</span>
              </div>
              <button onClick={() => setActiveChatbot(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80 p-4 bg-gray-50 overflow-y-auto">
              <div className="flex mb-4">
                <div className="flex-shrink-0 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-blue-600 font-medium">VB</span>
                </div>
                <div className="ml-3 bg-white p-3 rounded-lg shadow-sm max-w-xs">
                  <p className="text-sm text-gray-800">
                    Hello! Welcome to DigiBallot support. How can I help you today?
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                  Send
            </button>
          </div>
        </div>
          </motion.div>
        ) : (
          <motion.button
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveChatbot(true)}
            className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center"
          >
            <MessageCircle className="w-8 h-8" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

const quickLinks = [
  { label: 'Getting Started', url: '/help/getting-started', icon: Book },
  { label: 'FAQs', url: '/help/faqs', icon: HelpCircle },
  { label: 'Contact Support', url: '/help/support', icon: MessageCircle },
  { label: 'Video Tutorials', url: '/help/tutorials', icon: FileText },
];

const helpCategories = [
  {
    icon: Book,
    title: 'Getting Started',
    description: 'Learn the basics of using DigiBallot and how to cast your first vote.',
    link: '/help/getting-started',
  },
  {
    icon: FileText,
    title: 'Watch Tutorial',
    description: 'Watch our comprehensive video guide on using DigiBallot.',
    link: '#tutorial',
    video: true,
  },
  {
    icon: HelpCircle,
    title: 'FAQs',
    description: 'Find answers to commonly asked questions about online voting.',
    link: '/help/faqs',
  },
  {
    icon: MessageCircle,
    title: 'Support',
    description: 'Get in touch with our support team for personalized assistance.',
    link: '/help/support',
  },
  {
    icon: FileText,
    title: 'Guides & Tutorials',
    description: 'Detailed guides on using all features of DigiBallot.',
    link: '/help/guides',
  },
];

const popularArticles = [
  {
    title: 'How to Register for Online Voting',
    excerpt: 'Step-by-step guide to register yourself as a voter using Aadhaar verification and the documents you need to provide.',
    link: '/help/articles/registration-guide',
    updated: 'July 15, 2023',
  },
  {
    title: 'Understanding Vote Security',
    excerpt: 'Learn about our end-to-end encryption and how we protect your vote from tampering and maintain anonymity.',
    link: '/help/articles/vote-security',
    updated: 'August 3, 2023',
  },
  {
    title: 'Troubleshooting Login Issues',
    excerpt: 'Common solutions for login and authentication problems, including password resets and biometric verification.',
    link: '/help/articles/login-issues',
    updated: 'June 22, 2023',
  },
  {
    title: 'Voter ID Verification Process',
    excerpt: 'Details about the voter verification process, requirements, and how to ensure your voter ID is properly linked.',
    link: '/help/articles/verification-process',
    updated: 'July 30, 2023',
  },
  {
    title: 'Accessibility Features for Voters with Disabilities',
    excerpt: 'How DigiBallot ensures inclusive voting with screen reader support, voice commands, and other accessibility options.',
    link: '/help/articles/accessibility-features',
    updated: 'August 10, 2023',
  },
  {
    title: 'What to Do if You Face Technical Issues While Voting',
    excerpt: 'Emergency support options and troubleshooting steps if you encounter problems during the voting process.',
    link: '/help/articles/technical-issues',
    updated: 'July 28, 2023',
  },
];

const faqs = [
  {
    question: 'Is my vote anonymous?',
    answer: 'Yes, your vote is completely anonymous. Our system uses advanced encryption to separate your identity from your vote while maintaining the integrity of the election. Even though we verify your identity before voting, the actual vote you cast is not linked to your personal information in our database.',
    helpfulLinks: [
      { title: 'Understanding Vote Security', url: '/help/articles/vote-security' },
      { title: 'How End-to-End Encryption Works', url: '/help/articles/encryption' },
    ],
  },
  {
    question: 'What documents do I need to register for online voting?',
    answer: 'To register for online voting, you need your Aadhaar card and a valid government-issued photo ID (like PAN card, driver\'s license, or passport). You\'ll also need access to the mobile number linked to your Aadhaar for OTP verification. For some constituencies, additional address proof might be required.',
    helpfulLinks: [
      { title: 'Registration Requirements', url: '/help/articles/registration-requirements' },
      { title: 'Acceptable ID Documents', url: '/help/articles/acceptable-ids' },
    ],
  },
  {
    question: 'How is my vote kept secure?',
    answer: 'We use multiple layers of security to protect your vote. This includes end-to-end encryption, blockchain technology for immutable record-keeping, and multi-factor authentication. Our system undergoes regular security audits by independent experts and is certified by the Election Commission of India.',
    helpfulLinks: [
      { title: 'Security Certifications', url: '/help/articles/security-certifications' },
      { title: 'Blockchain in Voting', url: '/help/articles/blockchain-voting' },
    ],
  },
  {
    question: 'Can I change my vote after casting it?',
    answer: 'No, once a vote is cast, it cannot be changed. This is to maintain the integrity of the election process. Before confirming your vote, you\'ll be shown a review screen to verify your selection. We recommend taking your time during this step to ensure your vote accurately reflects your choice.',
    helpfulLinks: [
      { title: 'Voting Process Overview', url: '/help/articles/voting-process' },
    ],
  },
  {
    question: 'What if I face technical issues while voting?',
    answer: 'If you encounter technical issues during voting, our 24/7 helpline (1800-XXX-XXXX) is available for immediate assistance. You can also use the live chat support on the website or app. Common issues like poor internet connectivity can be resolved by switching to a different network or using our low-bandwidth mode.',
    helpfulLinks: [
      { title: 'Troubleshooting Guide', url: '/help/articles/troubleshooting' },
      { title: 'Low-Bandwidth Voting Mode', url: '/help/articles/low-bandwidth-mode' },
    ],
  },
  {
    question: 'Can I vote from outside India?',
    answer: 'Yes, eligible Indian citizens living abroad can vote through DigiBallot. You need to have a valid Indian passport and be registered as an overseas voter with the Election Commission of India. Some additional verification steps may be required for international voters to confirm your identity and eligibility.',
    helpfulLinks: [
      { title: 'Overseas Voter Registration', url: '/help/articles/overseas-voting' },
      { title: 'NRI Voting Requirements', url: '/help/articles/nri-requirements' },
    ],
  },
];