import React, { useState } from 'react';
import  useSWR  from 'swr';
import axios from 'axios';

const UpdatePage = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const { data, mutate } = useSWR('/api/user/us-update', async () => {
    const response = await axios.get('/api/user/us-update');
    return response.data;
  });

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      await axios.post('/api/user/us-update', { name, password });
      mutate();
      setName('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {data && (
        <div>
               <h1>{data.avatar}</h1>
          <h1>{data.name}</h1>
          <p>{data.email}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePage;
