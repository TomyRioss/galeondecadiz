import type { AdminRole } from "@/auth";
import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    role: AdminRole;
  }
  interface Session {
    user: {
      role: AdminRole;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: AdminRole;
  }
}
