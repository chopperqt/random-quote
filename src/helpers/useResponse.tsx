import { StatusData } from "services/notifications/reducer"

export interface UseResponseProps {
  loading: StatusData | undefined
  count?: number
}

const useResponse = ({
  loading,
  count,
}: UseResponseProps) => {
  if (!loading) {
    return {
      isError: false,
      isSuccess: false,
      isLoading: true,
      isEmpty: false
    }
  }

  const isError = loading.status === 'FAILURE' && loading.count === 0
  const isEmpty = loading.status === 'SUCCESS' && count === 0
  const isSuccess = loading.status === 'SUCCESS' && loading.count === 0
  const isLoading = loading.status === 'PENDING' && loading.count !== 0

  return {
    hasStatus: !loading,
    isError,
    isEmpty,
    isSuccess,
    isLoading
  }
}

export default useResponse