'use client';

import * as React from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Send, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Conversation, User } from '@/lib/types';

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  conversations: Conversation[];
  currentUser: User;
}

export default function ChatLayout({
  defaultLayout = [320, 480],
  conversations,
  currentUser
}: ChatLayoutProps) {
  const [selectedConversation, setSelectedConversation] = React.useState(conversations[0]);
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const getInitials = (name: string) => name.split(' ').map(n => n[0]).join('');

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`;
      }}
      className="h-full max-h-full items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={10}
        collapsible={true}
        minSize={20}
        maxSize={30}
        onCollapse={() => setIsCollapsed(true)}
        onExpand={() => setIsCollapsed(false)}
        className={cn(isCollapsed && "min-w-[50px] transition-all duration-300 ease-in-out", "flex flex-col")}
      >
        <div className="p-4">
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-8" />
            </div>
        </div>
        <Separator />
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={cn(
                'flex items-center gap-3 p-4 cursor-pointer hover:bg-accent',
                selectedConversation.id === conv.id && 'bg-accent'
              )}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={conv.userAvatar} alt={conv.userName} />
                <AvatarFallback>{getInitials(conv.userName)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-semibold">{conv.userName}</div>
                <div className="text-sm text-muted-foreground truncate">{conv.lastMessage}</div>
              </div>
              <div className="text-xs text-muted-foreground">{conv.lastMessageTimestamp}</div>
            </div>
          ))}
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} className="flex flex-col">
        <div className="flex items-center p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={selectedConversation.userAvatar} alt={selectedConversation.userName} />
              <AvatarFallback>{getInitials(selectedConversation.userName)}</AvatarFallback>
            </Avatar>
            <div className="font-semibold">{selectedConversation.userName}</div>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {/* Mock messages */}
          <div className="flex items-end gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={selectedConversation.userAvatar} alt={selectedConversation.userName} />
              <AvatarFallback>{getInitials(selectedConversation.userName)}</AvatarFallback>
            </Avatar>
            <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-secondary">
              <p className="text-sm">{selectedConversation.lastMessage}</p>
            </div>
          </div>
          <div className="flex items-end gap-2 justify-end">
             <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-primary text-primary-foreground">
              <p className="text-sm">Sounds good! I'll review it and get back to you by tomorrow.</p>
            </div>
            <Avatar className="h-8 w-8">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback>{getInitials(currentUser.name)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="p-4 border-t">
          <div className="relative">
            <Input placeholder="Type a message..." className="pr-12" />
            <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
