import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useState } from 'react';

const fetcher = async (url) => {
  const res = await fetch(url);
  return res.json();
};

export default function UserPage() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  // Busca os usuários na API usando SWR
  const { data, error, mutate } = useSWR(`/api/admin/users?page=${page}&limit=5`, fetcher);

  if (error) return <div>Erro ao carregar os dados...</div>;
  if (!data) return <div>Carregando os dados...</div>;

  const { users, totalPages } = data;

  const handleDelete = async (id) => {
    // Remove o usuário do banco de dados
    const response = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });

    if (response.ok) {
      // Atualiza o cache com os novos dados
      mutate();
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      router.push(`/admin/users?page=${page - 1}`);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      router.push(`/admin/users?page=${page + 1}`);
    }
  };

  return (

    <div className="flex flex-col items-center">
   
    <div className="h-full p-6  bg-zinc-900 rounded-xl">
      <table className="w-full ">
        <thead>
          <tr className="py-3 px-6  bg-zinc-700">
            <th className="py-3 px-6  rounded-l-xl bg-zinc-700 text-left">Nome</th>
            <th className="py-3 px-6  bg-zinc-700 text-left">E-mail</th>
            <th className="py-3 px-6  rounded-r-xl bg-zinc-700 text-right">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b border-zinc-800">
              <td className="py-2 text-zinc-200 px-4">{user.name}</td>
              <td className="py-2 text-zinc-200 hover:text-zinc-300 px-4">{user.email}</td>
              <td className="py-2 px-4 text-right">
                <button
                  className="py-1 px-1 opacity-90"
                  onClick={() => handleDelete(user._id)}
                >
                  <img src='/dell.svg'/>
                </button>
                <button
                  className="py-1 px-2 "
                  onClick={() => router.push(`/admin/users/${user._id}`)}
                >
                  <img src='/options.svg'/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button
          className={`py-1 px-2 border border-zinc-800 rounded ${
            page === 1 ? 'bg-zinc-800 text-gray-500 cursor-not-allowed' : 'hover:bg-zinc-600'
          }`}
          onClick={handlePrevPage}
          disabled={page === 1}
        >
          Anterior
        </button>
        <button
          className={`py-1 px-2 border border-zinc-800 rounded ${
            page === totalPages ? 'bg-zinc-800 text-gray-500 cursor-not-allowed' : 'hover:bg-zinc-600'
          }`}
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Próxima
        </button>
        <p className="text-gray-500">
          Página {page} de {totalPages}
        </p>
      </div>
    </div>
  </div>
  );
}