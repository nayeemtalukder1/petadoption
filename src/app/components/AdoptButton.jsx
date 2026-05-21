"use client";

import toast from "react-hot-toast";
import { Heart } from "lucide-react";

export default function AdoptButton() {
  return (
    <button
      onClick={() => toast.success("Adoption request coming soon!")}
      className="w-full py-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl text-xl font-semibold flex items-center justify-center gap-2"
    >
      <Heart size={20} />
      Adopt Now
    </button>
  );
}