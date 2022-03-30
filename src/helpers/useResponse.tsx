import { TLoading } from "services/notifications/reducer"

export interface IUseResponse {
  loading: TLoading
  count: number
}

const useResponse = ({
  loading,
  count,
}: IUseResponse) => {
  const isError = loading === 'FAILURE'
  const isEmpty = loading === 'SUCCESS' && count === 0
  const isSuccess = loading === 'SUCCESS' && count > 0
  const isLoading = !loading || loading === 'PENDING'

  return {
    isError,
    isEmpty,
    isSuccess,
    isLoading
  }
}

export default useResponse