
import { Button } from "../components/Button"
import { useState } from 'react';
import axios from 'axios';

const PasswordRecoveryPage = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/password-recovery', { email });
      setSuccess(response.data.success);
      setError('');
    } catch (error) {
      setSuccess(false);
      setError('Email não localizado');
      
    }
    setIsLoading(false);
    
  };

  return (

    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex justify-center pt-12 md:justify-start md:pl-12 ">
        <a className="flex mb-8 items-center text-white hover:text-gray-200" href="#">
        <svg width={14} height={11} viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" data-config-id="auto-svg-1-4">
          <path d="M6.10529 11L7.18516 10.0272L2.92291 6.1875L14 6.1875L14 4.8125L2.92291 4.8125L7.18516 0.972813L6.10529 -6.90178e-07L4.80825e-07 5.5L6.10529 11Z" fill="currentColor" />
        </svg>
        <span className="ml-6" data-config-id="auto-txt-1-4">Voltar para logar</span>
      </a>
        </div>
        <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
          <p className="text-3xl  font-bold text-center">
            Recuperar Senha.
          </p>
          <form onSubmit={handleSubmit}
            className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4 mb-12">
              <div className="flex relative ">

                <input type="email"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required className=" w-full bg-inputbg outline-none text-sm focus:border-zinc-600/50 px-3 h-12 rounded-md border border-zinc-800" placeholder="Seu email" />
              </div>
            </div>

            <Button type="submit" >
              {isLoading ? (
                <span>
                  <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
        </path>
    </svg>
                </span>
              ) : (
                "Enviar código de verificação"
              )}
            </Button>

            {success && (

              <div className=" text-green-600 pt-4 mb-12" role="alert">

                <p>
                  Enviamos um email com sua nova senha. Verifique sua caixa de entrada e utilize a nova senha para
                  acessar o aplicativo.
                </p>
              </div>


            )}
            {error && <div className=" text-gray-600 pt-4 mb-12" role="alert">
              <p>{error}</p>
              </div>}


          </form>

        </div>
      </div>

      <div className="w-1/2 shadow-2xl">
        <img className="hidden object-cover w-full h-screen md:block" src="https://magazinefeminina.com.br/wp-content/uploads/2020/09/r2dr-minimalism-iphone-11-wallpaper-ilikewallpaper_com.jpg" />
      </div>

    </div>


  )
}

export default PasswordRecoveryPage;