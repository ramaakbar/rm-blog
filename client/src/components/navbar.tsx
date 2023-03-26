import Image from "next/image";
import Link from "next/link";
import { useLogout, useUser } from "@/features/auth/hooks";

import ThemeSwitch from "./themeSwitch";

export default function Navbar() {
  const { user } = useUser();
  const { logout } = useLogout();

  return (
    <header className="p-4 border-b border-b-line">
      <div className="mx-auto flex max-w-4xl justify-between items-center">
        <Link href={"/"}>RM Blog</Link>
        <nav className="flex space-x-3 items-center">
          <ThemeSwitch />
          {user?.isLoggedIn && (
            <>
              <Image
                src={user?.data?.picture as string}
                alt=""
                width={30}
                height={30}
                className="rounded-full"
              />
              <span>{user?.data?.username}</span>
              <div onClick={() => logout()}>Logout</div>
            </>
          )}
          {!user?.isLoggedIn && (
            <>
              <Link href={"/login"}>Login</Link>
              <Link href={"/register"}>Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
