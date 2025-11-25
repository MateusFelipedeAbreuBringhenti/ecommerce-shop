import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvide } from './cases/auth/contexts/auth.context.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
 <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvide>
        <App />
      </AuthContextProvide>
    </QueryClientProvider>
  </BrowserRouter>,
)