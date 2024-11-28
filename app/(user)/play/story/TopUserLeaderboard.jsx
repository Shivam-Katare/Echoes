import React from 'react';
import Link from 'next/link';
import LoadingSpinner from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';

const TopUserLeaderboard = ({ isLoading, globalLeaderboard }) => {
  return (
    <div className="flex flex-col justify-between items-center pb-2 overflow-x-auto shadow-md rounded-[12px] sm:w-full min-h-96">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <table className="text-sm text-left rtl:text-right text-black w-full">
          <thead className="text-base bg-secondary">
            <tr>
              <th scope='col' className='px-6 py-3'>Rank</th>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Score</th>
            </tr>
          </thead>
          <tbody>
            {globalLeaderboard && globalLeaderboard.map((history, index) => (
              <tr key={history?.id} className={`bg-white text-black border-b hover:bg-gray-50`}>
                <td className='px-6 py-4'>#{history?.rank}</td>
                <td className="px-6 py-4 min-w-20">{history.userName || "--"}</td>
                <td className="px-6 py-4 min-w-20 text-center">{history.total_score || "--"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Link href="/play/leaderboard">
        <Button
          className="mt-4"
          onClick={() => console.log('Check complete leaderboard')}
        >
          Check complete leaderboard
        </Button>
      </Link>
    </div>
  );
};

export default TopUserLeaderboard;