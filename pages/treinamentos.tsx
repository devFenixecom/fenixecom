
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';

import React, { useEffect, useState } from 'react';

export default function Dashboard() {

  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(prevTime => {
        const { days, hours, minutes, seconds } = prevTime
        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 }
        }
        if (minutes > 0) {
          return { ...prevTime, minutes: minutes - 1, seconds: 59 }
        }
        if (hours > 0) {
          return { ...prevTime, hours: hours - 1, minutes: 59, seconds: 59 }
        }
        if (days > 0) {
          return { ...prevTime, days: days - 1, hours: 23, minutes: 59, seconds: 59 }
        }
      })
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <>
      <Header />

      <section className="">
        <div className="container pt-40 flex flex-col items-center px-4 py-12 mx-auto text-center">
          <h2 className="max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
          O treinamento será liberado em breve
          </h2>
          <p className="max-w-4xl mt-6 text-center text-zinc-500">
          Neste momento, estamos passando por algumas atualizações e melhorias para garantir uma experiência ainda mais enriquecedora para você.
Aguardamos ansiosamente para compartilhar esse treinamento de alta qualidade com você em breve. Por favor, fique atento(a) ao seu e-mail para mais informações.
Agradecemos pela compreensão e paciência.
          </p>
          <div className="inline-flex w-full mt-6 sm:w-auto">
          <div className="flex flex-col items-center mt-10">
 
      <div className="flex mt-2">
        <div className="flex flex-col items-center text-3xl font-medium text-fenix mr-4">
          <p>{timeLeft.days}</p>
          <p className="text-sm text-gray-600">Dias</p>
        </div>
        <div className="flex flex-col items-center text-3xl font-medium text-fenix mr-4">
          <p>{timeLeft.hours}</p>
          <p className="text-sm text-gray-600">Horas</p>
        </div>
        <div className="flex flex-col items-center text-3xl font-medium text-fenix mr-4">
          <p>{timeLeft.minutes}</p>
          <p className="text-sm text-gray-600">Minutos</p>
        </div>
        <div className="flex flex-col items-center text-3xl font-medium text-fenix">
          <p>{timeLeft.seconds}</p>
          <p className="text-sm text-gray-600">Segundos</p>
        </div>
      </div>
    </div>
          </div>
        </div>
      </section>


     
      <Footer />
    </>
  );
};






