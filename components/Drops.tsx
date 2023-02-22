import React, { useState } from 'react';
import ActiveLink from './ActiveLink';
import LogoutButton from './LogoutButton';

export function Drops() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative inline-block text-left">
        <div>
          <button
            type="button"
            className="bg-transparent  flex items-center justify-center w-full "

            onClick={() => setIsOpen(!isOpen)}
          >
            <svg width="15" height="15" fill="#fff" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"
              className={isOpen ? 'duration-500 rotate-180  hover:text-emerald-400' : ''}>
              <path d="M1408 704q0 26-19 45l-448 448q-19 19-45 19t-45-19l-448-448q-19-19-19-45t19-45 45-19h896q26 0 45 19t19 45z"></path>
            </svg>
          </button>
        </div>
        {isOpen && (
          <div className="absolute right-0 w-56 mt-5  origin-top-right bg-zinc-900 rounded-md shadow-lg  ring-1 ring-black ring-opacity-5">
            <div className="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <ActiveLink activeClassName="active" className="block  px-4 py-2 text-zinc-500  font-normal hover:opacity-80 " href="/profile">
                <span className="flex flex-col">
                  Editar perfil
                </span>   </ActiveLink>


              <a href="#" className="block  px-4 py-2 text-zinc-500 font-normal  hover:opacity-80" role="menuitem">
                <span className="flex flex-col">
                  <LogoutButton></LogoutButton>
                </span>
              </a>
            </div>
          </div>)}
      </div>

    </>
  );
}
