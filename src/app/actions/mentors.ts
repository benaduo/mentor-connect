"use server";

import { suggestMentors, MentorSuggestionInput } from "@/ai/flows/automated-mentor-suggestions";
import { users } from "@/lib/data";
import { User } from "@/lib/types";

export async function getMentorSuggestions(input: MentorSuggestionInput): Promise<{ suggestedUsers: User[], error?: string }> {
  try {
    const result = await suggestMentors(input);
    if (result && result.suggestedMentors) {
      // This is a simple simulation. In a real app, you'd use the names to query your user database.
      // For this mock, we'll just filter our existing mock users if their name is included.
      const suggestedUsers = users.filter(user =>
        result.suggestedMentors.some(mentorName => user.name.toLowerCase().includes(mentorName.toLowerCase())) && user.role !== 'Mentee'
      );
      
      // If AI gives names not in our small mock list, let's add some random mentors as a fallback.
      if (suggestedUsers.length === 0) {
        return { suggestedUsers: users.filter(u => u.role !== 'Mentee').slice(0, 2) };
      }

      return { suggestedUsers };
    }
    return { suggestedUsers: [] };
  } catch (e) {
    console.error(e);
    return { suggestedUsers: [], error: 'Failed to get AI suggestions.' };
  }
}
