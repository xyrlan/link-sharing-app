import axios from 'axios';

import { GetStaticPaths } from 'next';

type User = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  hashedPassword: string | null;
  image: string | null;
  links: [] | null;
}

// Função para buscar os usuários da API
export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await axios.get('https://link-sharing-app-ten.vercel.app/api/users'); // Substitua pela URL correta da sua API
    return response.data;
    // Assumindo que a resposta da API é um array de objetos de usuário
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return []; // Retornar um array vazio em caso de erro
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const users = await fetchUsers(); // Chame sua função de API corretamente
    const paths = users.map((user: User) => ({
      params: { userId: user.id.toString() }, // Certifique-se de converter o ID para string
    }));
  
    return { paths, fallback: false };
  };