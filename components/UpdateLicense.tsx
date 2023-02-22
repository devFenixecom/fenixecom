import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import  useSWR from 'swr';

const UpdateLicense: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [domain, setDomain] = useState('');

  const { data, error } = useSWR(`/api/user/license/${id}`, async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  });

  useEffect(() => {
    if (data) {
      setDomain(data.domain);
    }
  }, [data]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();


      const access_token = localStorage.getItem('access_token');
      if (!access_token) {
        router.push('/');
        return;
      }
      
      const res = await fetch(`/api/user/license/update`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, domain }),
      });

    const result = await res.json();

    if (result.error) {
      console.error(result.error);
      console.log(result);
    } else {
      console.log('Licença atualizada com sucesso');
    }
    
  };

  return (
    <div>
      <h1>Atualizar Licença</h1>
      {error && <div>Erro ao carregar licença</div>}
      {data && (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="domain">Domínio:</label>
            <input
              type="text"
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>
          <button type="submit">Atualizar</button>
        </form>
      )}
    </div>
  );
};

export default UpdateLicense;
