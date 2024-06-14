import React, { useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import './ChatPage.css';
import ContactsContainer from '../../Components/Contacts/Contacts';
import ChatContainer from '../../Components/Chat/Chat';
import AboutContainer from '../../Components/About/About';

export interface Message {
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
    profilePicture: string | null;
}

interface ChatsPageProps {
    username: string;
    profilePicture: string | null;
}

const socket: Socket = io('http://localhost:5000');

const ChatsPage: React.FC<ChatsPageProps> = ({ username, profilePicture }) => {
    const [showAboutContainer, setShowAboutContainer] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [activeChats, setActiveChats] = useState<ActiveChats>({});
    const [currentRecipient, setCurrentRecipient] = useState<string>('');
    const [latestMessages, setLatestMessages] = useState<{ [key: string]: Message | null }>({});
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

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
            setOnlineUsers((prevOnlineUsers) => prevOnlineUsers.filter(user => user !== leftUser));
        });

        socket.on('userConnected', (connectedUser: string) => {
            setOnlineUsers((prevOnlineUsers) => [...prevOnlineUsers, connectedUser]);
        });

        socket.on('userDisconnected', (disconnectedUser: string) => {
            setOnlineUsers((prevOnlineUsers) => prevOnlineUsers.filter(user => user !== disconnectedUser));
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
            socket.off('userConnected');
            socket.off('userDisconnected');
            socket.off('receiveMessage');
            socket.off('loadMessages');
        };
    }, [profilePicture, username]);

    useEffect(() => {
        // Fetch messages for all users the user has chatted with
        users.forEach(user => {
            const roomId = [username, user.username].sort().join('-');
            socket.emit('fetchMessages', roomId);
        });
    }, [users, username]);

    useEffect(() => {
        // Update the latest message for each chat
        const newLatestMessages: { [key: string]: Message | null } = {};
        Object.keys(activeChats).forEach(roomId => {
            const messages = activeChats[roomId];
            if (messages && messages.length > 0) {
                newLatestMessages[roomId] = messages[messages.length - 1];
            } else {
                newLatestMessages[roomId] = null;
            }
        });
        setLatestMessages(newLatestMessages);
    }, [activeChats]);

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

    const isUserOnline = (username: string): boolean => {
        return onlineUsers.includes(username);
    };
    

    return (
        <div className="sections-container">
            <ContactsContainer
                username={username}
                profilePicture={profilePicture}
                users={users}
                startChat={startChat}
                latestMessages={latestMessages} 
                isUserOnline={isUserOnline}            
            />
            <ChatContainer
                username={username}
                profilePicture={profilePicture}            
                currentRecipient={currentRecipient}
                users={users}
                activeChats={activeChats}
                sendMessage={sendMessage}
                toggleAboutContainer={toggleAboutContainer} 
            />
            <AboutContainer
                currentRecipient={currentRecipient}
                profilePicture={profilePicture}            
                users={users}
                showAboutContainer={showAboutContainer} 
            />
        </div>
    );
};

export default ChatsPage;
