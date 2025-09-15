'use client';

import { useState, useTransition } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { getMentorSuggestions } from '@/app/actions/mentors';
import type { User } from '@/lib/types';
import UserCard from '@/components/find/user-card';
import { useToast } from '@/hooks/use-toast';
import { currentUser } from '@/lib/data';

export default function MentorSuggestions() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [goals, setGoals] = useState(currentUser.goals.join(', '));
  const [interests, setInterests] = useState(currentUser.skills.join(', '));
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const { suggestedUsers: users, error } = await getMentorSuggestions({ menteeGoals: goals, menteeInterests: interests });
      if (error) {
        toast({
          title: 'Error',
          description: error,
          variant: 'destructive',
        });
      } else {
        setSuggestedUsers(users);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suggested for You</CardTitle>
        <CardDescription>
          Based on your profile, here are some potential mentors. Refine with your goals and interests.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goals">My Goals</Label>
              <Input id="goals" value={goals} onChange={(e) => setGoals(e.target.value)} placeholder="e.g., Career growth, learn React" />
            </div>
            <div>
              <Label htmlFor="interests">My Interests / Skills</Label>
              <Input id="interests" value={interests} onChange={(e) => setInterests(e.target.value)} placeholder="e.g., Software engineering, product management" />
            </div>
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Find Mentors
          </Button>
        </form>
        
        {suggestedUsers.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Recommendations</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {suggestedUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
