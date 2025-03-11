import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: '',
    aadhaarNumber: '',
    mobileNumber: '',
    email: '',
    address: '',
    photo: null as File | null,
    aadhaarCard: null as File | null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real application, you would send the data to your backend here
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <img
              src="https://www.eci.gov.in/newimg/eci-logo.svg"
              alt="ECI Logo"
              className="h-20 mx-auto mb-4"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl p-8 text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-green-500" />
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            </motion.div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for registering to vote. Our team will verify your details within the next 48 hours.
            </p>

            <div className="bg-gradient-to-r from-orange-50 to-green-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Next Steps:</h3>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>You will receive a confirmation email with your Voter ID</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Keep your reference number safe for future communication</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Download our mobile app to track your application status</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <p className="text-sm font-medium text-blue-900">
                Reference Number:{' '}
                <span className="font-mono bg-white px-2 py-1 rounded">
                  {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </span>
              </p>
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/')}
                className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium"
              >
                Return Home
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.print()}
                className="flex-1 py-3 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-lg font-medium border border-gray-200"
              >
                Print Receipt
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <img
            src="https://www.eci.gov.in/newimg/eci-logo.svg"
            alt="ECI Logo"
            className="h-20 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-gray-900">Voter Registration</h1>
          <p className="mt-2 text-gray-600">Complete the form below to register as a voter</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name (as per Aadhaar)
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  required
                  pattern="[0-9]{12}"
                  maxLength={12}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.aadhaarNumber}
                  onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                  placeholder="12 digit Aadhaar number"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength={10}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                  placeholder="10 digit mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Residential Address
              </label>
              <textarea
                required
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Photo
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-300 transition-colors cursor-pointer" onClick={() => document.getElementById('photo-upload')?.click()}>
                  <div className="space-y-2 text-center">
                    {formData.photo ? (
                      <>
                        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                        <div className="flex flex-col text-sm text-gray-600">
                          <span className="text-green-600 font-medium">Photo uploaded!</span>
                          <span className="text-xs text-gray-500">{formData.photo.name}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-700">
                            <span>Upload a passport size photo</span>
                            <input
                              type="file"
                              id="photo-upload"
                              className="sr-only"
                              accept="image/*"
                              onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })}
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Aadhaar Card
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-300 transition-colors cursor-pointer" onClick={() => document.getElementById('aadhaar-upload')?.click()}>
                  <div className="space-y-2 text-center">
                    {formData.aadhaarCard ? (
                      <>
                        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                        <div className="flex flex-col text-sm text-gray-600">
                          <span className="text-green-600 font-medium">Aadhaar card uploaded!</span>
                          <span className="text-xs text-gray-500">{formData.aadhaarCard.name}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer rounded-md font-medium text-orange-600 hover:text-orange-700">
                            <span>Upload Aadhaar card scan</span>
                            <input
                              type="file"
                              id="aadhaar-upload"
                              className="sr-only"
                              accept=".pdf,image/*"
                              onChange={(e) => setFormData({ ...formData, aadhaarCard: e.target.files?.[0] || null })}
                            />
                          </label>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium"
              >
                Submit Registration
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}; 