import { useRouter } from 'next/router';
import useSWR from 'swr';


interface theme {
  _id: string;
  isActive: boolean;
  name: string;
  description : string;
}


export const List = () => {
  
  const router = useRouter();
  const { data, error } = useSWR('/api/user/themes', async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  });

  if (error) return <div>Failed to load theme</div>;
  if (!data) return <div>Loading...</div>;

  const { theme } = data;
    
    return (
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">

{/* 
<div className="w-full sm:w-2/3 px-4">
                <div className="max-w-xl">
                  <div className="relative block px-3 w-full text-sm text-gray-50 placeholder-gray-50 font-medium border border-zinc-800 hover:border-zinc-500 focus-within:border-zinc-500 rounded-lg">
                    <span className="absolute top-1/2 right-0 mr-5 transform -translate-y-1/2">
                      <svg width={12} height={8} viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" data-config-id="auto-svg-2-1">
                        <path d="M10.9999 1.16994C10.8126 0.983692 10.5591 0.87915 10.2949 0.87915C10.0308 0.87915 9.77731 0.983692 9.58995 1.16994L5.99995 4.70994L2.45995 1.16994C2.27259 0.983692 2.01913 0.87915 1.75495 0.87915C1.49076 0.87915 1.23731 0.983692 1.04995 1.16994C0.95622 1.26291 0.881826 1.37351 0.831057 1.49537C0.780288 1.61723 0.75415 1.74793 0.75415 1.87994C0.75415 2.01195 0.780288 2.14266 0.831057 2.26452C0.881826 2.38638 0.95622 2.49698 1.04995 2.58994L5.28995 6.82994C5.38291 6.92367 5.49351 6.99807 5.61537 7.04883C5.73723 7.0996 5.86794 7.12574 5.99995 7.12574C6.13196 7.12574 6.26267 7.0996 6.38453 7.04883C6.50638 6.99807 6.61699 6.92367 6.70995 6.82994L10.9999 2.58994C11.0937 2.49698 11.1681 2.38638 11.2188 2.26452C11.2696 2.14266 11.2957 2.01195 11.2957 1.87994C11.2957 1.74793 11.2696 1.61723 11.2188 1.49537C11.1681 1.37351 11.0937 1.26291 10.9999 1.16994Z" fill="#3D485B" />
                      </svg>
                    </span>
                    <select className="w-full py-4 appearance-none bg-transparent outline-none" id="formInput1-6" name data-config-id="auto-input-7-1">
                    {Theme.map((themes) => (
                       <option className="bg-gray-500" value={1}>{themes.name}</option>
                       ))}
                      </select>
                  </div>
                </div>
              </div> **/}



        <div className="flex flex-col mb-6 lg:justify-between lg:flex-row md:mb-8">
        
         </div>
        <div className="grid gap-6 row-gap-5 mb-8 lg:grid-cols-3 sm:row-gap-6 sm:grid-cols-2">
        
       
          <a href="" aria-label="View Item" key="">
            <div className="relative overflow-hidden transition duration-200 transform rounded shadow-lg hover:-translate-y-2 hover:shadow-2xl">
              <img
                className="object-cover w-full"
                src="https://app.orbeecom.com/storage/6/posts/1uF84QJ6elTUHn7zYSFMIZrLwCffw6feyLCjOoF8.jpg"
                alt=""
              />
              <div className="absolute inset-0 px-6 py-4 transition-opacity duration-200 bg-black bg-opacity-75 opacity-0 hover:opacity-100">
                <p className="mb-4 text-lg font-bold text-gray-100">{data.name}</p>
                <p className="text-sm tracking-wide text-gray-300">
                {data.description}
                </p>
              </div>
            </div>
          </a>



        </div>
        <div className="text-center">
         {/**  <a
            href="/"
            aria-label=""
            className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
          >
           Ver mais
            <svg
              className="inline-block w-3 ml-2"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
            </svg>
        </a> */}
        </div>
      </div>
    );
  };