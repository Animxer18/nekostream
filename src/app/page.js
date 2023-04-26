import Image from "next/image";
import { Inter } from "next/font/google";
import { AL_API, API_URL } from "@/constant/constant";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

async function getTopAiring() {
  const res = await fetch(API_URL + "top-airing", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// AniList Api Functions

// function handleResponse(response) {
//   return response.json().then(function (json) {
//     return response.ok ? json : Promise.reject(json);
//   });
// }

// function handleData(data) {
//   const coverImage = data["data"]["Media"].coverImage.extraLarge;
//   console.log("ll", coverImage);
//   return coverImage;
// }

// function handleError(error) {
//   console.error("error", error);
// }

// async function getALData() {
//   var query = `query ($id: Int, $search: String) {
//   Media (id: $id, type:ANIME, search: $search) {
//     id
//     title {
//       romaji,
//       english
//     }
//     episodes,
//     type,
//     coverImage {
//       extraLarge
//       large
//       medium
//       color
//     },
//     bannerImage
//   }
// }`;

//   var variables = {
//     search: "to your eternity",
//   };
//   var url = AL_API,
//     options = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         query: query,
//         variables: variables,
//       }),
//     };
//   fetch(url, options).then(handleResponse).then(handleData).catch(handleError);
// }

// Shorter version of AniList API
async function getALData() {
  const query = `
    query ($id: Int, $search: String) {
      Media (id: $id, type:ANIME, search: $search) {
        coverImage {
          extraLarge
        }
      }
    }
  `;
  const variables = {
    search: "Death Note",
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };
  const res = await fetch(AL_API, options);
  const json = await res.json();
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const coverImage = json.data.Media.coverImage.extraLarge;
  return coverImage;
}

export default async function Home() {
  const topAiring = await getTopAiring();
  const ALData = await getALData();
  console.log("top", topAiring);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-2xl font-bold sm:text-3xl mb-5">Top Airing Anime</h1>
      <div className="w-full flex flex-wrap gap-4 justify-center">
        {topAiring.results.map((item, id) => {
          return (
            <div
              className="group relative block bg-black w-[90%] md:w-1/5"
              key={id}
            >
              <Link href="/">
                <Image
                  alt="Developer"
                  src={
                    item.image
                      ? item.image
                      : "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx114535-y3NnjexcqKG1.jpg"
                  }
                  fill
                  className="absolute inset-0 h-full w-full object-cover opacity-[0.5] transition-opacity group-hover:opacity-30"
                />
                <div className="relative p-4 sm:p-6 lg:p-8">
                  <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                    # {id + 1}
                  </p>
                  <p className="text-xl font-bold text-white sm:text-2xl">
                    {item.title ? item.title : item.id}
                  </p>
                  <div className="mt-32 sm:mt-48 lg:mt-64">
                    <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                      {item.genres.map((genre) => {
                        return (
                          <span key={genre.id} className="text-sm text-white">
                            {genre}{" "}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
