import Image from 'next/image';
import logo from '../../public/assets/logo.png';
import connectWalletIcon from '../../public/assets/metamask-icon.svg';

const Navbar = () => {
  return (
    <div className="bg-blue-950 navbar fixed top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center h-20 px-4 2xl:px-16">
        <a>
          <Image
            src={logo}
            alt='/'
            width='125'
            height='50'
            className='cursor-pointer'
          />
        </a>
        <ul className="flex items-center space-x-8">
          <li>
            <a href='/' className="text-sm text-white">Início</a>
          </li>
          <li>
            <a href='/#services' className="text-sm text-white">Serviços</a>
          </li>
          <li>
            <a href='/#about' className="text-sm text-white mr-72">Como funciona</a>
          </li>
          <button className="py-3 px-8 flex items-center gap-1 bg-blue-900 border border-gray-200 rounded-full">
            <li>
              <Image
                src={connectWalletIcon}
                alt='Logar com a Metamask'
                width='30'
                height='30'
                className='cursor-pointer'
              />
            </li>
            <li>
              <a href='#' className="text-sm text-white" target='_blank' rel='noreferrer'>Logar com a Metamask</a>
            </li>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
