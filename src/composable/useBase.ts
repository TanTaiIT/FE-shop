import { commonStore } from "../store/commonStore"

export const useBase = () => {
  const commonStte = commonStore()
  const isShowConfirm = commonStte.isShowConfirm
  
  
  const showAlertConfirm = (callback: () => void) => {
    commonStte.showConfirm(callback)

    return callback
  }

  return {
    showAlertConfirm,
    isShowConfirm
  }
}