import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogOverlay } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LucideTrash2 } from 'lucide-react';

const TimesUpDialog = ({ isOpen, onClose, playData, onConfirm, isLoading }) => {
  return (
    <Dialog open={isOpen}>
      <DialogOverlay className="bg-[#00000083] data-[state=open]:animate-overlayShow fixed inset-0" />
      <DialogContent className="sm:max-w-[40rem] text-foreground">
        <DialogHeader className="relative">
          <div className="flex flex-col items-center">
            <LucideTrash2 className="h-12 w-12 text-foreground mb-2" />
            <DialogTitle className="text-xl font-bold text-center text-foreground">
              Times up!!! 🕒
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="text-center">
          <p>
            You typed {playData?.typedWords} correct words in {playData?.time} seconds.
          </p>
        </div>

        <DialogFooter className="w-full flex-row space-x-6 mb-6">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full rounded-[14px] p-[1.6rem]"
            disabled={isLoading}
          >
            Go to Leaderboard
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="w-full bg-primary text-primary-foreground rounded-[14px] hover:bg-[red] p-[1.6rem]"
            disabled={isLoading}
          >
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimesUpDialog;
