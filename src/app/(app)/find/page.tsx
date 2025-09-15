import { users } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import UserCard from "@/components/find/user-card";

export default function FindPage() {
  // Exclude current user from the list
  const otherUsers = users.filter(u => u.id !== '2');

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Discover Connections</h2>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 p-4 border rounded-lg bg-card shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search by name, skill, or industry..." className="pl-10" />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mentor">Mentors</SelectItem>
              <SelectItem value="mentee">Mentees</SelectItem>
              <SelectItem value="both">Both</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="swe">Software Engineering</SelectItem>
              <SelectItem value="pm">Product Management</SelectItem>
              <SelectItem value="ux">UX/UI Design</SelectItem>
              <SelectItem value="ds">Data Science</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full md:w-auto">
            <Search className="mr-2 h-4 w-4" /> Search
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {otherUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
}
