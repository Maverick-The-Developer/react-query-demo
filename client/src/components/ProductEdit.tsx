import { useEffect, useState } from 'react'
import { getProductById, Product, updateProduct } from '../services/products'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function ProductEdit() {
  console.log("🚀 ~ ProductEdit ~ ProductEdit Rerender")
  const [productId, setProductId] = useState('')
  const [product, setProduct] = useState<Product | null>(null)
  const getProduct = async () => {
    const productData = await getProductById(productId)

    if (productData) {
      setProduct({ ...productData })
    } else {
      setProduct(null)
      alert('제품을 찾을 수 없습니다.')
    }
  } // end of function getProduct

  return (
    <div className='container'>
      <h1 className='my-4 text-center'>제품 수정</h1>
      <label>
        <span>제품 ID</span>
        <input
          className='mx-4 border-b w-20 border-b-black'
          type='text'
          name='product_id'
          value={productId}
          onChange={(e) => {
            setProductId(e.target.value)
            setProduct(null)
          }}
        />
        <button
          className='border border-gray-500 rounded py-1 px-2'
          onClick={() => getProduct()}
        >
          불러오기
        </button>
      </label>
      {product !== null && (
      <ProductForm product={product} />
      )}
    </div>
  )
}

function ProductForm({ product }: { product: Product | null }) {
  const [productData, setProductData] = useState<Product | null>(product)

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (product: Product) => {
      const productId = product?.id || ''
      return updateProduct(productId, product)
    },
    onError: () => {
      alert('제품 수정에 실패했습니다.')
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['product', product?.id || ''],
      })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProductData((prev) => {
      if (prev === null) return null
      if (name === 'name') {
        return { ...prev, name: value }
      } else {
        return { ...prev, [name]: Number(value) }
      }
    })
  }

  const doEditProduct = () => {
    if (productData === null) return
    if (product === null) return
    if (product.id === '') return

    const editedOne: Product = {
      id: product?.id || '',
      name: productData?.name || '',
      price: productData?.price || 0,
      quantity: productData?.quantity || 0,
    }
    mutation.mutate(editedOne)
  }

  useEffect(() => {
      setProductData(product)
  }, [product])

  return (
    <div className='w-full flex flex-col gap-4 mt-8 '>
      <div className='w-full flex gap-4 items-center'>
        <p className='w-[50px] text-sm text-right'>제품명</p>
        <input
          className='border-b flex-1 border-b-black py-1'
          type='text'
          name='name'
          value={productData?.name || ''}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className='flex items-center'>
        <div className='w-1/2 flex gap-4 items-center'>
          <p className='w-[50px] text-sm text-right'>가격</p>
          <input
            className='text-right border-b flex-1 border-b-black pr-2'
            type='number'
            name='price'
            value={productData?.price || 0}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='w-1/2 flex gap-4 items-center'>
          <p className='w-[50px] text-sm text-right'>수량</p>
          <input
            className='text-right border-b flex-1 border-b-black pr-2'
            type='number'
            name='quantity'
            value={productData?.quantity || 0}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className='my-4 flex justify-center items-center gap-4'>
        <button
          className='border border-gray-500 rounded py-1 px-2'
          type='button'
          onClick={() => doEditProduct()}
        >
          수정
        </button>
      </div>
    </div>
  )
}
