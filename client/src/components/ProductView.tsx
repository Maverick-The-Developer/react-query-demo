import { useState } from 'react'
import { getProductById } from '../services/products'
import { useQuery } from '@tanstack/react-query'

export default function ProductView() {
  const [product_id, setProduct_id] = useState('')
  const [showProductDetail, setShowProductDetail] = useState(false)
  const showProduct = () => {
    setShowProductDetail(true)
  }
  return (
    <div className='container'>
      <h1 className='my-4 text-center'>제품 상세</h1>
      <label>
        <span>제품 ID</span>
        <input
          className='mx-4 border-b w-20 border-b-black'
          type='text'
          name='product_id'
          value={product_id}
          onChange={(e) => {
            setShowProductDetail(false)
            setProduct_id(e.target.value)
          }}
        />
        <button
          className='border border-gray-500 rounded py-1 px-2'
          onClick={() => showProduct()}
        >
          조회
        </button>
      </label>
      {showProductDetail && <ProductDetail id={product_id} />}
    </div>
  )
}

function ProductDetail({ id }: { id: string }) {
  console.log("🚀 ~ ProductDetail ~ ProductDetail Rerender!!!")
  const { data, isError, isLoading, isFetching  } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
  })
  if (isError) return <p>자료를 찾을 수 없습니다.</p>
  if (isLoading) return <p>Loading...</p>
  if (isFetching) return <p>Fetching...</p>
  if (data === null) return <p>자료를 찾을 수 없습니다.</p>
  return (
    <div className='p-4'>
      <div className='flex items-center gap-4'>
        <p className='w-[50px] text-right'>ID:</p> <p>{data?.id}</p>
      </div>
      <div className='flex items-center gap-4'>
        <p className='w-[50px] text-right'>제품명:</p> <p>{data?.name}</p>
      </div>
      <div className='flex items-center gap-4'>
        <p className='w-[50px] text-right'>가격:</p> <p>{data?.price.toLocaleString()}</p>
      </div>
      <div className='flex items-center gap-4'>
        <p className='w-[50px] text-right'>수량:</p> <p>{data?.quantity.toLocaleString()}</p>
      </div>
    </div>
  )
}
