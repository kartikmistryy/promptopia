"use client"

import { usePathname, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import PromptCard from "@components/PromptCard"
import Profile from '@components/Profile'

const PromptCardList = ({ data, handleTagClick }) => {
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard 
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}/>
      ))}
    </div>
  )
}

const UserProfile = () => {

    const username = usePathname().split("/profile/")[1]
    const [userPrompts, setUserPrompts] = useState([])

    const fetchUserPosts = async() => {
      const response = await fetch(`/api/profile/${username}`);
      const data = await response.json();
      setUserPrompts(data)
    }

    useEffect(() => {
        fetchUserPosts()
    }, [])

  return (
    <Profile 
      name={`@${username}'s`}
      desc={`Welcome to @${username}'s profile page`}
      data={userPrompts}
      handleEdit={() => {}}
      handleDelete={() => {}}
    />
  )
}

export default UserProfile