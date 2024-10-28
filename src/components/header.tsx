import { links } from "@/lib/consts"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ReactNode } from "react"
import { useMessagesContext } from "@/context/messages-context"
export default function() {

  const { message, unreadMessage, setUnreadMessage } = useMessagesContext()

  return (
    <nav className="py-[5rem]">
      <ul className="flex gap-6">
        {
          links.map((link) => (
            <li key={link.title}>
              <Bubble title={link.title} body={link.body} >
                <Button
                  variant="outline"
                  className="flex items-center relative shadow  justify-center rounded-full bg-[#e9beec] h-[14rem] w-[14rem]"
                >
                  {link.title}
                </Button>
              </Bubble>
            </li>
          ))
        }
        <Bubble title="Nuevo mensaje" body={message} >
          <Button
            onClick={() => setUnreadMessage(_ => false)}
            variant="outline"
            className="flex items-center relative shadow  justify-center rounded-full bg-[#e9beec] h-[14rem] w-[14rem]"
          >
            <img className="h-[4rem]" src="/message.png" />
            {
              unreadMessage && (
                <div className="h-[1rem] w-[1rem] bg-red-500 rounded-full absolute top-[5rem] animate-bounce right-[4.2rem]"></div>
              )
            }
          </Button>
        </Bubble>
      </ul>
    </nav >
  )
}

type BubbleProps = {
  title: string,
  body: string,
  children: ReactNode
}

function Bubble({
  title,
  body,
  children
}: BubbleProps) {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {body}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Volver</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

