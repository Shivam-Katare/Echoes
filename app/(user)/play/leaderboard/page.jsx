"use client";
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';
import FilterBar from './Filterbar';
import TopThree from './TopThree';
import LeaderboardTable from './LeaderboardTable';
import { mockLeaderboardData } from '@/lib/utils';
import useLeaderboardStore from '@/store/leaderboardStore';
import { useSession } from '@clerk/nextjs';
import LoadingSpinner from '@/components/loading-spinner';

function Leaderboard() {
  const { isLoading, globalLeaderboard, fetchGlobalLeaderboard } = useLeaderboardStore();
  const { session } = useSession();

  useEffect(() => {
    session && fetchGlobalLeaderboard(session);
  }, [session, fetchGlobalLeaderboard])
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 md:mb-8 text-center px-4"
      >
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2 md:gap-3">
          <Trophy className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
          Echoes Leaderboard
        </h1>
        <p className="text-sm md:text-base text-gray-600">Compete with the best typists worldwide</p>
      </motion.div>

      <FilterBar onFilterChange={() => { }} />

      {
        isLoading ? (
          <LoadingSpinner />
        ) : (
          <TopThree data={globalLeaderboard} />
        )
      }
      {
        isLoading ? (
          <LoadingSpinner />
        ) : (
          <LeaderboardTable data={globalLeaderboard} />
        )
      }
    </>
  )
}

export default Leaderboard;