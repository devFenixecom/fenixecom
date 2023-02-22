import React, { useState } from 'react';
import axios from 'axios';
  
const Form: React.FC = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Criar o produto no Stripe
      const stripeResponse = await axios.post('/api/stripe/products', {
        name,
        type,
        description,
      });

      // Adicionar o produto ao banco de dados MongoDB
      await axios.post('/api/products/products', {
        product: stripeResponse.data.product,
      });

      console.log(stripeResponse);
      setMessage('Criado com sucesso');
    } catch (error) {
      console.error(error);
      setMessage('Erro ao criar');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto py-12">
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
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          value={type}
          onChange={(event) => setType(event.target.value)}
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
