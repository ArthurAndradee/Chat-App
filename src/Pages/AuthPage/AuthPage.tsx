import { ChangeEvent, useState } from 'react';
import './AuthPage.css';

interface AuthPageProps {
  onLogin: (username: string, profilePicture: string | null) => void;
}

function AuthPage({ onLogin }: AuthPageProps) {
  const [username, setUsername] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const handleLogin = () => {
    onLogin(username, profilePicture);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedProfilePicture = e.target.files?.[0]
    if (selectedProfilePicture) {
      convertToBase64(selectedProfilePicture)
    }
  };
  
  function convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setProfilePicture(base64String)
    };
  }
      
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
            accept='.jpeg, .png, .jpg'
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
            {profilePicture && <img src={profilePicture} alt='Profile Preview' className='picture-preview' />}
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
