'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  bio: z.string().max(300, 'Bio must be less than 300 characters.').min(10, 'Bio must be at least 10 characters.'),
  industry: z.string(),
  skills: z.string(),
  goals: z.string(),
  location: z.string(),
  availability: z.string(),
});

export default function ProfileForm({ user }: { user: User }) {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user.name,
      title: user.title,
      bio: user.bio,
      industry: user.industry,
      skills: user.skills.join(', '),
      goals: user.goals.join(', '),
      location: user.location,
      availability: user.availability,
    },
  });

  function onSubmit(values: z.infer<typeof profileSchema>) {
    console.log(values);
    toast({
        title: "Profile Updated",
        description: "Your changes have been saved successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Job Title / Headline</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Senior Software Engineer" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Skills (comma-separated)</FormLabel>
                        <FormControl>
                            <Input placeholder="React, Node.js, Leadership" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="goals"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Goals (comma-separated)</FormLabel>
                        <FormControl>
                            <Input placeholder="Career Growth, Find PM role" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
             <div className="grid md:grid-cols-2 gap-8">
                <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <FormControl>
                            <Input placeholder="Software Engineering" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                            <Input placeholder="San Francisco, CA" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={form.control}
                name="availability"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Availability</FormLabel>
                    <FormControl>
                        <Input placeholder="Weekdays after 6 PM PT" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
