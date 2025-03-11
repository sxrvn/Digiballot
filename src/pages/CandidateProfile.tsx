import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CandidateProfile {
  candidateId: string;
  fullName: string;
  partyName: string;
  constituency: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  registrationDate: string;
}

export const CandidateProfile: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<CandidateProfile | null>(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem('candidateProfile');
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      navigate('/candidate-registration');
    }
  }, [navigate]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 flex items-center justify-center">
        <div className="loading-chakra"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-rajdhani font-bold text-gray-900">
            Candidate Profile
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-white to-green-500 mx-auto mt-4"></div>
        </div>

        {/* ID Card */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {profile.fullName.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900">{profile.fullName}</h2>
                  <p className="text-gray-600">{profile.partyName}</p>
                </div>
              </div>
              <div className="bg-orange-50 px-4 py-2 rounded-full">
                <span className="text-orange-600 font-medium">ID: {profile.candidateId}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Constituency</h3>
                <p className="mt-1 text-lg text-gray-900">{profile.constituency}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Registration Date</h3>
                <p className="mt-1 text-lg text-gray-900">
                  {new Date(profile.registrationDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                  <div className="mt-2 space-y-2">
                    <p className="text-gray-900">{profile.email}</p>
                    <p className="text-gray-900">{profile.phone}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="mt-2 text-gray-900">{profile.address}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${
                  profile.status === 'Pending Verification' ? 'bg-yellow-400' : 'bg-green-400'
                }`}></div>
                <span className="ml-2 text-sm font-medium text-gray-600">
                  {profile.status}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700"
              >
                Print ID Card
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-500">✓</div>
                <span className="ml-3 text-gray-600">Identity Verified</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-500">⋯</div>
                <span className="ml-3 text-gray-600">Background Check in Progress</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">○</div>
                <span className="ml-3 text-gray-600">Party Affiliation Pending</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
            <ol className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-medium">1</span>
                <span className="ml-3 text-gray-600">Complete verification process</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-medium">2</span>
                <span className="ml-3 text-gray-600">Submit additional documents if requested</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-medium">3</span>
                <span className="ml-3 text-gray-600">Attend orientation session</span>
              </li>
            </ol>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};