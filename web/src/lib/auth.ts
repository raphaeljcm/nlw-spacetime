import jwtDecode from 'jwt-decode';
import { cookies } from 'next/headers';

interface User {
  sub: string;
  name: string;
  avatarUrl: string;
}

export function getUser(): User {
  const token = cookies().get('token')?.value;

  if (!token) throw new Error('No token found');

  const user = jwtDecode(token) as User;

  return user;
}
