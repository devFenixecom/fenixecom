import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import moment from 'moment';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Modal from '../../components/Modal';
import ModalSalle from '../../components/ModalSalle';

interface License {
  _id: string;
  financial: any;
  getUpdateNotice: boolean;
  isActive: boolean;
  client: string;
  theme: string;
  key: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
  domain: string;
  permanentDomain: string;
  name: string;
}



export default function Page() {

  function getExpirationMessage(expiresAt: string): string {
    const diff = Math.max(0, moment(expiresAt).diff(moment(), 'days'));
    if (diff === 0) {
      return 'Expirou';
    }
    return `Expira em ${diff} dias`;
  }


  const router = useRouter();
  const { data, error } = useSWR('/api/user/licenses', async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  });


  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      router.push('/');
    }
  }, []);

  if (error) return <div>Failed to load data</div>;
  if (!data) return  <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
  <div className="w-50 h-50 opacity-50 rounded-full flex items-center justify-center">
  <svg width="40" height="40" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
        </path>
    </svg>  </div>
</div>;

  return (

    <>
      <Header></Header>
      <div>
        <section className="pt-24 pb-32 overflow-hidden">

          <div className="container py-5   mx-auto">

            <div className="p-8  rounded-xl">
              <div className="flex flex-wrap items-center justify-between -mx-4 mb-8 pb-6 ">
                <div className="w-full sm:w-auto px-4 mb-6 sm:mb-0">
                  <h4 className="text-3xl font-bold tracking-wide text-white mb-1">Minhas Licenças</h4>

                </div>
                {/*<div className="w-full sm:w-1/3 px-4">
                  <div className="max-w-xl">
                    <div className="relative block px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium border border-zinc-800 hover:border-zinc-500 focus-within:border-zinc-500 rounded-lg">
                      <span className="absolute top-1/2 right-0 mr-5 transform -translate-y-1/2">
                        <svg width={12} height={8} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" >
                          <path d="M10.9999 1.16994C10.8126 0.983692 10.5591 0.87915 10.2949 0.87915C10.0308 0.87915 9.77731 0.983692 9.58995 1.16994L5.99995 4.70994L2.45995 1.16994C2.27259 0.983692 2.01913 0.87915 1.75495 0.87915C1.49076 0.87915 1.23731 0.983692 1.04995 1.16994C0.95622 1.26291 0.881826 1.37351 0.831057 1.49537C0.780288 1.61723 0.75415 1.74793 0.75415 1.87994C0.75415 2.01195 0.780288 2.14266 0.831057 2.26452C0.881826 2.38638 0.95622 2.49698 1.04995 2.58994L5.28995 6.82994C5.38291 6.92367 5.49351 6.99807 5.61537 7.04883C5.73723 7.0996 5.86794 7.12574 5.99995 7.12574C6.13196 7.12574 6.26267 7.0996 6.38453 7.04883C6.50638 6.99807 6.61699 6.92367 6.70995 6.82994L10.9999 2.58994C11.0937 2.49698 11.1681 2.38638 11.2188 2.26452C11.2696 2.14266 11.2957 2.01195 11.2957 1.87994C11.2957 1.74793 11.2696 1.61723 11.2188 1.49537C11.1681 1.37351 11.0937 1.26291 10.9999 1.16994Z" fill="#3D485B" />
                        </svg>
                      </span>
                      <select className="w-full py-4 appearance-none bg-transparent outline-none"  >

                        <option className="bg-gray-500" value={1}>{data.email}</option>

                      </select>
                    </div>
                  </div>
                </div>*/}

                <div className="w-full sm:w-auto px-4">

                  <div>
                    <ModalSalle />
                  </div>
                </div>
              </div>
            </div></div>

          <div className="container mx-auto px-4">


            <div className="flex flex-wrap m-3 mb-12">

            {data && data.licenses && data.licenses.map((license: License) => (

                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                  <a className="block h-full p-6 border  border-zinc-900 ease-in-out duration-700  hover:border-zinc-800 rounded-md" >

                    <div className="flex items-center pb-5 ">
                      <div className="flex px-1">
                        <Modal license={license} />
                      </div>
                      <div className="flex px-1">
                        <p className="font-heading font-semibold text-xs text-zinc-400 uppercase tracking-px" > {license.name}  <p>

                          {license.isActive ? (
                            <div className="rounded-sm  h-4 px-1 text-green-500 bg-opacity-20 bg-green-600 border border-green-900 border-opacity-30"> Ativa</div>
                          ) : (
                            <div className="rounded-sm h-4 px-1 font-normal  text-red-500 bg-opacity-20 bg-red-600 border border-red-900 border-opacity-30 "> Inativa</div>
                          )}



                        </p></p>
                      </div>

                      <div className="flex text-zinc-600 px-1">
                        {license.isActive && license.domain ? (
                          <div className="rounded-full w-3 h-3 bg-green-600"></div>
                        ) : (
                          <div className="rounded-full w-3 h-3 bg-yellow-600 "></div>
                        )}
                      </div>
                      <div className="flex text-zinc-600 px-1">
                        <p className=" text-zinc-500 ">{license.domain}</p>
                      </div>


                    </div>


                    <input id="input-field" className="form-input py-3 px-4 block w-full border text-zinc-200 border-zinc-800  focus:border-zinc-800 bg-transparent eading-5 rounded-md transition duration-150 ease-in-out" type="text" placeholder={license.key} value={license.key} />


                  </a>
                </div>

              ))}
            </div>

          </div>
        </section>


      </div>
      <Footer></Footer>
    </>
  );
}
