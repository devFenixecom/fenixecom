import React, { useState } from 'react';

const ModalSalle = () => {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>

      <div className='flex items-center pb-5'>
        <div className='px-4'>
          <svg className=" text-zinc-400 " xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="20px" width="20px" version="1.1" id="Layer_1" viewBox="0 0 485.017 485.017" >
            <g>
              <path d="M361.205,68.899c-14.663,0-28.447,5.71-38.816,16.078c-21.402,21.403-21.402,56.228,0,77.631   c10.368,10.368,24.153,16.078,38.815,16.078s28.447-5.71,38.816-16.078c21.402-21.403,21.402-56.228,0-77.631   C389.652,74.609,375.867,68.899,361.205,68.899z M378.807,141.394c-4.702,4.702-10.953,7.292-17.603,7.292   s-12.901-2.59-17.603-7.291c-9.706-9.706-9.706-25.499,0-35.205c4.702-4.702,10.953-7.291,17.603-7.291s12.9,2.589,17.603,7.291   C388.513,115.896,388.513,131.688,378.807,141.394z" />
              <path d="M441.961,43.036C414.21,15.284,377.311,0,338.064,0c-39.248,0-76.146,15.284-103.897,43.036   c-42.226,42.226-54.491,105.179-32.065,159.698L0.254,404.584l-0.165,80.268l144.562,0.165v-55.722h55.705l0-55.705h55.705v-64.492   l26.212-26.212c17.615,7.203,36.698,10.976,55.799,10.976c39.244,0,76.14-15.282,103.889-43.032   C499.25,193.541,499.25,100.325,441.961,43.036z M420.748,229.617c-22.083,22.083-51.445,34.245-82.676,34.245   c-18.133,0-36.237-4.265-52.353-12.333l-9.672-4.842l-49.986,49.985v46.918h-55.705l0,55.705h-55.705v55.688l-84.5-0.096   l0.078-37.85L238.311,208.95l-4.842-9.672c-22.572-45.087-13.767-99.351,21.911-135.029C277.466,42.163,306.83,30,338.064,30   c31.234,0,60.598,12.163,82.684,34.249C466.34,109.841,466.34,184.025,420.748,229.617z" />
            </g>
          </svg>
        </div>
        <button
          className="z-45 inline-block h-10 border   border-zinc-500 hover:border-zinc-400  px-4 text-xs text-center font-semibold leading-normal text-green-50 bg-transparent  rounded-full transition duration-200"
          onClick={() => setIsOpen(true)}
        >
          Adicionar mais
        </button></div>
      {isOpen && (

        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-75 p-10 flex items-center justify-center "
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}>

          <div className="bg-white p-10 text-center rounded">
            <h3 className="text-lg text-zinc-900 font-medium">Compre sua licença adicional </h3>
            <h3 className="text-mg text-zinc-900 "> preço exclusivo para clientes</h3>
<a href='https://pay.kiwify.com.br/s3JnZFT'>
            <button className="w-full duration-500 h-12 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded mt-4" type="submit">
              Adquirir Agora
            </button></a>

          </div>
        </div>
      )}
    </>
  );
};

export default ModalSalle;