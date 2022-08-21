
type FileReturn =
  string |
  ArrayBuffer |
  null

const getNormalizeFile = async (file: Blob): Promise<FileReturn> => {
  const fileRead = new FileReader()

  const result = new Promise((resolve: (file: FileReturn) => void) => {
    fileRead.readAsDataURL(file)

    fileRead.onload = () => {
      resolve(fileRead.result)
    }
  })

  return await result
}

export default getNormalizeFile