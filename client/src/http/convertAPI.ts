import { $host } from "./index";

export const testConvert = async(name: string) => {
  const {data} = await $host.post('api/convert/testConvert', {name}, { responseType: 'blob' })
  return URL.createObjectURL(data)
}

export const testUpload = async(file: Blob | string | null) => {
  const formData = new FormData()
  if (file == null) return
  formData.append('file', file)
  const {data} = await $host.post('api/convert/testUpload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data
}