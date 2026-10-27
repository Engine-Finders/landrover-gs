// The real Google "G" and Trustpilot star marks (not recoloured to the site theme) for review platforms.

export function GoogleG({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Google" role="img">
      <path fill="#4285F4" d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.53 5.53 0 01-2.4 3.63v3h3.88c2.27-2.09 3.55-5.17 3.55-8.82z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.46 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.27v3.11A12 12 0 0012 24z" />
      <path fill="#FBBC05" d="M5.27 14.28a7.2 7.2 0 010-4.56V6.61H1.27a12 12 0 000 10.78z" />
      <path fill="#EA4335" d="M12 4.75c1.76 0 3.34.6 4.58 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0A12 12 0 001.27 6.61l4 3.11C6.22 6.86 8.87 4.75 12 4.75z" />
    </svg>
  );
}

export function TrustpilotMark({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="2.6 2.6 18.8 18.8" className={className} aria-label="Trustpilot" role="img">
      <path fill="#00b67a" d="M12 3.6l2.1 6.35h6.7l-5.4 3.95 2.05 6.3L12 16.35l-5.45 3.85 2.05-6.3L3.2 9.95h6.7z" />
      <path fill="#005128" d="M15.85 15.35l-.45-1.4-3.4 2.4z" />
    </svg>
  );
}
