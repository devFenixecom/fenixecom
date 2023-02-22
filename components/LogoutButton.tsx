import router from 'next/router';
import React, { useState } from 'react';

function LogoutButton() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleClick = async () => {
    localStorage.removeItem('access_token');
    
    // Envia uma requisição para a API para destruir o token
    const response = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      setIsLoggedOut(true);
    }
    setTimeout(() => {
        router.push('/');
      }, 1000);
  };

  return (
    <div>
      {isLoggedOut ? (
        <p className='text-fenix'>Desconectando...</p>
      ) : (
        <button onClick={handleClick}>Desconectar</button>
      )}
    </div>
  );
}

export default LogoutButton;
