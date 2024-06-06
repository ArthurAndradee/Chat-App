import { useState } from 'react';
import './App.css';
import AuthPage from './Pages/AuthPage/AuthPage';
import ChatsPage from './Pages/ChatsPage/ChatsPage';

function App() {
  const [username, setUsername] = useState<string | null>(null);

  const handleUsernameSubmit = (username: string) => {
    setUsername(username);
    console.log('Username submitted:', username);
  };

  if (!username) {
    return <AuthPage onUsernameSubmit={handleUsernameSubmit}/>;
  } else {
    return <ChatsPage messages={[]} currentUserId={0}/>;
  }
}

export default App;
