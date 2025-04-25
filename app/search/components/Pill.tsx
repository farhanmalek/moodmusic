import React from "react";

const Pill = ({ label }: { label: string }) => {
  function handlePillClick() {
    console.log("pill clicked");
  }

  return (
    <button
      onClick={handlePillClick}
      className={`px-6 py-3 rounded-full text-sm font-semibold border transition-all duration-300
    bg-white/10 text-white hover:bg-pink-600 hover:border-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50`}
    >
      {label}
    </button>
  );
};

export default Pill;
