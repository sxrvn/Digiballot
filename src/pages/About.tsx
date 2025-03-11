import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Lock, Award, CheckCircle, BarChart } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            About DigiBallot
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Empowering democracy through secure and accessible digital voting
          </motion.p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              To revolutionize the electoral process by providing a secure, transparent, and accessible digital voting platform that ensures every citizen's voice is heard.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16">
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
                  <div className="md:w-1/3 relative bg-gradient-to-r from-blue-500 to-blue-600 p-8 flex items-center justify-center">
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
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-orange-600">Expertise</h4>
                          <p className="text-sm text-gray-600 mt-1">React, Node.js, Tailwind CSS, TypeScript</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4">
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
        </div>
      </div>

      {/* Timeline Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our mission to modernize democracy
            </p>
          </div>

          <div className="space-y-8">
            {timeline.map((event, index) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-8"
              >
                <div className="w-24 text-right">
                  <div className="text-xl font-bold text-blue-600">{event.year}</div>
                </div>
                <div className="w-4 h-4 rounded-full bg-blue-600 relative">
                  <div className="absolute w-px h-full bg-blue-200 left-1/2 transform -translate-x-1/2 -z-10"></div>
                </div>
                <div className="flex-1 bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600">{event.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: Shield,
    title: 'Secure Voting',
    description: 'End-to-end encryption and blockchain technology ensure the integrity of every vote.',
  },
  {
    icon: Users,
    title: 'Inclusive Democracy',
    description: 'Accessible platform design that caters to all citizens, including those with disabilities.',
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Advanced security measures protect voter identity while maintaining transparency.',
  },
  {
    icon: Award,
    title: 'Election Integrity',
    description: 'Real-time monitoring and verification systems prevent electoral fraud.',
  },
  {
    icon: CheckCircle,
    title: 'Easy to Use',
    description: 'Intuitive interface that makes digital voting simple and straightforward.',
  },
  {
    icon: BarChart,
    title: 'Instant Results',
    description: 'Real-time vote counting and result declaration with complete transparency.',
  },
];

const stats = [
  { value: '100M+', title: 'Registered Voters' },
  { value: '99.99%', title: 'System Uptime' },
  { value: '28', title: 'States & UTs Covered' },
  { value: '100%', title: 'Voter Privacy' },
];

const timeline = [
  {
    year: '2020',
    title: 'Project Inception',
    description: 'DigiBallot was conceived as a solution to modernize India\'s electoral system.',
  },
  {
    year: '2021',
    title: 'Pilot Program',
    description: 'Successfully conducted pilot testing in select constituencies.',
  },
  {
    year: '2022',
    title: 'National Recognition',
    description: 'Received certification from the Election Commission of India.',
  },
  {
    year: '2023',
    title: 'Full Scale Launch',
    description: 'Implemented across all states and union territories.',
  },
  {
    year: '2024',
    title: 'General Elections',
    description: 'Successfully facilitated the world\'s largest digital democratic exercise.',
  },
];

{/* Add confetti animation keyframes */}
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