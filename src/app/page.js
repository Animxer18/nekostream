import Image from "next/image";
import { Inter } from "next/font/google";
import { AL_API, API_URL } from "@/constant/constant";

const inter = Inter({ subsets: ["latin"] });

async function getTopAiring() {
  const res = await fetch(API_URL + "top-airing", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

// AniList Api Functions
function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data) {
  console.log("AL-data", data["data"]["Media"]);
}

function handleError(error) {
  console.error(error);
}

async function getALData() {
  var query = `query ($id: Int, $search: String) {
  Media (id: $id, type:ANIME, search: $search) {
    id
    title {
      romaji,
      english
    }
    episodes,
    type
  }
}`;

  var variables = {
    search: "to your eternity",
  };
  var url = AL_API,
    options = {
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
  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);
}

export default async function Home() {
  const topAiring = await getTopAiring();
  const ALData = await getALData();
  console.log("aaa", ALData);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Top Airing Anime</h1>
      {topAiring.results.map((item, id) => {
        return <p key={id}>{item.title}</p>;
      })}
    </main>
  );
}
