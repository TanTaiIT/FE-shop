import { loadingStore } from "../store/loadingStore"

export default function useLoading() {
  const loadingState = loadingStore()

  const preLoading = (value: boolean) => {
    loadingState.setLoading(value)
  }

  return {
    preLoading,
  }
}