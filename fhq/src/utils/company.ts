// Utility for company identification in multi-tenant setup

// Domain to use for API requests - in production uses actual hostname, in dev uses configured domain
const CONFIGURED_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

/**
 * Check if we're in development mode (localhost)
 */
export function isDevelopment(): boolean {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return hostname.includes('localhost') || hostname.includes('127.0.0.1');
  }
  return true; // Assume development for SSR
}

/**
 * Get domain for API requests.
 * In production: uses window.location.hostname
 * In development: uses NEXT_PUBLIC_DOMAIN env variable
 */
export function getDomain(): string | undefined {
  if (typeof window !== 'undefined' && !isDevelopment()) {
    return window.location.hostname;
  }
  return CONFIGURED_DOMAIN;
}

/**
 * Get domain params for public API requests.
 */
export function getDomainParams(): Record<string, string> {
  const domain = getDomain();
  if (domain) {
    return { domain };
  }
  return {};
}

/**
 * Get the current domain (for display purposes)
 */
export function getCurrentDomain(): string | null {
  return getDomain() || null;
}

/**
 * Check if we're in production (using domain) or development (using company ID)
 */
export function isProductionMode(): boolean {
  return !isDevelopment();
}
