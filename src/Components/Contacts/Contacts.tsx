import React from 'react';

interface User {
  username: string;
  profilePicture: File | ArrayBuffer | null;
}

interface ContactsContainerProps {
  username: string;
  users: User[];
  startChat: (recipient: string) => void;
  getProfilePictureUrl: (profilePicture: File | ArrayBuffer | null) => string;
}

const ContactsContainer: React.FC<ContactsContainerProps> = ({ username, users, startChat, getProfilePictureUrl }) => {
  return (
    <section className="contacts-container">
      <header className="d-flex search-container">
        <input className="search-about" placeholder="Chats" />
      </header>
      {users.filter(user => user.username !== username).map((user, index) => (
        <div key={index} className="contact-container d-flex" onClick={() => startChat(user.username)}>
          {user.profilePicture &&
            <img className="chat-picture" src={getProfilePictureUrl(user.profilePicture)} alt={user.username} />
          }
          <div className="chat-info">
            <div className="chat-name">{user.username}</div>
            <div className="chat-message">Click to chat</div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ContactsContainer;
