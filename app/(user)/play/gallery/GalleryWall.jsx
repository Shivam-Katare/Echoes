// components/GalleryWall/GalleryWall.js
import React from 'react';
import PolaroidImage from './PolaroidImage';

export const GalleryWall = ({ images }) => {

  return (
    <div className="relative w-full min-h-[800px] bg-[#f7f1e3] shadow-2xl p-8 mx-auto">
      {/* Cork board texture overlay */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
            `,
          backgroundSize: '20px 20px',
          backgroundRepeat: "repeat",
          mixBlendMode: "multiply",
        }}
      />

      <div className="max-w-7xl mx-auto">
        <h1 className={`caveat-gallery-1 text-4xl text-gray-800 mb-12 text-center`}>Memory Gallery</h1>

        {
          images?.length === 0 ? (
            <div className="grid place-items-center">
              <p className="text-3xl font-[fangsong] italic text-gray-800">Ava will collect all her memories here, in form of images</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
              {images.map((image, index) => (
                <PolaroidImage
                  key={index}
                  {...image}
                />
              ))}
            </div>
          )
        }
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#8d99ae]/20 to-transparent" />
    </div>
  );
};

export default GalleryWall;
