import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const categoryGradients = {
  Movie: `linear-gradient(360deg, hsla(345, 82%, 63%, 1) 0%, hsla(300, 73%, 50%, 1) 100%)`,
  Music: `linear-gradient(360deg, hsla(240, 60%, 70%, 1) 0%, hsla(210, 100%, 40%, 1) 100%)`,
  Book: `linear-gradient(360deg, hsla(120, 40%, 80%, 1) 0%, hsla(90, 60%, 50%, 1) 100%)`,
  Game: `linear-gradient(360deg, hsla(280, 40%, 80%, 1) 0%, hsla(260, 70%, 50%, 1) 100%)`,
  Food: `linear-gradient(360deg, hsla(30, 80%, 60%, 1) 0%, hsla(10, 100%, 50%, 1) 100%)`,
  Animal: `linear-gradient(360deg, hsla(150, 60%, 70%, 1) 0%, hsla(140, 80%, 50%, 1) 100%)`,
  Place: `linear-gradient(360deg, hsla(200, 60%, 70%, 1) 0%, hsla(180, 80%, 50%, 1) 100%)`,
  Sport: `linear-gradient(360deg, hsla(0, 80%, 60%, 1) 0%, hsla(0, 100%, 50%, 1) 100%)`,
  Cartoon: `linear-gradient(360deg, hsla(300, 80%, 60%, 1) 0%, hsla(280, 100%, 50%, 1) 100%)`,
};

export const mockLeaderboardData = [
  {
    id: 1,
    rank: 1,
    username: "SpeedDemon",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&h=60&fit=crop",
    score: 98750,
    wpm: 145,
    accuracy: 99.2,
    difficulty: "Hard",
    wordsTyped: 1250,
    date: "24 Nov 2024",
    timeTaken: "5m 30s",
    correctWords: 1230,
    incorrectWords: 20,
    badges: ["fastest", "accurate", "streak"],
  },
  // Add more mock data as needed
];

export const difficultyColors = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800',
};

