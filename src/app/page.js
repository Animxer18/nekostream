import Image from "next/image";
import { Inter } from "next/font/google";
import { API_URL } from "@/constant/constant";

const inter = Inter({ subsets: ["latin"] });

async function getTopAiring() {
  const res = await fetch(API_URL + "top-airing");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const topAiring = await getTopAiring();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Top Airing Anime</h1>
      {topAiring.results.map((item, id) => {
        return <p key={id}>{item.title}</p>;
      })}
    </main>
  );
}
