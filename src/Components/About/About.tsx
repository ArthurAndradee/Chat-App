import React from 'react';

interface User {
  username: string;
  profilePicture: File | ArrayBuffer | null;
}

interface AboutContainerProps {
  currentRecipient: string;
  users: User[];
  showAboutContainer: boolean;
  getProfilePictureUrl: (profilePicture: File | ArrayBuffer | null) => string;
}

const AboutContainer: React.FC<AboutContainerProps> = ({ currentRecipient, users, showAboutContainer, getProfilePictureUrl }) => {
  const currentRecipientUser = users.find(user => user.username === currentRecipient);

  return (
    <>
      {showAboutContainer && (
        <section className="about-container">
          <div className="about-info">
            <img
              className="chat-picture"
              src={currentRecipientUser ? getProfilePictureUrl(currentRecipientUser.profilePicture) : ''}
              alt="group-pic"
            />
            <div>Group Title</div>
            <div className="bio">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum mauris, tristique et turpis sit amet, vestibulum consequat ante. Vestibulum eu augue at lectus semper vestibulum ut quis est. Interdum et malesuada fames ac ante ipsum primis in faucibus.</div>
          </div>
        </section>
      )}
    </>
  );
};

export default AboutContainer;
