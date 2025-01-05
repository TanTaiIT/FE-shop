import Http from "../server/http"

const http = new Http()
export const getCategories = async () => {
  return await http.get('categories')
}