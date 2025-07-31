const API_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_ENDPOINT;

export async function fetchAPI(query, { variables } = {}) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

export async function getPosts(lang = "en", first = 10) {
  const data = await fetchAPI(
    `
    query GetPosts($lang: LanguageCodeFilterEnum, $first: Int) {
      posts(where: { language: $lang }, first: $first) {
        nodes {
          id
          title
          slug
          date
          excerpt
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
        }
      }
    }
  `,
    {
      variables: { lang, first },
    }
  );

  return data?.posts?.nodes;
}

export async function getPostBySlug(slug, lang = "en") {
  const data = await fetchAPI(
    `
    query GetPost($slug: ID!, $lang: LanguageCodeFilterEnum) {
      post(id: $slug, idType: SLUG) {
        id
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        translation(language: $lang) {
          id
          title
          content
        }
      }
    }
  `,
    {
      variables: { slug, lang },
    }
  );

  return data?.post;
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      posts(first: 10000) {
        nodes {
          slug
          language {
            code
          }
        }
      }
    }
  `);
  return data?.posts?.nodes;
}
