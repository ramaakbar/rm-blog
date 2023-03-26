import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { axios } from "@/utils/axios";
import useDebounce from "@/utils/useDebounce";
import { useInfiniteQuery } from "@tanstack/react-query";

import { postsSchema } from "./schemas";

type QueryType = {
  category?: string;
  order?: string;
  q?: string;
};

export const usePosts = ({ category, order = "desc", q = "" }: QueryType) => {
  const {
    data: posts,
    isLoading,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", category, order, q],
    queryFn: async ({ pageParam = "" }) => {
      const paramCategory = category ? `&category=${category}` : "";
      const paramQ = q ? `&q=${q}` : "";

      const data = await axios.get(
        `/posts?next=${pageParam}&order=${order}${paramQ}${paramCategory}`
      );

      return postsSchema.parse(data);
    },
    getNextPageParam: (lastPage) => lastPage.pagination.next_cursor,
  });

  return { posts, isLoading, fetchNextPage };
};

enum Order {
  asc = "asc",
  desc = "desc",
}

export const useOrder = () => {
  const router = useRouter();
  const [order, setOrder] = useState<keyof typeof Order>(
    Order[router.query.order as Order]
  );

  const handleOrder = () => {
    const toggleOrder = order === "desc" ? "asc" : "desc";
    setOrder(toggleOrder);
    router.push({
      pathname: "/",
      query: { ...router.query, order: toggleOrder },
    });
  };

  useEffect(() => {
    if (router.isReady) {
      setOrder(Order[router.query.order as Order] ?? "desc");
    }
  }, [router.isReady]);

  return { order, handleOrder };
};

export const useSearch = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState(router.query.q as string);
  const debounceText = useDebounce(searchText, 1000);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearchText(searchTerm);
  };

  useEffect(() => {
    router.push({
      pathname: "/",
      query: { ...router.query, q: debounceText },
    });
  }, [debounceText]);

  return { searchText, debounceText, handleChange };
};
