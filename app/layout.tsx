import "./globals.css";
import NavBar from "./components/navbar/NavBar";
import QueryProvider from "./components/QueryProvider";
import ClientLayout from "./components/ClientLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white antialiased">
        <QueryProvider>
          <ClientLayout>{children}</ClientLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
