import { Session } from "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    image: string;
    name: string;
  }
  interface Session {
    user: User;
    isAdmin: boolean;
  }
}
