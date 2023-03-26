import Link from "next/link";

import Navbar from "@/components/navbar";

type Props = {
  children: React.ReactNode;
};
export default function HomeLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="p-4">
        <div className="mx-auto grid max-w-4xl grid-cols-4">
          <aside className="col-span-1 hidden sm:block">
            <h3>Categories</h3>
            <div className="flex flex-col">
              <Link href={{ pathname: "/" }}>All</Link>
              <Link
                href={{
                  pathname: "/",
                  query: { category: "Technology" },
                }}
              >
                Technology
              </Link>
              <Link
                href={{
                  pathname: "/",
                  query: { category: "Lifestyle" },
                }}
              >
                Lifestyle
              </Link>
              <Link
                href={{
                  pathname: "/",
                  query: { category: "Business" },
                }}
              >
                Business
              </Link>
              <Link
                href={{
                  pathname: "/",
                  query: { category: "Travel" },
                }}
              >
                Travel
              </Link>
              <Link
                href={{
                  pathname: "/",
                  query: { category: "Health and Fitness" },
                }}
              >
                Health and Fitness
              </Link>
              <Link
                href={{
                  pathname: "/",
                  query: { category: "Art and Culture" },
                }}
              >
                Art and Culture
              </Link>
              <Link
                href={{
                  pathname: "/",
                  query: { category: "Sports" },
                }}
              >
                Sports
              </Link>
            </div>
          </aside>
          <section className="col-span-4 sm:col-span-3">{children}</section>
        </div>
      </main>
    </>
  );
}
