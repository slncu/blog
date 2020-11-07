const Post = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <div>
        {post.tags.map((tag) => (
          <span key={tag.id}>{tag.name}</span>
        ))}
      </div>
      <div dangerouslySetInnerHTML={{ __html: `${post.body}` }}></div>
    </div>
  );
};

export const getStaticPaths = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY },
  };

  const res = await fetch("https://sinc.microcms.io/api/v1/posts", key);
  const repos = await res.json();

  const paths = repos.contents.map((repo) => `/posts/${repo.id}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;

  const key = {
    headers: { "X-API-KEY": process.env.API_KEY },
  };

  const res = await fetch(`https://sinc.microcms.io/api/v1/posts/${id}`, key);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
};

export default Post;
