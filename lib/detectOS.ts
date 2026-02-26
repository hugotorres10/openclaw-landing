export type OSInfo = {
  os: 'windows' | 'macos' | 'linux' | 'unknown';
  label: string;
  downloadUrl: string;
};

const DOWNLOAD_URLS = {
  windows: process.env.NEXT_PUBLIC_WINDOWS_URL || '#',
  macos: process.env.NEXT_PUBLIC_MAC_URL || '#',
  linux: process.env.NEXT_PUBLIC_LINUX_URL || '#',
};

export function detectOS(): OSInfo {
  if (typeof window === 'undefined') {
    return { os: 'unknown', label: 'Desktop', downloadUrl: '#' };
  }

  const ua = navigator.userAgent.toLowerCase();
  const platform = (navigator as any).userAgentData?.platform?.toLowerCase() || navigator.platform?.toLowerCase() || '';

  if (platform.includes('win') || ua.includes('windows')) {
    return { os: 'windows', label: 'Windows', downloadUrl: DOWNLOAD_URLS.windows };
  }
  if (platform.includes('mac') || ua.includes('macintosh') || ua.includes('mac os')) {
    return { os: 'macos', label: 'macOS', downloadUrl: DOWNLOAD_URLS.macos };
  }
  if (platform.includes('linux') || ua.includes('linux')) {
    return { os: 'linux', label: 'Linux', downloadUrl: DOWNLOAD_URLS.linux };
  }

  return { os: 'unknown', label: 'Desktop', downloadUrl: DOWNLOAD_URLS.windows };
}
