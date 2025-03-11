import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check, AlertTriangle, Shield, HelpCircle, Search, Info, ArrowLeft, User, Box } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  party: string;
  symbol: string;
  photoUrl: string;
  constituency: string;
  partyLogo?: string;
}

interface ElectionData {
  id: string;
  title: string;
  date: string;
  constituencies: string[];
  type: string;
  status: 'ongoing' | 'upcoming' | 'completed';
}

export const Vote: React.FC = () => {
  const [step, setStep] = useState<number>(() => {
    return parseInt(localStorage.getItem('voteStep') || '1');
  });
  const [elections, setElections] = useState<ElectionData[]>([]);
  const [selectedElection, setSelectedElection] = useState<ElectionData | null>(() => {
    const saved = localStorage.getItem('selectedElection');
    return saved ? JSON.parse(saved) : null;
  });
  const [constituency, setConstituency] = useState<string>(() => {
    return localStorage.getItem('constituency') || '';
  });
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(() => {
    const saved = localStorage.getItem('selectedCandidate');
    return saved ? JSON.parse(saved) : null;
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [voteConfirmed, setVoteConfirmed] = useState<boolean>(false);
  const [voteSuccess, setVoteSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [helpOpen, setHelpOpen] = useState<boolean>(false);
  const [showSecurityInfo, setShowSecurityInfo] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [verificationTimer, setVerificationTimer] = useState<number>(0);
  const [constituencyFilter, setConstituencyFilter] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [otpVerified, setOtpVerified] = useState<boolean>(false);

  // Save state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('voteStep', step.toString());
  }, [step]);

  useEffect(() => {
    if (selectedElection) {
      localStorage.setItem('selectedElection', JSON.stringify(selectedElection));
    }
  }, [selectedElection]);

  useEffect(() => {
    localStorage.setItem('constituency', constituency);
  }, [constituency]);

  useEffect(() => {
    if (selectedCandidate) {
      localStorage.setItem('selectedCandidate', JSON.stringify(selectedCandidate));
    }
  }, [selectedCandidate]);

  // Mock data loading - would be replaced with real API calls
  useEffect(() => {
    setTimeout(() => {
      setElections([
        {
          id: 'ge2024',
          title: 'General Elections 2024',
          date: '2024-05-15',
          constituencies: ['Mumbai North', 'Mumbai South', 'Delhi East', 'Delhi West', 'Bangalore Central'],
          type: 'Parliamentary',
          status: 'ongoing'
        },
        {
          id: 'mh2024',
          title: 'Maharashtra State Elections 2024',
          date: '2024-06-20',
          constituencies: ['Andheri', 'Borivali', 'Juhu', 'Bandra'],
          type: 'Assembly',
          status: 'upcoming'
        }
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    if (selectedElection && constituency) {
      setLoading(true);
      // Simulate API call for candidates
      setTimeout(() => {
        setCandidates([
          {
            id: 'c1',
            name: 'Rajesh Kumar',
            party: 'Bharatiya Janata Party',
            symbol: '🪷',
            photoUrl: 'data:image/webp;base64,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',
            constituency: constituency,
            partyLogo: 'https://logos-world.net/wp-content/uploads/2022/06/BJP-Logo-700x394.png'
          },
          {
            id: 'c2',
            name: 'Priya Singh',
            party: 'Indian National Congress',
            symbol: '✋',
            photoUrl: 'https://www.imageshine.in/uploads/gallery/Priyanka-Gandhi-Vadra-Png.png',
            constituency: constituency,
            partyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Indian_National_Congress_hand_logo.svg/300px-Indian_National_Congress_hand_logo.svg.png'
          },
          {
            id: 'c3',
            name: 'Amit Patel',
            party: 'Aam Aadmi Party',
            symbol: '🧹',
            photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQiy3gYJm_zPQSxpAzRJ9u1XS-havYZk0X_g&s',
            constituency: constituency,
            partyLogo: 'https://bsmedia.business-standard.com/_media/bs/img/article/2022-11/16/full/1668586087-9156.jpg?im=FitAndFill=(826,465)'
          },
          {
            id: 'c4',
            name: 'Sunita Verma',
            party: 'Shiv Sena',
            symbol: '🏹',
            photoUrl: 'data:image/jpeg;base64,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',
            constituency: constituency,
            partyLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Logo_of_Shiv_Sena.svg/1200px-Logo_of_Shiv_Sena.svg.png'
          },
          {
            id: 'c5',
            name: 'Mohammed Khan',
            party: 'Nationalist Congress Party',
            symbol: '⏰',
            photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHvMQumJMXUgcBagMA_cJq9jv6pcaxXNuXhw&s',
            constituency: constituency,
            partyLogo: 'https://www.flagcolorcodes.com/data/Flag-of-Nationalist-Congress-Party.png'
          },
          {
            id: 'c6',
            name: 'NOTA',
            party: 'None of the Above',
            symbol: '',
            photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/NOTA_Option_Logo.svg/440px-NOTA_Option_Logo.svg.png',
            constituency: constituency,
            partyLogo: ''
          }
        ]);
        setLoading(false);
      }, 1000);
    }
  }, [selectedElection, constituency]);

  useEffect(() => {
    if (step === 3 && !isVerified) {
      const interval = setInterval(() => {
        setVerificationTimer(prev => {
          if (prev < 100) {
            return prev + 5;
          } else {
            clearInterval(interval);
            setIsVerified(true);
            return 100;
          }
        });
      }, 150);
      return () => clearInterval(interval);
    }
  }, [step, isVerified]);

  const filteredCandidates = candidates.filter(
    candidate => 
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.party.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const nextStep = () => {
    if (step === 1 && !selectedElection) {
      setError('Please select an election to continue');
      return;
    }
    if (step === 2 && !constituency) {
      setError('Please select your constituency to continue');
      return;
    }
    if (step === 4 && !selectedCandidate) {
      setError('Please select a candidate to continue');
      return;
    }

    setError(null);
    setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSelectElection = (election: ElectionData) => {
    setSelectedElection(election);
    setError(null);
  };

  const handleSelectConstituency = (constituencyName: string) => {
    setConstituency(constituencyName);
    setError(null);
  };

  const handleSelectCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setError(null);
  };

  const handleConfirmVote = async () => {
    if (!otpVerified) {
      setError('Please verify your OTP before casting your vote');
      return;
    }
    setVoteConfirmed(true);
    // Simulate voting process
    setTimeout(() => {
      setVoteSuccess(true);
    }, 2000);
  };

  const sendOTP = async () => {
    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1500);
  };

  const verifyOTP = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }
    setLoading(true);
    // Simulate OTP verification
    setTimeout(() => {
      setOtpVerified(true);
      setLoading(false);
      setError(null);
    }, 1500);
  };

  const resetVoting = () => {
    setStep(1);
    setSelectedElection(null);
    setConstituency('');
    setCandidates([]);
    setSelectedCandidate(null);
    setVoteConfirmed(false);
    setVoteSuccess(false);
    setIsVerified(false);
    setVerificationTimer(0);
    setOtpSent(false);
    setOtp('');
    setOtpVerified(false);
    // Clear localStorage
    localStorage.removeItem('voteStep');
    localStorage.removeItem('selectedElection');
    localStorage.removeItem('constituency');
    localStorage.removeItem('selectedCandidate');
  };

  const renderStepIndicator = () => {
    const steps = ['Select Election', 'Choose Constituency', 'Verify Identity', 'Cast Vote', 'Confirmation'];
    
    return (
      <div className="w-full mb-10">
        <div className="flex justify-between items-center relative">
          {steps.map((stepLabel, index) => {
            const isActive = index + 1 === step;
            const isCompleted = index + 1 < step;

            return (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center z-10">
                  <motion.div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-white ${isActive ? 'bg-blue-600' : isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}
                    animate={{ 
                      scale: isActive ? [1, 1.1, 1] : 1,
                      backgroundColor: isActive ? '#2563EB' : isCompleted ? '#22C55E' : '#D1D5DB'
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
                  </motion.div>
                  <span className={`mt-2 text-xs sm:text-sm ${isActive ? 'text-blue-600 font-medium' : isCompleted ? 'text-green-500' : 'text-gray-500'}`}>
                    {stepLabel}
                  </span>
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch(step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Select an Election</h2>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <motion.div 
                  className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : (
              <div className="grid gap-4">
                {elections.map(election => (
                  <motion.div
                    key={election.id}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedElection?.id === election.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.01, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    onClick={() => handleSelectElection(election)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-medium text-gray-900">{election.title}</h3>
                        <p className="text-gray-600 mt-1">{election.type} • {new Date(election.date).toLocaleDateString()}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        election.status === 'ongoing' ? 'bg-green-100 text-green-800' : 
                        election.status === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {election.status === 'ongoing' ? 'Voting Open' : 
                         election.status === 'upcoming' ? 'Coming Soon' : 'Closed'}
                      </div>
                    </div>
                    <p className="mt-3 text-gray-600">{election.constituencies.length} constituencies</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Your Constituency</h2>
            
            {selectedElection && (
              <>
                <div className="bg-blue-50 p-4 rounded-lg mb-6">
                  <p className="font-medium text-blue-700">{selectedElection.title}</p>
                  <p className="text-blue-600">Election Date: {new Date(selectedElection.date).toLocaleDateString()}</p>
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search for your constituency..."
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={constituencyFilter}
                      onChange={(e) => setConstituencyFilter(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedElection.constituencies
                    .filter(c => c.toLowerCase().includes(constituencyFilter.toLowerCase()))
                    .map(c => (
                      <motion.div
                        key={c}
                        className={`p-4 rounded-lg border-2 cursor-pointer ${
                          constituency === c ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => handleSelectConstituency(c)}
                      >
                        <h3 className="font-medium text-gray-900">{c}</h3>
                      </motion.div>
                    ))
                  }
                </div>
              </>
            )}
          </motion.div>
        );
      
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Verify Your Identity</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex flex-col md:flex-row md:justify-between">
                <p className="font-medium text-blue-700">{selectedElection?.title}</p>
                <p className="text-blue-600">Constituency: {constituency}</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                {isVerified ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Identity Verified!</h3>
                    <p className="text-gray-600 mb-6">Your identity has been successfully verified. You can now proceed to vote.</p>
                  </motion.div>
                ) : (
                  <>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Verifying Your Identity</h3>
                    <p className="text-gray-600 mb-6 text-center">Please wait while we verify your identity through Aadhaar authentication...</p>
                    
                    <div className="w-full max-w-md bg-gray-200 rounded-full h-4 mb-6">
                      <motion.div 
                        className="bg-blue-600 h-4 rounded-full" 
                        style={{ width: `${verificationTimer}%` }}
                      />
                    </div>

                    <div className="text-gray-500 text-sm animate-pulse">
                      Connecting to UIDAI servers...
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-start">
              <div 
                className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3 cursor-pointer"
                onClick={() => setShowSecurityInfo(!showSecurityInfo)}
              >
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Your privacy is protected</h4>
                {showSecurityInfo && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-sm text-gray-600 mt-1"
                  >
                    We use end-to-end encryption and zero-knowledge proofs to verify your identity while preserving your anonymity.
                    Your vote cannot be traced back to your identity. Learn more about our <a href="/security" className="text-blue-600 hover:underline">security measures</a>.
                  </motion.p>
                )}
              </div>
            </div>
          </motion.div>
        );
      
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Cast Your Vote</h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex flex-col md:flex-row md:justify-between">
                <p className="font-medium text-blue-700">{selectedElection?.title}</p>
                <p className="text-blue-600">Constituency: {constituency}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search candidates by name or party..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-12">
                <motion.div 
                  className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCandidates.map(candidate => (
                  <motion.div
                    key={candidate.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedCandidate?.id === candidate.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleSelectCandidate(candidate)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img 
                            src={candidate.photoUrl} 
                            alt={candidate.name} 
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200" 
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="font-medium text-gray-900">{candidate.name}</h3>
                          <p className="text-gray-600">{candidate.party}</p>
                        </div>
                      </div>
                      {candidate.party !== 'None of the Above' && (
                        <div className="flex-shrink-0">
                          {candidate.partyLogo ? (
                            <img 
                              src={candidate.partyLogo} 
                              alt={`${candidate.party} logo`} 
                              className="h-12 w-auto object-contain" 
                            />
                          ) : (
                            <span className="text-3xl">{candidate.symbol}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="mt-6 border-t border-dashed border-gray-300 pt-6">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600">
                  Your vote is confidential. Once cast, it cannot be changed. Please review your selection carefully before proceeding.
                </p>
              </div>
            </div>
          </motion.div>
        );
      
      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Confirm Your Vote</h2>
            
            {!voteConfirmed ? (
              <>
                <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-200">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
                    <p className="text-yellow-700">
                      Please verify your phone number with OTP before casting your vote.
                    </p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Your Selection</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Election</p>
                      <p className="font-medium text-gray-900">{selectedElection?.title}</p>
                    </div>
                    
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Constituency</p>
                      <p className="font-medium text-gray-900">{constituency}</p>
                    </div>
                  </div>

                  <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img 
                          src={selectedCandidate?.photoUrl} 
                          alt={selectedCandidate?.name} 
                          className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md" 
                        />
                      </div>
                      <div className="ml-4">
                        {selectedCandidate?.partyLogo ? (
                          <img 
                            src={selectedCandidate?.partyLogo} 
                            alt={`${selectedCandidate?.party} logo`} 
                            className="h-10 w-auto mb-2 object-contain" 
                          />
                        ) : (
                          <span className="inline-block text-3xl mb-2">{selectedCandidate?.symbol}</span>
                        )}
                        <h4 className="text-xl font-bold text-gray-900">{selectedCandidate?.name}</h4>
                        <p className="text-blue-600 font-medium">{selectedCandidate?.party}</p>
                      </div>
                    </div>
                  </div>

                  {/* OTP Verification Section */}
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">OTP Verification</h4>
                    
                    {!otpSent ? (
                      <div>
                        <p className="text-gray-600 mb-4">Click the button below to receive an OTP on your registered mobile number.</p>
                        <button
                          onClick={sendOTP}
                          disabled={loading}
                          className={`px-6 py-2 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                        >
                          {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                      </div>
                    ) : !otpVerified ? (
                      <div>
                        <p className="text-gray-600 mb-4">Enter the 6-digit OTP sent to your registered mobile number.</p>
                        <div className="flex items-center space-x-4">
                          <input
                            type="text"
                            maxLength={6}
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            className="w-48 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter OTP"
                          />
                          <button
                            onClick={verifyOTP}
                            disabled={loading || otp.length !== 6}
                            className={`px-6 py-2 rounded-lg text-white ${loading || otp.length !== 6 ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition-colors`}
                          >
                            {loading ? 'Verifying...' : 'Verify OTP'}
                          </button>
                        </div>
                        <button
                          onClick={sendOTP}
                          disabled={loading}
                          className="mt-4 text-blue-600 text-sm hover:underline"
                        >
                          Resend OTP
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-600">
                        <Check className="w-5 h-5 mr-2" />
                        OTP Verified Successfully
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Change Selection
                  </button>
                  
                  <motion.button
                    onClick={handleConfirmVote}
                    disabled={!otpVerified}
                    className={`px-8 py-3 rounded-lg text-white ${!otpVerified ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} focus:ring-4 focus:ring-blue-200 transition-colors`}
                    whileHover={otpVerified ? { scale: 1.05 } : {}}
                    whileTap={otpVerified ? { scale: 0.95 } : {}}
                  >
                    Confirm Vote
                  </motion.button>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                {voteSuccess ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-12 h-12 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Vote Successful!</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto">
                      Your vote has been securely recorded. Thank you for participating in the democratic process.
                    </p>
                    
                    <div className="bg-green-50 p-6 rounded-xl border border-green-100 max-w-md mx-auto mb-8">
                      <h4 className="font-medium text-green-800 mb-2">Vote Receipt</h4>
                      <p className="text-green-600 mb-1">
                        Confirmation ID: {Math.random().toString(36).substring(2, 12).toUpperCase()}
                      </p>
                      <p className="text-green-600 mb-1">
                        Date: {new Date().toLocaleDateString()}
                      </p>
                      <p className="text-green-600">
                        Time: {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                    
                    <button
                      onClick={resetVoting}
                      className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Return to Homepage
                    </button>
                  </motion.div>
                ) : (
                  <div>
                    <motion.div 
                      className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-6"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">Processing Your Vote</h3>
                    <p className="text-gray-600">Please wait while we securely record your vote...</p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with gradient */}
          <div className="text-center mb-8">
            <div className="mb-1">
              <img
                src="https://i.ibb.co/32tQg3m/Your-paragraph-text-1.png"
                alt="Cast Your Vote"
                className="w-44 h-34 object-contain mx-auto"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Cast Your Vote</h1>
            <p className="mt-2 text-gray-600 max-w-2xl mx-auto">
              Your voice matters. Vote securely and confidentially on India's leading electronic voting platform.
            </p>
          </div>

          {renderStepIndicator()}

          {/* Content container */}
          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-200">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-3 bg-red-50 text-red-700 rounded-lg flex items-center"
              >
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Navigation buttons */}
            {step < 5 && !voteConfirmed && (
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <button
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </button>
                ) : (
                  <div></div>
                )}

                {step === 3 && !isVerified ? (
                  <button
                    disabled
                    className="px-6 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                  >
                    Verifying...
                  </button>
                ) : (
                  <motion.button
                    onClick={nextStep}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={step === 3 && !isVerified}
                  >
                    {step === 4 ? 'Review Vote' : 'Continue'}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </motion.button>
                )}
              </div>
            )}
          </div>

          {/* Help button */}
          <div className="fixed bottom-6 right-6">
            <div className="relative">
              <motion.button
                onClick={() => setHelpOpen(!helpOpen)}
                className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <HelpCircle className="w-6 h-6" />
              </motion.button>

              <AnimatePresence>
                {helpOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-lg p-4 border border-gray-200"
                  >
                    <h4 className="font-medium text-gray-900 mb-2">Need Help?</h4>
                    <p className="text-gray-600 text-sm mb-3">
                      If you're experiencing any issues with the voting process, please contact our support.
                    </p>
                    <div className="pt-2 border-t border-gray-100">
                      <a href="/help" className="text-blue-600 text-sm font-medium hover:underline flex items-center">
                        Visit Help Center
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};