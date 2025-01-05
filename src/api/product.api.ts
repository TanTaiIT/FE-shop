import Http from './../server/http'

const http = new Http()
export const getProductData = async() => {
  return await http.get('/products')
}

export const addProduct = async(data: any) => {
  console.log('data', data)
  return await http.post('/products', data)
}