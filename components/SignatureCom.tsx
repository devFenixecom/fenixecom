export const SignatureCom = () => {
    return (
      

        <section  className="py-32  overflow-hidden">
        <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center -m-6">
                <div className="w-full md:w-1/3 p-8">
                    <div className="max-w-lg">
                        <h2 className="mb-5 font-heading font-bold text-4xl sm:text-3xl text-white" >Assinatura</h2>
                        <p className="mb-11 text-gray-400 text-base" >Informações sobre sua assinatura atual</p>

                    </div>
                </div>
                <div className="w-full md:w-1/2 p-6">
                    <div className="md:max-w-lg ml-auto">
                        <a href="#">
                            <div className="mb-5 p-px bg-gradient-cyan rounded-md">
                                <div className="p-4 bg-zinc-900 rounded-md">
                                    <div className="flex flex-wrap justify-between -m-3">
                                        <div className="w-auto p-3">
                                            <div className="flex flex-wrap items-center -m-3">
                                                <div className="w-auto p-3">
                                                   
                                                </div>
                                                <div className="w-auto p-3">
                                                    <h3 className="mb-1 font-heading font-medium text-white text-xl" >Plano Atual</h3>
                                                    <p className="text-gray-400 text-base" >Expira em: 26/10/2023</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-auto p-3">
                                            <span> <p className="flex font-heading p-10 px-3 py-1.5 font-semibold text-xs text-zinc-300 bg-zinc-800 tracking-px  rounded-full" >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="11" viewBox="0 0 19 11" fill="none">
                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5544 10.0757H1.86944C1.3466 10.0757 0.998047 9.73123 0.998047 9.21452V1.46399C0.998047 0.775054 1.86944 0.258351 2.39227 0.775053L5.87783 3.5308L9.01483 0.258351C9.36339 -0.0861171 9.88622 -0.0861171 10.2348 0.258351L13.3718 3.5308L16.8573 0.775053C17.3802 0.258351 18.2516 0.775054 18.2516 1.46399V9.21452C18.4258 9.73123 18.0773 10.0757 17.5544 10.0757Z" fill="#00E7F9" />
                                                </svg>
                                                Premium</p></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>

                        <div className="group relative">

                            <button className="p-1 w-full font-heading font-semibold text-xs text-zinc-700  hover:text-zinc-200 uppercase tracking-px overflow-hidden rounded-md">
                                <div className="relative px-9 py-5 bg-transparent border border-zinc-700 hover:border-zinc-600 overflow-hidden rounded-md">
                                    <p className="relative z-10" >Dúvida sobre sua assinatura?</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


    );
  };