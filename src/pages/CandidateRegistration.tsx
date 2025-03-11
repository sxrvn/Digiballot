import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CandidateForm {
  fullName: string;
  partyName: string;
  constituency: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  idProof: File | null;
  photo: File | null;
}

export const CandidateRegistration: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CandidateForm>({
    fullName: '',
    partyName: '',
    constituency: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    idProof: null,
    photo: null,
  });

  const [previewUrls, setPreviewUrls] = useState({
    idProof: '',
    photo: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setPreviewUrls((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(files[0]),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Generate a unique candidate ID
    const candidateId = `CAND${Date.now().toString().slice(-6)}`;
    
    // In a real application, you would send this data to your backend
    // For now, we'll simulate by storing in localStorage
    localStorage.setItem('candidateProfile', JSON.stringify({
      ...formData,
      candidateId,
      status: 'Pending Verification',
      registrationDate: new Date().toISOString(),
    }));

    // Navigate to the profile page
    navigate('/candidate-profile');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50 py-12"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-rajdhani font-bold text-gray-900">
                Candidate Registration
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 via-white to-green-500 mx-auto mt-4"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-gray-700">Party Name</label>
                  <input
                    type="text"
                    name="partyName"
                    required
                    value={formData.partyName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="block text-sm font-medium text-gray-700">Constituency</label>
                  <input
                    type="text"
                    name="constituency"
                    required
                    value={formData.constituency}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">ID Proof</label>
                  <input
                    type="file"
                    name="idProof"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="mt-1 block w-full"
                    required
                  />
                  {previewUrls.idProof && (
                    <img src={previewUrls.idProof} alt="ID Preview" className="mt-2 h-32 object-cover rounded-lg" />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Photo</label>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full"
                    required
                  />
                  {previewUrls.photo && (
                    <img src={previewUrls.photo} alt="Photo Preview" className="mt-2 h-32 object-cover rounded-lg" />
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-lg font-medium hover:from-orange-600 hover:to-orange-700 transition-all"
                >
                  Submit Registration
                </motion.button>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};