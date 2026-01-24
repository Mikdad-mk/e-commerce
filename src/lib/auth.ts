// Simple authentication utilities
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123';
const AUTH_KEY = 'avenzo_admin_auth';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export interface AuthSession {
  authenticated: boolean;
  timestamp: number;
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  
  try {
    const session = localStorage.getItem(AUTH_KEY);
    if (!session) return false;
    
    const authData: AuthSession = JSON.parse(session);
    const now = Date.now();
    
    // Check if session is expired
    if (now - authData.timestamp > SESSION_DURATION) {
      logout();
      return false;
    }
    
    return authData.authenticated;
  } catch (error) {
    console.error('Auth check error:', error);
    return false;
  }
}

// Authenticate user with password
export function authenticate(password: string): boolean {
  if (password === ADMIN_PASSWORD) {
    const session: AuthSession = {
      authenticated: true,
      timestamp: Date.now()
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
    return true;
  }
  
  return false;
}

// Logout user
export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_KEY);
  }
}

// Get remaining session time in minutes
export function getSessionTimeRemaining(): number {
  if (typeof window === 'undefined') return 0;
  
  try {
    const session = localStorage.getItem(AUTH_KEY);
    if (!session) return 0;
    
    const authData: AuthSession = JSON.parse(session);
    const now = Date.now();
    const elapsed = now - authData.timestamp;
    const remaining = SESSION_DURATION - elapsed;
    
    return Math.max(0, Math.floor(remaining / (60 * 1000))); // Convert to minutes
  } catch (error) {
    return 0;
  }
}

// Extend session (refresh timestamp)
export function extendSession(): void {
  if (isAuthenticated()) {
    const session: AuthSession = {
      authenticated: true,
      timestamp: Date.now()
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(session));
  }
}