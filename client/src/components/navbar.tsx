import Link from "next/link";
import { useLogout, useUser } from "@/features/auth/hooks";

import ThemeSwitch from "./themeSwitch";

export default function Navbar() {
  const { user } = useUser();
  const { logout } = useLogout();

  return (
    <header className="p-4 border-b border-b-line">
      <div className="mx-auto flex max-w-4xl justify-between">
        <Link href={"/"}>RM Blog</Link>
        <nav className="flex space-x-3">
          <div>User</div>
          <div>dropdown</div>
          <ThemeSwitch />
          {user && (
            <>
              <span>{user?.username}</span>{" "}
              <div onClick={() => logout()}>Logout</div>
            </>
          )}
          {!user && (
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
