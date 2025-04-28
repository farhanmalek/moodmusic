import React from "react";
import { useRouter } from "next/navigation";

const Pill = ({ label }: { label: string }) => {

  const router = useRouter();

  function handlePillClick() {
     router.push(`/results?query=${encodeURIComponent(label)}`)
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
