import { Github, Linkedin, Mail, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex gap-6 mb-6">
            <a
              href="https://github.com/jefaisquedev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Github size={24} />
            </a>
            <a
              href="https://linkedin.com/in/malcomo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="hover:text-blue-400 transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>
          <p className="text-gray-400 flex items-center gap-2">
            Fait par Malcom OGOUBY-KOMLAN © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
