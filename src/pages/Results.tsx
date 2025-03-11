import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import { Search, Filter, Download, MapPin, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

export const Results: React.FC = () => {
  const [selectedState, setSelectedState] = useState('all');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [sortColumn, setSortColumn] = useState('constituency');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [mapHoveredState, setMapHoveredState] = useState<string | null>(null);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedConstituencyResults = [...constituencyResults].sort((a, b) => {
    let valueA = a[sortColumn as keyof typeof a];
    let valueB = b[sortColumn as keyof typeof b];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      if (sortDirection === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    } else {
      if (sortDirection === 'asc') {
        return (valueA as number) - (valueB as number);
      } else {
        return (valueB as number) - (valueA as number);
      }
    }
  });

  const getSortIcon = (column: string) => {
    if (sortColumn === column) {
      return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-900 to-black py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Election Results {selectedYear}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-blue-100 max-w-2xl mx-auto"
            >
              Explore comprehensive and up-to-date election results from across India
            </motion.p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white shadow-md border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">State/UT</label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All States & UTs</option>
                  <option value="andhra-pradesh">Andhra Pradesh</option>
                  <option value="assam">Assam</option>
                  <option value="bihar">Bihar</option>
                  <option value="delhi">Delhi</option>
                  <option value="gujarat">Gujarat</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="kerala">Kerala</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="tamil-nadu">Tamil Nadu</option>
                  <option value="uttar-pradesh">Uttar Pradesh</option>
                  <option value="west-bengal">West Bengal</option>
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Election Year</label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="2024">2024 General Election</option>
                  <option value="2019">2019 General Election</option>
                  <option value="2014">2014 General Election</option>
                </select>
              </div>
              <div className="flex-none pt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Filter className="w-4 h-4 mr-2" />
                  Apply Filters
                </button>
              </div>
              <div className="flex-none pt-6">
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Download className="w-4 h-4 mr-2" />
                  Export Results
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Content */}
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Key Highlights */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Highlights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryStats.map((stat) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl border border-gray-100 shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className={`text-${stat.color}-600 mb-2`}>
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.title}</h3>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <div className="mt-2 text-sm text-gray-600">{stat.change}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Main Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
              {/* Winning Party Map */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-md p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">Party-wise Results</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={partyResults}
                        dataKey="seats"
                        nameKey="party"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        labelLine={false}
                        label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                      >
                        {partyResults.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value, name) => [`${value} seats`, name]}
                        contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
                  {partyResults.map((party) => (
                    <div key={party.party} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: party.color }}></div>
                      <span className="text-sm text-gray-700">{party.party}: {party.seats}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Vote Share Trends */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-3 bg-white rounded-xl border border-gray-100 shadow-md p-6"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-4">Vote Share Trends (2014-2024)</h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={voteShareTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="year" />
                      <YAxis 
                        tickFormatter={(value) => `${value}%`}
                        domain={[0, 60]}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Vote Share']}
                        contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="bjp" name="BJP" stroke="#FF9933" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="inc" name="INC" stroke="#138808" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line type="monotone" dataKey="others" name="Others" stroke="#808080" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>

            {/* State-wise Results */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12 bg-white rounded-xl border border-gray-100 shadow-md p-6"
            >
              <h3 className="text-lg font-medium text-gray-900 mb-6">State-wise Results</h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stateResults} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="state" width={100} />
                    <Tooltip
                      contentStyle={{ backgroundColor: 'white', borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Legend />
                    <Bar dataKey="bjp" name="BJP" stackId="a" fill="#FF9933" />
                    <Bar dataKey="inc" name="INC" stackId="a" fill="#138808" />
                    <Bar dataKey="others" name="Others" stackId="a" fill="#808080" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Constituency Results Table */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Constituency Results</h3>
              </div>

              {/* Search and Filters */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-[300px] relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search constituencies or candidates..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('constituency')}
                      >
                        <div className="flex items-center">
                          <span>Constituency</span>
                          {getSortIcon('constituency')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('winner')}
                      >
                        <div className="flex items-center">
                          <span>Winner</span>
                          {getSortIcon('winner')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('party')}
                      >
                        <div className="flex items-center">
                          <span>Party</span>
                          {getSortIcon('party')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('votes')}
                      >
                        <div className="flex items-center">
                          <span>Votes</span>
                          {getSortIcon('votes')}
                        </div>
                      </th>
                      <th 
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                        onClick={() => handleSort('margin')}
                      >
                        <div className="flex items-center">
                          <span>Margin</span>
                          {getSortIcon('margin')}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedConstituencyResults.map((result) => (
                      <tr key={result.constituency} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">{result.constituency}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{result.winner}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            result.party === 'BJP' ? 'bg-orange-100 text-orange-800' :
                            result.party === 'INC' ? 'bg-green-100 text-green-800' :
                            result.party === 'DMK' ? 'bg-red-100 text-red-800' :
                            result.party === 'SS' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {result.party}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.votes.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-900">{result.margin.toLocaleString()}</span>
                            <span className="ml-2 text-xs font-medium text-green-600">
                              ({((result.margin / result.votes) * 100).toFixed(1)}%)
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{constituencyResults.length}</span> of <span className="font-medium">{constituencyResults.length}</span> results
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled>
                      Previous
                    </button>
                    <button className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50" disabled>
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

const summaryStats = [
  {
    title: 'Total Seats Declared',
    value: '543',
    change: '100% results declared',
    color: 'blue'
  },
  {
    title: 'Voter Turnout',
    value: '67.4%',
    change: '+2.1% from last election',
    color: 'green'
  },
  {
    title: 'Leading Party',
    value: 'BJP',
    change: '303 seats won',
    color: 'orange'
  },
  {
    title: 'Counting Complete',
    value: '100%',
    change: 'All EVMs processed',
    color: 'purple'
  }
];

const partyResults = [
  { party: 'BJP', seats: 303, color: '#FF9933' },
  { party: 'INC', seats: 52, color: '#138808' },
  { party: 'TMC', seats: 22, color: '#000080' },
  { party: 'DMK', seats: 24, color: '#FF0000' },
  { party: 'Others', seats: 142, color: '#808080' },
];

const voteShareTrends = [
  { year: '2014', bjp: 31.3, inc: 19.5, others: 49.2 },
  { year: '2019', bjp: 37.4, inc: 19.5, others: 43.1 },
  { year: '2024', bjp: 37.0, inc: 22.5, others: 40.5 },
];

const stateResults = [
  { state: 'Uttar Pradesh', bjp: 62, inc: 8, others: 10 },
  { state: 'Maharashtra', bjp: 23, inc: 11, others: 14 },
  { state: 'West Bengal', bjp: 18, inc: 2, others: 22 },
  { state: 'Tamil Nadu', bjp: 0, inc: 8, others: 31 },
  { state: 'Bihar', bjp: 17, inc: 4, others: 19 },
  { state: 'Karnataka', bjp: 25, inc: 3, others: 0 },
  { state: 'Gujarat', bjp: 26, inc: 0, others: 0 },
  { state: 'Rajasthan', bjp: 24, inc: 1, others: 0 },
];

const constituencyResults = [
  {
    constituency: 'Varanasi',
    winner: 'Narendra Modi',
    party: 'BJP',
    votes: 674664,
    margin: 479505,
  },
  {
    constituency: 'Wayanad',
    winner: 'Rahul Gandhi',
    party: 'INC',
    votes: 706367,
    margin: 431770,
  },
  {
    constituency: 'Mumbai South',
    winner: 'Arvind Sawant',
    party: 'SS',
    votes: 421937,
    margin: 100421,
  },
  {
    constituency: 'Chennai Central',
    winner: 'Dayanidhi Maran',
    party: 'DMK',
    votes: 447233,
    margin: 261337,
  },
  {
    constituency: 'Amethi',
    winner: 'Smriti Irani',
    party: 'BJP',
    votes: 468514,
    margin: 55120,
  },
  {
    constituency: 'Gandhinagar',
    winner: 'Amit Shah',
    party: 'BJP',
    votes: 705406,
    margin: 557014,
  },
  {
    constituency: 'Lucknow',
    winner: 'Rajnath Singh',
    party: 'BJP',
    votes: 656377,
    margin: 347302,
  },
  {
    constituency: 'Hyderabad',
    winner: 'Asaduddin Owaisi',
    party: 'AIMIM',
    votes: 517471,
    margin: 281186,
  },
];