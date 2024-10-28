import { useEffect, useState } from "react"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { useMessagesContext } from "@/context/messages-context"

export default function MessageForm() {

  const { setMessage, setUnreadMessage } = useMessagesContext()

  const [alias, setAlias] = useState<string>()
  const [newMessage, setNewMessage] = useState<string>()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setNewMessage(value)
  }

  useEffect(() => {
    const alias = window.localStorage.getItem("alias")
    if (alias === null) {
      const newAlias = crypto.randomUUID()
      setAlias(_ => newAlias)
      window.localStorage.setItem("alias", newAlias)
    } else {
      setAlias(_ => alias)
    }
  }, [])


  async function submitHandler(e: React.FormEvent) {
    e.preventDefault()
    await axios.post(`${import.meta.env.VITE_API_URL}/messages`, { id: alias, body: newMessage })
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/messages?id=${alias}`)
    setMessage(_ => response.data.body)
    setUnreadMessage(_ => true)
    setNewMessage(_ => "")
  }

  return (
    <form className="flex flex-col gap-4 justify-center items-center " onSubmit={submitHandler}>
      <input
        className={`flex items-center text-center placeholder-black/70 
                    shadow transition-all duration-500 px-4 h-[4rem]  
                    w-[60vw] bg-[#e9beec] rounded-xl`}
        value={newMessage}
        placeholder="Ingresa tu mensaje de gratitud"
        name="message"
        onChange={handleChange}
      />
      <Button variant="outline" className="flex w-fit rounded-lg px-4 py-2 bg-[#468ea4] shadow text-white">
        Enviar
      </Button>
    </form>
  )
}
