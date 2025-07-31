import Layout from "@/components/Layout/Layout";
import PostList from "@/components/Posts/PostList";
import { getPosts } from "@/lib/wp";

export default function Blog({ posts }) {
  return (
    <Layout>
      <h1>Blog</h1>
      <PostList posts={posts} />
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const posts = await getPosts(locale.toUpperCase());

  return {
    props: {
      posts,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { lang: "en" } },
      { params: { lang: "sr" } },
      { params: { lang: "de" } },
    ],
    fallback: false,
  };
}
