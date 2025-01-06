import axios from 'axios'

const HEADER = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ' + localStorage.getItem('token'),
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
}

class Http {
  readonly http

  constructor() {
    this.http = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 120000,
      headers: HEADER
    })

    // Request interceptor
    this.http.interceptors.request.use(
      config => {
        // Check if the payload is formData
        if (config.data instanceof FormData) {
          config.headers['Content-Type'] = 'multipart/form-data'
        }
        return config
      },
      error => {
        // Do something with request error
        return Promise.reject(error)
      }
    )

  }

  get(url: string, config = {}) {
    return this.http.get(url, config)
  }

  post(url: string, data: any, config = {}) {
    return this.http.post(url, data, config)
  }

  put(url: string, data: any, config = {}) {
    return this.http.put(url, data, config)
  }

  delete(url: string, config = {}) {
    return this.http.delete(url, config)
  }
}

export default Http