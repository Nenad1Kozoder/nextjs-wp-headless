import Link from "next/link";
import Image from "next/image";
import styles from "./PostList.module.scss";

export default function PostList({ posts }) {
  if (!posts) return null;

  return (
    <div className={styles.postList}>
      {posts.map((post) => (
        <article key={post.id} className={styles.postCard}>
          {post.featuredImage?.node && (
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              width={300}
              height={200}
              className={styles.postImage}
            />
          )}
          <div className={styles.postContent}>
            <h2>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <div
              className={styles.excerpt}
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </div>
        </article>
      ))}
    </div>
  );
}
