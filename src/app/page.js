import Card from "@/components/Home/Card";
import HomeCarousel from "@/components/Home/HomeCarousel";

async function getTopAiring() {
  const res = await fetch("https://api.enime.moe/popular");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.data;
}

async function getALData() {
  const res = await fetch("https://api.enime.moe/popular");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  const coverImage = data.data[0].coverImage;
  return coverImage;
}

export default async function Home() {
  const topAiring = await getTopAiring();
  const ALData = await getALData();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <HomeCarousel />
      <h1 className="text-2xl font-bold sm:text-3xl mb-5">Top Airing Anime</h1>
      <div className="w-full flex flex-wrap justify-center">
        {topAiring.map((item, id) => (
          <Card key={id} item={item} id={id} />
        ))}
      </div>
    </main>
  );
}
