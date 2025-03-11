export interface Party {
  id: string;
  name: string;
  shortName: string;
  symbol: string;
  foundingDate: string;
  status: 'National' | 'State' | 'Registered';
  ideology: string[];
  description: string;
  manifesto: string;
  leaders: Leader[];
  headquarters: string;
  socialMedia: {
    website?: string;
    twitter?: string;
    facebook?: string;
  };
}

export interface Leader {
  id: string;
  name: string;
  position: string;
  image: string;
  biography: string;
  achievements: string[];
  politicalExperience: string;
}

export interface Candidate {
  id: string;
  name: string;
  partyId: string;
  constituency: string;
  education: string[];
  experience: string;
  achievements: string[];
  image: string;
  criminalRecords: boolean;
  assets: {
    movable: number;
    immovable: number;
  };
  previousElections: {
    year: number;
    constituency: string;
    result: string;
    votesReceived: number;
    votingPercentage: number;
  }[];
}

export interface Constituency {
  id: string;
  name: string;
  state: string;
  type: 'General' | 'SC' | 'ST';
  totalVoters: number;
  lastElectionTurnout: number;
  candidates: string[]; // Candidate IDs
}

export interface Election {
  id: string;
  type: 'Lok Sabha' | 'Rajya Sabha' | 'State Assembly' | 'Local Body';
  state?: string;
  startDate: string;
  endDate: string;
  status: 'Upcoming' | 'Ongoing' | 'Completed';
  constituencies: string[]; // Constituency IDs
  totalVoters: number;
  turnout: number;
  results?: {
    partyId: string;
    seatsWon: number;
    votesReceived: number;
    votePercentage: number;
  }[];
}

export interface Voter {
  id: string;
  aadhaarNumber: string;
  name: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  constituency: string;
  votingStatus: 'Not Voted' | 'Voted';
  verificationStatus: 'Pending' | 'Verified' | 'Rejected';
}