import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import './ChatPage.css';
import ContactsContainer from '../../Components/Contacts/Contacts';
import ChatContainer from '../../Components/Chat/Chat';
import AboutContainer from '../../Components/About/About';

interface Message {
    roomId: string;
    sender: string;
    message: string;
    timestamp: string;
}

interface ActiveChats {
    [key: string]: Message[];
}

export interface User {
    username: string;
    profilePicture: File | ArrayBuffer | null;
}

interface ChatsPageProps {
    username: string;
    profilePicture: File | null;
}

const socket: Socket = io('http://localhost:5000');

const ChatsPage: React.FC<ChatsPageProps> = ({ username, profilePicture }) => {
    const [showAboutContainer, setShowAboutContainer] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [activeChats, setActiveChats] = useState<ActiveChats>({});
    const [currentRecipient, setCurrentRecipient] = useState<string>('');

    const getProfilePictureUrl = (profilePicture: File | ArrayBuffer | null): string => {
      
      console.log(profilePicture)
      if (profilePicture instanceof File) {
        // If the profile picture is already a File, return its URL
        return URL.createObjectURL(profilePicture);
      } else if (profilePicture instanceof Buffer) {
        // Convert the Buffer to a base64 string
        const base64String = profilePicture.toString('base64');
        // Construct the data URL
        return `data:image/jpeg;base64,${base64String}`;
      } else if (profilePicture instanceof ArrayBuffer) {
        // If the profile picture is a binary base64 string, convert it to a data URL
        const base64String = Buffer.from(profilePicture).toString('base64');
        return `data:image/jpeg;base64,${base64String}`;
      }
      // Default case: return an empty string
      return 'aaaa';
    };

    const toggleAboutContainer = () => {
        setShowAboutContainer(prevState => !prevState);
    };

    useEffect(() => {
        if (username && profilePicture) {
            socket.emit('join', { username, profilePicture });
        }

        socket.emit('getUsers');

        socket.on('users', (usersList: User[]) => {
            const uniqueUsers = Array.from(new Set(usersList.map(user => user.username)))
                .map(username => {
                    return usersList.find(user => user.username === username)!;
                });
            setUsers(uniqueUsers);
        });

        socket.on('userLeft', (leftUser: string) => {
            setUsers((prevUsers) => prevUsers.filter(user => user.username !== leftUser));
        });

        socket.on('receiveMessage', (data: string) => {
            const parsedData = JSON.parse(data);
            const { sender, message, roomId, timestamp } = parsedData;
            setActiveChats((prevChats) => ({
                ...prevChats,
                [roomId]: [...(prevChats[roomId] || []), { sender, message, timestamp, roomId }],
            }));
        });

        socket.on('loadMessages', (messages: string) => {
          console.log(messages)
            const parsedMessages: Message[] = JSON.parse(messages);
            if (parsedMessages.length > 0) {
                const roomId = parsedMessages[0].roomId;
                setActiveChats((prevChats) => ({
                    ...prevChats,
                    [roomId]: parsedMessages,
                }));
            }
        });

        return () => {
            socket.off('users');
            socket.off('userLeft');
            socket.off('receiveMessage');
            socket.off('loadMessages');
        };
    }, [username, profilePicture]);

    const startChat = (recipient: string) => {
        const roomId = [username, recipient].sort().join('-');
        if (!activeChats[roomId]) {
            socket.emit('fetchMessages', roomId);
        }
        setCurrentRecipient(recipient);
    };

    const sendMessage = (message: string) => {
        const roomId = [username, currentRecipient].sort().join('-');
        const timestamp = new Date().toLocaleTimeString();
        socket.emit('privateMessage', {
            recipient: currentRecipient,
            message,
            sender: username,
            timestamp,
            roomId,
        });
        setActiveChats((prevChats) => ({
            ...prevChats,
            [roomId]: [...(prevChats[roomId] || []), { sender: username, message, timestamp, roomId }],
        }));
    };

    return (
        <div className="sections-container">
            <ContactsContainer
                username={username}
                users={users}
                startChat={startChat}
                getProfilePictureUrl={getProfilePictureUrl}
            />
            <ChatContainer
                username={username}
                currentRecipient={currentRecipient}
                users={users}
                activeChats={activeChats}
                sendMessage={sendMessage}
                getProfilePictureUrl={getProfilePictureUrl}
                toggleAboutContainer={toggleAboutContainer}
            />
            <AboutContainer
                currentRecipient={currentRecipient}
                users={users}
                showAboutContainer={showAboutContainer}
                getProfilePictureUrl={getProfilePictureUrl}
            />
        </div>
    );
};

export default ChatsPage;
