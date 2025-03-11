import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../App';
import { Shield, Zap, BarChart3, Globe2, ChevronDown, Play, Download, MessageCircle, Phone, HelpCircle, CheckCircle } from 'lucide-react';
import { LoginPopup } from '../components/LoginPopup';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'te', name: 'తెలుగు' },
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const handleGetStarted = () => {
    setShowLoginPopup(true);
  };

  const handleLogin = () => {
    login();
    setShowLoginPopup(false);
    navigate('/dashboard');
  };

  const handleSubmitMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSubmitted(true);
    setTimeout(() => setMessageSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img src="https://www.eci.gov.in/newimg/eci-logo.svg" alt="DigiBallot" className="h-10 w-auto" />
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#how-to-vote" className="text-gray-600 hover:text-gray-900">How to Vote</a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              <div className="relative">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                >
                  <Globe2 className="w-4 h-4" />
                  <span>{selectedLanguage.name}</span>
                  <ChevronDown className={`w-4 h-4 transform transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang);
                          setIsLanguageOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-32 pb-32 min-h-[600px]">
  <div className="absolute inset-0 bg-gradient-to-r from-orange-100/90 to-orange-50/50 backdrop-blur-3xl" />
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-black">Your Vote, Your Voice – </span>
                <span className="bg-gradient-to-r from-[#FF9933] to-[#FF5722] text-transparent bg-clip-text">Securely Cast Your</span>{' '}
                <span className="bg-gradient-to-r from-[#138808] to-[#0D6E0D] text-transparent bg-clip-text">Vote Online</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600">
                Experience the future of democracy with our secure, accessible, and verified online voting platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleGetStarted}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg"
                >
                  Login to Vote
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 bg-white text-gray-800 rounded-full text-lg font-medium hover:bg-gray-50 transition-all shadow-lg border border-gray-200"
                >
                  Register Now
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="https://wpblogassets.paytm.com/paytmblog/uploads/2023/11/Blog_Paytm_Voter-ID-Verification-_-Voter-Card-Verification-Online-2020.jpg"
                alt="Diverse group of Indian voters"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustBadges.map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="flex-shrink-0">
                  <badge.icon className="w-8 h-8 text-orange-500" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{badge.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">{badge.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Vote */}
      <section id="how-to-vote" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Simple Steps to Cast Your Vote</h2>
            <p className="mt-4 text-lg text-gray-600">Follow these easy steps to participate in the election</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Video Tutorial */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.youtube.com/embed/your-video-id"
                  title="How to Vote Tutorial"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              <div className="p-3">
                <p className="text-gray-600 text-sm">Learn how to cast your vote in this detailed video guide</p>
              </div>
            </div>

            {/* Steps List */}
            <div className="space-y-8">
              {votingSteps.map((step, index) => (
                <div key={step.title} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full flex items-center justify-center font-semibold shadow-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="mt-1 text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {liveStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-xl" />
                <div className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 text-transparent bg-clip-text">{stat.value}</div>
                <div className="mt-2 text-gray-600 font-medium">{stat.title}</div>
                <div className="mt-1 text-sm text-gray-500">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet the Developer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The driving force behind DigiBallot's development and innovation
            </p>
          </div>

          {/* Lead Developer Profile - Modern Horizontal Design */}
          <div className="flex justify-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-full max-w-4xl"
            >
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Left Section with Image and Gradient */}
                  <div className="md:w-1/3 relative bg-gradient-to-r from-orange-500 to-orange-600 p-8 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative flex flex-col items-center"
                    >
                      <img
                        src="https://i.ibb.co/8gk2fg37/Shravan.jpg"
                        alt="Shravan Kondekar"
                        className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-xl"
                      />
                      <div className="mt-4">
                        <span className="px-6 py-2 bg-white text-orange-600 text-sm font-semibold rounded-full shadow-lg whitespace-nowrap">
                          Lead Developer
                        </span>
                      </div>
                      {/* Confetti Elements */}
                      <div className="absolute -top-4 -left-4">
                        <div className="w-3 h-3 bg-orange-400 rounded-full animate-confetti-1" />
                      </div>
                      <div className="absolute -top-4 right-0">
                        <div className="w-2 h-2 bg-orange-300 rounded-full animate-confetti-2" />
                      </div>
                      <div className="absolute top-0 left-1/2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-confetti-3" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Right Section with Content */}
                  <div className="md:w-2/3 p-8">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Shravan Kondekar</h3>
                      <p className="text-orange-600 font-medium mt-1">Full Stack Developer</p>

                      <div className="mt-4">
                        <p className="text-gray-600">
                          Passionate about creating secure and user-friendly applications that make a difference. 
                          Leading the development of DigiBallot with a focus on security and accessibility.
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-4">
                        <div className="bg-orange-50 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-600">Expertise</h4>
                          <p className="text-sm text-gray-600 mt-1">React, Node.js, Tailwind CSS, TypeScript</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-600">Experience</h4>
                          <p className="text-sm text-gray-600 mt-1">Building Scalable Web & Mobile Solutions :)</p>
                        </div>
                      </div>

                      <div className="mt-6 flex space-x-4">
                        <a 
                          href="https://github.com/sxrvn" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                          <span>GitHub</span>
                        </a>
                        <a 
                          href="https://www.linkedin.com/in/shravan-kondekar/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                          <span>LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <style>
            {`
              @keyframes confetti-1 {
                0% { transform: translate(0, 0) rotate(0deg); }
                100% { transform: translate(-20px, -50px) rotate(360deg); }
              }
              @keyframes confetti-2 {
                0% { transform: translate(0, 0) rotate(0deg); }
                100% { transform: translate(20px, -40px) rotate(-360deg); }
              }
              @keyframes confetti-3 {
                0% { transform: translate(0, 0) rotate(0deg); }
                100% { transform: translate(0, -60px) rotate(180deg); }
              }
              .animate-confetti-1 {
                animation: confetti-1 1s ease-out infinite;
              }
              .animate-confetti-2 {
                animation: confetti-2 1.2s ease-out infinite;
              }
              .animate-confetti-3 {
                animation: confetti-3 0.8s ease-out infinite;
              }
            `}
          </style>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="mt-4 text-gray-600">Find answers to common questions about online voting</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      activeFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Need Help?</h2>
              <p className="mt-4 text-gray-600">
                Our support team is here to assist you with any questions or concerns
              </p>
              <div className="mt-8 space-y-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-orange-500" />
                  <span className="ml-4 text-gray-600">Toll-free: 1800-XXX-XXXX</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="w-6 h-6 text-orange-500" />
                  <span className="ml-4 text-gray-600">Chat with us</span>
                </div>
                <div className="flex items-center">
                  <HelpCircle className="w-6 h-6 text-orange-500" />
                  <span className="ml-4 text-gray-600">Visit Help Center</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
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
                <form onSubmit={handleSubmitMessage} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  ></textarea>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <LoginPopup
        isOpen={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};

const trustBadges = [
  {
    icon: Shield,
    title: 'End-to-End Encryption',
    description: 'Your vote is protected with military-grade encryption',
  },
  {
    icon: Zap,
    title: 'Instant Verification',
    description: 'Real-time verification with Aadhaar',
  },
  {
    icon: BarChart3,
    title: 'Live Updates',
    description: 'Track election progress in real-time',
  },
];

const votingSteps = [
  {
    title: 'Register with Aadhaar',
    description: 'Link your Aadhaar card for instant verification',
  },
  {
    title: 'Verify Your Identity',
    description: 'Complete biometric verification for security',
  },
  {
    title: 'Cast Your Vote',
    description: 'Select your candidate and confirm your choice',
  },
  {
    title: 'Get Confirmation',
    description: 'Receive instant confirmation of your vote',
  },
];

const liveStats = [
  {
    value: '12.5M+',
    title: 'Votes Cast Nationwide',
    description: 'Secure digital votes recorded across India'
  },
  {
    value: '99.99%',
    title: 'System Uptime',
    description: 'Ensuring uninterrupted voting access'
  },
  {
    value: '24/7',
    title: 'Support Available',
    description: 'Round-the-clock assistance for voters'
  },
];

const faqs = [
  {
    question: 'Is my vote anonymous?',
    answer: 'Yes, your vote is completely anonymous. Our system uses advanced encryption to separate your identity from your vote while maintaining the integrity of the election.',
  },
  {
    question: 'What if I face technical issues?',
    answer: 'Our 24/7 support team is available to help you with any technical issues. You can reach us through chat, phone, or email.',
  },
  {
    question: 'How is my vote protected?',
    answer: 'We use end-to-end encryption and blockchain technology to ensure your vote cannot be tampered with. Each vote is verified and recorded securely.',
  },
  {
    question: 'Can I vote from anywhere?',
    answer: 'Yes, you can vote from anywhere using any device with an internet connection. The system is designed to be accessible and user-friendly.',
  },
];