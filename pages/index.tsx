import Head from "next/head";
import Link from "next/link";
import { gql } from "@apollo/client";
import Image from "next/image";
import { getApolloClient } from "../lib/apollo-client";
// import categoryStyles from './category/category.module.css'
import indexStyles from "./index.module.css";

export default function Home({ categories, page }: any) {
  const { title, description } = page;
  console.log("categories:", categories);
  const Categories = () => <ul className={indexStyles.categories}>{(categories || []).map(({ node: item }: any) => {
    return (
      <li key={`/category/${item.slug}`}
      //className={styles.card}
      >
        <Link href={`/category/${item.slug}`}>

          <h3
          >{item.name}</h3>

        </Link>
      </li>
    )
  })
  }</ul>

  return (
    <div className={indexStyles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Categories />

      <main className={indexStyles.main}>
        <div className={indexStyles.background} />
        <p className={indexStyles.description}>{description}</p>

        <ul className={indexStyles.grid}>
          {categories &&
            categories.length > 0 &&
            categories.map(({ node: category }: any) => {
              return category.posts.nodes.length ?
                (
                  <div key={category.slug}>
                    <Link href={`/category/${category.slug}`} className={indexStyles.link}>
                      <h3 className={`${indexStyles.h3} ${indexStyles.link}`}>{category.description}</h3>
                    </Link>

                    <ul className={indexStyles.postExcerptContainer}>
                      {category.posts.nodes && category.posts.nodes.map((post: any) => {

                        return (
                          <li key={post.name} className={indexStyles.postExcerpt} >
                            <Link href={post.uri}>

                              {post.featuredImage?.node?.sourceUrl &&
                                <div>
                                  <Image
                                    src={post.featuredImage?.node?.sourceUrl ?? "/images/laura1.jpg"}
                                    // fill
                                    // layout='fill'
                                    width={1200}
                                    height={800}
                                    alt={post.title}
                                    // className="absolute rounded-md h-full w-full object-cover"
                                    className={indexStyles.featuredImage}
                                  />
                                </div>}
                              <h3
                                dangerouslySetInnerHTML={{
                                  __html: post.title,
                                }}
                              />
                              <div
                                className={indexStyles.excerpt}
                                dangerouslySetInnerHTML={{
                                  __html: post.excerpt,
                                }}
                              />

                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ) : null
            })}
        </ul>
      </main>
    </div >
  );
}

export async function getStaticProps({ locale }: any) {
  const apolloClient = getApolloClient();
  const language = locale.toUpperCase();

  const getPostsForEachCategory = await apolloClient.query({
    query: gql`
      query postsForEachCategory($language: LanguageCodeFilterEnum!) {
       generalSettings {
          title
          description
        }
        categories(where: {language: $language}) {
          edges {
            node {
              name
              slug
              description
              posts {
                nodes {
                  title
                  slug
                  excerpt(format: RENDERED)
                  uri
                  featuredImage {
                    node {
                      sourceUrl(size: LARGE)
                    }
                  }
                }
              }
            }
          }
        }
      }`,
    variables: {
      language,
    },
  })


  const categories = getPostsForEachCategory?.data.categories.edges
  // let posts = data?.data.posts.edges
  // const posts = getPostsForEachCategory?.data.categories.nodes

  // .map(({ node }) => node)


  const page = {
    ...getPostsForEachCategory?.data.generalSettings,
  };

  return {
    props: {
      page,
      // posts,
      categories: categories
    },
  };
}
