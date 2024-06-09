import { useState } from 'react';
import './App.css';
import AuthPage from './Pages/AuthPage/AuthPage';
import ChatsPage from './Pages/ChatsPage/ChatsPage';

function App() {
  const [username, setUsername] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  const handleLogin = (username: string, profilePicture: string) => {
      setUsername(username);
      setProfilePicture(profilePicture);
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
