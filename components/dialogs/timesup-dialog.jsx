import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogOverlay } from "@/components/ui/dialog";
import { Bomb } from 'lucide-react';

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
      }, 5000);

       return () => {
        clearTimeout(timer);
        clearInterval(countdownInterval);
      };
    } else {
      setCountdown(5);
    }
  }, [isOpen, onClose]);

  return (
    <Dialog open={isOpen}>
      <DialogOverlay className="bg-[#00000083] data-[state=open]:animate-overlayShow fixed inset-0" />
      <DialogContent className="sm:max-w-[40rem] text-black bg-[aliceblue]">
        <DialogHeader className="relative">
          <div className="flex flex-col items-center">
          <Bomb className="h-16 w-16 text-blue-600 animate-bounce mb-4" />
            <DialogTitle className="text-xl font-bold text-center text-foreground animate-pulse">
              Times up!!! 💥
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="text-center">
          <p>
            You typed <span className='text-green-600 font-bold'>{playData?.typedWords}</span> correct words.
          </p>
        </div>

        <div className="text-gray-300 text-sm">
            New game starting in <span className="text-blue-500 font-bold">{countdown}</span>
          </div>
      </DialogContent>
    </Dialog>
  );
};

export default TimesUpDialog;