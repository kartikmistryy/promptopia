'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [submitting, setSubmitting] = useState(false);

  // Function to handle creating a new prompt
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!session?.user) {
      console.log('User not authenticated');
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session.user.id,  // Using session data for user ID
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.replace('/');  // Use replace to force homepage refresh after prompt creation
      } else {
        console.error('Failed to create prompt');
      }
    } catch (error) {
      console.error('Error creating prompt:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
