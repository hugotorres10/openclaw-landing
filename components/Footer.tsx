export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-[#1A1A1A]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-600 text-sm">
          &copy; 2026 OpenClaw. Todos os direitos reservados.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">Termos</a>
          <a href="#" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">Privacidade</a>
          <a href="mailto:suporte@openclaw.io" className="text-gray-600 hover:text-gray-400 text-sm transition-colors">Suporte</a>
        </div>
      </div>
    </footer>
  );
}
