import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: 'Damien Goehrig - Portfolio',
  description: 'Portfolio of Damien Goehrig, an intermediate software developer, with a passion for modern web technologies and a love for learning new things.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" >
      {children}
    </html>
  );
}
