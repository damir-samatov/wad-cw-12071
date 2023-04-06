import {
  ILoginDto,
  ILoginResponse,
  ITicketResponse,
  IUserSession,
} from './interfaces';
import { API_URL } from './constants';

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

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers,
      body: JSON.stringify(loginDto),
    });
    const loginResponse: ILoginResponse = await res.json();
    if (res.status !== 200) return false;
    setUserSession(loginResponse.sessionId, loginResponse.role);
    return true;
  } catch {
    return false;
  }
};

export const getManagerTickets = async (
  sessionId: string
): Promise<ITicketResponse[]> => {
  const headers = new Headers([
    ['Content-Type', 'application/json'],
    ['X-Auth-Token', `${sessionId}`],
  ]);

  try {
    const res = await fetch(`${API_URL}/manager/tickets`, {
      method: 'GET',
      headers,
    });
    return await res.json();
  } catch {
    throw new Error('Error fetching tickets');
  }
};

export const deleteTicket = async (sessionId: string, ticketId: number) => {
  const headers = new Headers([
    ['Content-Type', 'application/json'],
    ['X-Auth-Token', `${sessionId}`],
  ]);

  try {
    const res = await fetch(`${API_URL}/manager/tickets/${ticketId}`, {
      method: 'DELETE',
      headers,
    });
    return res.status === 200;
  } catch {
    return false;
  }
};
