import React from 'react';

interface User {
  username: string;
  profilePicture: string | null;
}

interface AboutContainerProps {
  currentRecipient: string;
  profilePicture: string | null;
  users: User[];
  showAboutContainer: boolean;
}

const AboutContainer: React.FC<AboutContainerProps> = ({ currentRecipient, profilePicture, users, showAboutContainer }) => {
  const currentRecipientUser = users.find(user => user.username === currentRecipient);

  return (
    <>
      {showAboutContainer && (
        <section className="about-container">
          <div className="about-info">
            <img
              className="chat-picture"
              src={currentRecipientUser?.profilePicture || ''}
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
