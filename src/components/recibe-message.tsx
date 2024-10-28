import { useEffect, useState } from "react"
import axios from "axios"
type Data = {
  body: string
  id: string
}
export default function RecibeMessage() {

  const [data, setData] = useState<Data>()
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/messages`)
      .then(({ data }: { data: Data }) => setData(data))
  }, [])

  if (!data) {
    return null
  }
  return (
    <main>
      <p>{data.body}</p>
      <p>{data.id}</p>
    </main>
  )
}


