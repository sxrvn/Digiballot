import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, BookOpen, Search, Filter, MapPin } from 'lucide-react';

const parties = [
  {
    name: 'Bharatiya Janata Party',
    abbr: 'BJP',
    logo: 'https://logos-world.net/wp-content/uploads/2022/06/BJP-Logo-700x394.png',
    color: '#FF9933',
    leader: 'Narendra Modi',
    founded: '1980',
    ideology: 'Integral Humanism, Cultural Nationalism',
    state: 'All India',
    verified: true,
    description: 'A major political party in India with a focus on nationalism and economic growth.'
  },
  {
    name: 'Indian National Congress',
    abbr: 'INC',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Indian_National_Congress_Flag.svg/1200px-Indian_National_Congress_Flag.svg.png',
    color: '#0C9444',
    leader: 'Mallikarjun Kharge',
    founded: '1885',
    ideology: 'Liberal Democracy, Social Justice',
    state: 'All India',
    verified: true,
    description: 'One of the oldest political parties in India, advocating for social justice and democracy.'
  },
  {
    name: 'Aam Aadmi Party',
    abbr: 'AAP',
    logo: 'https://bsmedia.business-standard.com/_media/bs/img/article/2022-11/16/full/1668586087-9156.jpg?im=FitAndFill=(826,465)',
    color: '#01c3c3',
    leader: 'Arvind Kejriwal',
    founded: '2012',
    ideology: 'Populism, Anti-corruption',
    state: 'Delhi',
    verified: true,
    description: 'A party focused on anti-corruption and governance reforms, primarily active in Delhi.'
  },
  {
    name: 'All India Trinamool Congress',
    abbr: 'AITC',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/All_India_Trinamool_Congress_flag.svg/1600px-All_India_Trinamool_Congress_flag.svg.png',
    color: '#00FF00',
    leader: 'Mamata Banerjee',
    founded: '1998',
    ideology: 'Social Democracy, Bengali Nationalism',
    state: 'West Bengal',
    verified: true,
    description: 'A regional party with a strong presence in West Bengal, focusing on social democracy.'
  },
  {
    name: 'Dravida Munnetra Kazhagam',
    abbr: 'DMK',
    logo: 'https://images.tv9hindi.com/wp-content/themes/tv9bharavarsh/elections/images/partyimages/1715671520832.jpg',
    color: '#CC0000',
    leader: 'M. K. Stalin',
    founded: '1949',
    ideology: 'Dravidian Politics, Social Justice',
    state: 'Tamil Nadu',
    verified: true,
    description: 'A major political party in Tamil Nadu, advocating for Dravidian politics and social justice.'
  },
  {
    name: 'Samajwadi Party',
    abbr: 'SP',
    logo: 'https://www.flagcolorcodes.com/data/Flag-of-Samajwadi-Party.png',
    color: '#FF0000',
    leader: 'Akhilesh Yadav',
    founded: '1992',
    ideology: 'Democratic Socialism, Secularism',
    state: 'Uttar Pradesh',
    verified: true,
    description: 'A regional party in Uttar Pradesh, focusing on socialism and secularism.'
  },
  {
    name: 'Bahujan Samaj Party',
    abbr: 'BSP',
    logo: 'https://images.news18.com/ibnlive/uploads/2021/02/1614153935_51olnod-qjl._sl1132_.jpg',
    color: '#0000FF',
    leader: 'Mayawati',
    founded: '1984',
    ideology: 'Social Justice, Ambedkarism',
    state: 'Uttar Pradesh',
    verified: true,
    description: 'A party advocating for the rights of marginalized communities, primarily active in Uttar Pradesh.'
  },
  {
    name: 'Nationalist Congress Party',
    abbr: 'NCP',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Flag_of_Nationalist_Congress_Party.svg/1200px-Flag_of_Nationalist_Congress_Party.svg.png',
    color: '#6F3473',
    leader: 'Sharad Pawar',
    founded: '1999',
    ideology: 'Nationalism, Progressive Politics',
    state: 'Maharashtra',
    verified: true,
    description: 'A party with a focus on nationalism and progressive politics, primarily active in Maharashtra.'
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const PoliticalParties: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedState, setSelectedState] = useState('all');

  const filteredParties = parties.filter(party => 
    party.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedState === 'all' || party.state === selectedState)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-black py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-white mb-4">Political Parties</h1>
            <p className="text-white/90 text-lg">
              Explore registered political parties across India
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[300px] relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search parties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div className="w-48">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="all">All States</option>
                  {states.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Party Grid */}
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredParties.map((party) => (
                <div
                  key={party.name}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-48 bg-gray-200 relative">
                    <img
                      src={party.logo}
                      alt={`${party.name} logo`}
                      className="w-full h-full object-cover"
                    />
                    {party.verified && (
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                        Verified
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{party.name}</h3>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{party.state}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{party.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Founded: {party.founded}
                      </div>
                      <button className="text-orange-600 hover:text-orange-700 font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const states = [
  'Andhra Pradesh',
  'Bihar',
  'Delhi',
  'Gujarat',
  'Karnataka',
  'Maharashtra',
  'Tamil Nadu',
  'Uttar Pradesh',
  'West Bengal',
];