'use client'

import { Suspense, useEffect, useState } from "react"


import Form  from "@components/Form"

const EditPrompt = () => {

  // const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  })
  // const searchParams = useSearchParams()
  // const promptId = searchParams.get('id')

  const [promptId, setPromptId] = useState(null);

  useEffect(() => {
    const getPromptDetails = async() => {
      const response = await fetch(`/api/prompt/${promptId}`)
      const data = await response.json()
      setPost({
        prompt: data.prompt,
        tag: data.tag
      })
    }

    if(promptId) getPromptDetails()
  }, [promptId])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // Get search params from the URL
    const id = params.get('id'); // Extract 'id' parameter
    const getPromptDetails = async() => {
          const response = await fetch(`/api/prompt/${promptId}`)
          const data = await response.json()
          setPost({
            prompt: data.prompt,
            tag: data.tag
          })
    }
    if(id) getPromptDetails()
    
    setPromptId(id);
  }, []); // Empty dependency array to run only once on mount

  if (!promptId) {
    return <div>Loading...</div>;
  }




  const updatePrompt = async(e) => {
    e.preventDefault();
    setSubmitting(true)

    if(!promptId) return alert("Prompt ID not found")

    try{
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      })

      if(response.ok){
        window.location.href = "/"
      }
    }
    catch(err) {
      console.log(err)
    }
    finally{
      setSubmitting(false)
    }
  }

  return (
      <Form 
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  )
}

export default function EditPromptPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
}