import { FormEvent } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addProduct, Product } from "../services/products"

export default function ProductAdd() {

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['products']})
    },
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const product: Product = {
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      quantity: Number(formData.get('quantity')),
    }
    mutation.mutate(product)
    form.reset()
  }
  return (
    <div className='container'>
      <h1 className='my-4 text-center'>제품 등록</h1>
      <form className='w-full flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='w-full flex gap-4 items-center'>
          <p className='w-[50px] text-sm text-right'>제품명</p>
          <input
            className='border-b flex-1 border-b-black py-1'
            type='text'
            name='name'
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
              required
            />
          </div>
          <div className='w-1/2 flex gap-4 items-center'>
            <p className='w-[50px] text-sm text-right'>수량</p>
            <input
              className='text-right border-b flex-1 border-b-black pr-2'
              type='number'
              name='quantity'
              required
            />
          </div>
        </div>
        <div className='my-4 flex justify-center items-center gap-4'>
          <button className='border border-gray-500 rounded py-1 px-2'
          type='submit'
          >
            등록
          </button>
          <button className='border border-gray-500 rounded py-1 px-2'
          type='reset'
          >
            리셋
          </button>
        </div>
      </form>
    </div>
  )
}
