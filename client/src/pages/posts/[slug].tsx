import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { PostType, postsSchema } from "@/features/posts/schemas";
import { axios } from "@/utils/axios";
import { format } from "date-fns";

import CustomHead from "@/components/customHead";
import Navbar from "@/components/navbar";

type ParamsType = {
  slug: string;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get("/posts");
  const posts = postsSchema.parse(res).data;

  const paths = posts.map((post) => {
    return {
      params: { slug: post.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = (async (context) => {
  const { slug } = context.params as ParamsType;

  try {
    const res = await axios.get<PostType>(`/posts/${slug}`);
    const post = res.data;

    return {
      props: post,
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}) satisfies GetStaticProps;

type PostProps = InferGetStaticPropsType<typeof getStaticProps>;

export default function Post(props: PostProps) {
  const { isFallback } = useRouter();

  const date = format(new Date(props.created_at), "dd MMM yyyy");

  return (
    <>
      <CustomHead title={props.title} />
      <Navbar />
      <section className="max-w-2xl mx-auto p-4">
        {isFallback && <div>Loading...</div>}
        {!isFallback && (
          <>
            <Image
              src={props.thumbnail}
              alt=""
              width={400}
              height={300}
              className="aspect-video rounded bg-cover w-full mb-5"
            />
            <article className="space-y-2">
              <h2 className="text-2xl font-bold">{props.title}</h2>
              <div className="flex space-x-2">
                <p>{props.category.name}</p>
                <p>{props.views} views</p>
                <p>{props.likes} likes</p>
                <p>{date}</p>
              </div>
              <div className="prose md:prose-base">{props.body}</div>
            </article>
          </>
        )}
      </section>
    </>
  );
}
