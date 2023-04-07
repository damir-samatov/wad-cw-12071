import {
  ILogin,
  ISession,
  IManager,
  ITicket,
  ITicketUpdate,
  IUserSession,
  IEmployee,
  ITicketCreate,
  IEmployeeCreate,
  IEmployeeUpdate,
} from './interfaces';
import { API_URL } from './constants';
import {
  authRequestHeaders,
  requestHeaders,
  resetUserSession,
  setUserSession,
} from './utils';

export const getUserSession = (): IUserSession => {
  const sessionId = localStorage.getItem('sessionId');
  const role = localStorage.getItem('role');

  if (sessionId === null || role === null) {
    resetUserSession();
    return {
      sessionId: '',
      role: '',
      hasSession: false,
    };
  }

  return {
    sessionId,
    role,
    hasSession: true,
  };
};

export const loginUser = async (loginDto: ILogin): Promise<boolean> => {
  const headers = new Headers([['Content-Type', 'application/json']]);

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(loginDto),
  });

  if (res.status !== 200) return false;

  const loginResponse: ISession = await res.json();
  setUserSession(loginResponse.sessionId, loginResponse.role);

  return true;
};

export const logoutUser = async (): Promise<boolean> => {
  const headers = new Headers([['Content-Type', 'application/json']]);

  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    headers,
  });

  return res.status !== 200;
};

export const getManager = async (sessionId: string): Promise<IManager> => {
  const headers = authRequestHeaders(sessionId);

  const res = await fetch(`${API_URL}/manager`, {
    method: 'GET',
    headers,
  });

  if (res.status !== 200) throw new Error('Error while fetching manager');

  return await res.json();
};

export const getEmployee = async (sessionId: string): Promise<IEmployee> => {
  const headers = authRequestHeaders(sessionId);

  const res = await fetch(`${API_URL}/employee`, {
    method: 'GET',
    headers,
  });

  if (res.status !== 200) throw new Error('Error while fetching employee');

  return await res.json();
};

export const getTicket = async (
  sessionId: string,
  ticketId: number,
  isManager: boolean
): Promise<ITicket> => {
  const headers = authRequestHeaders(sessionId);

  const res = await fetch(
    `${API_URL}/${isManager ? 'manager' : 'employee'}/tickets/${ticketId}`,
    {
      method: 'GET',
      headers,
    }
  );

  if (res.status !== 200) throw new Error('Error fetching ticket');

  return await res.json();
};

export const getTickets = async (
  sessionId: string,
  isManager: boolean
): Promise<ITicket[]> => {
  const headers = authRequestHeaders(sessionId);

  const res = await fetch(
    `${API_URL}/${isManager ? 'manager' : 'employee'}/tickets`,
    {
      method: 'GET',
      headers,
    }
  );

  if (res.status !== 200) throw new Error('Error fetching tickets');

  return await res.json();
};

export const getEmployees = async (sessionId: string): Promise<IEmployee[]> => {
  const headers = authRequestHeaders(sessionId);

  const res = await fetch(`${API_URL}/manager/employees`, {
    method: 'GET',
    headers,
  });

  if (res.status !== 200) throw new Error('Error fetching employees');

  return await res.json();
};

export const updateTicketStatus = async (
  ticketId: number,
  newStatus: string,
  sessionId: string
) => {
  const headers = authRequestHeaders(sessionId);

  const res = await fetch(`${API_URL}/employee/tickets/${ticketId}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({
      status: newStatus,
    }),
  });

  return res.status === 200;
};

export const createTicket = async (
  newTicket: ITicketCreate,
  sessionId: string
) => {
  const headers = authRequestHeaders(sessionId);

  const res = await fetch(`${API_URL}/manager/tickets`, {
    method: 'POST',
    headers,
    body: JSON.stringify(newTicket),
  });

  return res.status === 200;
};

export const registerEmployee = async (newEmployee: IEmployeeCreate) => {
  const res = await fetch(`${API_URL}/auth/register/employee`, {
    method: 'POST',
    headers: requestHeaders,
    body: JSON.stringify(newEmployee),
  });

  return res.status === 200;
};

export const updateEmployee = async (
  updateEmployee: IEmployeeUpdate,
  sessionId: string
): Promise<IEmployee> => {
  const headers = authRequestHeaders(sessionId);
  const res = await fetch(`${API_URL}/employee`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updateEmployee),
  });

  return await res.json();
};

export const updatePassword = async (
  newPassword: string,
  sessionId: string
) => {
  const headers = authRequestHeaders(sessionId);
  const res = await fetch(`${API_URL}/employee/password`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ password: newPassword }),
  });

  return res.status === 200;
};

export const deleteTicket = async (sessionId: string, ticketId: number) => {
  const headers = authRequestHeaders(sessionId);

  const res = await fetch(`${API_URL}/manager/tickets/${ticketId}`, {
    method: 'DELETE',
    headers,
  });

  return res.status === 200;
};

export const updateTicket = async (
  updatedTicket: ITicketUpdate,
  sessionId: string
) => {
  const headers = authRequestHeaders(sessionId);

  const res = await fetch(`${API_URL}/manager/tickets`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updatedTicket),
  });

  return res.status === 200;
};
