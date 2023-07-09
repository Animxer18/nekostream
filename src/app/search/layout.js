import { Desc, Title } from "@/constant/constant";

export const metadata = {
  title: `Search Anime - ${Title}`,
  description: Desc,
};
export default function layout({ children }) {
  return <>{children}</>;
}
