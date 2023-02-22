import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

import useSWR from 'swr';
import axios from 'axios';

export default function userDetail() {
  const router = useRouter();
  const { name } = router.query;
  const { data, error } = useSWR<any>(`/api/user/${name}`, async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  });

  if (error) return <div>Falha ao carregar</div>;
  if (!data) return <div></div>;


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
            <div className="w-full sm:w-auto px-4">
              <div><a className="inline-block py-2 px-4 mr-3 text-xs text-center font-semibold leading-normal text-gray-400 bg-gray-600 hover:bg-gray-700 rounded-lg transition duration-200" href="#" >Cancelar</a><a className="inline-block py-2 px-4 text-xs text-center font-semibold leading-normal text-blue-50 bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200" href="#" >Salvar alterações</a></div>
            </div>
          </div>
          <form>
            <div className="flex flex-wrap items-start -mx-4 pb-8 mb-8 ">
              <div className="w-full sm:w-1/3 px-4 mb-6 sm:mb-0">
                <span className="block text-sm font-medium text-gray-100" >Avatar</span>
                <span className="text-xs text-gray-400" >Alterar foto de perfil</span>
              </div>
              <div className="w-full sm:w-2/3 px-4">
                <div className="flex flex-wrap sm:flex-nowrap max-w-xl">
                  <div className="flex-shrink-0 w-20 h-20 mb-4 mr-4 rounded-full">
                    <img src="https://shuffle.dev/trizzle-assets/images/avatar-photo-form.png" alt="" />
                  </div>
                  <div className="w-full py-8 px-4 text-center border-dashed border border-zinc-800 hover:border-zinc-500 focus:border-zinc-500 rounded-lg">
                    <div className="relative group h-14 w-14 mx-auto mb-4">
                      <div className="flex items-center justify-center h-14 w-14 bg-blue-500 group-hover:bg-blue-600 rounded-full">
                        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
                          <path d="M6.71 5.71002L9 3.41002V13C9 13.2652 9.10536 13.5196 9.29289 13.7071C9.48043 13.8947 9.73478 14 10 14C10.2652 14 10.5196 13.8947 10.7071 13.7071C10.8946 13.5196 11 13.2652 11 13V3.41002L13.29 5.71002C13.383 5.80375 13.4936 5.87814 13.6154 5.92891C13.7373 5.97968 13.868 6.00582 14 6.00582C14.132 6.00582 14.2627 5.97968 14.3846 5.92891C14.5064 5.87814 14.617 5.80375 14.71 5.71002C14.8037 5.61706 14.8781 5.50645 14.9289 5.3846C14.9797 5.26274 15.0058 5.13203 15.0058 5.00002C15.0058 4.86801 14.9797 4.7373 14.9289 4.61544C14.8781 4.49358 14.8037 4.38298 14.71 4.29002L10.71 0.290018C10.6149 0.198978 10.5028 0.127613 10.38 0.0800184C10.1365 -0.0199996 9.86346 -0.0199996 9.62 0.0800184C9.49725 0.127613 9.3851 0.198978 9.29 0.290018L5.29 4.29002C5.19676 4.38326 5.1228 4.49395 5.07234 4.61577C5.02188 4.73759 4.99591 4.86816 4.99591 5.00002C4.99591 5.13188 5.02188 5.26245 5.07234 5.38427C5.1228 5.50609 5.19676 5.61678 5.29 5.71002C5.38324 5.80326 5.49393 5.87722 5.61575 5.92768C5.73757 5.97814 5.86814 6.00411 6 6.00411C6.13186 6.00411 6.26243 5.97814 6.38425 5.92768C6.50607 5.87722 6.61676 5.80326 6.71 5.71002ZM19 10C18.7348 10 18.4804 10.1054 18.2929 10.2929C18.1054 10.4804 18 10.7348 18 11V17C18 17.2652 17.8946 17.5196 17.7071 17.7071C17.5196 17.8947 17.2652 18 17 18H3C2.73478 18 2.48043 17.8947 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V11C2 10.7348 1.89464 10.4804 1.70711 10.2929C1.51957 10.1054 1.26522 10 1 10C0.734784 10 0.48043 10.1054 0.292893 10.2929C0.105357 10.4804 0 10.7348 0 11V17C0 17.7957 0.316071 18.5587 0.87868 19.1213C1.44129 19.6839 2.20435 20 3 20H17C17.7956 20 18.5587 19.6839 19.1213 19.1213C19.6839 18.5587 20 17.7957 20 17V11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10Z" fill="#E8EDFF" />
                        </svg>
                      </div>
                      <input className="absolute top-0 left-0 h-14 w-14 opacity-0" id="formInput1-4" type="file" name="filephoto" />
                    </div>
                    <p className="font-semibold leading-normal mb-1">
                      <span className="text-blue-500" >Clique para enviar</span>
                      <span className="text-gray-300" > Ou arraste</span>
                    </p>
                    <span className="text-xs text-gray-300 font-semibold" >PNG, JPG, GIF até 5MB</span>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex flex-wrap items-center -mx-4 pb-8 mb-8 ">
              <div className="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
                <span className="text-sm font-medium text-gray-100" >Nome</span>
              </div>
              <div className="w-full sm:w-2/3 px-4">
                <div className="max-w-xl">
                  <div className="flex flex-wrap items-center -mx-3">
                    <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                      <input className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-zinc-800 hover:border-zinc-500 focus:border-zinc-500 rounded-lg" id="formInput1-1" type="text" placeholder={data.name}
                      />
                    </div>
                    <div className="w-full sm:w-1/2 px-3">
                      <input className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-zinc-800 hover:border-zinc-500 focus:border-zinc-500 rounded-lg" id="formInput1-2" type="text" placeholder="Sobrenome" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center -mx-4 pb-8 mb-8 ">
              <div className="w-full sm:w-1/3 px-4 mb-4 sm:mb-0">
                <span className="text-sm font-medium text-gray-100" >Informações de contato</span>
              </div>
              <div className="w-full sm:w-2/3 px-4">
                <div className="max-w-xl">
                  <div className="flex flex-wrap items-center -mx-3">
                    <div className="w-full sm:w-1/2 px-3 mb-3 sm:mb-0">
                      <input className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-zinc-800  rounded-lg" id="formInput1-1" type="text" placeholder={data.email} disabled />
                    </div>
                    <div className="w-full sm:w-1/2 px-3">
                      <input className="block py-4 px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium outline-none bg-transparent border border-zinc-800 hover:border-zinc-500 focus:border-zinc-500 rounded-lg" id="formInput1-2" type="text" placeholder="DD+Número" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>

      </div>


      <Footer></Footer>
    </>
  );
}
