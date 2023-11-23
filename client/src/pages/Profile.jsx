import {useState, useEffect} from "react";

// Router
import {Navigate, useParams} from "react-router-dom";

// GraphQL
import {useQuery} from "@apollo/client";
import {QUERY_ME, QUERY_USER} from "../utils/queries";

// Images placeholders
import userPlaceholder from "../assets/img/Profile+/profile-placeholder.png";
import coverPlaceholder from "../assets/img/Profile+/cover-placeholder.png";

// Styled components for the profile
import {
  BioSection,
  BioText,
  CoverPhoto,
  EditButton,
  Icon,
  Name,
  ProfileContainer,
  ProfileInfo,
  ProfilePhoto,
  Username,
  TabsContainer,
  TabButton,
  NameEditContainer
} from '../assets/style/Profile/ProfileStyle.js'

// Component ProfileEdit
import {ProfileEdit} from "../components/ProfileComponents/ProfileEdit.jsx";
import FollowButtonComponent from "../components/ProfileComponents/FollowButton.jsx";
import {ContentFeed} from "../components/ProfileComponents/ContentFeed.jsx";
import {PostContent} from "../components/ProfileComponents/PostContent.jsx";
import {PostPost} from "../components/ProfileComponents/PostPost.jsx";

import Auth from "../utils/auth.js";

export function Profile() {
  // Get the profile id from the url
  const { profileId } = useParams();
  const loggedInUserId = Auth.loggedIn() ? Auth.getProfile().data._id : null;

  // Determine the ID to use for fetching profile data
  const effectiveProfileId = profileId || loggedInUserId;

  // Query the user data
  const { loading, data } = useQuery(
    effectiveProfileId === loggedInUserId ? QUERY_ME : QUERY_USER,
    { variables: { userId: effectiveProfileId } },
  );

  // State hooks for the profile data and the editing state
  const [profile, setProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Set the profile data depending on the query result
  useEffect(() => {
    if (data) {
      setProfile(data.me || data.user || {});
    }
  }, [data]);

  // Handle tab click
  const [activeTab, setActiveTab] = useState('content');

  // Add a new state for managing the list of contents
  const [contents, setContents] = useState([]);

  // Handle tab click
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Function to handle new post submissions
  const handlePostSubmit = (newContent) => {
    // Update the contents state to include the new content
    setContents([...contents, newContent]);
  };

  // Only show edit button if the logged-in user is viewing their own profile
  const showEditButton = effectiveProfileId === loggedInUserId;
  const showTabs = showEditButton;

  // Use React Router's `<Navigate />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    return <Navigate to="/me" />;
  }

  // Set the profile pictures
  const profilePictures = {
    userPic: profile.profilePic || userPlaceholder,
    coverPic: profile.coverPic || coverPlaceholder,
  };

  // Assume you have the logged-in user's following list as part of the profile data
  // and it is an array of user IDs that the logged-in user is following
  const loggedInUserFollowingList = profile.followers?.map(following => following._id);

  // Check if the logged-in user is already following the viewed profile
  const isAlreadyFollowing = loggedInUserFollowingList?.includes(Auth.getProfile().data._id);



  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <ProfileContainer>
        <CoverPhoto src={profilePictures.coverPic} alt='Cover'/>
        <ProfilePhoto src={profilePictures.userPic} alt="Profile"/>
        <ProfileInfo>
          <FollowButtonComponent userIdToFollow={profile._id} isAlreadyFollowing={isAlreadyFollowing} />
          {isEditing ? (
              <ProfileEdit profile={profile} setIsEditing={setIsEditing}/>
          ) : (
              <>
                <NameEditContainer>
                  <div>
                    <Name>{`${profile.fullName} `}</Name>
                    <Username>@{profile.username}</Username>
                  </div>
                  {showEditButton && (
                      <EditButton onClick={() => setIsEditing(true)}>
                        <Icon /> Edit Profile
                      </EditButton>
                  )}
                </NameEditContainer>
                <BioSection>
                  <BioText>{profile.bio}</BioText>
                </BioSection>
                {showTabs && (
                <TabsContainer>
                  <TabButton
                      onClick={() => handleTabClick('content')}
                      $active={activeTab === 'content'}
                  >
                    Content
                  </TabButton>
                  <TabButton
                      onClick={() => handleTabClick('posts')}
                      $active={activeTab === 'posts'}
                  >
                    Posts
                  </TabButton>
                </TabsContainer>
                )}
                {/* Conditional rendering based on showTabs and activeTab state */}
                {showTabs && activeTab === 'content' && (
                    <>
                      <PostContent userId={loggedInUserId} onPostSubmit={handlePostSubmit} />
                      <ContentFeed contents={contents} />
                    </>
                )}
                {showTabs && activeTab === 'posts' && (
                    <PostPost />
                )}
              </>
          )}
        </ProfileInfo>
      </ProfileContainer>
  );
}
