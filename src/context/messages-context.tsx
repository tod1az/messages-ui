import { createContext, useContext, useState } from "react";

type MessageContextValue = {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
  unreadMessage: boolean
  setUnreadMessage: React.Dispatch<React.SetStateAction<boolean>>

}

const MessagesContext = createContext<null | MessageContextValue>(null)

export function MessagesProvider({ children }: { children: React.ReactNode }) {

  const [message, setMessage] = useState<string>("No tiene mensajes...")
  const [unreadMessage, setUnreadMessage] = useState(false)

  return (
    <MessagesContext.Provider value={{ message, setMessage, unreadMessage, setUnreadMessage }}>
      {children}
    </MessagesContext.Provider>
  )
}

export function useMessagesContext() {
  const context = useContext(MessagesContext)
  if (context === null) {
    throw Error("UseMessagesContext must be used within the Messages Provider")
  }
  return {
    message: context.message,
    setMessage: context.setMessage,
    unreadMessage: context.unreadMessage,
    setUnreadMessage: context.setUnreadMessage
  }
}
