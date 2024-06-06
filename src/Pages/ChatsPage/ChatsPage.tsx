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
        <header className='d-flex search-container'>
          <input className='search-about' placeholder='Chats'/>
        </header>
        {/* Example contact component */}
        <div className='contact-container d-flex'>
          <img className='chat-picture' src='https://hips.hearstapps.com/hmg-prod/images/frenchie-the-boys-season-3-1655812929.jpg?crop=0.253xw:0.380xh;0.580xw,0.0484xh&resize=980:*' alt='nick from the office' />
          <div className='chat-info'>
            <div className='chat-name'>Contact name</div>
            <div className='chat-message'>Chat Message</div>
          </div>
        </div>
        {/* Example contact component */}
      </section>
      <section className='chat-container'>
        <header className='d-flex'>
          <img className='chat-picture' onClick={() => setShowAboutContainer(!showAboutContainer)} src='https://hips.hearstapps.com/hmg-prod/images/frenchie-the-boys-season-3-1655812929.jpg?crop=0.253xw:0.380xh;0.580xw,0.0484xh&resize=980:*' alt='nick from the office' />
          <div className='chat-info'>
            <div className='chat-name'>Contact name</div>
            <div className='chat-status'>Status</div>
          </div>
        </header>
        <div className='chat-messages-container'>
          <div className='messages-box d-flex flex-column-reverse'>
            {/* <div className='messages-container'>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`message ${message.userId === currentUserId ? 'message-sender' : 'message-receiver'}`}
                >
                  {message.text}
                </div>
              ))}
            </div> */}
            <div className='messages-container'>Oi cunt</div>
            <div className='messages-container'>Oi cunt</div>
          </div>
          <form className='message-form'>
            <input className='message-input' type='text' />
            <button className='message-submit' type='submit'>→</button>
          </form>
        </div>
      </section>
      {showAboutContainer && 
      <section className='about-container'>
        <div className='about-info'>
          <img className='chat-picture' src='https://hips.hearstapps.com/hmg-prod/images/frenchie-the-boys-season-3-1655812929.jpg?crop=0.253xw:0.380xh;0.580xw,0.0484xh&resize=980:*' alt='group-pic' />
          <div>Group Title</div>
        </div>
      </section>
      }
    </div>
  );
}

export default ChatsPage;
