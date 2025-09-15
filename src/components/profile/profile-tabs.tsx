'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileView from './profile-view';
import ProfileForm from './profile-form';
import type { User } from '@/lib/types';
import AiProfileSuggestions from './ai-profile-suggestions';

export default function ProfileTabs({ user }: { user: User }) {
  return (
    <Tabs defaultValue="view" className="space-y-4">
      <TabsList>
        <TabsTrigger value="view">Profile</TabsTrigger>
        <TabsTrigger value="edit">Edit Profile</TabsTrigger>
        <TabsTrigger value="ai">AI Suggestions</TabsTrigger>
      </TabsList>
      <TabsContent value="view">
        <ProfileView user={user} />
      </TabsContent>
      <TabsContent value="edit">
        <ProfileForm user={user} />
      </TabsContent>
      <TabsContent value="ai">
        <AiProfileSuggestions user={user} />
      </TabsContent>
    </Tabs>
  );
}
