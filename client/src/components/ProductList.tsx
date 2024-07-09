import { useQuery } from '@tanstack/react-query'
import { getProducts, Product } from '../services/products'

export default function ProductList() {
  console.log("🚀 ~ ProductList ~ ProductList Rerender")
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <div className='container'>
      <h1 className='my-4 text-center'>제품목록</h1>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}
      {isFetching && <p>Fetching...</p>}
      {data && (
        <>
          <div className='flex items-center gap-2 px-2 py-2 border-b border-b-gray-500'>
            <p className='w-[100px] text-center'>ID</p>
            <p className='flex-1 text-center'>Name</p>
            <p className='w-[40px] text-center'>Price</p>
            <p className='w-[40px] text-center'>Quantity</p>
          </div>
          {data?.map((product: Product) => (
            <div
              key={product.id}
              className='flex items-center gap-2 px-2 py-2 border-b'
            >
              <p className='w-[100px] text-center'>{product.id}</p>
              <p className='flex-1'>{product.name}</p>
              <p className='w-[40px] text-right'>
                {product.price?.toLocaleString()}
              </p>
              <p className='w-[40px] text-right'>
                {product.quantity?.toLocaleString()}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
