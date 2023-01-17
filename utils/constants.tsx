import { BiFootball } from 'react-icons/bi';
import { GiPistolGun, GiBroadsword, GiRayGun, GiWoodAxe, GiJetPack, GiPoliceTarget } from 'react-icons/gi';
import { FaParachuteBox } from 'react-icons/fa';
import GTALogo from './gta-grand-theft-auto-logo-svgrepo-com.svg';
import FIFALogo from './fifa-23-logo-alt-2.png';
import CSLogo from './counter-strike-svgrepo-com.svg';
import RLLogo from './rocket-league-logo-B8DD38497D-seeklogo.com.png';
import PUBGLogo from './pubg-1-logo-svgrepo-com.svg';
import APEXLogo from './apex-legends-symbol-logos-2.png';
import RUSTLogo from './771-7714850_madplaysrustxd-com-teamspeak-3-icons-rust.png';
import ValorantLogo from './valorant-logo-1.png';
import Image from 'next/image';

export const topics = [
  {
    name: 'Counter-Strike',
    icon: <Image 
            src={CSLogo}
            width={25}
            height={25}
            alt='GTA'
          />,
  },
  {
    name: 'Valorant',
    icon: <Image 
            src={ValorantLogo}
            width={28}
            height={28}
            alt='GTA'
          />,
  },
  {
    name: 'Rust',
    icon: <Image 
            src={RUSTLogo}
            width={25}
            height={25}
            alt='GTA'
          />,
  },
  {
    name: 'FIFA 23',
    icon: <Image 
            src={FIFALogo}
            width={38}
            height={38}
            alt='GTA'
          />,
  },
  {
    name: 'Apex Legends',
    icon: <Image 
            src={APEXLogo}
            width={24}
            height={24}
            alt='GTA'
          />,
  },
  {
    name: 'Rocket League',
    icon: <Image 
            src={RLLogo}
            width={40}
            height={40}
            alt='GTA'
          />,
  },
  {
    name: 'Grand Theft Auto V',
    icon: <Image 
            src={GTALogo}
            width={30}
            height={30}
            alt='GTA'
          />,
  },
  {
    name: 'PUBG',
    icon: <Image 
            src={PUBGLogo}
            width={30}
            height={30}
            alt='GTA'
          />,
  },
];