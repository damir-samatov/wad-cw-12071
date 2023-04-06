import {
  ILoginDto,
  ILoginResponse,
  IManagerResponse,
  ITicket,
  ITicketUpdate,
  IUserSession,
} from './interfaces';
import { API_URL } from './constants';

export const requestHeaders = (sessionId: string) => {
  return new Headers([
    ['Content-Type', 'application/json'],
    ['X-Auth-Token', sessionId],
  ]);
};

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

export const setUserSession = (sessionId: string, role: string) => {
  localStorage.setItem('sessionId', sessionId);
  localStorage.setItem('role', role);
};

export const resetUserSession = () => {
  localStorage.removeItem('sessionId');
  localStorage.removeItem('role');
};

export const loginUser = async (loginDto: ILoginDto): Promise<boolean> => {
  const headers = new Headers([['Content-Type', 'application/json']]);

  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify(loginDto),
  });

  if (res.status !== 200) return false;

  const loginResponse: ILoginResponse = await res.json();
  setUserSession(loginResponse.sessionId, loginResponse.role);

  return true;
};

export const getManager = async (
  sessionId: string
): Promise<IManagerResponse> => {
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
