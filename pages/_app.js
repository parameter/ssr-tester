import Nav from '@/components/Layout/Nav';
import { AppProvider } from 'context/app-context';
import { RequestProvider } from 'context/request-context';
import { SupplierProvider } from 'context/supplier-context';
import '@/styles/globals.css';
import { DeliveryProvider } from 'context/delivery-context';

export default function PagesApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <RequestProvider>
          <DeliveryProvider>
        <SupplierProvider>
          <Nav />
          <Component {...pageProps} />
        </SupplierProvider>
          </DeliveryProvider>
      </RequestProvider>
    </AppProvider>
  );
}
