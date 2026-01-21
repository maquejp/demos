export interface User {
  id: string;
  name: string;
  givenName: string;
  familyName: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'user';
  createdAt: Date;
}
