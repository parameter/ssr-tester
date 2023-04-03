'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Hamburger from 'hamburger-react';
import RadioButtonsMenu from '@/components/StartPage/navbar/RadioButtonsMenu';
import Link from 'next/link';
import useMediaQuery from '@/lib/start-page-hooks/useMediaQuery';
import MenuOverlay from '@/components/StartPage/navbar/MenuOverlay';
import Switcher from '@/components/StartPage/navbar/Switcher';
import UserMenu from '@/components/Layout/UserMenu';
import LogoDesktop from '@/components/Layout/LogoDesktop';
import LogoMobile from '@/components/Layout/LogoMobile';
import { useCurrentUser } from '@/lib/user';
import { useAppContext } from 'context/app-context';
import { usePathname, useSearchParams } from 'next/navigation';
import MobileFooter from './MobileFooter';

import NavClientContent from '@/components/Layout/NavClientContent';

const mainMenuItems = [
  {
    text: 'Inköpare',
    path: '/hitta-byggvaror',
  },
  {
    text: 'Återförsäljare',
    path: '/bli-byggvaruhandlare',
  },
  {
    text: 'Åkare',
    path: '/leverera-byggvaror',
  }
];

const Navbar = () => {

  return (
    <>

      <NavClientContent />

      
    </>
  );
};

export default Navbar;
