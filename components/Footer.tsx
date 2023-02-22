

export function Footer() {


    return (
        <>
            <footer className="">
                    <div className="container max-w-xl p-6  mx-auto  lg:px-8 lg:max-w-7xl">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-center sm:text-5xl dark:text-gray-50">Precisa de ajuda?</h2>

                        <div className="flex pt-6 flex-col items-center text-center">

                            <a
                                href="https://ajuda.fenixecom.com"
                                aria-label=""
                            >

                                <button className="bg-transparent duration-700  font-extralight text-zinc-300  mt-5 hover:text-zinc-300 py-3 px-7 border border-zinc-800 hover:border-zinc-700 rounded-full">
                                    Acesse nossa central de ajuda
                                </button>
                            </a>

                        </div>

                    </div>


                </div>


                <div className="container px-6 py-8 mx-auto">


                    <hr className="my-10 border-zinc-900 dark:border-zinc-900" />
                    <div className="flex flex-col items-center sm:flex-row sm:justify-between">
                        <div className="flex justify-center ...">

                            <div>   <img
                                className=" flex justify-center z-50  w-10"
                                src="logo-footer.svg"
                                alt=""
                            /></div>
                        </div>
                        <p className="text-sm text-gray-500">© Copyright 2023. All Rights Reserved.</p>
                        <div className="flex mt-3 -mx-2 sm:mt-0">
                            <a href="#" className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit"> Termos  </a>
                            <a href="#" className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit"> Politica </a>
                            <a href="#" className="mx-2 text-sm text-gray-500 transition-colors duration-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit"> Contato </a>
                        </div>
                    </div>
                </div>

            </footer>

        </>
    )
}
