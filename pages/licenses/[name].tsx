import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import useSWR from 'swr';
import axios from 'axios';


export default function ThemeDetail() {
  const router = useRouter();
  const { _id } = router.query;
  const { data, error } = useSWR<any>(`/api/licenses/${_id}`, async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  });

  if (error) return <div>Falha ao carregar</div>;
  if (!data) return <div>Carregando...</div>;

  return (
    <>

  
<p>{data._id}</p>


    </>
  );
}
