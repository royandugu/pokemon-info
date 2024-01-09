import { QueryClientProvider, QueryClient } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import ContextState from './components/context/contextState.tsx';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './index.css'

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        retry: false
      },
    },
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ContextState>
          <App />
        </ContextState>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
