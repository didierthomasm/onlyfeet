import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { ADD_CONTENT } from "../../utils/mutations.js";
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

export const PostContent = ({ userId, onPostSubmit }) => {
    const [addContent, { error }] = useMutation(ADD_CONTENT);
    const [formState, setFormState] = useState({
        title: '',
        description: '',
        price: 0,
    });


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formVariables = {
            ...formState,
            creator: userId,
            price: parseInt(formState.price, 10),
        };

        try {
            const { data } = await addContent({
                variables: formVariables,
            });

            onPostSubmit(data.addContent);

            // Clear the form or navigate away upon successful submission
            setFormState({
                title: '',
                description: '',
                price: 0,
            });

        } catch (err) {
            console.error('Error adding content', err);
            error && console.log(error.message);
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
            <TextInput
                name="price"
                type='number'
                value={formState.price}
                onChange={handleChange}
                placeholder="Price"
            />
            <SubmitButton type="submit">Post</SubmitButton>
            {/* Display error if mutation fails */}
            {error && <p>Error posting content: {error.message}</p>}
        </PostForm>
    );
};
