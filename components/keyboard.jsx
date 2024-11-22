import React from "react";

const keysLayout = [
  // Row 1
  ["tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "backspace"],
  // Row 2
  ["caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "enter"],
  // Row 3
  ["shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "rshift"],
  // Row 4
  ["ctrl", "alt", "space", "alt gr", "rctrl"],
];

function Keyboard() {
  return (
    <div className="bg-transparent rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
      <div className="grid gap-2">
        {keysLayout.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid ${
              rowIndex === 3
                ? "grid-cols-[0.2fr_0.2fr_1fr_0.2fr_0.2fr]" // 5 columns for the last row
                : rowIndex === 0
                ? "grid-cols-[1fr_repeat(10,_1fr)_2fr]"
                : rowIndex === 1
                ? "grid-cols-[1.5fr_repeat(10,_1fr)_2fr]"
                : "grid-cols-[2fr_repeat(10,_1fr)_2fr]"
            } gap-2`}
          >
            {row.map((key, keyIndex) => (
              <div
                key={keyIndex}
                className={`border border-white text-white text-center py-2 rounded-md ${
                  key === "space" ? "col-span-1" : "" // Space key takes 1 column in this layout
                }`}
              >
                {key}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Keyboard;
