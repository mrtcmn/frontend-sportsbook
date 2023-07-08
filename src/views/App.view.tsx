import React, { createContext, useState } from 'react';
import '../../assets/styles/main.sass';
import MainFixtureView from '@src/views/MainFixture.view';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const BasketContext = createContext(null);
const AppView = () => {
  const [basketItems, setBasketItems] = useState([]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BasketContext.Provider
        value={{
          basketItems,
          setBasketItems,
        }}
      >
        <main>
          <MainFixtureView></MainFixtureView>
        </main>
      </BasketContext.Provider>
    </QueryClientProvider>
  );
};

export default AppView;
