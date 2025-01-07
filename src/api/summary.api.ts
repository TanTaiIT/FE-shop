import Http from './../server/http'

const http = new Http()

export const getSummarydata = async(payload: string) => {
  console.log('payload', payload)
  return await http.get('/summary', payload)
}