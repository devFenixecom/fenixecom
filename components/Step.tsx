import { Button } from "./Button";

export function Step() {


    return (
        <>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">

      <h1 className="mb-4 text-4xl font-extrabold text-center text-gray-900 dark:text-white md:text-4xl lg:text-4xl">
          Trilha da alta performance </h1>

      <div className="relative">
  <div className="absolute h-60 w-14 -left-4 -top-4">
  <div className='cover-home1'></div>
  </div>
</div>


      
      <div className="grid max-w-2xl mx-auto">
        <div className="flex">
          <div className="flex flex-col items-center mr-6">
            <div className="w-px h-10 opacity-0 sm:h-full" />
            <div>
              <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full">
                1
              </div>
            </div>
            <div className="w-px h-full bg-gray-300" />
          </div>
          <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
            <div className="sm:mr-5">
              <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-zinc-900 sm:w-24 sm:h-24">
                <svg
                  className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-base">
              Aparência
              </p>
              <p className="text-sm text-zinc-600">
              Acesse sua conta do Shopify e vá para a guia "Aparência" no menu à esquerda.
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col items-center mr-6">
            <div className="w-px h-10 bg-gray-300 sm:h-full" />
            <div>
              <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full">
                2
              </div>
            </div>
            <div className="w-px h-full bg-gray-300" />
          </div>
          <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
            <div className="sm:mr-5">
              <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-zinc-900 sm:w-24 sm:h-24">
                <svg
                  className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-base">Personalizar</p>
              <p className="text-sm text-zinc-600">
              Clique em "Personalizar" para acessar o editor de temas.
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col items-center mr-6">
            <div className="w-px h-10 bg-gray-300 sm:h-full" />
            <div>
              <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full">
                3
              </div>
            </div>
            <div className="w-px h-full opacity-0" />
          </div>
          <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
            <div className="sm:mr-5">
              <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-zinc-900 sm:w-24 sm:h-24">
                <svg
                  className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
            </div>
            <div>
              <p className="text-xl font-semibold sm:text-base">Configurações gerais</p>
              <p className="text-sm text-zinc-600">
              Na barra lateral esquerda, clique em "Configurações gerais" e, em seguida, em "Geral". Aqui, você poderá editar o título e o subtítulo da loja. Depois de fazer as alterações, clique em "Salvar" para confirmá-las.
              </p>
            </div>
          </div>
        </div>
      </div>
<div className="text-center content-center">
      <Button>Quero meu premio</Button></div>
    </div>
</>
    )
}
