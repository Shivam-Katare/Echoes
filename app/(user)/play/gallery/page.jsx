"use client";

import React, { useEffect } from "react";
import GalleryWall from "./GalleryWall";
import usePlayStore from "@/store/playStore";
import { useSession, useUser } from "@clerk/nextjs";
import LoadingStory from "@/components/loading-story";

export default function Gallery() {
  const { session } = useSession();
  const user = useUser().user;
  const user_id = user?.id ?? '';
  const { fetchGallery, fetchStory, fetchCheckpoint, gameData, checkpoint, galleryImages, isLoading } = usePlayStore();

  useEffect(() => {
    if (session) {
      fetchStory(session);
      fetchCheckpoint(session, user_id);
    }
  }, [fetchStory, fetchCheckpoint, session, user_id]);

  useEffect(() => {
    if (gameData.length && checkpoint.length) {
      fetchGallery(session, user_id);
      console.log("fetchGallery");
    }
  }, [fetchGallery, gameData, checkpoint]);
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundImage: 'linear-gradient(to right, #8d99ae, #a1afbf, #b8c6d0, #d2dce2, #edf2f4)'
      }}
    >
      {
        isLoading ? (
            <div className="flex justify-center items-center h-screen">
              <LoadingStory textToShow="Loading Gallery..." />
            </div>
          ) : <GalleryWall images={galleryImages} />
      }

    </div>
  )
}