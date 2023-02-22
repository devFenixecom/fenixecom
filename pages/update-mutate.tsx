import axios from 'axios';
import { useState } from 'react';
import useSWR, { mutate } from 'swr';


export default function ThemeDetail() {
  const [formData, setFormData] = useState({});
  const { data, error } = useSWR<any>(`/api/user`, async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`/api/user/update`, formData);
      mutate(`/api/themes`, {...data, ...res.data}, false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
      
        onChange={e => setFormData({ ...formData, name: e.target.value })}
      />
      <button type="submit">Update Theme</button>
    </form>
  );
}
