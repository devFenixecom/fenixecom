import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Button } from './Button';
import { Input } from './Input';

interface License {
  _id: string;
}

type ModalProps = {
  license: License;
};


const Modal = ({ license }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [id] = useState(license._id);
  const [isLoading, setIsLoading] = useState(false);


  const [domain, setDomain] = useState('');
  const { data, error } = useSWR(`/api/user/license/${id}`, async (url) => {
    const res = await fetch(url);
    console.log(id)
    const data = await res.json();
    return data;
  });

  useEffect(() => {
    if (data) {
      setDomain(data.domain);

    }
  }, [data]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();


    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      router.push('/');
      return;
    }

    const res = await fetch(`/api/user/license/update`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, domain }),

    });
    console.log(id, domain)
    // Attempt login
    setIsLoading(true);

    const result = await res.json();
    console.log(result)
    if (result.error) {
      console.error(result.error);
      console.log(result);
    } else {

      console.log('Licença atualizada com sucesso');
      setTimeout(() => {
        setIsOpen(false);
        setIsLoading(false);
      }, 3000); // delay de 3 segundos
    }

  };
  return (
    <>



      <button
        className=" z-45 "
        onClick={() => setIsOpen(true)}
      >
        <svg className="text-zinc-700 duration-700  rotate-180 hover:text-zinc-300 z-60" version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="25" height="25" viewBox="0 0 1280.000000 1280.000000">

          <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)"
            fill="currentcolor" stroke="none">
            <path d="M5860 12792 c0 -4 -29 -174 -65 -377 -36 -204 -95 -541 -131 -750 -37 -209 -68 -381 -69 -383 -1 -1 -61 -14 -133 -27 -233 -45 -467 -108 -691 -187 -110 -38 -114 -39 -131 -21 -9 10 -225 268 -480 573 -255 305 -470 563 -480 573 -16 17 -38 5 -476 -248 -252 -146 -460 -269 -462 -274 -2 -5 115 -332 259 -727 l262 -717 -40 -36 c-289 -261 -333 -304 -614 -615 l-36 -39 -704 257 c-387 142 -714 258 -726 259 -19 2 -58 -61 -288 -457 -253 -438 -265 -460 -248 -476 10 -10 270 -228 578 -485 308 -257 566 -473 573 -479 10 -10 5-35 -27 -127 -85 -249 -141 -456 -185 -688 -14 -74 -27 -135 -28 -136 -2 -1 -174 -32 -383 -69 -209 -36 -546 -95 -750 -131 -203 -36 -373 -65 -377 -65 -4 0 -8 -243 -8 -540 0 -297 4 -540 8 -540 4 0 174 -29 377 -65 204 -36 541 -95 750 -131 209 -37 381 -68 383 -69 1 -1 14 -62 28 -136 44 -232 100 -439 185 -688 32 -92 37 -117 27 -127 -7 -6 -265 -222 -573 -479 -308 -257 -568 -475 -578 -485 -17 -16 -5 -38 248 -476 230 -396 269 -459 288 -457 12 1 339 117 726 259 l704 257 36 -39 c281 -311 325 -354 614 -615 l40 -36 -262 -717 c-144 -395 -261 -722 -259 -727 2 -5 210 -128 462 -274 438 -253 460 -265 476 -248 10 10 225 268 480 573 255 305 471 563 480 573 17 18 21 17 131 -21 224 -79 458 -142 691 -187 72 -13 132 -26 133 -27 1 -2 32 -174 69 -383 36 -209 95 -546 131 -750 36 -203 65 -373 65 -377 0 -4 242 -8 538 -8 l538 0 52 292 c28 161 88 502 133 758 44 256 82 466 84 468 1 1 69 16 151 32 254 50 420 94 673 181 92 32 117 37 127 27 6 -7 222 -265 479 -573 257 -308 475 -568 485 -578 16 -17 38 -5 476 248 252 146 460 269 462 274 2 7 -163 465 -465 1290 l-57 154 65 56 c217 190 384 356 570 570 l55 64 185 -67 c708 -260 1250 -456 1257 -456 5 0 94 147 198 327 103 181 223 388 266 462 63 108 76 137 66 146 -7 7 -267 225 -578 485 -311 260 -571 478 -578 484 -10 10 -5 35 27 127 84 246 150 491 191 712 12 64 26 117 30 117 4 0 227 38 496 85 269 47 604 106 744 130 140 25 258 45 262 45 5 0 8 243 8 540 0 297 -4 540 -8 540 -4 0 -172 29 -372 64 -201 35 -539 95 -752 132 l-387 68 -21 115 c-41 219 -107 465 -191 710 -32 92 -37 117 -27 127 7 6 267 224 578 484 311 260 571 478 578 485 10 9 -3 38 -66 146 -43 74 -163 281 -266 462 -104 180 -193 327 -198 327 -7 0 -549 -196 -1257 -456 l-185 -67 -55 64 c-186 214 -353 380 -570 570 l-65 56 57 154 c302 825 467 1283 465 1290 -2 5 -210 128 -462 274 -438 253 -460 265 -476 248 -10 -10 -228 -270 -485 -578 -257 -308 -473 -566 -479 -573 -10 -10 -35 -5 -127 27 -253 87 -419 131 -673 181 -82 16 -150 31 -151 32 -2 2 -40 212 -84 468 -45 256 -105 597 -133 758 l-52 292 -538 0 c-296 0 -538 -4 -538 -8z m745 -2616 c678 -24 1405 -277 1985 -690 767 -545 1301 -1351 1505 -2266 64 -289 86 -503 86 -820 0 -317 -22 -531 -86 -820 -301 -1354 -1321 -2437 -2655 -2819 -391 -112 -780 -156 -1211 -139 -1615 64 -3017 1172 -3467 2738 -112 388 -157 780 -140 1211 48 1205 686 2326 1703 2993 494 324 1039 522 1643 596 96 12 405 28 457 23 17 -1 98 -5 180 -7z" />
          </g>
        </svg>

      </button>
      {isOpen && (
        <div className="fixed z-50 top-0 left-0 w-full h-full bg-black bg-opacity-75 p-10 flex items-center justify-center"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setIsOpen(false);
            }
          }}>

          <div className="bg-white  p-10 rounded">
            <h3 className="text-lg py-5  text-zinc-800 font-medium">Configure seu dominio abaixo</h3>

            <div>

              {error && <div>Erro ao carregar licença</div>}
              {data && (
                <form onSubmit={handleSubmit}>
                  <div>

                    <input className="form-input text-zinc-800 py-3 px-4 block w-full border border-zinc-800  focus:border-red-800 bg-transparent eading-5 rounded-md transition duration-150 ease-in-out"
                      type="text"
                      placeholder="sualoja.myshopify.com"
                      id="domain"
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                    />
                  </div>
                  <br></br>


                  <button className="w-full duration-500  h-12 bg-black hover:bg-zinc-700 text-white py-2 px-4 rounded mt-4" type="submit" >
                    {isLoading ? (
                    
                      <svg width="20" height="20" fill="currentColor" className=" animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                        </path>
                        
                      </svg>

                    ) : (
                      "Salvar e sair"
                    )}
                  </button>


                </form>
              )}
            </div>


          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
