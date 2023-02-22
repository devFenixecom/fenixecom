import ActiveLink from "./ActiveLink";


export function MegaMenu() {



  return (
    <>


      {/* OPEN MEGA MENU */}
      <nav className="hidden md:block">
        <ul className=" flex items-center justify-between">
          <li className="relative group px-3 py-2 cursor-pointer hover:scale-105 transition-all">
            <button className="hover:opacity-50 cursor-default text-zinc-600 ">Produtos</button>
            <div className="absolute top-0 -left-2 transition group-hover:translate-y-5 translate-y-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-500 ease-in-out group-hover:transform z-50 min-w-[200px] transform">
              <div className="relative top-6 p-6 bg-zinc-900 rounded-xl shadow-xl w-full">
                <div className="w-10 h-10 bg-zinc-900 transform rotate-45 absolute top-0 z-0 -translate-x-4 transition-transform group-hover:translate-x-3 duration-500 ease-in-out rounded-sm">
                </div>
                <div className="relative z-10">
                  <ul className="text-[15px]">
                    <li>
                    <ActiveLink activeClassName="active" className="text-gray-600 hover:text-gray-800 py-1 block font-normal" href="/dashboard">
                    Tema Fênix
        </ActiveLink>
      
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>

         
          <li className="relative group px-3 py-2 text-zinc-600 cursor-pointer hover:scale-105 transition-all">
          <ActiveLink activeClassName="active" className="nav-link" href="/licenses">
          Licenças
        </ActiveLink>
        
          </li>
        </ul>
      </nav>
      {/* CLOSE MEGA MENU */}





    </>
  )
}

