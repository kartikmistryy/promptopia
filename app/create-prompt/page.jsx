"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Form from '@components/Form';

const CreatePrompt = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle creating a new prompt
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage(''); // Reset error message

    if (!session?.user) {
      setErrorMessage('User not authenticated');
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
        const createdPrompt = await response.json();
        console.log('Created new prompt:', createdPrompt); // Log the created prompt
        router.push('/'); // Trigger re-fetch
      } else {
        const errorData = await response.json();
        setErrorMessage(`Failed to create prompt: ${errorData.error || 'Unknown error'}`);
        console.error('Failed to create prompt:', errorData);
      }
    } catch (error) {
      setErrorMessage(`Error creating prompt: ${error.message}`);
      console.error('Error creating prompt:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>} {/* Display error message */}
    </div>
  );
};

export default CreatePrompt;
