// 'use client';

// import { useState, useEffect } from 'react';
// import { FaUserCircle, FaTimes, FaBullseye, FaHome, FaTasks, FaChartLine, FaGift } from 'react-icons/fa';

// export default function MainDashboard() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dashboardData, setDashboardData] = useState(null);

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   // Dummy data for preview
//   const dummyData = {
//     user_prefer_name: 'Sathu',
//     duration: '3 months',
//     goals: [
//       {
//         main_goal: 'Improve Social Skills',
//         sub_goals: [
//           'Initiate conversation with peers',
//           'Maintain eye contact'
//         ]
//       },
//       {
//         main_goal: 'Enhance Daily Living Skills',
//         sub_goals: [
//           'Brush teeth independently',
//           'Dress independently'
//         ]
//       }
//     ]
//   };

//   useEffect(() => {
//     setDashboardData(dummyData);
//     /*
//     const fetchDashboard = async () => {
//       try {
//         const res = await fetch('http://127.0.0.1:8000/api/dashboard');
//         const data = await res.json();
//         setDashboardData(data);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchDashboard();*/
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-gray-50 flex flex-col">
//       {/* Header */}
//       <header className="flex justify-between items-center bg-purple-500 text-white p-4 shadow-md">
//         <h1 className="text-lg font-bold">Hi, {dashboardData?.user_prefer_name || 'User'}!</h1>
//         <button onClick={toggleMenu} className="text-2xl">
//           <FaUserCircle />
//         </button>
//       </header>

//       {/* Side Menu */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
//           menuOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="font-bold text-lg">Menu</h2>
//           <button onClick={toggleMenu}>
//             <FaTimes className="text-xl" />
//           </button>
//         </div>
//         <nav className="flex flex-col mt-4 space-y-4 px-4">
//           <button className="text-left hover:bg-purple-100 px-2 py-2 rounded">Home</button>
//           <button className="text-left hover:bg-purple-100 px-2 py-2 rounded">About</button>
//           <button className="text-left hover:bg-purple-100 px-2 py-2 rounded">Conduct</button>
//           <button className="text-left hover:bg-red-100 text-red-600 px-2 py-2 rounded">Logout</button>
//         </nav>
//       </div>

//       {/* Overlay */}
//       {menuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-30 z-40"
//           onClick={toggleMenu}
//         ></div>
//       )}

//       {/* Main Content */}
//       <main className="p-4 mt-4 flex-1 overflow-y-auto">
//         {dashboardData ? (
//           <>
//             <p className="text-gray-600 mb-4">Duration: {dashboardData.duration}</p>

//             {/* Goals */}
//             <div className="space-y-4">
//               {dashboardData.goals.map((goal, idx) => (
//                 <div
//                   key={idx}
//                   className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-xl shadow-lg cursor-pointer transform transition-transform hover:scale-105"
//                   onClick={() => alert(`Navigate to To-do list for "${goal.main_goal}"`)}
//                 >
//                   <div className="flex items-center mb-3">
//                     <FaBullseye className="text-white mr-2" />
//                     <h3 className="font-semibold text-white text-lg">{goal.main_goal}</h3>
//                   </div>

//                   {/* Sub-goals displayed as plan */}
//                   <div className="flex flex-col gap-2">
//                     {goal.sub_goals.map((sub, sidx) => (
//                       <div
//                         key={sidx}
//                         className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
//                       >
//                         {sub}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <p>Loading dashboard...</p>
//         )}
//       </main>

//       {/* Bottom Navigation */}
//       <nav className="bg-white shadow-t flex justify-around items-center py-2 border-t">
//         <button className="flex flex-col items-center text-purple-500">
//           <FaHome />
//           <span className="text-xs mt-1">Home</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-500">
//           <FaTasks />
//           <span className="text-xs mt-1">To-do</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-500">
//           <FaChartLine />
//           <span className="text-xs mt-1">Progress</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-500">
//           <FaGift />
//           <span className="text-xs mt-1">Rewards</span>
//         </button>
//       </nav>
//     </div>
//   );
// }
// 'use client';

// import { useState, useEffect } from 'react';
// import { FaUserCircle, FaTimes, FaBullseye, FaHome, FaTasks, FaChartLine, FaGift, FaInfoCircle, FaPhoneAlt } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// export default function HomePage() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dashboardData, setDashboardData] = useState(null);

//   const toggleMenu = () => setMenuOpen(!menuOpen);

//   // Dummy data
//   const dummyData = {
//     user_prefer_name: 'Sathu',
//     duration: '3 months',
//     goals: [
//       {
//         main_goal: 'Improve Social Skills',
//         sub_goals: [
//           'Initiate conversation with peers',
//           'Maintain eye contact'
//         ]
//       },
//       {
//         main_goal: 'Enhance Daily Living Skills',
//         sub_goals: [
//           'Brush teeth independently',
//           'Dress independently'
//         ]
//       }
//     ]
//   };

//   useEffect(() => {
//     setTimeout(() => setDashboardData(dummyData), 300);
//   }, []);

//   return (
//     <div className="relative min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex flex-col">
//       {/* Header */}
//       <header className="flex justify-between items-center bg-purple-500 text-white p-4 shadow-md">
//         <h1 className="text-lg font-bold animate-pulse">
//           Hi, {dashboardData?.user_prefer_name || 'User'}!
//         </h1>
//         <button onClick={toggleMenu} className="text-3xl">
//           <FaUserCircle />
//         </button>
//       </header>

//       {/* Side Menu */}
//       <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
//         <div className="flex justify-between items-center p-4 border-b">
//           <h2 className="font-bold text-lg">Menu</h2>
//           <button onClick={toggleMenu}>
//             <FaTimes className="text-xl" />
//           </button>
//         </div>
//         <nav className="flex flex-col mt-6 space-y-4 px-4">
//           <button className="flex items-center gap-2 text-left hover:bg-purple-100 px-3 py-2 rounded">
//             <FaPhoneAlt /> Contact
//           </button>
//           <button className="flex items-center gap-2 text-left hover:bg-purple-100 px-3 py-2 rounded">
//             <FaInfoCircle /> About
//           </button>
//           <button className="text-left hover:bg-red-100 text-red-600 px-3 py-2 rounded">Logout</button>
//         </nav>
//       </div>

//       {/* Overlay */}
//       {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={toggleMenu}></div>}

//       {/* Main Content */}
//       <main className="p-4 mt-4 flex-1 overflow-y-auto space-y-4">
//         {dashboardData ? (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.6 }}
//             className="space-y-4"
//           >
//             {/* Duration */}
//             <motion.p className="text-center text-purple-700 font-semibold text-lg"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2 }}
//             >
//               Your plan duration: {dashboardData.duration}
//             </motion.p>

//             {/* Goals / Plan */}
//             {dashboardData.goals.map((goal, idx) => (
//               <motion.div
//                 key={idx}
//                 className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-2xl shadow-lg cursor-pointer transform transition-transform hover:scale-105"
//                 onClick={() => alert(`Go to To-do list for "${goal.main_goal}"`)}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 + idx * 0.2 }}
//               >
//                 <div className="flex items-center mb-3">
//                   <FaBullseye className="text-white mr-2" />
//                   <h3 className="font-semibold text-white text-lg">{goal.main_goal}</h3>
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   {goal.sub_goals.map((sub, sidx) => (
//                     <motion.div
//                       key={sidx}
//                       className="bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.4 + sidx * 0.1 }}
//                     >
//                       {sub}
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>
//         ) : (
//           // Skeletons for smooth load
//           <div className="space-y-4">
//             {[1, 2].map((_, idx) => (
//               <div key={idx} className="bg-gray-200 rounded-2xl h-24 animate-pulse"></div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Bottom Navigation */}
//       <nav className="bg-white shadow-t flex justify-around items-center py-2 border-t">
//         <button className="flex flex-col items-center text-purple-500">
//           <FaHome />
//           <span className="text-xs mt-1">Home</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-500">
//           <FaTasks />
//           <span className="text-xs mt-1">To-do</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-500">
//           <FaChartLine />
//           <span className="text-xs mt-1">Progress</span>
//         </button>
//         <button className="flex flex-col items-center text-gray-500">
//           <FaGift />
//           <span className="text-xs mt-1">Rewards</span>
//         </button>
//       </nav>
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { FaUserCircle, FaTimes, FaBullseye, FaHome, FaTasks, FaChartLine, FaGift, FaInfoCircle, FaPhoneAlt, FaStar, FaLightbulb } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DUMMY_DATA = {
  user_prefer_name: 'Sathu',
  duration: '90 Days',
  goals: [
    {
      main_goal: 'Social Skills GOALS 💬',
      sub_goals: ['Initiate conversation with peers', 'Maintain eye contact 👀']
    },
    {
      main_goal: 'Level Up Daily Life 🛠️',
      sub_goals: ['Brush teeth independently 🪥', 'Dress independently 👔']
    },
    {
      main_goal: 'Health & Fitness 💪',
      sub_goals: ['Drink water regularly', 'Daily stretch exercises']
    }
  ]
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [activeNav, setActiveNav] = useState('Home');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    setTimeout(() => setDashboardData(DUMMY_DATA), 300);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-purple-100 to-pink-100 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center bg-purple-700 text-white p-3 shadow-md sticky top-0 z-40">
        <h1 className="text-lg font-extrabold tracking-tight truncate">👋 Hi, {dashboardData?.user_prefer_name || 'User'}!</h1>
        <button onClick={toggleMenu} className="text-3xl transition-transform hover:scale-110">
          <FaUserCircle />
        </button>
      </header>

      {/* Side Menu */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={toggleMenu} className="p-1 rounded hover:bg-gray-100">
            <FaTimes className="text-xl" />
          </button>
        </div>
        <nav className="flex flex-col mt-6 space-y-2 px-4">
          <button className="flex items-center gap-2 text-left hover:bg-purple-100 px-3 py-2 rounded-lg transition-colors">
            <FaPhoneAlt className="text-purple-500" /> Contact Support
          </button>
          <button className="flex items-center gap-2 text-left hover:bg-purple-100 px-3 py-2 rounded-lg transition-colors">
            <FaInfoCircle className="text-purple-500" /> About App
          </button>
          <button className="text-left hover:bg-red-100 text-red-600 px-3 py-2 rounded-lg transition-colors">Logout</button>
        </nav>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={toggleMenu}></div>}

      {/* Main Content */}
      <main className="p-3 flex-1 overflow-y-auto space-y-4 pb-28">
        {dashboardData ? (
          <>
            {/* Duration Banner */}
            <motion.div className="bg-white p-3 rounded-xl shadow-md border-l-4 border-purple-500 text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm text-gray-600">Plan Duration</p>
              <p className="text-lg text-purple-700 font-extrabold">{dashboardData.duration}</p>
            </motion.div>

            {/* Goals - Responsive layout */}
            <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
              {dashboardData.goals.map((goal, idx) => (
                <motion.div key={idx}
                  className="flex-1 min-w-[250px] bg-gradient-to-br from-purple-500 to-pink-500 p-4 rounded-2xl shadow-lg cursor-pointer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => alert(`Navigating to Plan details for "${goal.main_goal}"`)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.15, type: "spring", stiffness: 100 }}
                >
                  <div className="flex items-center mb-2">
                    <FaStar className="text-yellow-300 mr-2 text-xl" />
                    <h3 className="font-bold text-white text-base truncate">{goal.main_goal}</h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {goal.sub_goals.map((sub, sidx) => (
                      <motion.div key={sidx}
                        className="bg-white text-gray-800 px-3 py-1 rounded-lg font-medium shadow-sm flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 + sidx * 0.1 }}
                      >
                        <FaLightbulb className="text-orange-400" /> {sub}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-4 pt-2">
            <div className="bg-white p-3 rounded-xl shadow-md h-16 animate-pulse"></div>
            <div className="bg-gray-200 rounded-2xl h-44 animate-pulse"></div>
            <div className="bg-gray-200 rounded-2xl h-44 animate-pulse"></div>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg flex justify-around items-center h-20 border-t-2 border-gray-100 z-50">
        <NavButton icon={FaHome} label="Home" active={activeNav === 'Home'} onClick={() => setActiveNav('Home')} />
        <NavButton icon={FaBullseye} label="Plan" active={activeNav === 'Plan'} onClick={() => setActiveNav('Plan')} />
        <NavButton icon={FaTasks} label="To-do" active={activeNav === 'To-do'} onClick={() => setActiveNav('To-do')} />
        <NavButton icon={FaChartLine} label="Progress" active={activeNav === 'Progress'} onClick={() => setActiveNav('Progress')} />
        <NavButton icon={FaGift} label="Rewards" active={activeNav === 'Rewards'} onClick={() => setActiveNav('Rewards')} />
      </nav>
    </div>
  );
}

const NavButton = ({ icon: Icon, label, active, onClick }) => (
  <motion.button 
    className={`flex flex-col items-center justify-center transition-colors ${active ? 'text-purple-600' : 'text-gray-500'}`}
    onClick={onClick}
    whileTap={{ scale: 0.9 }}
    aria-current={active ? 'page' : undefined}
  >
    <Icon className="text-2xl" />
    <span className="text-xs font-semibold mt-1 truncate">{label}</span> 
  </motion.button>
);
