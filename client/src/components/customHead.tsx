import Head from "next/head";

type Props = {
  title: string;
};

export default function CustomHead({ title }: Props) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Personal blog" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title" content="RM Blog" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="" />
      <meta property="og:image" content="" />
      <meta name="twitter:title" content="RM Blog" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="" />
      <meta name="twitter:image" content="" />
    </Head>
  );
}
