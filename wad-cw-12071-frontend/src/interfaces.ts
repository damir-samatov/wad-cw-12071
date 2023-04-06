export interface IUserSession {
  sessionId: string;
  role: string;
  hasSession: boolean;
}

export interface ILoginDto {
  login: string;
  password: string;
  isManager: boolean;
}

export interface ILoginResponse {
  sessionId: string;
  role: string;
}

export interface ITicketResponse {
  id: number;
  employeeId: number;
  title: string;
  priority: string;
  status: string;
  description: string;
}

export interface IManagerResponse {
  id: number;
}
