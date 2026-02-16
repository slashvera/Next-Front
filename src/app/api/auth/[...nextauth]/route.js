import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authoptions = {
    providers:[
        CredentialsProvider({
            name:"Django Backend",
            credentials:{
                username:{label:"Username", type:"text"},
                password:{label:"Password", type:"password"},
            },

            async authorize(credentials){
                try{
                    const res = await fetch("http://127.0.0.1:8000/api/token/",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json",
                        },
                        body:JSON.stringify({
                            username: credentials.username,
                            password: credentials.password,
                        }),
                    });

                    if(!res.ok) return null;
                    const data = await res.json();

                    return{
                        accessToken: data.access,
                        id: data.user_id,
                        username: data.username,
                        role: data.role,
                        is_superuser: data.is_superuser,
                    };
                }catch(error){
                    console.error("Authentication error:", error);
                    return null;
                }

            },
        }),
    ],

    callbacks:{
        async jwt({ token, user }){
            if(user){

                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
                token.is_superuser = user.is_superuser;
                token.accessToken = user.accessToken;
            }
            return token;
        },

        async session({ session, token }){
            session.user.id = token.id;
            session.user.username = token.username;
            session.user.role = token.role;
            session.user.is_superuser = token.is_superuser;
            session.accessToken = token.accessToken;
            return session;
        },
    },

    pages:{
        signIn:"/authentication/login", // Custom login page
    },

    session:{
        strategy:"jwt",
    },

    secret:process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authoptions);
export { handler as GET, handler as POST };