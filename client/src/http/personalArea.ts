import { $host } from "./index";

export const getAllUserImages = async(id: number) => {
  const {data} = await $host.get(`api/user/${id}/images`)
  return data
}