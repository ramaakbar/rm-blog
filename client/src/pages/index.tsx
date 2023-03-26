import { Fragment } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useOrder, usePosts, useSearch } from "@/features/posts/hooks";
import { SortAsc, SortDesc } from "lucide-react";

import CustomHead from "@/components/customHead";
import HomeLayout from "@/components/homeLayout";

export default function Home() {
  const router = useRouter();

  const { order, handleOrder } = useOrder();

  const { searchText, debounceText, handleChange } = useSearch();

  const { posts, isLoading, fetchNextPage } = usePosts({
    category: router.query.category as string,
    order: order,
    q: debounceText,
  });

  return (
    <>
      <CustomHead title="RM Blog" />
      <HomeLayout>
        <div>
          <h3>Search</h3>
          <input
            type="text"
            placeholder="search"
            value={searchText}
            onChange={handleChange}
          />
        </div>
        <div className="border-b border-b-line flex justify-between mb-5 pb-2 items-center">
          <h2>Posts ({posts?.pages[0]?.pagination.count})</h2>
          <button onClick={handleOrder}>
            {order === "asc" ? <SortAsc size={20} /> : <SortDesc size={20} />}
          </button>
        </div>
        <div className="space-y-5">
          {isLoading && <div>loading..</div>}
          {!isLoading &&
            posts?.pages.map((page, i) => (
              <Fragment key={i}>
                {page.data.map((post) => (
                  <div
                    key={post.id}
                    className="bg-base-2 border border-overlay"
                  >
                    <Image
                      src={post.thumbnail}
                      alt=""
                      width={500}
                      height={500}
                      className="aspect-video w-full"
                    />
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <span className="text-base-content-3">
                      {post.category.name}
                    </span>
                    <span className="text-base-content-3">
                      {post.created_at}
                    </span>
                  </div>
                ))}
              </Fragment>
            ))}
          <button
            onClick={() => {
              fetchNextPage();
            }}
          >
            nextPage
          </button>
        </div>
      </HomeLayout>
    </>
  );
}
