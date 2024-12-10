export interface AllMemberType {
  id: number;
  name: string;
  image: string;
  status: string;
  online: string;
  lastSeenDate: string;
  time: string;
  reply: string;
  badge?: boolean;
}

export interface MessageTypes {
  name?: string;
  sender: number;
  class?: string;
  time: string;
  text: string;
  status?: boolean;
}

export interface ChatsTypes {
  _id: string;
  sender: string; // User ID of the sender
  senderName: string; // Name of the sender
  recipient: string; // User ID of the recipient
  recipientName: string; // Name of the recipient
  message: string; // Message content
  timestamp: Date;
  __v: number; // Timestamp of the message, optional because of default
}

export interface Students {
  email: string;
  mentors: string[]; // Assuming mentors are represented as an array of strings (mentor IDs or names)
  name: string;
  password: string; // For demonstration; in real scenarios, password shouldn't be stored like this
  role: "student"; // Role is fixed as "student"
  studySessions: string[]; // Assuming studySessions are an array of session IDs or session details
  subjects: string[]; // Assuming subjects are an array of subject names
  tests: string[]; // Assuming tests are an array of test IDs or names
  __v: number; // Version field from MongoDB
  _id: string;
}

export interface Mentors {
  email: string;
  mentors: string[]; // Assuming mentors are represented as an array of strings (mentor IDs or names)
  name: string;
  password: string; // For demonstration; in real scenarios, password shouldn't be stored like this
  role: "student"; // Role is fixed as "student"
  studySessions: string[]; // Assuming studySessions are an array of session IDs or session details
  subjects: string[]; // Assuming subjects are an array of subject names
  tests: string[]; // Assuming tests are an array of test IDs or names
  __v: number; // Version field from MongoDB
  _id: string;
}

export interface MoveToBottom {
  bottom: number;
}

export interface ChatSliceType {
  allMembers: AllMemberType[] | [];
  chats: ChatsTypes[] | [];
  members: AllMemberType[] | [];
  currentUser: null | AllMemberType;
  selectedUser?: any;
  students: Students[];
  mentors: Mentors[];
  moveToBottom: number;
}

export interface DropClassTypes {
  dropClass?: string;
}
