/* eslint-disable jsx-a11y/alt-text */
import React, { FormEvent } from 'react';

interface Message {
  roomId: string;
  sender: string;
  message: string;
  timestamp: string;
}

interface User {
  username: string;
  profilePicture: File | ArrayBuffer | null;
}

interface ChatContainerProps {
  username: string;
  currentRecipient: string;
  users: User[];
  activeChats: { [key: string]: Message[] };
  sendMessage: (message: string) => void;
  getProfilePictureUrl: (profilePicture: File | ArrayBuffer | null) => string;
  toggleAboutContainer: () => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  username,
  currentRecipient,
  users,
  activeChats,
  sendMessage,
  getProfilePictureUrl,
  toggleAboutContainer
}) => {
  const currentRecipientUser = users.find(user => user.username === currentRecipient);

  return (
    <section className="chat-container">
      {currentRecipient && (
        <>
          <header className="d-flex">
            {currentRecipientUser?.profilePicture && (
              <img
                className="chat-picture"
                src={getProfilePictureUrl(currentRecipientUser.profilePicture)}
                alt={currentRecipient}
                onClick={toggleAboutContainer}
              />
            )}
            <div className="chat-info">
              <div className="chat-name">{currentRecipient}</div>
              <div className="chat-status">Status</div>
            </div>
          </header>
          <div className="chat-messages-container">
            <div className="messages-box">
              <div className="card-body msg-card-body">
                {activeChats[[username, currentRecipient].sort().join('-')]?.map((msg, index) => (
                  <div key={index} className={msg.sender === username ? 'd-flex justify-content-start flex-row-reverse' : 'd-flex justify-content-start mb-4'}>
                    <div className="img-cont-msg">
                      {users.find(user => user.username === msg.sender)?.profilePicture && (
                        <img
                          src={getProfilePictureUrl(users.find(user => user.username === msg.sender)!.profilePicture)}
                          className="rounded-circle user-img-msg"
                        />
                      )}
                    </div>
                    <div className='d-flex flex-column'>
                      <div className="msg-cotainer">
                        <span className='msg-content'>{msg.sender}</span>
                        <span>{msg.message}</span>
                      </div>
                      <span className={msg.sender === username ? 'msg-time-sent' : "msg-time-received"}>{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form className="message-form" onSubmit={(e: FormEvent) => {
              e.preventDefault();
              const target = e.target as HTMLFormElement;
              const input = target.querySelector('.message-input') as HTMLInputElement;
              if (input.value) {
                sendMessage(input.value);
                input.value = '';
              }
            }}>
              <input
                type="text"
                className="message-input"
                placeholder="Type a message..."
              />
              <button className="message-submit" type="submit">▲</button>
            </form>
          </div>
        </>
      )}
    </section>
  );
};

export default ChatContainer;
