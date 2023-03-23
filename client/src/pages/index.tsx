import Image from "next/image";

import CustomHead from "@/components/customHead";
import Layout from "@/components/layout";

export default function Home() {
  return (
    <>
      <CustomHead title="RM Blog" />
      <Layout>
        <div>
          <h3>Search</h3>
          <input type="text" placeholder="search" />
        </div>
        <div className="border-b border-b-line flex justify-between mb-5 pb-2">
          <h2>Posts (5)</h2>
          <div className="flex">
            <div>asc</div>
            <div>desc</div>
          </div>
        </div>
        <div className="space-y-5">
          {[...Array(4)].map((test, i) => (
            <div key={i} className="bg-base-2 border border-overlay">
              <Image
                src="https://images.unsplash.com/photo-1678971062140-2dca8fd40db7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
                width={500}
                height={500}
                className="aspect-video w-full"
              />
              <h3 className="font-bold text-lg">test</h3>
              <span className="text-base-content-3">January 5, 2023</span>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
}
