import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog";
import { Bomb, Type, Check, X, Clock, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TimesUpDialog = ({ isOpen, onClose, playData, restartGame }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isOpen) {
      const countdownInterval = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);

      const timer = setTimeout(() => {
        onClose();
        restartGame();
      }, 8000);

      return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
      };
    } else {
      setCountdown(8);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen}>
      <DialogOverlay className="bg-[#000000]/75 backdrop-blur-sm data-[state=open]:animate-overlayShow fixed inset-0" />
      <DialogContent className="sm:max-w-[40rem] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 shadow-xl">
        <DialogHeader className="relative mb-6">
          <motion.div 
            className="flex flex-col items-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Bomb className="h-16 w-16 text-indigo-400 animate-bounce mb-4" />
            <DialogTitle className="text-3xl font-bold text-center text-white">
              Time&apos;s Up! 💥
            </DialogTitle>
          </motion.div>
        </DialogHeader>

        <div className="space-y-8 px-4">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
              className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-5 h-5 text-green-400" />
                <h3 className="text-green-400 font-semibold">Correct Words</h3>
              </div>
              <p className="text-3xl font-bold text-white">{playData?.typedWords || 0}</p>
            </motion.div>

            <motion.div 
              className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <X className="w-5 h-5 text-red-400" />
                <h3 className="text-red-400 font-semibold">Incorrect Words</h3>
              </div>
              <p className="text-3xl font-bold text-white">{playData?.incorrectWords || 0}</p>
            </motion.div>
          </div>

          {/* Accuracy and WPM */}
          <motion.div 
            className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span className="text-indigo-400 text-sm">Accuracy</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {Math.round((playData?.typedWords / (playData?.typedWords + playData?.incorrectWords || 1)) * 100)}%
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Type className="w-4 h-4 text-indigo-400" />
                  <span className="text-indigo-400 text-sm">WPM</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {Math.round((playData?.typedWords || 0) * (60 / 30))}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div 
            className="text-center py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-full">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span className="text-slate-400">
                New game in <span className="text-indigo-400 font-bold">{countdown}s</span>
              </span>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimesUpDialog;
