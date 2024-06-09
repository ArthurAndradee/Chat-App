/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import io, { Socket } from 'socket.io-client';
import './ChatPage.css';

interface Message {
  sender: string;
  message: string;
}

interface ActiveChats {
  [key: string]: Message[];
}

const socket: Socket = io('http://localhost:5000');

function ChatsPage() {
  const [showAboutContainer, setShowAboutContainer] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [users, setUsers] = useState<string[]>([]);
  const [activeChats, setActiveChats] = useState<ActiveChats>({});
  const [currentRecipient, setCurrentRecipient] = useState<string>('');

  useEffect(() => {
      socket.on('users', (usersList: string[]) => {
          setUsers(usersList);
      });

      socket.on('userJoined', (newUser: string) => {
          setUsers((prevUsers) => [...prevUsers, newUser]);
      });

      socket.on('userLeft', (leftUser: string) => {
          setUsers((prevUsers) => prevUsers.filter(user => user !== leftUser));
      });

      socket.on('receiveMessage', (data: { sender: string; message: string; roomId: string }) => {
          const { sender, message, roomId } = data;
          setActiveChats((prevChats) => ({
              ...prevChats,
              [roomId]: [...(prevChats[roomId] || []), { sender, message }],
          }));
      });

      return () => {
          socket.off('users');
          socket.off('userJoined');
          socket.off('userLeft');
          socket.off('receiveMessage');
      };
  }, []);

  useEffect(() => {
    socket.emit('join', username);
    console.log(username)
  });

  const startChat = (recipient: string) => {
      const roomId = [username, recipient].sort().join('-');
      if (!activeChats[roomId]) {
          setActiveChats((prevChats) => ({ ...prevChats, [roomId]: [] }));
      }
      setCurrentRecipient(recipient);
  };

  const sendMessage = (message: string) => {
      const roomId = [username, currentRecipient].sort().join('-');
      socket.emit('privateMessage', {
          recipient: currentRecipient,
          message,
          sender: username,
      });
      // Directly update the sender's chat without relying on server
      setActiveChats((prevChats) => ({
          ...prevChats,
          [roomId]: [...(prevChats[roomId] || []), { sender: 'You', message }],
      }));
  };

  return (
    <div className="sections-container">
      <section className='contacts-container'>
        <header className='d-flex search-container'>
          <input className='search-about' placeholder='Chats'/>
        </header>
        {/* Example contact component */}
        <ul>
          {users.filter(user => user !== username).map((user, index) => (
            <div className='contact-container d-flex' key={index} onClick={() => startChat(user)}>
              <img className='chat-picture' src='https://hips.hearstapps.com/hmg-prod/images/frenchie-the-boys-season-3-1655812929.jpg?crop=0.253xw:0.380xh;0.580xw,0.0484xh&resize=980:*' alt='nick from the office' />
              <div className='chat-info'>
                <div className='chat-name'>{user}</div>
                <div className='chat-message'>Chat Message</div>
              </div>
            </div>
          ))}
        </ul>
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
          <div className='messages-box'>
						<div className="card-body msg-card-body">
              {activeChats[[username, currentRecipient].sort().join('-')]?.map((msg, index) => (
                <div key={index}>
                    <strong>{msg.sender}: </strong>
                    <span>{msg.message}</span>
                </div>
              ))}
              {/* Received Message */}
              {activeChats[[username, currentRecipient].sort().join('-')]?.map((msg, index) => (
							  <div className="d-flex justify-content-start mb-4" key={index}>
							    <div className="img-cont-msg">
							  	  <img src="https://hips.hearstapps.com/hmg-prod/images/frenchie-the-boys-season-3-1655812929.jpg?crop=0.253xw:0.380xh;0.580xw,0.0484xh&resize=980:*" className="rounded-circle user-img-msg"/>
							  	</div>
							    <div className="msg-cotainer">
                    {msg.message}
							      <span className="msg-time">8:40 AM, Today</span>
							    </div>
							  </div>
              ))}

                {/* Way to handle messages and to apply different styles is based on classname
                ex: for sent messages: d-flex justify-content-start flex-row-reverse
                ex: for received messages: d-flex justify-content-start mb-4 */}
                {/* Sent Message */}
							<div className="d-flex justify-content-start flex-row-reverse mb-4">
								<div className="img-cont-msg">
							    <img src="" className="rounded-circle user-img-msg"/>
								</div>
								<div className="msg-cotainer-send">
									Hi Khalid i am good tnx how about you?
									<span className="msg-time-send">8:55 AM, Today</span>
								</div>
							</div>

						</div>
          </div>
          <form className='message-form'>
            <input
              type="text"
              className='message-input'
              placeholder="Message"
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                  const target = e.target as HTMLInputElement;
                  if (e.key === 'Enter' && target.value) {
                      sendMessage(target.value);
                      target.value = '';
                  }
              }}
            />
            <button className='message-submit' type='submit'>▲</button>
          </form>
        </div>
      </section>
      {showAboutContainer && 
      <section className='about-container'>
        <div className='about-info'>
          <img className='chat-picture' src='https://hips.hearstapps.com/hmg-prod/images/frenchie-the-boys-season-3-1655812929.jpg?crop=0.253xw:0.380xh;0.580xw,0.0484xh&resize=980:*' alt='group-pic' />
          <div>Group Title</div>
          <div className='bio'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ipsum mauris, tristique et turpis sit amet, vestibulum consequat ante. Vestibulum eu augue at lectus semper vestibulum ut quis est. Interdum et malesuada fames ac ante ipsum primis in faucibus.</div>
        </div>
      </section>
      }
    </div>
  );
}

export default ChatsPage;