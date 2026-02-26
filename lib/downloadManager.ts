import { detectOS } from './detectOS';

export function triggerAutoDownload() {
  const os = detectOS();

  const link = document.createElement('a');
  link.href = os.downloadUrl;
  link.download = getFileName(os.os);
  link.style.display = 'none';
  document.body.appendChild(link);

  setTimeout(() => {
    link.click();
    document.body.removeChild(link);
  }, 1500);
}

function getFileName(os: string): string {
  switch (os) {
    case 'windows': return 'OpenClaw-Setup.exe';
    case 'macos': return 'OpenClaw.dmg';
    case 'linux': return 'OpenClaw.AppImage';
    default: return 'OpenClaw-Setup';
  }
}
