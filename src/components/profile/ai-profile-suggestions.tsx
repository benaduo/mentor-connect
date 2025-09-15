'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Wand2 } from 'lucide-react';
import type { User } from '@/lib/types';
import { getProfileSuggestions } from '@/app/actions/profile';
import { useToast } from '@/hooks/use-toast';
import type { SuggestProfileImprovementsOutput } from '@/ai/flows/suggest-profile-improvements';

export default function AiProfileSuggestions({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [profileDescription, setProfileDescription] = useState(user.bio);
  const [suggestions, setSuggestions] = useState<SuggestProfileImprovementsOutput | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuggestions(null);
    startTransition(async () => {
      const { suggestions: result, error } = await getProfileSuggestions({
        profileDescription,
        userGoals: user.goals.join(', '),
      });
      if (error) {
        toast({ title: 'Error', description: error, variant: 'destructive' });
      } else if (result) {
        setSuggestions(result);
      }
    });
  };
  
  const applySuggestion = () => {
    if (suggestions) {
        setProfileDescription(suggestions.improvedDescription);
        toast({ title: "Suggestion Applied", description: "The improved description has been copied to the text area. Remember to save your profile!" });
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Profile Assistant</CardTitle>
          <CardDescription>
            Get AI-powered suggestions to make your profile stand out.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="bio" className="mb-2 block">Your current bio</Label>
              <Textarea
                id="bio"
                value={profileDescription}
                onChange={(e) => setProfileDescription(e.target.value)}
                rows={8}
                placeholder="Enter your profile description here..."
              />
            </div>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Get Suggestions
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {isPending && (
          <Card>
              <CardContent className="pt-6 h-full flex items-center justify-center flex-col gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <p className="text-muted-foreground">Generating suggestions...</p>
              </CardContent>
          </Card>
      )}

      {suggestions && !isPending && (
        <Card className="bg-accent/20 border-accent">
          <CardHeader>
            <CardTitle>Suggestion</CardTitle>
            <CardDescription>Here's how we can improve your bio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
                <Label className="font-semibold">Improved Description</Label>
                <div className="p-4 rounded-md bg-background border mt-2">
                    <p className="text-sm text-foreground">{suggestions.improvedDescription}</p>
                </div>
            </div>
            <div>
                <Label className="font-semibold">Reasoning</Label>
                <div className="p-4 rounded-md bg-background border mt-2">
                    <p className="text-sm text-foreground">{suggestions.reasoning}</p>
                </div>
            </div>
            <Button onClick={applySuggestion}>
                Apply this suggestion
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
