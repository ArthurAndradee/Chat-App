import { useState } from 'react';
import './App.css';
import AuthPage from './Pages/AuthPage/AuthPage';
import ChatsPage from './Pages/ChatsPage/ChatsPage';
import Bruh from './Pages/ChatsPage/ChatGPT';

function App() {
  const [username, setUsername] = useState<string | null>(null);

  const handleUsernameSubmit = (username: string) => {
    setUsername(username);
    console.log('Username submitted:', username);
  };

  if (!username) {
    return <AuthPage onUsernameSubmit={handleUsernameSubmit}/>;
  } else {
    return <Bruh />;
  }
}

export default App;
