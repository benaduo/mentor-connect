import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { User } from '@/lib/types';
import { Briefcase, MapPin, Target, Clock, Star, BrainCircuit } from 'lucide-react';

export default function ProfileView({ user }: { user: User }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      <div className="md:col-span-1">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center text-center">
            <Image
              src={user.avatarUrl}
              alt={user.name}
              width={128}
              height={128}
              className="rounded-full mb-4 border-4"
              data-ai-hint="person professional"
            />
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.title}</p>
            <div className="flex items-center gap-2 mt-2">
                <Badge variant={user.role === 'Mentor' ? "default" : "secondary"}>{user.role}</Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-500" />
                    <span>{user.rating.toFixed(1)} rating</span>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{user.bio}</p>
          </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
            <InfoCard icon={Briefcase} title="Industry & Experience" items={[user.industry, user.experience]} />
            <InfoCard icon={MapPin} title="Location" items={[user.location]} />
            <InfoCard icon={Clock} title="Availability" items={[user.availability]} />
            <InfoCard icon={Target} title="Goals" items={user.goals} isBadgeList/>
        </div>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BrainCircuit className="h-5 w-5"/>Skills</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm py-1">{skill}</Badge>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, items, isBadgeList = false }: { icon: React.ElementType, title: string, items: string[], isBadgeList?: boolean }) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                {isBadgeList ? (
                    <div className="flex flex-wrap gap-2">
                        {items.map(item => <Badge key={item} variant="outline">{item}</Badge>)}
                    </div>
                ) : (
                    items.map(item => <p key={item} className="text-sm text-muted-foreground">{item}</p>)
                )}
            </CardContent>
        </Card>
    )
}
