import React, { useEffect, useRef, FormEvent } from 'react';

interface Message {
  roomId: string;
  sender: string;
  message: string;
  timestamp: string;
}

interface User {
  username: string;
  profilePicture: string | null;
}

interface ChatContainerProps {
  username: string;
  profilePicture: string | null;
  currentRecipient: string;
  users: User[];
  activeChats: { [key: string]: Message[] };
  sendMessage: (message: string) => void;
  toggleAboutContainer: () => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  username,
  currentRecipient,
  users,
  activeChats,
  sendMessage,
  toggleAboutContainer
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChats, currentRecipient]);

  const currentRecipientUser = users.find(user => user.username === currentRecipient);

  return (
    <section className="chat-container">
      {currentRecipient && (
        <>
          <header className="d-flex">
            {currentRecipientUser?.profilePicture && (
              <img
                className="chat-picture"
                src={currentRecipientUser.profilePicture}
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
                {activeChats[[username, currentRecipient].sort().join('-')]?.map((msg, index) => {
                  const senderUser = users.find(user => user.username === msg.sender);
                  return (
                    <div key={index} className={msg.sender === username ? 'd-flex justify-content-start flex-row-reverse' : 'd-flex justify-content-start mb-4'}>
                      <div className="img-cont-msg">
                        {senderUser?.profilePicture && (
                          <img
                            src={senderUser.profilePicture}
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
                  );
                })}
                <div ref={messagesEndRef} />
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
