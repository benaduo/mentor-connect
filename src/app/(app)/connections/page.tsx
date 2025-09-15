import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { findUserById, connections as allConnections } from "@/lib/data";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, MessageSquare, X } from "lucide-react";

export default function ConnectionsPage() {
  const acceptedConnections = allConnections.filter(c => c.status === 'accepted').map(c => findUserById(c.userId)).filter(Boolean);
  const pendingConnections = allConnections.filter(c => c.status === 'pending').map(c => findUserById(c.userId)).filter(Boolean);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">My Network</h2>
      </div>
      <Tabs defaultValue="connections">
        <TabsList>
          <TabsTrigger value="connections">Connections ({acceptedConnections.length})</TabsTrigger>
          <TabsTrigger value="requests">Pending Requests ({pendingConnections.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="connections" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {acceptedConnections.map(user => user && (
                    <Card key={user.id}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Image src={user.avatarUrl} alt={user.name} width={64} height={64} className="rounded-full" data-ai-hint="person professional"/>
                            <div>
                                <CardTitle>{user.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{user.title}</p>
                            </div>
                        </CardHeader>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline">View Profile</Button>
                            <Button><MessageSquare className="mr-2 h-4 w-4"/> Message</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {acceptedConnections.length === 0 && <p className="text-muted-foreground mt-4">No active connections yet. Go to the 'Find' page to discover mentors and mentees!</p>}
        </TabsContent>
        <TabsContent value="requests" className="mt-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pendingConnections.map(user => user && (
                    <Card key={user.id}>
                        <CardHeader className="flex flex-row items-center gap-4">
                            <Image src={user.avatarUrl} alt={user.name} width={64} height={64} className="rounded-full" data-ai-hint="person smiling"/>
                            <div>
                                <CardTitle>{user.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{user.title}</p>
                            </div>
                        </CardHeader>
                        <CardFooter className="flex justify-end gap-2">
                            <Button variant="outline" size="icon"><X className="h-4 w-4"/></Button>
                            <Button size="icon"><Check className="h-4 w-4"/></Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            {pendingConnections.length === 0 && <p className="text-muted-foreground mt-4">No pending requests.</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
