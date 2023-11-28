'use client';

import React, { useState } from 'react'
import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
  
    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });

    const createPrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const res = await fetch('api/prompt/new',{
                method: 'POST',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })
            if(res.ok){
                router.push("/")
            }
            
        } catch (error) {
            console.log(error)
        } finally{
            setIsSubmitting(false)
        }
    }

  return (
    <Form
        type='Create'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt} 
    />
  )
}

export default CreatePrompt