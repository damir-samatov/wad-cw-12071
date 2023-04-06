export interface ILogin {
  login: string;
  password: string;
  isManager: boolean;
}

export interface ISession {
  sessionId: string;
  role: string;
}

export interface IUserSession extends ISession {
  hasSession: boolean;
}

export interface ITicketCreate {
  employeeId: number;
  title: string;
  priority: string;
  status: string;
  description: string;
}

export interface ITicket extends ITicketCreate {
  id: number;
}

export interface ITicketUpdate extends ITicket {}

export interface IEmployeeCreate {
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  bio: string;
}

export interface IEmployee {
  id: number;
  login: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  bio: string;
}

export interface IManager {
  id: number;
}
