import loadingStatuses from "helpers/loadingStatuses"
import supabase from "./client"

export type UploadRequest = 'uploadFile'

const Storages = {
  images: 'images',
}

export const uploadFile = async (file: File) => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('uploadFile')

  handlePending()

  const { data, error } = await supabase
    .storage
    .from(Storages.images)
    .upload(file.name, file, {
      upsert: true,
      contentType: 'image/jpeg',
      cacheControl: '3600',

    })

  if (error) {
    handleFailure(error)

    return
  }

  handleSuccess()

  return data
}