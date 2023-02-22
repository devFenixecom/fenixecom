import useSWR from 'swr';
import axios from 'axios';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { useRouter } from 'next/router';

export default function ThemeDetail() {

  const router = useRouter();
  const { name } = router.query;
  const { data, error } = useSWR<any>(`/api/theme/${name}`, async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  });

  if (error) return <div>Falha ao carregar</div>;
  if (!data) return <div></div>;

  return (
   
<>

    <Header></Header>


    <div className="pt-24 md:pt-52 pb-40" style={{backgroundImage: 'url("produto.jpg")', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}} data-config-id="auto-img-3">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4 mb-16">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="max-w-lg">
                <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-white mb-20">
                  <span className="block leading-none" > <p>{data.name}</p></span>
                  <span className="text-2xl" > <p>{data.description}</p></span>
                </h1>
                <div>
                  <a className="inline-flex mb-20 items-center text-white" href="#">
                    <span className="mr-4" data-config-id="auto-txt-3-6">Configurar tema</span>
                    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-config-id="auto-svg-1-6">
                      <path d="M14.9983 2.97487L12.8444 2.94712L12.9539 11.4487L1.76433 0.259107L0.261729 1.76171L11.4513 12.9513L2.94974 12.8418L2.97749 14.9957L15.1552 15.1525L14.9983 2.97487Z" fill="currentColor" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
            <div className="relative">
        <a className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 group flex items-center justify-center w-24 h-24 rounded-full overflow-hidden" href="#">
          <div className="absolute top-0 left-0 w-full h-full backdrop-blur backdrop-filter bg-gray-900 bg-opacity-50 group-hover:bg-opacity-40 group-hover:bg-gray-800 transition duration-150" />
          <span className="relative">
            <svg width={17} height={21} viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg" data-config-id="auto-svg-1-2">
              <path fillRule="evenodd" clipRule="evenodd" d="M15.1336 12.2449C13.1896 14.3409 7.89891 17.8875 5.19224 19.0262C4.76024 19.2075 3.65891 19.5915 3.42158 19.5969C2.91758 19.6129 2.43224 19.3302 2.19758 18.8769C2.10691 18.7009 1.84024 17.5515 1.75491 17.0395C1.50158 15.4822 1.37091 13.0635 1.37358 10.6315C1.37091 8.07955 1.51224 5.54621 1.79491 4.00488C1.86958 3.58888 2.08824 2.63155 2.15224 2.47688C2.27224 2.18888 2.49091 1.96221 2.75491 1.82088C2.95758 1.71155 3.18958 1.65288 3.42158 1.66088C3.65891 1.66621 4.62424 2.00488 4.95491 2.13555C7.56291 3.14888 13.0802 6.82355 15.1069 8.98355C15.2882 9.17821 15.7869 9.70088 15.8696 9.80755C16.0589 10.0475 16.1522 10.3382 16.1522 10.6315C16.1522 10.9035 16.0696 11.1809 15.8989 11.4129C15.8109 11.5329 15.3016 12.0662 15.1336 12.2449Z" fill="white" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
        <img className="block w-full rounded object-cover" src="produto.jpg" alt=""  />
      </div>
            </div>
          </div>
          <div className="text-center"><a className="inline-block w-full sm:w-auto px-20 py-4 text-center font-medium bg-zinc-700 hover:bg-orange-600 text-white rounded transition duration-250" href="#" >Baixar seu {data.name}</a></div>
        </div>
      </div>




    <Footer></Footer>
    </>
  );
}
