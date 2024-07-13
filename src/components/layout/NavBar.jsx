import { cookies } from "next/headers";
import ClientNavBar from "./ClientNavBar";

const NavBar = () => {
  const cookieStore = cookies();
  const authorizationToken = cookieStore.get(process.env.COOKIE_KEY)?.value || null;
  console.log(authorizationToken)
  return (
    <ClientNavBar authorizationToken={authorizationToken} />
  );
};

export default NavBar;
