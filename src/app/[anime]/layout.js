import { Desc, Title } from "@/constant/constant";

export const metadata = {
  title: `One Piece Watch Online - ${Title}`,
  description: Desc,
};
export default function layout({ children }) {
  return <>{children}</>;
}
