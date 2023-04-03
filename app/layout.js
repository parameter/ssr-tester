import Link from 'next/link';
import Nav from '@/components/Layout/Nav';
import '@/styles/globals.css';
import { AppProvider } from 'context/app-context';
import HeadComp from '@/components/Layout/Head';
import Footer from '@/components/Layout/Footer';
import CookieConsent from '@/components/CookieConsent/cookieConsent';
import InjectedScripts from '@/components/CookieConsent/injectedScripts';
import ServerPageWrapper from '@/components/Layout/ServerPageWrapper';

export default function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <head>
        <HeadComp />
      </head>
      <body>
         <AppProvider>
            <ServerPageWrapper>
              <Nav params={params} /> 
            </ServerPageWrapper>
            <main>{children}</main>
            <Footer>
              {/* <CookieConsent /> */}
              {/* <InjectedScripts /> */}
          </Footer>
         </AppProvider> 
      </body>
    </html>
  );
}
