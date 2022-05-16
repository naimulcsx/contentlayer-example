import { allPosts, Post } from "contentlayer/generated";
import type { GetStaticProps, NextPage } from "next";
import Layout from "components/Layout";
import PostCard from "components/PostCard";
import PageTitle from "components/PageTitle";
import Pagination from "components/Pagination";

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = allPosts.sort((a, b) => {
    const x = new Date(a.date);
    const y = new Date(b.date);
    if (x === y) return 0;
    else if (x < y) return 1;
    else return -1;
  });
  const totalPosts = allPosts.length;
  const postsPerPage = 2;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return {
    props: {
      posts,
      totalPages,
    },
  };
};

const Home: NextPage<{ posts: Post[]; totalPages: number }> = ({
  posts,
  totalPages,
}) => {
  return (
    <Layout>
      <PageTitle
        title="Contentlayer + Next.js Blog"
        description="Hi, I'm Naimul Haque. Aspiring to become a polymath."
      />
      <div className="space-y-12">
        {posts.map((post) => {
          return <PostCard {...post} />;
        })}
      </div>
      <Pagination totalPages={totalPages} />
    </Layout>
  );
};

export default Home;
