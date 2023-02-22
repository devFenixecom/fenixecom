import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import { Form } from 'antd';
import Router from 'next/router';
import { Button } from "../components/Button"
import { Input } from '../components/Input';

const PasswordRecoveryPage = () => {
  const [email, setEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
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

  const handleReset = async (values: any) => {


    setIsLoading(true);
    try {
      const response = await axios.post('/api/reset-password', { email, tempPassword, newPassword });
      if (response.data.success) {
        setSuccess(true);
        setError('');
        Router.push('/dashboard');
      } else {
        setSuccess(false);
        setError('Código temporário inválido ou senha inválida');
      }
    } catch (error) {
      setSuccess(false);
      setError('Erro ao redefinir a senha');
    }
    setIsLoading(false);
  };

  return (
    
    
    <div className="flex flex-wrap w-full">
    <div className="flex flex-col w-full md:w-1/2  min-h-screen bg-zinc-900">
      
      <div className="flex justify-center pt-62 pt-12 md:justify-start md:px-24 lg:px-32">
        

      <div className=" h-20 flex justify-center">
         
         <img
           className=" z-50  sm:hidden w-10"
           src="logo-footer.svg"
           alt=""
         />
         
         
     </div>
      </div>
      <div className="flex flex-col justify-center px-8 pt-8  md:justify-start md:pt-0 md:px-24 lg:px-32">

        
        <p className="text-3xl  text-fenix font-bold text-center">
        Esqueceu a senha?
        </p>
        <p className="text-1xl text-zinc-500  text-center">
        Informe seu e-mail abaixo para recuperar sua senha.
        </p>




      {!success ? (
        

        

        <Form onFinish={handleSubmit} className="flex flex-col pt-3 md:pt-8">
          
          
          <Form.Item>
         
            <Input
              type="email"
              value={email} 
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Seu email"
            />
             
          </Form.Item>
          
          <Form.Item>
            
            <Button type="submit" >
              Recuperar senha
            </Button>
            
          </Form.Item>
        </Form>
      ) : (
        <Form onFinish={handleReset} className="flex flex-col pt-3 md:pt-8">
          <Form.Item>
            <Input
              type="password"
              value={tempPassword}
              onChange={(event) => setTempPassword(event.target.value)}
              placeholder="Código temporário"
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Nova senha"
            />
          </Form.Item>
          <Form.Item>
            
            <Button 
            type="submit" >
            Redefinir
              </Button>
          </Form.Item>
          {error && <div>{error}</div>}

          
        </Form>
      )}


<a className="flex mb-8 items-center text-white hover:text-gray-200" href="/">
            <svg width={14} height={11} viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" >
              <path d="M6.10529 11L7.18516 10.0272L2.92291 6.1875L14 6.1875L14 4.8125L2.92291 4.8125L7.18516 0.972813L6.10529 -6.90178e-07L4.80825e-07 5.5L6.10529 11Z" fill="currentColor" />
            </svg>
            <span className="ml-6" >Voltar para Login</span>
          </a>
      </div>

      
      </div>
      <div className="w-1/2 ">
        
        <img className="hidden object-cover w-full h-screen md:block" src="rec.jpg" />
      </div>
      </div>
   
  );
};
export default PasswordRecoveryPage;