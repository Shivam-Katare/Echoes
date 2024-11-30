import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Award, RefreshCw, Target } from "lucide-react";
import { difficultyColors } from "@/lib/utils";
import dayjs from "dayjs";
import { useSession } from "@clerk/nextjs";

function LeaderboardTable({ data, onRefresh }) {
  const { session } = useSession();
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [paginatedData, setPaginatedData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const tableData = useMemo(() => {
    return data?.filter(entry => entry.rank > 3) || [];
  }, [data]);

  const handleRefresh = () => {
    onRefresh(session);
  }

  useEffect(() => {
    // Return early if no data
    if (!data) return;

    // Filter data for table display
    const filteredData = data.filter(entry => entry.rank > 3);

    // Calculate pagination
    const total = Math.ceil(filteredData.length / itemsPerPage);
    setTotalPages(total);

    // Calculate current page items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    setPaginatedData(currentItems);
  }, [data, currentPage, itemsPerPage]);


  // pagination handlers
  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  // Calculate display ranges
  const startRange = (currentPage - 1) * itemsPerPage + 1;
  const endRange = Math.min(currentPage * itemsPerPage, tableData.length);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-xl shadow-lg overflow-hidden mx-4 bg-gradient-to-br from-[#8d99ae]/90 via-[#d2dce2]/90 to-[#edf2f4]/90 backdrop-blur-sm"
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-200/30">
        <h2 className="text-gray-800 font-semibold">Leaderboard Rankings</h2>
        <button
          onClick={handleRefresh}
          className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
        >
          <RefreshCw className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      {tableData.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-600">No leaderboard data available yet.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#8d99ae] to-[#a1afbf] text-white">
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Rank</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Player</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Score</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider whitespace-nowrap">WPM</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Accuracy</th>
                  <th className="px-4 md:px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">Total Game Played</th>
                  <th className="px-4 md:px-6 py-3 text-end text-xs font-bold uppercase tracking-wider">Last Played</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/30">
                {paginatedData && paginatedData?.map((entry, index) => (
                  <motion.tr
                    key={entry?.user_id + "1"}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0 }}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                    className={`
                  transition-all duration-200 backdrop-blur-sm
                  ${entry.rank <= 3 ? 'bg-white/20' : 'bg-transparent'}
                `}
                  >
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className={`
                    font-bold text-sm md:text-base px-3 py-1 rounded-full
                    ${entry.rank === 1 ? 'bg-yellow-500 text-white' :
                          entry.rank === 2 ? 'bg-gray-300 text-gray-800' :
                            entry.rank === 3 ? 'bg-amber-700 text-white' : 'text-gray-800'}
                  `}>#{entry.rank}</span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-3 md:ml-4">
                          <div className="font-semibold text-gray-800 text-sm md:text-base">{entry?.userName || "--"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-800 text-sm md:text-base">{entry?.total_score?.toLocaleString() || "--"}</span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-800 text-sm md:text-base">{entry?.highest_wpm || "--"}</span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-800 text-sm md:text-base">{(entry?.avg_accuracy)?.toFixed(2)}%</span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap min-w-8 max-w-48">
                      <span className="font-medium text-gray-800 text-sm md:text-base">{entry?.total_games_played || "0"}</span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-end">
                      <span className="font-medium text-gray-800 text-sm md:text-base">{dayjs(entry?.last_played)?.format("DD/MM/YYYY")}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 md:px-6 py-3 md:py-4 border-t border-gray-200/30 bg-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs md:text-sm text-gray-700 text-center sm:text-left">
                Showing <span className="font-medium">{startRange}</span> to{' '}
                <span className="font-medium">{endRange}</span> of{' '}
                <span className="font-medium">{data.length}</span> results
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={handlePrevious}
                  disabled={currentPage === 1}
                  className={`
                flex-1 sm:flex-none px-3 md:px-4 py-2 border bg-white/80 
                hover:bg-white rounded-md text-xs md:text-sm font-medium 
                transition-colors duration-200
                ${currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-white'
                    }
              `}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`
                flex-1 sm:flex-none px-3 md:px-4 py-2 border bg-white/80 
                hover:bg-white rounded-md text-xs md:text-sm font-medium 
                transition-colors duration-200
                ${currentPage === totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-white'
                    }
              `}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )
      }
    </motion.div>
  );
}

export default LeaderboardTable;