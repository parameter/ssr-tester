'use client';

import {
  useEffect,
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';
import axios from 'axios';

export const DeliveryContext = createContext({});

export const DeliveryProvider = ({children}) => {
    const [deliveries, setDeliveries] = useState([])
    const [myDeliveries, setMyDeliveries] = useState(null);

    const fetchDeliveries = useCallback(async () =>{
        const response = await axios.get("/api/delivery/get-deliveries")
        if(response.data.result === "success"){
            setDeliveries(response.data.myDeliveries)
        }
    }, []);

    useEffect(() =>{
        fetchDeliveries()
    }, [fetchDeliveries]);

    
  return(
      <DeliveryContext.Provider value={{ myDeliveries }}>
    {children}
  </DeliveryContext.Provider>
  )
  


};