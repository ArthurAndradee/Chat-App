import { ChangeEvent, useState } from 'react';
import './AuthPage.css';
interface AuthPageProps {
  onLogin: (username: string, profilePicture: string) => void;
}

function AuthPage({ onLogin }: AuthPageProps) {
  const [username, setUsername] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');

  const handleLogin = () => {
      if (username) {
          onLogin(username, profilePicture);
      }
  };

  return (
    <div className="form-container">
      <div className="from-card text-light">
        <h4 className="my-4">Bem Vindo 👋</h4>
        <div className="my-3">Insira seu nome para começar</div>
        <div className="">
          <div className="my-2">Nome</div>
          <input
            className="username-input"
            placeholder="Seu nome aqui"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="username-input"
            placeholder="Profile Picture URL"
            value={profilePicture}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setProfilePicture(e.target.value)}
          />
          <button className="btn btn-light w-100 my-3" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
