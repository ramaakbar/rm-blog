import CustomHead from "@/components/customHead";
import Layout from "@/components/layout";

export default function Home() {
  const test:string = 1;

  const printTest = () => {
    console.log(test)
  }
  return (
    <>
      <CustomHead title="RM Blog" />
      <Layout>
        <div>
          <h3>Search</h3>
          <input type="text" placeholder="search" />
        </div>
        <div className="border-b flex justify-between">
          <h2>Posts (5)</h2>
          <div className="flex">
            <div>asc</div>
            <div>desc</div>
          </div>
        </div>
      </Layout>
    </>
  );
}
