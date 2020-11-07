import Link from "next/link";

const Home = ({ posts }) => {
  return (
    <div>
      <h2>最新の記事</h2>
      <div>
        {posts.map((blog) => (
          <div key={blog.id}>
            <Link href="/posts/[id]" as={`posts/${blog.id}`}>
              <a>
                <h2>{blog.title}</h2>
              </a>
            </Link>
            {blog.tags.map((tag) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const getStaticProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY },
  };
  const res = await fetch(`https://sinc.microcms.io/api/v1/posts/`, key);
  const data = await res.json();

  return {
    props: {
      posts: data.contents,
    },
  };
};

export default Home;
