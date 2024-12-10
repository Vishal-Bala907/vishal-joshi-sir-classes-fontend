import { DefaultSession } from "next-auth";

// Extend DefaultSession to include additional properties
declare module "next-auth" {
  interface User {
    // Add any additional user properties here
    token: string;  // Include the token
    role: string;   // Include the user role
  }

  interface Session extends DefaultSession {
    user: User;     // Ensure user includes the extended User properties
  }
}
