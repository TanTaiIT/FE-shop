import Http from './../server/http'

const http = new Http()
export const login = async (data: any) => {
  console.log('data', data)
  return await http.post('login', data)
}