"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";  // Import useSearchParams
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-4 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  
  const searchParams = useSearchParams();  // Use useSearchParams instead of useRouter

  const handleSearchChange = (e) => {
    if (e.target.value) {
      setSearchText(e.target.value);
      const filteredPosts = posts.filter((post) => {
        return (
          post.creator.username.toLowerCase().includes(e.target.value) ||
          post.tag.toLowerCase().includes(e.target.value) ||
          post.prompt.toLowerCase().includes(e.target.value)
        );
      });
      setPosts(filteredPosts);
    } else {
      setSearchText("");
      fetchPosts();
    }
  };

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt", { cache: "no-store"});
    const data = await response.json();
    setPosts(data);
    console.log(data)
  };

  useEffect(() => {
    // Check if refresh query exists in the URL
    if (searchParams.get("refresh")) {
      fetchPosts(); // Refetch posts
    } else {
      fetchPosts();
    }

    console.log("Posts fetched");
  }, [searchParams]);  // Refetch posts when searchParams change

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="feed py-10">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tags or username"
          onChange={handleSearchChange}
          value={searchText}
          className="search_input peer"
        />
      </form>

      {/* <PromptCardList data={posts} handleTagClick={() => {}} /> */}

      <div className="mt-4 prompt_layout">
        {posts.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
