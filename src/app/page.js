import Image from "next/image";
import Link from "next/link";

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
      <h1 className="text-2xl font-bold sm:text-3xl mb-5">Top Airing Anime</h1>
      <div className="w-full flex flex-wrap justify-center">
        {topAiring.map((item, id) => {
          return (
            <div key={id} className="px-4 py-4 w-[90%] md:w-1/5">
              <div className="group h-full relative block bg-black">
                <Link href="/">
                  <Image
                    alt="Developer"
                    src={
                      item.coverImage
                        ? item.coverImage
                        : "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx114535-y3NnjexcqKG1.jpg"
                    }
                    fill
                    className="shrink-0 border-black rounded-2xl absolute inset-0 h-full w-full object-cover opacity-[0.5] transition-opacity group-hover:opacity-20"
                  />
                  <div className="relative p-4 sm:p-6 lg:p-8">
                    <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                      # {id + 1}
                    </p>
                    <p className="text-xl font-bold text-white sm:text-2xl">
                      {item.title ? item.title.userPreferred : item.id}
                    </p>
                    <div className="mt-32 sm:mt-48 lg:mt-64">
                      <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        {item.genre.map((genre, key) => {
                          const isLastGenre = key === item.genre.length - 1;
                          return (
                            <span key={key} className="text-sm text-white">
                              {genre}
                              {isLastGenre ? "" : ", "}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
