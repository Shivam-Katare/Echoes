import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Medal } from 'lucide-react';

function TopThree({data}) {

  const topThree = data.sort((a, b) => a.rank - b.rank).slice(0, 3);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 md:mb-8 px-4"
    >
      {topThree.map((player, index) => (
        <motion.div
          key={player?.user_id}
          className={`relative ${player?.rank === 1 ? 'sm:order-2' : ''}`}
          whileHover={{ y: -5 }}
        >
          <div className={`
            p-4 md:p-6 rounded-xl text-center
            ${player?.rank === 1 ? 'bg-yellow-50 ring-2 ring-yellow-500' : 'bg-white'}
            shadow-lg
          `}>
            <div className="absolute -top-3 md:-top-4 left-1/2 transform -translate-x-1/2">
              {player?.rank === 1 ? (
                <Crown className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
              ) : (
                <Medal className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              )}
            </div>
            
            <div className="mt-4">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop"
                alt=""
                className="w-12 h-12 md:w-16 md:h-16 rounded-full mx-auto mb-2"
              />
              <h3 className="font-bold text-base md:text-lg">{player?.userName || 'Anonymous'}</h3>
              <p className="text-gray-600 text-xs md:text-sm">{player?.total_wpm || "N/A"} WPM</p>
              <p className="text-gray-600 text-xs md:text-sm">{player?.avg_accuracy ? `${player?.avg_accuracy?.toFixed(2)}% Accuracy` : 'N/A'}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default TopThree;