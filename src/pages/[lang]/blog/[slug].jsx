import Layout from "@/components/Layout/Layout";
import { getPostBySlug, getAllPostsWithSlug } from "@/lib/wp";
import Image from "next/image";
import styles from "./Post.module.scss";

export default function Post({ post }) {
  if (!post) return <div>Loading...</div>;

  return (
    <Layout>
      <article className={styles.post}>
        {post.featuredImage?.node && (
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || post.title}
            width={800}
            height={400}
            className={styles.featuredImage}
          />
        )}
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </Layout>
  );
}

export async function getStaticProps({ params, locale }) {
  const post = await getPostBySlug(params.slug, locale.toUpperCase());

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();

  const paths = allPosts.map((post) => ({
    params: {
      lang: post.language.code.toLowerCase(),
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
