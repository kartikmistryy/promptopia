"use client"

import { useState, useEffect } from "react"
import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className="mt-4 prompt_layout">
      {data.map((post) => (
        <PromptCard 
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}/>
      ))}
    </div>
  )
}


const Feed = () => {


  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])

  const handleSearchChange = (e) => {
    if(e.target.value){
      setSearchText(e.target.value)
      const filteredPosts = posts.filter((post) => {
        console.log(e.target.value)
        return post.creator.username.toLowerCase().includes(e.target.value) ||
        post.tag.toLowerCase().includes(e.target.value) ||
        post.prompt.toLowerCase().includes(e.target.value)
     })
     setPosts(filteredPosts)
    }
    else {
      setSearchText("")
      fetchPosts()
    }
  }

  const fetchPosts = async() => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setPosts(data)  
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="feed">
      <form className="relative w-full flex-center">
        <input 
        type="text"
        placeholder="Search for tags or username" 
        onChange={handleSearchChange}
        value={searchText}
        className="search_input peer"/>
      </form>

      <PromptCardList
       data={posts}
       handleTagClick={() => {}}/>
    </div>
  )
}

export default Feed