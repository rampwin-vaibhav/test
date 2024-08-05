import React, {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ConfigurationKey } from '../types/enums';
import { useRouter } from 'next/router';
import ConfigurationService from '../helpers/services/configuration.service';

const Context = createContext<{
  dateFormat: string;
  dateTimeFormat: string;
  shoppingCartCount: number;
  setShoppingCartCount: (value: SetStateAction<number>) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: SetStateAction<boolean>) => void;
}>({
  dateFormat: 'DD/MM/YYYY',
  dateTimeFormat: 'DD/MM/YYYY HH:mm',
  shoppingCartCount: 0,
  setShoppingCartCount(value) {},
  isLoggedIn: false,
  setIsLoggedIn(value) {},
});

export function AppProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [dateTimeFormat, setDateTimeFormat] = useState('DD/MM/YYYY HH:mm');
  const [shoppingCartCount, setShoppingCartCount] = useState<number>(0);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const initialLoad = async () => {
      if (typeof window !== 'undefined') {
        const format = localStorage.getItem('DateFormat');
        const dateTimeFormat = localStorage.getItem('DateTimeFormat');
        if (!format || !dateTimeFormat) {
          const [date, time] = await Promise.all([
            ConfigurationService.fetchConfigurationValue(
              ConfigurationKey.DateFormat,
              router.locale
            ),
            ConfigurationService.fetchConfigurationValue(
              ConfigurationKey.DateTimeFormat,
              router.locale
            ),
          ]);
          localStorage.setItem('DateFormat', date.ConfigurationValue);
          localStorage.setItem('DateTimeFormat', time.ConfigurationValue);

          setDateFormat(date.ConfigurationValue);
          setDateTimeFormat(time.ConfigurationValue);
        } else {
          setDateFormat(format);
          setDateTimeFormat(dateTimeFormat);
        }
      }
    };
    initialLoad();
  }, [router.locale]);

  return (
    <Context.Provider
      value={{
        dateFormat,
        dateTimeFormat,
        shoppingCartCount,
        setShoppingCartCount,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useAppContext() {
  return useContext(Context);
}
