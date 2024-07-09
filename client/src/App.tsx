import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductList from './components/ProductList'
import ProductView from './components/ProductView'
import ProductAdd from './components/ProductAdd'
import ProductEdit from './components/ProductEdit'

export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <div className='w-full h-full p-4 grid place-items-center grid-cols-2 gap-4 max-w-[1024px] mx-auto'>
        <ProductList />
        <ProductView />
        <ProductAdd />
        <ProductEdit />
      </div>
    </QueryClientProvider>
  )
}
