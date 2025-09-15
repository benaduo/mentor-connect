import { currentUser } from '@/lib/data';
import ProfileTabs from '@/components/profile/profile-tabs';

export default function ProfilePage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
      </div>
      <ProfileTabs user={currentUser} />
    </div>
  );
}
