import {
  ILogin,
  ISession,
  IManager,
  ITicket,
  ITicketUpdate,
  IUserSession,
  IEmployee,
  ITicketCreate,
} from './interfaces';
import { API_URL } from './constants';
import { requestHeaders, resetUserSession, setUserSession } from './utils';

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

export const getManager = async (sessionId: string): Promise<IManager> => {
  const headers = requestHeaders(sessionId);

  const res = await fetch(`${API_URL}/manager`, {
    method: 'GET',
    headers,
  });

  if (res.status !== 200) throw new Error('Error while fetching manager');

  return await res.json();
};

export const getTicket = async (
  sessionId: string,
  ticketId: number,
  isManager: boolean
): Promise<ITicket> => {
  const headers = requestHeaders(sessionId);

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
  const headers = requestHeaders(sessionId);

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
  const headers = requestHeaders(sessionId);

  const res = await fetch(`${API_URL}/manager/employees`, {
    method: 'GET',
    headers,
  });

  if (res.status !== 200) throw new Error('Error fetching employees');

  return await res.json();
};

export const createTicket = async (
  newTicket: ITicketCreate,
  sessionId: string
) => {
  const headers = requestHeaders(sessionId);

  const res = await fetch(`${API_URL}/manager/tickets`, {
    method: 'POST',
    headers,
    body: JSON.stringify(newTicket),
  });

  return res.status === 200;
};

export const deleteTicket = async (sessionId: string, ticketId: number) => {
  const headers = requestHeaders(sessionId);

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
  const headers = requestHeaders(sessionId);

  const res = await fetch(`${API_URL}/manager/tickets`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(updatedTicket),
  });

  return res.status === 200;
};
