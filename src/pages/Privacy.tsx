import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck, Database, FileText } from 'lucide-react';

export const Privacy: React.FC = () => {
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
            Privacy Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-blue-100 max-w-3xl mx-auto"
          >
            Your privacy is our top priority. Learn how we protect your data and rights.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Key Privacy Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {privacyFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Privacy Policy Sections */}
        <div className="space-y-12">
          {privacySections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h2>
              <div className="prose prose-blue max-w-none">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16 bg-blue-50 rounded-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Have Questions About Your Privacy?</h2>
          <p className="text-gray-600 mb-6">
            Our dedicated privacy team is here to help you understand and exercise your rights.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Contact Privacy Team
          </a>
        </motion.div>

        {/* Last Updated */}
        <div className="mt-16 text-center text-gray-500">
          Last updated: March 15, 2024
        </div>
      </div>
    </div>
  );
};

const privacyFeatures = [
  {
    icon: Shield,
    title: 'Data Protection',
    description: 'Your personal information is encrypted and protected using state-of-the-art security measures.',
  },
  {
    icon: Lock,
    title: 'Secure Storage',
    description: 'All data is stored in secure servers with multiple layers of protection and regular security audits.',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We are completely transparent about how we collect, use, and protect your information.',
  },
  {
    icon: UserCheck,
    title: 'User Rights',
    description: 'You have full control over your data with rights to access, modify, or delete your information.',
  },
  {
    icon: Database,
    title: 'Limited Collection',
    description: 'We only collect information that is necessary for the voting process and verification.',
  },
  {
    icon: FileText,
    title: 'Clear Policies',
    description: 'Our privacy policies are written in clear, simple language that\'s easy to understand.',
  },
];

const privacySections = [
  {
    title: 'Information We Collect',
    content: (
      <div className="space-y-4">
        <p>
          We collect the following types of information to ensure secure and accurate voting:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personal identification details (name, date of birth, voter ID)</li>
          <li>Contact information (email address, phone number)</li>
          <li>Authentication data (encrypted passwords, security questions)</li>
          <li>Voting records (anonymized)</li>
          <li>Device and browser information for security purposes</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'How We Use Your Information',
    content: (
      <div className="space-y-4">
        <p>
          Your information is used exclusively for:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Voter verification and authentication</li>
          <li>Processing your vote securely</li>
          <li>Preventing electoral fraud</li>
          <li>Communicating important election information</li>
          <li>Improving our services and user experience</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Data Security Measures',
    content: (
      <div className="space-y-4">
        <p>
          We implement multiple layers of security to protect your data:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>End-to-end encryption for all data transmission</li>
          <li>Regular security audits and penetration testing</li>
          <li>Multi-factor authentication for access control</li>
          <li>Secure data centers with 24/7 monitoring</li>
          <li>Regular backup and disaster recovery procedures</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Your Rights and Choices',
    content: (
      <div className="space-y-4">
        <p>
          As a user, you have the right to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Access your personal information</li>
          <li>Request corrections to your data</li>
          <li>Delete your account and associated data</li>
          <li>Opt-out of non-essential communications</li>
          <li>File a complaint about data handling</li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Data Retention',
    content: (
      <div className="space-y-4">
        <p>
          We retain your information only for as long as necessary:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Account information: Until account deletion</li>
          <li>Voting records: As required by election laws</li>
          <li>Security logs: Up to 12 months</li>
          <li>Anonymized data: For analytical purposes</li>
        </ul>
      </div>
    ),
  },
]; 