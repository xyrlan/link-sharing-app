import NextAuth from 'next-auth';

// Declare uma nova interface que representa as informações dos links do usuário


// Faça a extensão do módulo "next-auth" para incluir a propriedade "links" no objeto "user" da sessão
declare module 'next-auth' {
  interface Session {
    user?: {
      links?: Array<{ platform: string; url: string }> | null ;
    } & DefaultSession['user'] ;
  }
}