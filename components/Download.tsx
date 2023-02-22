import useSWR from 'swr';
import axios from 'axios';

import { useRouter } from 'next/router';

export const Download = () => {
  const router = useRouter();
  const { name } = router.query;
  const { data, error } = useSWR<any>(`/api/theme/fenix`, async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  });

  if (error) return <div>Falha ao carregar</div>;
  if (!data) return <div></div>;


  return (

    <div className="container mx-auto p-8 rounded shadow-xl sm:p-16">
      <div className="flex flex-col lg:flex-row pt-20 ">
        <div className="mb-6 lg:mb-0 lg:w-2/2 lg:pr-5">
          <img className="h-25 " src="bg-macbook.jpg"></img>
        </div>
        <div className="lg:w-1/2">
          <span className=" text-4xl md:text-5xl lg:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r  to-red-600 from-orange-500">
            Tema Fênix 2.0</span>

          <p className="mb-4 pt-5 font-extralight text-base text-zinc-500">
          {data.description}

          </p>

          <p className="mb-4 font-extralight text-base text-zinc-500">

          </p> <div className="flex pt-5 flex-col mt-4 sm:flex-row sm:items-center ">

            <div className='flex items-center pb-5'>
              <div className='px-4'>
                <a href="/licenses">
                  <svg className=" text-orange-600 hover:text-orange-300 hover:animate-bounce-none animate-bounce shadow-lg shadow-orange-600/30  duration-200" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 485.017 485.017" >
                    <g>
                      <path d="M361.205,68.899c-14.663,0-28.447,5.71-38.816,16.078c-21.402,21.403-21.402,56.228,0,77.631   c10.368,10.368,24.153,16.078,38.815,16.078s28.447-5.71,38.816-16.078c21.402-21.403,21.402-56.228,0-77.631   C389.652,74.609,375.867,68.899,361.205,68.899z M378.807,141.394c-4.702,4.702-10.953,7.292-17.603,7.292   s-12.901-2.59-17.603-7.291c-9.706-9.706-9.706-25.499,0-35.205c4.702-4.702,10.953-7.291,17.603-7.291s12.9,2.589,17.603,7.291   C388.513,115.896,388.513,131.688,378.807,141.394z" />
                      <path d="M441.961,43.036C414.21,15.284,377.311,0,338.064,0c-39.248,0-76.146,15.284-103.897,43.036   c-42.226,42.226-54.491,105.179-32.065,159.698L0.254,404.584l-0.165,80.268l144.562,0.165v-55.722h55.705l0-55.705h55.705v-64.492   l26.212-26.212c17.615,7.203,36.698,10.976,55.799,10.976c39.244,0,76.14-15.282,103.889-43.032   C499.25,193.541,499.25,100.325,441.961,43.036z M420.748,229.617c-22.083,22.083-51.445,34.245-82.676,34.245   c-18.133,0-36.237-4.265-52.353-12.333l-9.672-4.842l-49.986,49.985v46.918h-55.705l0,55.705h-55.705v55.688l-84.5-0.096   l0.078-37.85L238.311,208.95l-4.842-9.672c-22.572-45.087-13.767-99.351,21.911-135.029C277.466,42.163,306.83,30,338.064,30   c31.234,0,60.598,12.163,82.684,34.249C466.34,109.841,466.34,184.025,420.748,229.617z" />
                    </g>
                  </svg></a>
              </div>
              <a href={data.theme}>
              <button
                className="z-45 px-4 mr-4 w-full duration-700  sm:w-full inline-block h-10 border border-zinc-600 hover:border-zinc-700   text-xs
                 text-center font-semibold leading-normal text-green-50 bg-transparent  rounded-full transition ">
                BAIXAR TEMA
              </button></a>

            <a href="https://tema.fenixecom.com/">
                  <div className="flex items-center justify-center w-10 h-10 border border-zinc-800  rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.0" width="20px"  className="text-fenix duration-300 hover:text-zinc-600"  height="auto" viewBox="0 0 1280.000000 755.000000" preserveAspectRatio="xMidYMid meet">
                  <g transform="translate(0.000000,755.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                    <path d="M6085 7544 c-280 -20 -371 -28 -500 -45 -1333 -173 -2702 -778 -3954 -1747 -706 -547 -1342 -1222 -1542 -1638 -106 -220 -116 -379 -32 -527 135 -240 665 -809 1193 -1283 890 -797 1896 -1440 2860 -1826 614 -246 1197 -391 1830 -454 241 -25 850 -25 1095 0 776 77 1496 289 2262 668 851 420 1700 1032 2464 1776 457 444 903 961 1006 1166 35 69 35 73 30 161 -10 181 -99 338 -388 686 -122 146 -588 617 -774 780 -720 634 -1441 1125 -2215 1508 -885 439 -1720 685 -2585 761 -121 11 -657 21 -750 14z m695 -704 c785 -69 1554 -300 2370 -710 977 -490 1957 -1234 2669 -2025 79 -88 231 -279 231 -290 0 -28 -328 -400 -571 -649 -1429 -1464 -3087 -2354 -4574 -2456 -88 -6 -205 -14 -260 -19 -106 -8 -381 1 -605 19 -1532 125 -3178 986 -4704 2460 -217 210 -606 641 -606 672 0 36 191 290 357 474 659 734 1686 1478 2653 1922 795 365 1529 559 2315 612 152 10 560 5 725 -10z" />
                    <path d="M6175 5909 c-610 -99 -1089 -390 -1436 -872 -179 -250 -290 -518 -346 -837 -26 -149 -26 -530 0 -680 39 -223 96 -397 192 -586 260 -514 730 -895 1310 -1063 741 -214 1557 9 2105 575 141 145 276 331 315 432 23 61 35 153 29 218 -6 54 -2 73 30 165 105 295 138 585 101 886 -75 605 -440 1162 -963 1470 -251 148 -541 246 -831 282 -122 16 -436 22 -506 10z" />
                  </g>
                </svg>
              </div>
              </a>

            </div>

          </div>



          <div className="lg:py-6 pt-0 lg:pr-16">
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border border-zinc-800 rounded-full">
                    <svg
                      className="w-4 text-gray-600"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <line
                        fill="none"
                        strokeMiterlimit="10"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                      />
                      <polyline
                        fill="none"
                        strokeMiterlimit="10"
                        points="19,15 12,22 5,15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-px h-full bg-zinc-800" />
              </div>
              <div className="pt-1 pb-8">
                <p className="mb-2 text-sm font-bold text-zinc-200">Passo 1</p>
                <p className="text-zinc-700">
                  Baixe o tema
                </p>
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border border-zinc-800 rounded-full">
                    <svg
                      className="w-4 text-zinc-600"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                    >
                      <line
                        fill="none"
                        strokeMiterlimit="10"
                        x1="12"
                        y1="2"
                        x2="12"
                        y2="22"
                      />
                      <polyline
                        fill="none"
                        strokeMiterlimit="10"
                        points="19,15 12,22 5,15"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-px h-full bg-zinc-800" />
              </div>
              <div className="pt-1 pb-8">
                <p className="mb-2 text-sm font-bold text-zinc-200">Passo 2</p>
                <p className="text-zinc-700">
                  Configure sua licença
                </p>
              </div>
            </div>


            <div className="flex">
              <div className="flex flex-col items-center mr-4">
                <div>
                  <div className="flex items-center justify-center w-10 h-10 border border-zinc-800   rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                      <path d="M4 11.9999V8.43989C4 4.01989 7.13 2.2099 10.96 4.4199L14.05 6.1999L17.14 7.9799C20.97 10.1899 20.97 13.8099 17.14 16.0199L14.05 17.7999L10.96 19.5799C7.13 21.7899 4 19.9799 4 15.5599V11.9999Z"
                        stroke="#fff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pt-1">
                <a href='https://ajuda.fenixecom.com/pt-br/article/como-instalar-o-tema-fenix-1qvx9oi/'>
                <p className="mb-2 text-sm font-bold duration-700 hover:text-orange-700 text-zinc-200 ">Veja o tutorial</p></a>
                <p className=" text-zinc-200" />
              </div>
            </div>
          </div>

        </div>



      </div>
    </div>



  );
};