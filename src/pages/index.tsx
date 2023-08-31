import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "@/components/InfiniteScroll";

interface IPosts {
  author: string;
  title: string;
  imageUrl: string;
  description: string;
}

export default function App() {
  const [page, setPage] = useState<number>(1);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [posts, setPosts] = useState<IPosts[]>([]);
  const refs = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await (
        await fetch(
          `http://js-post-api.herokuapp.com/api/posts?_page=${page}&_limit=10`
        )
      ).json();
      setPosts([...posts, ...response.data]);
      setTotalRows(response.pagination._totalRows);
    })();
  }, [page]);

  const listPost = [
    { id: 1, name: "Asen" },
    { id: 1, name: "Asen" },
    { id: 1, name: "Asen" },
    { id: 1, name: "Asen" },
    { id: 1, name: "Asen" },
    { id: 1, name: "Asen" },
    { id: 1, name: "Asen" },
    { id: 1, name: "Asen" },
  ];

  return (
    <div>
      <InfiniteScroll
        loader={<p>loading...</p>}
        className="w-[800px] mx-auto my-10"
        fetchMore={() => setPage((prev) => prev + 1)}
        hasMore={posts.length < totalRows}
        endMessage={<p>You have seen it all</p>}
      >
        {posts.map((post, index) => (
          <div
            className="rounded-xl shadow-md mb-8 flex items-center p-5"
            key={index}
          >
            <img src={post.imageUrl} className="rounded-full w-14 h-14" />
            <div className="ml-5">
              <h3 className="font-medium">{post.author}</h3>
              <h1 className="font-bold text-xl">{post.title}</h1>
              <p>{post.description}</p>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
