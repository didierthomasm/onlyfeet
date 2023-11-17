import { createContext, useState } from "react";
import profilePic from "../assets/img/Profile+/JohnDoe/profile.png";
import coverPic from "../assets/img/Profile+/JohnDoe/cover.png";

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: 'JohnDoe',
    password: 'password123',
    email: 'johndoe@test.cm',
    firstName: 'John',
    lastName: 'Doe',
    birthday: '01/01/2000',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
    profilePic: profilePic,
    coverPic: coverPic,
    posts: [],
    followers: [],
    following: [],
    savedPosts: [],
    likedPosts: [],
    notifications: [],
    messages: [],
    chats: [],
    groups: [],
    events: [],
    credits: 0,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  // Function to update user profile
  const updateProfile = (updatedFields) => {
    setUser(prevState => {
      return {
        ...prevState,
        ...updatedFields,
        updatedAt: new Date() // Optionally update the 'updatedAt' field
      };
    });
  };

  // Include updateProfile in the context value
  return (
    <GlobalContext.Provider value={{ user, setUser, updateProfile }}>
      {children}
    </GlobalContext.Provider>
  );
};