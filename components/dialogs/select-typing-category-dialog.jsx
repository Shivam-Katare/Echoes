import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard, Trophy, ChevronRight } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import ComboSelector from '../selector';
import useGameSettingsStore from '@/store/useGameSettings';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const categories = [
  {
    id: 1,
    name: 'words',
    emoji: '🎬',
  },
  {
    id: 2,
    name: 'Music',
    emoji: '🎵',
  },
  {
    id: 3,
    name: 'Book',
    emoji: '📚',
  },
  {
    id: 4,
    name: 'Game',
    emoji: '🎮',
  },
  {
    id: 5,
    name: 'Food',
    emoji: '🍔',
  },
  {
    id: 6,
    name: 'Animal',
    emoji: '🐶',
  },
  {
    id: 7,
    name: 'Place',
    emoji: '🏞️',
  },
  {
    id: 8,
    name: 'Sport',
    emoji: '⚽',
  },
  {
    id: 9,
    name: 'Cartoon',
    emoji: '🦸',
  },
  // More users...
];

const difficulties = [
  { id: 'easy', name: 'Easy', color: 'bg-green-500 text-black' },
  { id: 'medium', name: 'Medium', color: 'bg-yellow-500 text-black' },
  { id: 'hard', name: 'Hard', color: 'bg-red-500 text-white' },
];

const wordsTimes = [
  { id: 'easy', name: 'Easy', time: '45 seconds' },
  { id: 'medium', name: 'Medium', time: '30 seconds' },
  { id: 'hard', name: 'Hard', time: '15 seconds' },
];

const paragraphsTimes = [
  { id: 'easy', name: 'Easy', time: '60 seconds' },
  { id: 'medium', name: 'Medium', time: '30 seconds' },
  { id: 'hard', name: 'Hard', time: '15 seconds' },
];

const SelectTypingCategoryDialog = ({ isOpen, onConfirm, isLoading, changeColor }) => {
  const { setCategory, setDifficulty, category, difficulty, time, setTime, challangeType, setChallangeType } = useGameSettingsStore();

  const canSave = challangeType && time;

  const handleTabChange = (tab) => {
    setChallangeType(tab);
  }

  const handleTimeChange = (timeId) => {
    const selectedTime = challangeType === 'words' ? wordsTimes.find(t => t.id === timeId) : paragraphsTimes.find(t => t.id === timeId);
    setTime(selectedTime.time.split(' ')[0]); // Set only the numeric part of the time
  }

  console.log(time);

  const handleConfirm = () => {
    onConfirm({ challangeType, time });
    changeColor();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[40rem] gradient-hero-5 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <DialogHeader className="relative">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="absolute -top-1 -right-1">
                <Trophy className="h-6 w-6 text-red-500 animate-pulse" />
              </div>
              <Keyboard className="h-16 w-16 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-primary-foreground">
              Choose Your Challenge
            </DialogTitle>
          </div>
        </DialogHeader>

        <Tabs defaultValue="words" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="words">Words</TabsTrigger>
            <TabsTrigger value="paragraphs">Paragraphs</TabsTrigger>
          </TabsList>
          <TabsContent value="words">
            <div className="space-y-4">
              <h3 className="text-sm font-medium leading-none">Select Time</h3>
              <RadioGroup
                className="flex gap-4"
                value={time}
                onValueChange={handleTimeChange}
              >
                {wordsTimes.map((time) => (
                  <div key={time.id} className="flex-1">
                    <RadioGroupItem
                      value={time.id}
                      id={time.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={time.id}
                      className={cn(
                        "flex items-center justify-center rounded-lg p-3 cursor-pointer",
                        "bg-gray-200",
                        "hover:opacity-90 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary"
                      )}
                    >
                      <span className="text-sm font-medium">{time.name} - {time.time}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>
          <TabsContent value="paragraphs">
            <div className="space-y-4">
              <h3 className="text-sm font-medium leading-none">Select Time</h3>
              <RadioGroup
                className="flex gap-4"
                value={time}
                onValueChange={handleTimeChange}
              >
                {paragraphsTimes.map((time) => (
                  <div key={time.id} className="flex-1">
                    <RadioGroupItem
                      value={time.id}
                      id={time.id}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={time.id}
                      className={cn(
                        "flex items-center justify-center rounded-lg p-3 cursor-pointer",
                        "bg-gray-200",
                        "hover:opacity-90 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary"
                      )}
                    >
                      <span className="text-sm font-medium">{time.name} - {time.time}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="sm:justify-between gap-4">
          <Button
            onClick={handleConfirm}
            className="flex-1 rounded-xl gradient-hero-4 text-black"
            disabled={!canSave || isLoading}
          >
            Save Preferences
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectTypingCategoryDialog;
