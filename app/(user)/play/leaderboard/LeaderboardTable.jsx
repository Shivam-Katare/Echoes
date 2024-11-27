import React from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Target } from "lucide-react";
import { difficultyColors } from "@/lib/utils";

function LeaderboardTable({ data }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden mx-4"
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">WPM</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accuracy</th>
              {/* <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th> */}
              {/* <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th> */}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((entry, index) => (
              <motion.tr
                key={entry?.user_id + "1"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ backgroundColor: '#f9fafb' }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                  <span className="font-semibold text-gray-900 text-sm md:text-base">#{entry.rank}</span>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* <img className="h-8 w-8 md:h-10 md:w-10 rounded-full" src={entry.avatar} alt="" /> */}
                    <div className="ml-3 md:ml-4">
                      <div className="font-medium text-gray-900 text-sm md:text-base">{entry?.userName || "--"}</div>
                      {/* <div className="flex gap-1">
                        {entry.badges.includes('fastest') && (
                          <Target className="w-3 h-3 md:w-4 md:h-4 text-blue-500" />
                        )}
                        {entry.badges.includes('accurate') && (
                          <Award className="w-3 h-3 md:w-4 md:h-4 text-green-500" />
                        )}
                      </div> */}
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                  <span className="font-semibold text-gray-900 text-sm md:text-base">{entry?.total_score?.toLocaleString() || "--"}</span>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900 text-sm md:text-base">{entry?.total_wpm || "--"}</span>
                </td>
                <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900 text-sm md:text-base">{(entry?.avg_accuracy)?.toFixed(2)}%</span>
                </td>
                {/* <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 md:px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColors[entry.difficulty]}`}>
                    {entry.difficulty}
                  </span>
                </td> */}
                {/* <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                  {entry.date}
                </td> */}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs md:text-sm text-gray-700 text-center sm:text-left">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-3 md:px-4 py-2 border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50">
              Previous
            </button>
            <button className="flex-1 sm:flex-none px-3 md:px-4 py-2 border border-gray-300 rounded-md text-xs md:text-sm font-medium text-gray-700 hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default LeaderboardTable;