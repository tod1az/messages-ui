import Header from "@/components/header"
import MessageForm from "@/components/message-form"
import { MessagesProvider } from "@/context/messages-context"
function App() {

  return (
    <main className="flex flex-col items-center bg-gradient-to-t from-[#e9beec] to-[#468ea4] w-[100dvw] min-h-[100dvh]">
      <MessagesProvider>
        <Header />
        <MessageForm />
      </MessagesProvider>
    </main>
  )
}
//  upper #468ea4
// down #e9beec
export default App
