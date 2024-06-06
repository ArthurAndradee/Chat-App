import React, { useEffect, useState } from 'react';
import './ChatPage.css';

export interface Message {
  id: number;
  text: string;
  userId: number; // The ID of the user who sent the message
}
interface MessageProps {
  messages: Message[];
  currentUserId: number; // The ID of the current user
};

function ChatsPage({ messages, currentUserId }: MessageProps) {
  const [showAboutContainer, setShowAboutContainer] = useState(false);
  
  useEffect(() => {
    setShowAboutContainer(true);
  }, []);

  return (
    <div className="sections-container">
      <section className='contacts-container'>
        <header>
          <div>Chats</div>
          <div>🔍</div>
        </header>
        {/* Example chat */}
        <div>
          <img className='chat-picture' src='https://static1.srcdn.com/wordpress/wp-content/uploads/2023/02/nelson-franklin-pointing-his-finger-on-the-office.jpg' alt='nick from the office' />
          <div className='chat-info'>
            <div className='chat-name'>Indian</div>
            <div className='chat-message'>Let me fix your computer...</div>
          </div>
        </div>
        {/* Example chat */}
      </section>
      <section className='chat-container'>
        <header className='chat-info'>
          <div className='chat-name'>Indian</div>
          <div className='chat-status'>Online</div>
        </header>
        <div className='chat-messages-container'>
          <div className='messages-container'>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.userId === currentUserId ? 'message-sender' : 'message-receiver'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <form className='message-form'>
            <input className='message-input' type='text' />
            <button className='message-submit' type='submit'>→</button>
          </form>
        </div>
      </section>
      {showAboutContainer && 
      <section className='about-container'>
        <img src='https://static1.srcdn.com/wordpress/wp-content/uploads/2023/02/nelson-franklin-pointing-his-finger-on-the-office.jpg' alt='group-pic' />
        <div>Group Title</div>
      </section>
      }
    </div>
  );
}

export default ChatsPage;
