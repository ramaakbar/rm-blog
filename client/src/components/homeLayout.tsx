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
          <section className="col-span-4 sm:col-span-3">{children}</section>
        </div>
      </main>
    </>
  );
}
