import { MegaMenu } from "./MegaMenu"
import { Menu } from "./Menu";

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Drops } from "./Drops";
import Head from 'next/head'
import ActiveLink from "./ActiveLink";

export function Header() {

  const router = useRouter();
  const { data, error } = useSWR('/api/user', async (url) => {
    const res = await fetch(url);
    if (res.status === 401) {
      localStorage.removeItem('access_token');
      router.push('/');
      return null;
    }
    const json = await res.json();
    return json;
  });

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      router.push('/');
    }
  }, []);

  if (error) return <div>Erro ao carregar</div>;
  if (!data) return <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
  <div className="w-50 h-50 opacity-50 rounded-full flex items-center justify-center">
  <svg width="40" height="40" fill="currentColor" className="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
        </path>
    </svg>  </div>
</div>;


  <Head>
    <script
      type="text/javascript"
      dangerouslySetInnerHTML={{
        __html: `
      window.$crisp=[];window.CRISP_WEBSITE_ID="d413c845-512a-4bf1-9cf8-a7a37b120916";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
      `
      }}

    />
  </Head>

  return (
    <>


      <div
        className=" bg-gradient-to-b z-50 from-black fixed left-0 right-0 border-b  border-b-zinc-800 "
      >
        <div className=" container   mx-auto flex px-5 sm:px-10 items-center justify-between">

          <a href="/dashboard">
            <div className=" h-20 flex items-center">

              <img
                className=" z-50  sm:hidden w-9"
                src="logo-mobile.svg"
                alt=""
              />

              <img
                className=" hidden sm:block z-50 cursor-pointer w-10 "
                src="logo-mobile.svg"
                alt=""
              />
            </div></a>

          <MegaMenu></MegaMenu>
          <div className="flex flex-row items-center gap-2 px-3 py-2 font-semibold  ">

            <div className="flex  ">

              <ActiveLink activeClassName="active" className="hover:opacity-60 px-2 cursor-default duration-300" href="/convite">

                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#f74400" version="1.1" id="Capa_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 87.607 87.607" xmlSpace="preserve">

                  <g id="Gift">
                    <g>
                      <path d="M84.299,22.202H60.246l5.496-2.723c0.322-0.154,0.617-0.368,0.874-0.625c2.024-2.026,3.139-4.727,3.139-7.593     c0-2.872-1.114-5.566-3.139-7.599c-4.183-4.182-10.978-4.182-15.159,0c-0.227,0.23-0.419,0.492-0.57,0.775L43.23,18.679     L35.574,4.438c-0.152-0.283-0.345-0.545-0.572-0.77c-4.179-4.192-10.978-4.192-15.156,0c-4.179,4.187-4.179,10.999,0,15.186     c0.254,0.257,0.551,0.471,0.871,0.625l5.496,2.723H3.307C1.481,22.202,0,23.688,0,25.516v19.672C0,47.017,1.481,48.5,3.307,48.5     h3.821v35.273c0,1.829,1.48,3.311,3.307,3.311h66.943c1.825,0,3.308-1.48,3.308-3.311V48.5h3.613     c1.826,0,3.309-1.481,3.309-3.312V25.516C87.605,23.688,86.125,22.202,84.299,22.202z M40.264,80.458V48.5h7.162v31.959H40.264z      M47.486,41.874h-7.159V28.832h7.159V41.874z M56.439,8.069c1.612-1.315,3.998-1.225,5.5,0.283     c0.775,0.775,1.203,1.808,1.203,2.909c0,0.94-0.312,1.834-0.893,2.562l-12.128,6.004L56.439,8.069z M24.521,8.352     c1.449-1.454,3.928-1.566,5.497-0.283l6.317,11.758l-12.127-6.004C22.928,12.208,23.032,9.844,24.521,8.352z M6.611,28.832     h27.102v13.042H6.611V28.832z M13.739,48.5h23.22v31.959h-23.22V48.5z M74.073,80.458H50.73V48.5h23.343V80.458z M80.995,41.874     H54.1V28.832h26.896V41.874z" />
                    </g>
                  </g>
                </svg>

              </ActiveLink>
            </div>

            <div className="flex flex-row items-center gap-2  px-3 py-2 bg-opacity-5 bg-white rounded-full">
              <ActiveLink activeClassName="active" className="hover:opacity-90 px-2 cursor-default relative block duration-300" href="/profile">
                <div className="flex items-center justify-center text-center bg-zinc-600 rounded-full text-white w-10 h-10">{data.avatar}</div>
              </ActiveLink>
              <span className="hidden sm:block font-medium text-zinc-200">
                {data.name}</span>
              <Drops></Drops></div>
            <Menu></Menu>
          </div>

        </div>
      </div>



    </>
  )
}

