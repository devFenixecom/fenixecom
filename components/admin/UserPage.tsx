import useSWR from 'swr';
import { useRouter } from 'next/router';
import { useState} from 'react';

const fetcher = async (url: any) => {
  const res = await fetch(url);
  return res.json();
};



export default function UserPage() {
  const [page, setPage] = useState(1);
  const router = useRouter();

  // Busca os usuários na API usando SWR
  const { data, error, mutate } = useSWR(`/api/admin/users?page=${page}&limit=5`, fetcher);
  // Busca os usuários na API usando SWR


  if (error) return <div>Erro ao carregar os dados...</div>;
  if (!data) return <div>Carregando os dados...</div>;

  const { users, totalPages } = data;


  const userLicenses = [];

  users.forEach((user: any) => {
    user.licenses.forEach((license: any) => {
      userLicenses.push({
        user,
        license,
      });
    });
  });
  const handleDelete = async (id:any) => {
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
      router.push(`/admin/painel?page=${page - 1}`);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      router.push(`/admin/painel?page=${page + 1}`);
    }
  };

  return (


    <div className="flex flex-wrap -mx-3">
      <div className="w-full lg:w-1/1 px-3 mb-6 lg:mb-0">

        <div className="h-full p-6  text-xs  bg-white text-zinc-500 rounded shadow">
          <table className="w-full ">
            <thead>
              <tr className="py-3 px-6  ">
                <th className="py-3  rounded-l-xl  text-left">Avatar</th>
                <th className="py-3 px-6  rounded-l-xl  text-left">Nome</th>
                <th className="py-3 px-6  text-left">E-mail</th>
                <th className="py-3 px-6  text-left">Criado</th>
                <th className="py-3 px-6  text-left">Status</th>
                <th className="py-3 px-6  rounded-r-xl  text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: any) => (
                <tr key={user.id} className="border-t border-blueGray-100 text-xs">
                  <td className="py-2">
                    <div className="flex">
                      <div className="flex items-center justify-center text-center bg-zinc-600 rounded-full text-white w-7 h-7">
                        {user.avatar}
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{user.licenses.length}</td>
                  <td className="py-2 px-4 text-right">
                    <button className="py-1 px-1 opacity-90" onClick={() => handleDelete(user._id)}>
                      <img src="/dell.svg" />
                    </button>
                    <button className="py-1 px-2 " onClick={() => router.push(`/admin/users/${user._id}`)}>
                      <img src="/options.svg" />
                    </button>
                  </td>
                </tr>

              ))}

            </tbody>
          </table>
          <div className="mt-4 flex justify-between items-center">
            <button
              className={`py-1 px-2 border border-zinc-300 rounded ${page === 1 ? 'bg-zinc-400 text-gray-300 cursor-not-allowed' : 'hover:bg-zinc-200'
                }`}
              onClick={handlePrevPage}
              disabled={page === 1}
            >
              Anterior
            </button>
            <button
              className={`py-1 px-2 border border-zinc-300 rounded ${page === totalPages ? 'bg-zinc-400 text-gray-300 cursor-not-allowed' : 'hover:bg-zinc-200'
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
    </div>
  );
}