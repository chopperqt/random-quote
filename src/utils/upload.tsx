import loadingStatuses from "helpers/loadingStatuses"
import supabase from "./client"

export type UploadRequest = 'uploadFile'

const Storages = {
  images: 'images',
}

export const uploadFile = async (file: FileList) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('uploadFile')

  handlePending()

  const { data, error } = await supabase
    .storage
    .from(Storages.images)
    .upload(file[0].name, file[0], {
      upsert: false,
      cacheControl: '3600',
    })

  if (error) {
    handleFailure(error)

    return
  }

  handleSuccess()


  return data?.Key
}