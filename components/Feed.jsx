"use client";

import { useState, useEffect } from "react";
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
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    if (searchValue) {
      const filteredPosts = posts.filter((post) =>
        post.creator.username.toLowerCase().includes(searchValue) ||
        post.tag.toLowerCase().includes(searchValue) ||
        post.prompt.toLowerCase().includes(searchValue)
      );
      setPosts(filteredPosts);
    } else {
      fetchPosts();
    }
  };

  const handleTagClickListener = (tag) => {
    setSearchText(tag);
    const filteredPosts = posts.filter((post) => post.tag === tag);
    setPosts(filteredPosts);
  };

  const fetchPosts = async () => {
    const response = await fetch(`/api/prompt?timestamp=${new Date().getTime()}`, {
      cache: 'no-store' // Disable caching for this request
    });
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClickListener}
      />
    </div>
  );
};

export default Feed;
