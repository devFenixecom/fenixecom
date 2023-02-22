import useSWR from 'swr'

export const useApi = <Data = any>(url: string) => {
  const { data, error, mutate } = useSWR<Data>(url, (url) => 
    fetch(url).then(res => res.json())
  )
  return { data, error, mutate }
}
