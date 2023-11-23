import React, { useState } from 'react';

import styled from 'styled-components';

const PostForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  margin-bottom: 1rem;
  padding: 0.5rem;
`;

const TextInput = styled.input`
    margin-bottom: 1rem;
    padding: 0.5rem;
`;

const SubmitButton = styled.button`
  padding: 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const PostPost = ({ userId, onPostSubmit }) => {

    const [formState, setFormState] = useState({
        title: '',
        description: '',
    });



    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formVariables = {
            ...formState,
            creator: userId,
        };
        try {
            // const { data } = await addContent({
            //     variables: formVariables,
            // });

            // onPostSubmit(data.addContent);
            console.log(formVariables);
            // Clear the form or navigate away upon successful submission
            setFormState({
                title: '',
                description: '',

            });

        } catch (err) {
            console.error('Error adding post', err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <PostForm onSubmit={handleFormSubmit}>
            <TextInput
                name="title"
                value={formState.title}
                onChange={handleChange}
                placeholder="Title"
            />
            <TextArea
                name="description"
                value={formState.description}
                onChange={handleChange}
                placeholder="What's on your mind?"
            />
            <SubmitButton type="submit">Post</SubmitButton>
        </PostForm>
    );
};
