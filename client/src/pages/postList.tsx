import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { postsSchema } from "@/features/posts/schemas";
import { axios } from "@/utils/axios";

import Layout from "@/components/layout";

export const getServerSideProps = (async (context) => {
  const data = await axios.get("/posts?limit=50");
  const posts = postsSchema.parse(data);

  return {
    props: { posts },
  };
}) satisfies GetServerSideProps;

type PostListProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function PostList({ posts }: PostListProps) {
  return (
    <Layout>
      {posts.data.map((post, index) => (
        <Link href={`/postEdit/${post.slug}`} key={post.id} className="block">
          {index}. {post.title}
        </Link>
      ))}
    </Layout>
  );
}
