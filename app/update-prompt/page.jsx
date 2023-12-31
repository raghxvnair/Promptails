'use client';

import React, { useEffect, useState } from 'react'
import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';

const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams()
    const promptId = searchParams.get("id")

    const [submitting, setIsSubmitting] = useState(false);
    const [post, setPost] = useState({ prompt: "", tag: "" });

    useEffect(() => {
        const getPromptDetails = async () => {
            const res = await fetch(`/api/prompt/${promptId}`)
            const data = await res.json()

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if(promptId) getPromptDetails()
    }, [promptId])

    const editPrompt = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if(!promptId) return alert('Prompt ID not found')

        try {
            const res = await fetch(`api/prompt/${promptId}`,{
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
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
        type='Edit'
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editPrompt} 
    />
  )
}

export default EditPrompt