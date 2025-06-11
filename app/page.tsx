"use client";
import { useEffect } from "react";
import HeroMessage from "./components/HeroMessage";

export default function Home() {

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <HeroMessage />
  );
}
