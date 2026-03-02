import { User } from "lucide-react";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Django",
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/token/`, {
          method: "POST",
          body: JSON.stringify({
            username: credentials.username,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        // LOG 1: ¿Qué nos respondió Django realmente?
        console.log("--- LOG 1: Respuesta de Django ---");
        console.log(user);

        if (res.ok && user) {
          // Importante: El objeto que retornas aquí es el que recibe el callback 'jwt'
          //LOG: Verificamos antes de retornar
          console.log("--- Enviando a JWT ---",{
            role: user.role,
            is_superuser: user.is_superuser
          });
          //Retornmos un objeto con las llaves que Django nos dio
          return{
            id: user.id,
            username: user.username,
            role: user.role,
            access: user.access,
            is_superuser: user.is_superuser,
          };
        }
        return null;
      },
    }),
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        console.log("--- LOG 2: Guardando datos en el JWT ---");
        token.id = user.id;
        token.username = user.username;
        token.role = user.role;
        token.accessToken = user.access;
        token.is_superuser = user.is_superuser;
      }
      return token;
    },

    async session({ session, token }) {
      // Pasamos los datos del token a la sesión
      console.log("--- LOG 3: Creando la sesión ---");
      session.user = {
        id: token.id,
        username: token.username,
        role: token.role,
        accessToken: token.accessToken,
        is_superuser: token.is_superuser,
      }
      console.log("Sesión final generada:", session);
      return session;
    },
  },
  // IMPORTANTE: Sin secreto, a veces las cookies no se guardan en local
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Usar JWT para las sesiones
  },
});

export { handler as GET, handler as POST };