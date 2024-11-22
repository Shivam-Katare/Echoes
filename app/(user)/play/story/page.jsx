"use client";

import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import usePlayStore from "@/store/playStore";
import TimesUpDialog from "@/components/dialogs/timesup-dialog";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { IterationCw } from "lucide-react";
import useLeaderboardStore from "@/store/leaderboardStore";
import { useSession } from "@clerk/nextjs";
import { useUser } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/loading-spinner";

function Story() {
  const [input, setInput] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const { words, fetchWords } = usePlayStore();
  const [displayWords, setDisplayWords] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [timer, setTimer] = useState(15);
  const [recentWords, setRecentWords] = useState([]); // Track recently used words
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const { fetchLeaderboard, leaderboard, saveLeaderboard, isLoading, fetchGlobalLeaderboard, globalLeaderboard } = useLeaderboardStore();
  const user = useUser().user;
  const user_id = user?.id ?? '';
  const userProfile = user?.imageUrl ?? '';
  const { session } = useSession();
  useEffect(() => {
    if (!session) return;
    fetchGlobalLeaderboard(session);
    fetchLeaderboard(session);
  }, [session, fetchLeaderboard]);

  useEffect(() => {
    fetchWords(difficulty);
  }, [difficulty, fetchWords]);

  // Initialize the first set of words
  useEffect(() => {
    if (words.length > 0) {
      const initialWords = words.slice(0, 5);
      setDisplayWords(initialWords);
      setRecentWords(initialWords.map((wordObj) => wordObj.word));
    }
  }, [words]);


  const handleStartGame = () => {
    setShowCountdown(true);
  };

  useEffect(() => {
    if (showCountdown && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0) {
      setIsGameActive(true);
      setShowCountdown(false);
      setCountdown(3);
    }
  }, [countdown, showCountdown]);

  const handleTimerComplete = async () => {
    setIsDialogOpen(true);
    setIsGameActive(false);
    setShowCountdown(false);
    setCountdown(3);
    if (session) {
      await saveLeaderboard(session, user_id);
    }
    return [false, 0];
  };


  // Restart game
  const handleRestart = () => {
    setTimer(15);
    setCorrectCount(0);
    setIncorrectCount(0);
    setInput("");
    setDisplayWords(words.slice(0, 5));
    setRecentWords(words.slice(0, 5).map((wordObj) => wordObj.word));
    setIsDialogOpen(false);
    setIsGameActive(false);
  };


  // Input logic
  const handleInputChange = (e) => setInput(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const isCorrect = input === displayWords[0]?.word;

      // Animate removal of the word
      setDisplayWords((prevWords) => {
        const newWords = [...prevWords.slice(1)];

        // Generate a new word that is not in recent history
        let nextWord;
        do {
          nextWord = words[Math.floor(Math.random() * words.length)];
        } while (recentWords.includes(nextWord.word));

        // Add the new word and update the recent history
        newWords.push(nextWord);
        setRecentWords((prevHistory) => {
          const updatedHistory = [...prevHistory.slice(-4), nextWord.word]; // Keep last 5 words
          return updatedHistory;
        });

        return newWords;
      });

      // Update scores
      if (isCorrect) {
        setCorrectCount(correctCount + 1);
      } else {
        setIncorrectCount(incorrectCount + 1);
      }

      setInput(""); // Clear input
    }
  };

  return (
    <main className="mt-24 pb-8 text-black">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Page title</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            <section aria-labelledby="section-1-title">
              <h2 id="section-1-title" className="text-white text-center">
                Play the game
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:p-6 grid place-items-center min-h-72">
                      {!isGameActive && !showCountdown && (
                        <motion.button
                          onClick={handleStartGame}
                          className="mt-2 px-6 py-3 text-lg bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white font-bold"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Start Game
                        </motion.button>
                      )}

                      {/* Countdown Timer */}
                      {showCountdown && (
                        <AnimatePresence>
                          <motion.div
                            key={countdown}
                            className="text-[64px] font-bold mt-8 text-black"
                          >
                            {countdown}
                          </motion.div>
                        </AnimatePresence>
                      )}
                      {/* Words Area */}
                      {
                        isGameActive && (
                          <div
                            className="max-w-[56rem]"
                            style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "14rem" }}
                          >
                            <div
                              className="h-[11rem] w-[45rem] rounded-[10px] flex justify-center items-center p-5"
                              style={{
                                color: "#fff",
                                textAlign: "center",
                              }}
                            >
                              <AnimatePresence>
                                {displayWords.map((wordObj, index) => (
                                  <motion.span
                                    key={wordObj.id}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{
                                      opacity: 0,
                                      scale: 0.8,
                                      backgroundColor: index === 0 ? (input === wordObj.word ? "green" : "red") : "black",
                                      transition: { duration: 0.5 },
                                    }}
                                    className={`mx-2 px-2 py-1 rounded ${index === 0 ? "bg-black" : "bg-gray-700"
                                      }`}
                                  >
                                    {wordObj.word}
                                  </motion.span>
                                ))}
                              </AnimatePresence>
                            </div>
                          </div>
                        )
                      }

                    </div>
                    <div className="bg-gray-50 px-4 py-4 sm:px-6">
                      <div className="grid grid-cols-[0.2fr_0.8fr_0.2fr] justify-items-center items-center">

                        <div>
                          <IterationCw className="h-8 w-8 text-white" onClick={handleRestart} />
                        </div>

                        <Input
                          type="text"
                          placeholder="Type here..."
                          className="text-black"
                          value={input}
                          onChange={handleInputChange}
                          onKeyPress={handleKeyPress}
                          disabled={!isGameActive}
                        />
                        {isGameActive &&
                          <div>
                            <CountdownCircleTimer
                              isPlaying
                              duration={15}
                              colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                              colorsTime={[10, 6, 3, 0]}
                              onComplete={handleTimerComplete}
                              size={30}
                              strokeWidth={3}
                            >
                              {({ remainingTime }) => <div className="text-[12px]">{remainingTime}s</div>}
                            </CountdownCircleTimer>
                          </div>
                        }

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 id="section-2-title" className="text-black text-center font-extrabold">
                Leaderboard
              </h2>
              <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="p-6">
                  <div className="overflow-x-auto shadow-md rounded-[12px] sm:w-full min-h-96">
                    {
                      isLoading ? (
                        <LoadingSpinner />
                      ) : (
                        <table className="text-sm text-left rtl:text-right text-gray-500 w-full">
                          <thead className="text-base bg-secondary">
                            <tr>
                              <th scope='col' className='px-6 py-3'>Rank</th>
                              <th scope="col" className="px-6 py-3">Username</th>
                              <th scope="col" className="px-6 py-3">Score</th>
                            </tr>
                          </thead>
                          <tbody>
                            {globalLeaderboard && globalLeaderboard.map((history, index) => (
                              <tr key={history.id} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}>
                                <td className='px-6 py-4'>#{history?.rank}</td>
                                <td className="px-6 py-4 min-w-20">{history.userName || "--"}</td>
                                <td className="px-6 py-4 min-w-20">{history.total_score || "--"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )
                    }
                  </div>
                  <Button
                    className="mt-4"
                    onClick={() => console.log('Check complete leaderboard')}
                  >
                    Check complete leaderboard
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <TimesUpDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        playData={{ typedWords: correctCount + incorrectCount, time: timer }}
        onConfirm={() => setIsDialogOpen(false)}
        isLoading={false}
      />
    </main>
  );
}

export default Story;
