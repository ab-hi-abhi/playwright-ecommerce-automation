export function randomString(prefix = 'user', len = 6) {
  const s = Math.random().toString(36).substring(2, 2 + len);
  return `${prefix}_${s}`;
}

export function randomEmail() {
  return `${randomString('test') + Date.now().toString().slice(-4)}@example.com`;
}

export const defaultPassword = 'P@ssw0rd!';