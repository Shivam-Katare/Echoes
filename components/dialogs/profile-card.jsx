import React from 'react'
import { ProfileHeader } from '../profile-header'
import { ProfileStats } from '../profile-stats'
function ProfileCardDialog({ profileData }) {
  return (
    <div className="bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <ProfileHeader profileData={profileData} />
        <div className="mt-8">
          <ProfileStats profileData={profileData} />
        </div>
      </div>
    </div>
  )
}

export default ProfileCardDialog