import Http from './../server/http'

const http = new Http()
export const getProductData = async() => {
  return await http.get('/products')
}

export const addProduct = async(data: any) => {
  return await http.post('/products', data)
}

export const deleteProduct = async(payload: string) => {
  return await http.delete('/products', { data: { id: payload } })
}

export const updateProduct = async(data: any) => {
  return await http.put('/products', data)
}