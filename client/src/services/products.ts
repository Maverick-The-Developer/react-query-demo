const apiUrl = 'http://localhost:8000/api/v1/data'

export type Product = {
  id?: string | undefined
  name: string | undefined
  price: number | undefined
  quantity: number | undefined
}
export async function addProduct(product: Product) {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    throw new Error('Something went wrong')
  }
  return await response.json()
}

export async function getProducts() {
  const response = await fetch(apiUrl)
  if (!response.ok) {
    throw new Error('Something went wrong')
  }
  return await response.json()
}

export async function getProductById(id: string) {
  const response = await fetch(`${apiUrl}/${id}`)
  if (!response.ok) {
    return null
  }
  return await response.json()
}

export async function updateProduct(id: string, product: Product) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    return null
  }
  return await response.json()
}

export async function deleteProduct(id: string) {
  const response = await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Something went wrong')
  }
  return await response.json()
}