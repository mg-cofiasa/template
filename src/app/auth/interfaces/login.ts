export interface LoginRequest {
  UserName: string;
  Password: string;
  Empresa: string;
}

export interface Empresa {
  id: string;
  nombre: string;
}

export interface TokenResponse {
  userId: number;
  accessToken: string;
  name: string;
  anp: string;
  regional: number;
  rol: number;
  job: string;
}