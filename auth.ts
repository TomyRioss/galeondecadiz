import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { getSupabaseAdmin } from "@/lib/supabase-server";

export type AdminRole = "admin" | "superadmin";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const supabase = getSupabaseAdmin();
        const { data: user, error } = await supabase
          .from("admin_users")
          .select("id, email, password_hash, role, active")
          .eq("email", credentials.email)
          .eq("active", true)
          .single();

        if (error || !user) return null;

        const valid = await compare(credentials.password as string, user.password_hash);
        if (!valid) return null;

        return { id: user.id, email: user.email, role: user.role as AdminRole };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = (user as { role: AdminRole }).role;
      return token;
    },
    session({ session, token }) {
      if (session.user) (session.user as { role?: AdminRole }).role = token.role as AdminRole;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
});
