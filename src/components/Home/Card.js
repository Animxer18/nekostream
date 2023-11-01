import Image from "next/image";
import Link from "next/link";

export default function Card({ item, id }) {
  return (
    <div key={id} className="px-4 py-4 w-[90%] md:w-1/5">
      <div className="group h-full relative block bg-black">
        <Link href="/">
          <Image
            alt="Developer"
            src={
              item.image
                ? item.image
                : "https://gogocdn.net/cover/tate-no-yuusha-no-nariagari-season-3-1698302959.png"
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
                {item.genres && item.genres.map((genre, key) => { 
                  const isLastGenre = key === item.genres.length - 1;
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
}
