'use client'
import "./globals.css";
import NavBar from "./components/navbar/NavBar";
import QueryProvider from "./components/QueryProvider";
import { usePathname } from "next/navigation";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white antialiased">
        <QueryProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className={`flex-grow ${pathname === "/" ? "w-full h-full" : "container mx-auto px-4 sm:px-6 lg:px-8 py-8"}`}>
              {children}
            </main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
