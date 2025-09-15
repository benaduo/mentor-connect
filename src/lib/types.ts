export type User = {
  id: string;
  slug: string;
  name: string;
  avatarUrl: string;
  email: string;
  role: 'Mentor' | 'Mentee' | 'Both';
  title: string;
  bio: string;
  industry: string;
  skills: string[];
  goals: string[];
  experience: string;
  location: string;
  availability: string;
  rating: number;
};

export type Connection = {
  id: string;
  userId: string;
  status: 'pending' | 'accepted' | 'declined';
  type: 'mentor' | 'mentee';
};

export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
};

export type Conversation = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
};
