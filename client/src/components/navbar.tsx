import Link from "next/link";

import ThemeSwitch from "./themeSwitch";

export default function Navbar() {
  return (
    <header className="mx-auto flex max-w-4xl justify-between p-4">
      <Link href={"/"}>RM Blog</Link>
      <nav className="flex space-x-3">
        <div>User</div>
        <div>dropdown</div>
        <ThemeSwitch />
        <Link href={"/login"}>Login</Link>
        <Link href={"/register"}>Register</Link>
      </nav>
    </header>
  );
}
