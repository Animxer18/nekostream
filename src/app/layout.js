import Nav from "@/components/Nav/Nav";
import "./globals.css";
import { Lato } from 'next/font/google'
const aw = Lato({ subsets: ['latin'], weight: '400' })
import Footer from "@/components/Footer/Footer";

export const metadata = {
  title: "nekostream",
  description: "A site to watch anime, for free, without any!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={aw.className}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
