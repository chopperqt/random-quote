import { StatusData } from "services/notifications/reducer"

export interface UseResponseProps {
  loading: StatusData
  count?: number
}

const useResponse = ({
  loading,
  count,
}: UseResponseProps) => {
  const isError = loading === 'FAILURE'
  const isEmpty = loading === 'SUCCESS' && count === 0
  const isSuccess = loading === 'SUCCESS'
  const isLoading = loading === 'PENDING'

  return {
    hasStatus: !loading,
    isError,
    isEmpty,
    isSuccess,
    isLoading
  }
}

export default useResponse