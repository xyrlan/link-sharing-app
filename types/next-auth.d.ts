import { Image } from 'next/image';
import NextAuth from 'next-auth';

// Declare uma nova interface que representa as informações dos links do usuário
interface UserLinks {
  [platform: string]: { url: string };
}

// Faça a extensão do módulo "next-auth" para incluir a propriedade "links" no objeto "user" da sessão
declare module 'next-auth' {
  interface Session {
    user?: {
      id: string;
      links?: UserLinks;
    } & DefaultSession['user'] ;
  }
}