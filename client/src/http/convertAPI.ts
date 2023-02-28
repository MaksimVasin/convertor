import { $host } from "./index";

export const convert = async(name: string) => {
  const {data} = await $host.post('api/convert/convert', {name})
  return data
}

export const upload = async(file: Blob | string | null) => {
  const formData = new FormData()
  if (file == null) return
  formData.append('file', file)
  const {data} = await $host.post('api/convert/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data
}