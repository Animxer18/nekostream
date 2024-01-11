import Card from "@/components/Home/Card";
import HomeCarousel from "@/components/Home/HomeCarousel";

async function getTopAiring() {
  const res = await fetch("https://animxer-api-cvxg.vercel.app/anime/gogoanime/top-airing");
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data.results;
}

export default async function Home() {
  const topAiring = await getTopAiring();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <HomeCarousel />
      <h1 className="text-2xl font-bold sm:text-3xl mb-5">Top Airing Anime</h1>
      <div className="w-full flex flex-wrap justify-center">
        {topAiring.map((item, title) => (
          <Card key={title} item={item} id={item.title} />
        ))}
      </div>
    </main>
  );
}
