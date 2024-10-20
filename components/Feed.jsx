"use client"

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

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/prompt', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched posts:', data); // Log the fetched posts
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    
    // Filter posts based on search input
    const filteredPosts = posts.filter((post) => {
      return (
        (typeof post.creator?.username === 'string' && post.creator.username.toLowerCase().includes(value)) ||
        (typeof post.tag === 'string' && post.tag.toLowerCase().includes(value)) ||
        (typeof post.prompt === 'string' && post.prompt.toLowerCase().includes(value))
      );
    });

    // Update the displayed posts with filtered results
    setPosts(filteredPosts);
  };

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
        handleTagClick={() => {}}
      />
    </div>
  );
};

export default Feed;
