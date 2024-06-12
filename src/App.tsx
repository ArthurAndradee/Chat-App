import { useState } from 'react';
import './App.css';
import AuthPage from './Pages/AuthPage/AuthPage';
import ChatsPage from './Pages/ChatsPage/ChatsPage';

function App() {
  const [username, setUsername] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleLogin = (username: string, profilePicture: File | null) => {
    setUsername(username);
    console.log(username)
    setProfilePicture(profilePicture);
    console.log(profilePicture)
    setLoggedIn(true);
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <AuthPage onLogin={handleLogin} />
      ) : (
        <ChatsPage username={username} profilePicture={profilePicture} />
      )}
    </div>
  );
}

export default App;