import { Crown } from "lucide-react";

export function ProfileHeader({ profileData }) {
  // Generate initials from userName
  const getInitials = (name) => {
    return name
      ?.split(' ')
      ?.map(word => word[0])
      ?.join('')
      ?.toUpperCase();
  };

  return (
    <div className="flex items-center space-x-6">
      <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
        <span className="text-2xl font-bold">{getInitials(profileData?.userName) || "--"}</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold">{profileData?.userName || "--"}</h1>
        <div className="flex items-center space-x-2 text-amber-600">
          <Crown className="w-5 h-5" />
          <span className="font-medium">Rank #{profileData?.rank || "--"}</span>
        </div>
      </div>
    </div>
  );
}