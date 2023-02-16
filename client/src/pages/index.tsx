import Head from "next/head";
import Link from "next/link";

import CustomHead from "@/components/customHead";

export default function Home() {
  return (
    <>
      <CustomHead title="RM Blog" />
      <main className="">
        <nav className="mx-auto flex max-w-4xl justify-between p-4">
          <Link href={"/"}>RM Blog</Link>
          <div className="flex space-x-3">
            <div>User</div>
            <div>dropdown</div>
            <Link href={"/login"}>Login</Link>
            <Link href={"/register"}>Register</Link>
          </div>
        </nav>
        <div className="mx-auto grid max-w-4xl grid-cols-4">
          <aside className="col-span-1 hidden sm:block">
            <h3>Categories</h3>
            <ul>
              <li>Technology</li>
              <li>Lifestyle</li>
              <li>Business</li>
              <li>Travel</li>
              <li>Health and Fitness</li>
              <li>Art and Culture</li>
              <li>Sports</li>
            </ul>
          </aside>
          <section className="col-span-4 sm:col-span-3">
            <div>
              <h3>Search</h3>
              <input type="text" placeholder="search" />
            </div>
            <div className="border-b">
              <h2>Posts (5)</h2>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
