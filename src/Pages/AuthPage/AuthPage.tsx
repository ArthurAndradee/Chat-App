import { ChangeEvent, useState } from 'react';
import './AuthPage.css';

interface AuthPageProps {
  onLogin: (username: string, profilePicture: File | null) => void;
}

function AuthPage({ onLogin }: AuthPageProps) {
  const [username, setUsername] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const handleLogin = () => {
    if (username && profilePicture) {
      onLogin(username, profilePicture);
    } else {
      alert('Please enter your username and upload a profile picture.');
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePicture(e.target.files[0]);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card text-light">
        <h4 className="my-4">Bem Vindo 👋</h4>
        <div className="my-3">Insira seu nome para começar</div>
        <div>
          <div className="my-2">Nome</div>
          <input
            className="username-input"
            placeholder="Seu nome aqui"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            required
          />
          <div className='d-flex flex-row'>
            <label htmlFor='picture-form' className="picture-input">Foto de perfil +</label>
            <input 
              type="file"
              id='picture-form'
              style={{ display: 'none' }}
              onChange={handleFileUpload}
              required
            />
            {profilePicture && <img src={URL.createObjectURL(profilePicture)} alt='Profile Preview' className='picture-preview' />}
          </div>
          <button className="btn btn-light w-100 my-3" onClick={handleLogin}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
