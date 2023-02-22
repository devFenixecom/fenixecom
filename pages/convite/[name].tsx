
import useSWR from 'swr';
import React from 'react';
import { Button } from '../../components/Button';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Dashboard() {

  const router = useRouter();
  const { name } = router.query;
  const { data, error } = useSWR<any>(`/api/user/convite/${name}`, async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  });

  if (error) return <div> <section className="">
    <div className="container pt-40 flex flex-col items-center px-4 py-12 mx-auto text-center">
      <p className="max-w-4xl mt-6 text-center text-zinc-500">
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#6e6e6e" version="1.1" id="Capa_1" x="0px" y="0px" width="87.607px" height="87.607px" viewBox="0 0 87.607 87.607" xmlSpace="preserve">

          <g id="Gift">
            <g>
              <path d="M84.299,22.202H60.246l5.496-2.723c0.322-0.154,0.617-0.368,0.874-0.625c2.024-2.026,3.139-4.727,3.139-7.593     c0-2.872-1.114-5.566-3.139-7.599c-4.183-4.182-10.978-4.182-15.159,0c-0.227,0.23-0.419,0.492-0.57,0.775L43.23,18.679     L35.574,4.438c-0.152-0.283-0.345-0.545-0.572-0.77c-4.179-4.192-10.978-4.192-15.156,0c-4.179,4.187-4.179,10.999,0,15.186     c0.254,0.257,0.551,0.471,0.871,0.625l5.496,2.723H3.307C1.481,22.202,0,23.688,0,25.516v19.672C0,47.017,1.481,48.5,3.307,48.5     h3.821v35.273c0,1.829,1.48,3.311,3.307,3.311h66.943c1.825,0,3.308-1.48,3.308-3.311V48.5h3.613     c1.826,0,3.309-1.481,3.309-3.312V25.516C87.605,23.688,86.125,22.202,84.299,22.202z M40.264,80.458V48.5h7.162v31.959H40.264z      M47.486,41.874h-7.159V28.832h7.159V41.874z M56.439,8.069c1.612-1.315,3.998-1.225,5.5,0.283     c0.775,0.775,1.203,1.808,1.203,2.909c0,0.94-0.312,1.834-0.893,2.562l-12.128,6.004L56.439,8.069z M24.521,8.352     c1.449-1.454,3.928-1.566,5.497-0.283l6.317,11.758l-12.127-6.004C22.928,12.208,23.032,9.844,24.521,8.352z M6.611,28.832     h27.102v13.042H6.611V28.832z M13.739,48.5h23.22v31.959h-23.22V48.5z M74.073,80.458H50.73V48.5h23.343V80.458z M80.995,41.874     H54.1V28.832h26.896V41.874z" />
            </g>
          </g>
        </svg>
      </p>

      <h2 className="max-w-2xl pt-10  mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">

        Não há convite para você hoje!
      </h2>
      <p className="max-w-4xl  m-6 text-center text-zinc-500">
        Infelizmente, não foi possível confirmar sua indicação para fazer parte do grupo seleto que ajuda a alcançar seus objetivos e construir uma marca forte e distinta. No entanto, temos uma lista de espera para futuras oportunidades e gostaríamos de convidá-lo a se inscrever. Não perca a oportunidade de se juntar a um grupo de profissionais de sucesso e alcançar seus objetivos de construção de marca.   </p>


      <div className="mt-6 sm:w-auto">
        <a href='https://fenixecom.com/lista'>
          <Button >Entrar na lista de espera</Button></a>
      </div>
    </div>
  </section></div>;
  if (!data) return <div></div>;

  return (
    <>
      <div>


      </div>
      <section className="">
        <div className="container pt-40 flex flex-col items-center px-4 py-12 mx-auto text-center">
          <p className="max-w-4xl mt-6 text-center text-zinc-500">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#f74400" version="1.1" id="Capa_1" x="0px" y="0px" width="87.607px" height="87.607px" viewBox="0 0 87.607 87.607" xmlSpace="preserve">

              <g id="Gift">
                <g>
                  <path d="M84.299,22.202H60.246l5.496-2.723c0.322-0.154,0.617-0.368,0.874-0.625c2.024-2.026,3.139-4.727,3.139-7.593     c0-2.872-1.114-5.566-3.139-7.599c-4.183-4.182-10.978-4.182-15.159,0c-0.227,0.23-0.419,0.492-0.57,0.775L43.23,18.679     L35.574,4.438c-0.152-0.283-0.345-0.545-0.572-0.77c-4.179-4.192-10.978-4.192-15.156,0c-4.179,4.187-4.179,10.999,0,15.186     c0.254,0.257,0.551,0.471,0.871,0.625l5.496,2.723H3.307C1.481,22.202,0,23.688,0,25.516v19.672C0,47.017,1.481,48.5,3.307,48.5     h3.821v35.273c0,1.829,1.48,3.311,3.307,3.311h66.943c1.825,0,3.308-1.48,3.308-3.311V48.5h3.613     c1.826,0,3.309-1.481,3.309-3.312V25.516C87.605,23.688,86.125,22.202,84.299,22.202z M40.264,80.458V48.5h7.162v31.959H40.264z      M47.486,41.874h-7.159V28.832h7.159V41.874z M56.439,8.069c1.612-1.315,3.998-1.225,5.5,0.283     c0.775,0.775,1.203,1.808,1.203,2.909c0,0.94-0.312,1.834-0.893,2.562l-12.128,6.004L56.439,8.069z M24.521,8.352     c1.449-1.454,3.928-1.566,5.497-0.283l6.317,11.758l-12.127-6.004C22.928,12.208,23.032,9.844,24.521,8.352z M6.611,28.832     h27.102v13.042H6.611V28.832z M13.739,48.5h23.22v31.959h-23.22V48.5z M74.073,80.458H50.73V48.5h23.343V80.458z M80.995,41.874     H54.1V28.832h26.896V41.874z" />
                </g>
              </g>
            </svg>
          </p>

          <h2 className="max-w-2xl pt-10  mx-auto text-5xl font-semibold tracking-tight text-gray-800 xl:text-5xl dark:text-white">

            Parabéns!
          </h2>

          <p className="max-w-4xl m-10 mt-6 text-center text-zinc-500">
            Você foi indicado por <strong className="text-orange-500 font-bold"> {data.name} </strong>para fazer parte de um grupo seleto, que irá ajudá-lo a alcançar seus objetivos e a construir uma marca forte e distinta.
          </p>

          <a href='https://pay.kiwify.com.br/VRpGl6V'><Button >Garantir meu convite</Button></a>

        </div>
      </section>



    </>
  );
};






