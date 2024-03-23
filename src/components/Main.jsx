import React from 'react';

const Main = () => {
  return (
    <div id='home' className='w-full min-h-screen text-center bg-white pt-16'>
      <div className='max-w-6xl mx-auto p-6 flex flex-col justify-center items-center mt-16'>
        <h1 className='text-7xl font-regular text-black mb-6'>
          Venha Sair do Zero
        </h1>
        <p className='max-w-screen-sm text-black text-lg mb-8'>
          Utilizando smart contracts, proporcionamos uma plataforma inovadora para você se conectar com freelancers que valorizam eficiência, transparência e segurança em suas colaborações.
        </p>
        <a href="../../src/app/projectDetails/page">
          <button className='py-3 px-8 text-white bg-gradient-to-r from-blue-950 to-sky-900 rounded-full'>
            Procure Serviços
          </button>
        </a>
      </div>
    </div>
  );
};

export default Main;
