export interface User {
  id: string;
  name: string;
  email: string;
  admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface Payload {
  id: number;
  name: string;
  email: string;
  sub?: string;
}
