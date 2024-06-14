import React from 'react';
import { Message } from '../../Pages/ChatsPage/ChatsPage';

interface User {
  username: string;
  profilePicture: string | null;
}

interface ContactsContainerProps {
  username: string;
  profilePicture: string | null;
  users: User[];
  startChat: (recipient: string) => void;
  latestMessages: { [key: string]: Message | null };
}

const ContactsContainer: React.FC<ContactsContainerProps> = ({ username, profilePicture, users, startChat, latestMessages }) => {
  return (
    <section className="contacts-container">
      <header className="d-flex search-container">
        <input className="search-about" placeholder="Chats" />
      </header>
      {users.filter(user => user.username !== username).map((user, index) => {
        const roomId = [username, user.username].sort().join('-');
        const latestMessage = latestMessages[roomId];
        return (
          <div key={index} className="contact-container d-flex" onClick={() => startChat(user.username)}>
            {user.profilePicture &&
              <img className="chat-picture" src={user.profilePicture} alt={user.username} />
            }
            <div className="chat-info">
              <div className="chat-name">{user.username}</div>
              <div className="chat-message">{latestMessage ? latestMessage.message : ''}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default ContactsContainer;
