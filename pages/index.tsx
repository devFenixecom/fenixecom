import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from "../components/Button";


export default function Login() {
  
  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      router.push('/dashboard');
    }
  }, []);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form fields
    if (!email || !password) {
      setError('Please fill out both email and password');
      return;
    }

    // Attempt login
    setIsLoading(true);
    try {
      const response = await axios.post('/api/login', { email, password });
      const { data } = response;
      setIsLoading(false);
      
      if (data.error) {
        setError(data.error);
        return;
      }

      

      // Save the token in the browser's local storage
      localStorage.setItem('access_token', data.access_token);


      // Redirect the user to the home page
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
    }
  };


  return (

    <div className="flex flex-wrap w-full">
      <div className="flex flex-col w-full md:w-1/2  min-h-screen bg-zinc-900">
        <div className="flex justify-center pt-20 md:justify-start md:px-24 lg:px-32">
        <div className="flex justify-center">
           
           <img
             className=" z-50  sm:hidden h-20"
             src="logo-mobile.svg"
             alt=""
           />
           
          
       </div>
        </div>
        <div className="flex flex-col justify-center px-8 pt-8  md:justify-start md:pt-0 md:px-24 lg:px-32">
        <img
             className=" hidden sm:block  h-20 "
             src="logo-footer.svg"
             alt=""
           />
          <p className="text-3xl text-fenix pt-10 font-bold text-center">
          Acesse sua conta
          </p>
          <p className="text-1xl text-zinc-500 text-center">
          Preencha seus dados de acesso à plataforma.
          </p>

         
          <form onSubmit={handleSubmit} className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <div className="flex relative ">

                <input type="text"
                  id="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className=" w-full bg-inputbg outline-none text-sm text-zinc-400 focus:text-zinc-200 focus:border-zinc-600/50 px-3 h-12 rounded-md border border-zinc-800" placeholder="Email" />
              </div>
            </div>
            <div className="flex flex-col pt-4 ">
              <div className="flex relative ">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full bg-inputbg outline-none text-sm text-zinc-400 focus:text-zinc-200 focus:border-zinc-600/50 px-3 h-12 rounded-md border border-zinc-800"
                  placeholder="Password"
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 mt-2 mr-2"
                  style={{ width: '30px', height: '30px' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <img src="/eye-16.svg" alt="show" />
                  ) : (
                    <img src="/eye-close-6.svg" alt="hide" />
                  )}
                </button>
              </div>
            </div>

       

            <div className="flex pb-4 pt-12 items-center justify-between">
       {/** <div className="flex items-center">
          <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600 ">Remember me</label>
        </div>*/} 
        <div className="text-sm">
          <a href="/recover" className="font-medium text-zinc-500  hover:opacity-90">Esqueceu a senha?</a>
        </div>
      </div>    {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      <Button type="submit" >
              {isLoading ? (
                <span>
                  <svg width="20" height="20" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
        </path>
    </svg>
                </span>
              ) : (
                "Entrar"
              )}
            </Button>

          </form>

         
           {/**<div className="pt-12  text-gray-500 pb-12 text-center">
            <p>
              Não tem conta? <a href="#" className="font-semibold underline">  Registrar agora
              </a>
            </p>
              </div> */}

        </div>
      </div>
      <div className="w-1/2 ">
        
        <img className="hidden object-cover w-full h-screen md:block" src="bg.jpg" />
      </div>
    </div>

  )
}