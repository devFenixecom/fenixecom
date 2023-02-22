import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import useSWR from 'swr';
import axios from 'axios';

export default function userDetail() {
  const [name, setName] = useState('');

  const [fone, setFone] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword,   setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { data, mutate } = useSWR('/api/user/us-update', async () => {
    const response = await axios.get('/api/user/us-update');
    return response.data;
  });

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      await axios.post('/api/user/us-update', { name, fone, password, newPassword });
      setSuccessMessage('Atualizado com sucesso!');
    setErrorMessage('');
      mutate();
      setName('');
      setFone('');
      setPassword('');
      setNewPassword('');
    } catch (error) {
      setErrorMessage('Senha incorreta');
      console.error(error);
    }
    
  };

  

  return (
    <>
      <Header></Header>

      <div className="container px-4 py-32   mx-auto">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12 ">
          <a className="flex mb-8 items-center text-white hover:text-gray-200" href="/">
            <svg width={14} height={11} viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path d="M6.10529 11L7.18516 10.0272L2.92291 6.1875L14 6.1875L14 4.8125L2.92291 4.8125L7.18516 0.972813L6.10529 -6.90178e-07L4.80825e-07 5.5L6.10529 11Z" fill="currentColor" />
            </svg>
            <span className="ml-6" >Voltar para Home</span>
          </a>
        </div>

        <div className="p-8  rounded-xl">
          <div className="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 ">
            <div className="w-full sm:w-auto px-4 mb-6 sm:mb-0">
              <h4 className="text-3xl font-bold tracking-wide text-white mb-1">Meu perfil</h4>
              <p className="text-sm text-gray-300">Confirme e edite seus dados pessoais</p>
            </div>
           
          </div>

          {errorMessage && (
          <div className=" z-10  text-red-500 text-center">{errorMessage}</div>
        )}
        {successMessage && (
          <div className=" z-20 text-green-500 text-center">{successMessage}</div>
        )}

          {data && (
            <form onSubmit={handleSubmit} autoComplete="off" >


              <div className="flex flex-wrap items-center -mx-4 pb-8 mb-8 ">
                <div className="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
                  <span className="text-sm font-medium text-gray-100" >Nome</span>
                </div>
                <div className="w-full sm:w-2/3 px-4">
                  <div className="max-w-xl">
                    <div className="flex flex-wrap items-center -mx-3">
                      <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                        <input autoComplete="false" className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-zinc-800 hover:border-zinc-500 focus:border-zinc-500 rounded-lg"
                          type="text"
                          value={name}
                          onChange={(event) => setName(event.target.value)} placeholder={data.name}
                        />
                      </div>

                      <div className="w-full sm:w-1/2 px-3">
                        <input autoComplete="false" className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-zinc-800 hover:border-zinc-500 focus:border-zinc-500 rounded-lg"
                          value={fone}
                          type="text"
                          onChange={(event) => setFone(event.target.value)} placeholder={data.fone} />
                      </div>

                     
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center -mx-4 pb-8 mb-8 ">
                <div className="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
                  <span className="text-sm font-medium text-gray-100" >Informações de login</span>
                </div>
                <div className="w-full sm:w-2/3 px-4">
                  <div className="max-w-xl">
                    <div className="flex flex-wrap items-center -mx-3">

                    <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0 pb-6">
                        <input className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-zinc-800  rounded-lg" id="formInput1-2" type="text" placeholder={data.email} disabled />
                      </div>

                    <div className="w-full sm:w-2/2 ">
                         </div>


                      <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                        <input autoComplete="false" className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-zinc-800  hover:border-zinc-500 focus:border-zinc-500 rounded-lg"
                         type="password"
                         value={password}
                         onChange={(event) => setPassword(event.target.value)}
                          placeholder=
                          'Senha antiga' />
                      </div>

                      <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                        <input autoComplete="false" className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-zinc-800  hover:border-zinc-500 focus:border-zinc-500 rounded-lg"
                         type="password"
                         value={newPassword}
                         onChange={(event) => setNewPassword(event.target.value)}
                          placeholder=
                          'Nova Senha' />
                      </div>
                      

                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className='inline-block py-2 px-4   rounded-lg transition duration-200  h-12 bg-green-600 hover:bg-green-700 text-white  mt-4 '>Salvar alterações</button>
            </form>
          )}
        </div>

      </div>


      <Footer></Footer>
    </>
  );
}
