import React from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, Phone, Mail, Calendar, User2 } from 'lucide-react';

export const Profile: React.FC = () => {
  // In a real app, this would come from your backend
  const voterData = {
    voterId: 'PCZ4936482',
    name: 'Rahul Kumar',
    dateOfBirth: '15/08/1990',
    gender: 'Male',
    address: '314, Gandhi Road, New Delhi - 110001',
    constituency: 'New Delhi',
    phone: '+91 98765 43210',
    email: 'rahul.kumar@email.com',
    photo: 'https://i.pinimg.com/originals/4c/cd/08/4ccd086a8b7970c7a1ab4961e9bfcafc.jpg',
    registrationDate: '01/01/2024',
    validUntil: '31/12/2034'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Government ID Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 via-white to-green-600 p-4">
            <div className="flex items-center justify-between">
              <img
                src="https://www.eci.gov.in/newimg/eci-logo.svg"
                alt="ECI Logo"
                className="h-16"
              />
              <div className="text-center flex-1">
                <h1 className="text-2xl font-bold text-gray-900">भारत निर्वाचन आयोग</h1>
                <h2 className="text-xl font-semibold text-gray-800">Election Commission of India</h2>
                <p className="text-sm font-medium text-gray-700">Voter Identity Card</p>
              </div>
              <Shield className="h-16 w-16 text-blue-900 opacity-50" />
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Photo Section */}
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={voterData.photo}
                    alt="Voter Photo"
                    className="w-full rounded-lg border-4 border-white shadow-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-green-500/10 rounded-lg" />
                </div>
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-500">Voter ID</div>
                  <div className="text-lg font-bold font-mono text-gray-900">{voterData.voterId}</div>
                </div>
              </div>

              {/* Details Section */}
              <div className="col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500 flex items-center gap-2">
                      <User2 className="w-4 h-4" /> Name
                    </label>
                    <p className="font-semibold text-gray-900">{voterData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date of Birth
                    </label>
                    <p className="font-semibold text-gray-900">{voterData.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Address
                    </label>
                    <p className="font-semibold text-gray-900">{voterData.address}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Constituency
                    </label>
                    <p className="font-semibold text-gray-900">{voterData.constituency}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Phone
                    </label>
                    <p className="font-semibold text-gray-900">{voterData.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email
                    </label>
                    <p className="font-semibold text-gray-900">{voterData.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-500">
                <div>
                  <span className="font-medium">Registration Date:</span> {voterData.registrationDate}
                </div>
                <div>
                  <span className="font-medium">Valid Until:</span> {voterData.validUntil}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-xs text-gray-400">This is an official document issued by the Election Commission of India</div>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEZ0lEQVR4nO2ZbUxbZRjH/+e0hZbSQnlroS0FxosDhg4ZbGxshA03mZnbdJluH1z2wSXLvuiHxWTJkn3TJZiYGGOyD2bZ4hJ1yRKjkanRZBNkjEFeBuNlUGAUGC1QaGl7z+OHNjke0VFoS+LSX3KS5ubkPM/1v891ztNzgF122eV/jLDdE1wBAYFyAB0CcEIQoEopw1QUPF6vt387fQS2Y5LLxVMqAXhFBMoFAQIAhQQQBAiQQFCUQFgU0LkwjwvRKGZEEZFIBKvRKFYjESwsLvpyQdDjdmcIIpQQIBcAVAEQtjBXEQQUCgLK83Kxf/9+HDhwAG63G4IgQJZlzM3N4eHDhxgfH8edO3cwNjaGYDCYVYKME7gMVEjAcQHYJ0nYm5uLwsJC5OfnQ6PRQBRFiKIISZIgSRJEUYRGo4HT6YTT6URzczMmJiZw8+ZNjI6OIhQKZYVgxgk8AgoFAWUSUJyXh9LSUhQUFECv10Oj0UAQBEiSBFmWodFooNVqodVqodPpoNfr4XA4cOTIETQ0NODWrVsYGRlBMBjcUYKME7wGFMkSigoLUVJSArvdDq1WC0mSoFarIcsyJEmCWq2GWq2GSqWCUqmEQqGAJElQq9WwWq2or69HbW0tbty4gYmJiR0jmHECN1AkiigpLkZxcTGsVitkWYYkSZAkCbIsQ6VSQaVSQalUQqlUQhAECIIASZIgyzKUSiVMJhMOHz6Mqqoq9Pf3Y3p6OusEGSfYA+yXgNKiIhQVFcFischqtVoWBEGWJEmWZVmWJEkWRVGWJEmWJEmWZVmWZVmWVSoVLRYLampqUF5ejt7eXszMzGSVIOPL6DJQJgooLylBcXExrFYrNBoNJEmCUqmEQqGAIAhQKBQQBAGiKEIURQiCAEmSoFKpYDAYUFlZiYqKCvT09GB2djZrBBnfhZ4H9gkCyktLUVRUBLPZDI1GA1EUIYoiRFGEJElQq9XQaDTQarXQ6XTQ6/UwGAwwGo0wm82wWCwoKyvDvn370N3djfn5+awQZJzgBaBEFHCooglFhYUwm83Q6/XQ6/XQ6XTQ6XTQarXQarXQ6XTQ6/UwGAwwGo0wGo0wm80wm82wWq2w2+0oLS1FV1cXFhYWMk6QcYJjQIko4lBVFYqLi2GxWGA0GmEymWA2m2GxWGCz2WC322G322Gz2WCz2WC1WmG1WmG1WmG322Gz2VBSUoKuri4sLS1llCDjBMeBUlHEwaoqFBcXw2azwWKxwGQywWQywWw2w2KxwGq1wmazwW63w263w2azwWazwWazwWazwWazobS0FF1dXVheXs4YQcYJXgRKRQGHKitRXFwMu90Oq9UKi8UCi8UCi8UCi8UCq9UKm80Gu90Oh8MBh8MBh8MBh8MBh8MBh8OB0tJSdHV1YWVlJSMEGSd4CSiTBBysrERRURHsdjusViusViusViusVivsdjscDgccDgecTiecTiecTiecTiecTiecTidcLhe6urqwurqa9mXE/Oa0y/8V3wA86eXbzjxJFwAAAABJRU5ErkJggg=="
                  alt="Security Seal"
                  className="h-8 w-8 opacity-50"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium"
            onClick={() => window.print()}
          >
            Download ID Card
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 py-3 bg-white text-gray-800 rounded-lg font-medium border border-gray-200"
          >
            Report Issue
          </motion.button>
        </div>
      </div>
    </div>
  );
}; 