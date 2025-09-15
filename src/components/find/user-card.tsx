import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User } from '@/lib/types';
import { Star, UserPlus } from 'lucide-react';

export default function UserCard({ user }: { user: User }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center text-center p-4">
        <Link href={`/users/${user.slug}`}>
          <AvatarImage user={user} />
        </Link>
        <div className="flex-1">
          <h3 className="text-lg font-bold">
            <Link href={`/users/${user.slug}`}>{user.name}</Link>
          </h3>
          <p className="text-sm text-muted-foreground">{user.title}</p>
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
          <span>{user.rating.toFixed(1)}</span>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0">
        <div className="flex flex-wrap gap-2 justify-center">
          {user.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="secondary">{skill}</Badge>
          ))}
          {user.skills.length > 3 && <Badge variant="secondary">+{user.skills.length - 3}</Badge>}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full flex gap-2">
            <Button variant="outline" className="w-full" asChild>
                <Link href={`/users/${user.slug}`}>View Profile</Link>
            </Button>
            <Button className="w-full">
                <UserPlus className="mr-2 h-4 w-4" /> Connect
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

function AvatarImage({user}: {user: User}) {
    return (
        <Image
            src={user.avatarUrl}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full border-4 border-background mb-2"
            data-ai-hint="person professional"
        />
    )
}
