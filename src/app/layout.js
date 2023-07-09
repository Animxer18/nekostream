import Nav from "@/components/Nav/Nav";
import "./globals.css";
import { Lato } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import { Desc, Title } from "@/constant/constant";

const aw = Lato({ subsets: ["latin"], weight: "400" });
export const metadata = {
  title: Title,
  description: Desc,
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
