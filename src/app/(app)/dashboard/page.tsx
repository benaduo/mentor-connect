import { Activity, Briefcase, Users, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatCard from '@/components/dashboard/stat-card';
import MentorSuggestions from '@/components/dashboard/mentor-suggestions';
import { currentUser } from '@/lib/data';

export default function DashboardPage() {
    
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">
        Welcome back, {currentUser.name.split(' ')[0]}!
      </h2>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard 
                title="Active Connections"
                value="3"
                icon={Users}
                description="1 pending request"
            />
            <StatCard 
                title="Sessions Completed"
                value="12"
                icon={CheckCircle}
                description="+5 this month"
            />
            <StatCard 
                title="Your Availability"
                value="Flexible"
                icon={Activity}
                description="Update in profile"
            />
            <StatCard 
                title="Primary Goal"
                value={currentUser.goals[0]}
                icon={Briefcase}
                description="View all goals"
            />
        </div>
        <div className="grid gap-4 md:grid-cols-1">
          <MentorSuggestions />
        </div>
      </div>
    </div>
  );
}
