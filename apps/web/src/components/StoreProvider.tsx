'use client';

import { AppStore, makeStore } from '@/redux/store';
import { ReactNode, useRef, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { persistStore, Persistor } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingComp from './loading';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>(makeStore());
  const [persistor, setPersistor] = useState<Persistor | null>(null);

  useEffect(() => {
    if (!persistor) {
      const persistorInstance = persistStore(storeRef.current);
      setPersistor(persistorInstance);
    }
  }, [persistor]);

  if (!persistor) {
    return <LoadingComp />;
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate persistor={persistor} loading={<LoadingComp />}>
        {children}
      </PersistGate>
    </Provider>
  );
}