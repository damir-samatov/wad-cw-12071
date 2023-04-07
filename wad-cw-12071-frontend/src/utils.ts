export const authRequestHeaders = (sessionId: string) => {
  return new Headers([
    ['Content-Type', 'application/json'],
    ['X-Auth-Token', sessionId],
  ]);
};

export const requestHeaders = new Headers([
  ['Content-Type', 'application/json'],
]);

export const setUserSession = (sessionId: string, role: string) => {
  localStorage.setItem('sessionId', sessionId);
  localStorage.setItem('role', role);
};

export const resetUserSession = () => {
  localStorage.removeItem('sessionId');
  localStorage.removeItem('role');
};
