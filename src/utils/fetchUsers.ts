import axios from 'axios';
import { User } from '@prisma/client';
import { GetStaticPaths } from 'next';

// Função para buscar os usuários da API
export async function fetchUsers(): Promise<User[]> {
  try {
    const response = await axios.get('http://localhost:3000/api/users'); // Substitua pela URL correta da sua API
    return response.data; // Assumindo que a resposta da API é um array de objetos de usuário
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