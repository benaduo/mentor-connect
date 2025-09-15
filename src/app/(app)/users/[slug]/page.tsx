import { findUserBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MessageSquare, UserPlus, Star } from 'lucide-react';
import ProfileView from '@/components/profile/profile-view';

export default function UserProfilePage({ params }: { params: { slug: string } }) {
  const user = findUserBySlug(params.slug);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{user.name}'s Profile</h2>
        <div className="flex gap-2">
            <Button>
                <UserPlus className="mr-2 h-4 w-4" /> Connect
            </Button>
            <Button variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" /> Message
            </Button>
            <Button variant="outline">
                <Star className="mr-2 h-4 w-4" /> Rate
            </Button>
        </div>
      </div>
      <ProfileView user={user} />
    </div>
  );
}
