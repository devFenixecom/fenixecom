import React, { useState } from 'react';
import axios from 'axios';
  
const Form: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [imagem, setImagem] = useState('');
  const [theme, setTheme] = useState('');

  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
   

      // Adicionar o produto ao banco de dados MongoDB
      await axios.post('/api/products/theme', {
        name, description, imagem, theme,
      });

      
    } catch (error) {
      console.error(error);
      setMessage('Erro ao criar');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto py-12">
        CADASTRO DE TEMA


        
      <div className="mb-4">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br />
        <label htmlFor="type">:</label>
        <input
          type="text"
          id="type"
          value={theme}
          onChange={(event) => setTheme(event.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
        />
        <br />
        <button type="submit" 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </div>
      </form>
     
      {message && <p>{message}</p>}
    </>
  );
};

export default Form;
