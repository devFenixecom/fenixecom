
import { Header } from '../../components/Header';

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import UserPage from '../../components/admin/UserPage';
import { Button } from '../../components/Button';

export default function Dashboard() {


  const router = useRouter();
  const { data, error } = useSWR('/api/admin', async (url) => {
    const res = await fetch(url);
    if (res.status === 401) {
      localStorage.removeItem('access_token');
      router.push('/admin');
      return null;
    }
    const json = await res.json();
    return json;
  });

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      router.push('/admin');
    }
  }, []);

  if (error) return <div>Erro ao carregar</div>;
  if (!data) return <div>Carregando...</div>;




  return (
    <>

      <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
        <div className="container px-4 mx-auto">
          
        
<a href='cadlicense'>
<Button>Cadastrar Usuario</Button></a>
          <UserPage></UserPage>

        </div>
      </div>
    </>
  );
};






