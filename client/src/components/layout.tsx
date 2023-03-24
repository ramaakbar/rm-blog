import Navbar from "@/components/navbar";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-xl p-4">{children}</div>
    </>
  );
}
