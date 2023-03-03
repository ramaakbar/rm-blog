import Navbar from "./navbar";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="mx-auto p-4 grid max-w-4xl grid-cols-4">
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
      </main>
    </>
  );
}
