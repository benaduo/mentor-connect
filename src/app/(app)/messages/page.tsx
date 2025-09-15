import ChatLayout from "@/components/messaging/chat-layout";
import { conversations, currentUser } from "@/lib/data";

export default function MessagesPage() {
  return (
    <>
        <div className="flex-1 p-4 md:p-8 pt-6 flex flex-col">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
            </div>
            <div className="flex-1 mt-4">
                 <ChatLayout
                    defaultLayout={[320, 480]}
                    conversations={conversations}
                    currentUser={currentUser}
                    />
            </div>
        </div>
    </>
  );
}
