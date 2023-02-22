import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
export default function Dashboard() {
  const [copySuccess, setCopySuccess] = useState('');

  const router = useRouter();
  const { data, error } = useSWR('/api/user', async (url) => {
    const res = await fetch(url);
   
    const json = await res.json();
    return json;
  });

  if (error) return <div>Erro ao carregar</div>;
  if (!data) return <div>Carregando...</div>;

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://app.fenixecom.com/convite/${data.name}`)
      .then(() => {
        setCopySuccess('Link copiado com sucesso!');
      })
      .catch(err => {
        console.error('Erro ao copiar: ', err);
        setCopySuccess('Erro ao copiar');
      });
  };

  return (
    <>
      <Header />

      <section className="">
        <div className="container pt-40 flex flex-col items-center px-4 py-12 mx-auto text-center">
          <h2 className="max-w-2xl mx-auto text-zinc-200 text-2xl font-semibold tracking-tight  xl:text-3xl dark:text-white">
          <img src="convite.png" height={50} width={100} className="mx-auto"/>
          Você tem convites disponíveis
          </h2>
          <p className="max-w-4xl mt-6 text-center text-zinc-500">
          Juntos, podemos fazer a diferença na construção de marcas fortes e distintas. Convidar alguém para fazer parte da Fênix significa dar a oportunidade de crescer e alcançar objetivos. Clique no link abaixo e indique uma pessoa de confiança. Manteremos a exclusividade dos nossos produtos para empreendedores que realmente querem se destacar.
          </p>
          <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <input className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-zinc-800 rounded-lg" id="formInput1-2" type="text"  value={`https://app.fenixecom.com/convite/${data.name}`} onClick={handleCopy} readOnly />
          {copySuccess && (
            <p className="text-sm text-green-500 mt-2">{copySuccess}</p>
          )}
  <div className="inline-flex w-full mt-6 sm:w-auto">
            <div className="flex flex-col items-center mt-10">

            </div>
          </div>
            </div>
          </div>
        </div>
      </section>



      <Footer />
    </>
  );
};






