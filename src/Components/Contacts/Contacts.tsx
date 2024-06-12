import React from 'react';

interface User {
  username: string;
  profilePicture: string | null
}

interface ContactsContainerProps {
  username: string;
  profilePicture: string | null;
  users: User[];
  startChat: (recipient: string) => void;
}

const ContactsContainer: React.FC<ContactsContainerProps> = ({ username, profilePicture, users, startChat }) => {
  return (
    <section className="contacts-container">
      <header className="d-flex search-container">
        <input className="search-about" placeholder="Chats" />
      </header>
      {users.filter(user => user.username !== username).map((user, index) => (
        <div key={index} className="contact-container d-flex" onClick={() => startChat(user.username)}>
          {user.profilePicture &&
            <img className="chat-picture" src={user.profilePicture} alt={user.username} />
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
