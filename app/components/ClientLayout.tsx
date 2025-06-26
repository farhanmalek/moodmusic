'use client'

import { usePathname } from "next/navigation";
import NavBar from "./navbar/NavBar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className={`flex-grow ${pathname === "/" ? "w-full h-full" : "container mx-auto px-4 sm:px-6 lg:px-8 py-8"}`}>
        {children}
      </main>
    </div>
  );
} 