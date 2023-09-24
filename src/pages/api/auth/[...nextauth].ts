import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import {  User } from "@prisma/client";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";






export const authOptions: NextAuthOptions = {
  // Include user.id on session
  session : {
    strategy: 'jwt'
  },
  callbacks: {
    async session({ session, user , token }) {
      console.log('Session CALLBACK', { session, token})
      console.log('user object :', user)
      if(session.user){
        session.user.id = token.id as string
      }
      return {
        ...session,
        user : {
          ...session.user,
          id : token.id,
          isRegistered: token.isRegistered
        }
      }
    },
    async jwt({token , user , trigger, session}) {
      //console.log('JWT CALLBACK', { token, user})
      console.log(session)
      if (trigger === "update" && session ) {
        console.log('session after update ',session)

        return { 
          ...token, 
          ...session.user };
      }
      if(user){
       const u = user as unknown as User
        return  {
          ...token,
          id: u.id,
          isRegistered: u.isRegistered
        }
      }
      return token
    }
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name : "credentials",
     credentials : {
        email : {label : 'Email', name : 'email', type : 'email'},
        password : {label : 'Password', name: 'password',type : 'password'}
      },
      async authorize(credentials) {
        if(!credentials){
          throw new Error(JSON.stringify({ errors : 'Missing Credentials'}))
        }

        const { email, password } = credentials
        if(!email || !password){
          throw new Error('Missing Credentials')
        }
        const userExists  = await prisma.user.findUnique({
          where : {
            email : credentials.email
          } 
        }) 
        if (!userExists) {
          throw new Error('Account not found')
        }  
        if (!userExists.hashedPassword) {
          throw new Error('Authentication Error: Please use the same login method you used during sign-up.')
        }
        
        const isPasswordValid =  await bcryptjs.compare(password,userExists.hashedPassword)
        if(!isPasswordValid) {
          throw new Error('Invalid email or password')
        }
   
       
        return {
          id : userExists.id,
          email : userExists.email,
          name : userExists.name + '',
          isRegistered: userExists.isRegistered
        }
      }
    })
    // ...add more providers here
  ]
};

export default NextAuth(authOptions);

