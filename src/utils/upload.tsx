import loadingStatuses from "helpers/loadingStatuses"
import supabase from "./client"
import { UploadApi } from "models/upload.type"

const Storages = {
  images: 'images',
}

const defaultOptions = {
  upsert: false,
  cacheControl: '3600'
}

export const uploadFile = async (file: FileList): Promise<UploadApi | null> => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('uploadFile')

  handlePending()

  const {
    data,
    error,
  } = await supabase
    .storage
    .from(Storages.images)
    .upload(file[0].name, file[0], defaultOptions)

  if (error) {
    handleFailure(error)

    return null
  }

  handleSuccess()

  return data
}

export const deleteFile = async () => {
  const {
    handleFailure,
    handlePending,
    handleSuccess,
  } = loadingStatuses('deleteFile')

  handlePending()

  const {
    data,
    error
  } = await supabase
    .storage
    .from(Storages.images)
    .remove(['Vertinskiy.e05.2021.WEB-DL.(1080p).Getty.mkv_snapshot_32.15.465.jpg'])

  if (error) {
    handleFailure(error)

    return null
  }

  handleSuccess()

  return
}

export const updateFile = async () => {

}

