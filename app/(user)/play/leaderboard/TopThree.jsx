import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Medal } from 'lucide-react';

function TopThree({ data }) {

  const topThree = data.sort((a, b) => a.rank - b.rank).slice(0, 3);

  const getRankStyle = (rank) => {
    switch(rank) {
      case 1:
        return 'bg-gradient-to-br from-yellow-100 via-yellow-50 to-yellow-100 ring-2 ring-yellow-500';
      case 2:
        return 'bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 ring-2 ring-gray-400';
      case 3:
        return 'bg-gradient-to-br from-[#cd7f32] via-[#e8ac7e] to-[#cd7f32] ring-2 ring-[#cd7f32]';
      default:
        return '';
    }
  };

  const getOrder = (rank) => {
    switch(rank) {
      case 1: return 'sm:order-2'; // Center
      case 2: return 'sm:order-1'; // Left
      case 3: return 'sm:order-3'; // Right
      default: return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8 px-4"
    >
      {topThree.map((player, index) => (
        <motion.div
          key={player?.user_id}
          className={`relative ${getOrder(player?.rank)}`}
          whileHover={{ y: -5 }}
        >
          <div className={`
            p-4 md:p-6 rounded-xl text-center
            ${getRankStyle(player?.rank)}
            shadow-lg backdrop-blur-sm
            before:absolute before:inset-0 before:bg-white/40 before:z-0
            hover:transform hover:scale-102 transition-all duration-300
          `}>
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>

            <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2 z-50">
              {player?.rank === 1 ? (
                <div className='relative'>
                  <Crown className="w-8 h-8 md:w-10 md:h-10 text-yellow-500 animate-bounce" />
                  <div className="absolute inset-0 w-8 h-8 md:w-10 md:h-10 bg-yellow-500 blur-lg opacity-40"></div>
                </div>
              ) : (
                <div className="relative">
                  <Medal className={`w-6 h-6 md:w-8 md:h-8 ${player?.rank === 2 ? 'text-gray-300' : 'text-[#cd7f32]'}`} />
                  <div className="absolute inset-0 w-6 h-6 md:w-8 md:h-8 bg-white blur-lg opacity-30"></div>
                </div>
              )}
            </div>

             <div className="mt-4 relative z-10">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop"
                  alt=""
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-2 border-2 border-white shadow-md"
                />
                {player?.rank === 1 && (
                  <div className="absolute inset-0 w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto animate-pulse bg-yellow-500 blur-xl opacity-30"></div>
                )}
              </div>
              <h3 className="font-bold text-base md:text-lg text-gray-800">{player?.userName || 'Anonymous'}</h3>
              <p className="text-gray-700 text-xs md:text-sm font-semibold">{player?.highest_wpm || "N/A"} WPM</p>
              <p className="text-gray-700 text-xs md:text-sm">{player?.avg_accuracy ? `${player?.avg_accuracy?.toFixed(2)}% Accuracy` : 'N/A'}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default TopThree;