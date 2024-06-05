import React, { useState } from 'react';
import './AuthPage.css';

interface AuthPageProps {
  onUsernameSubmit: (username: string) => void;
}

function AuthPage({ onUsernameSubmit }: AuthPageProps) {
  const [username, setUsername] = useState('');

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username) { 
      onUsernameSubmit(username);
    } else {
      alert('Please enter a valid username.');
    }
  };

  return (
    <div className="form-container">
      <form className="from-card text-light" onSubmit={handleFormSubmit}>
        <h4 className="my-4">Bem Vindo 👋</h4>
        <div className="my-3">Insira seu nome para começar</div>
        <div className="">
          <div className="my-2">Nome</div>
          <input
            className="username-input"
            placeholder="Seu nome aqui"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className="btn btn-light w-100 my-3" type="submit">
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AuthPage;
