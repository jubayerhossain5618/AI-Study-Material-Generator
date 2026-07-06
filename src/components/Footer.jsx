import { Sparkles, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink text-white/70">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-base font-semibold text-white">StudyGenAI</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Empowering students worldwide with advanced AI tools to make learning faster, smarter, and more efficient.
            </p>
            <div className="mt-6 flex gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 transition hover:border-brand-400 hover:text-brand-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white">Product</h4>
            <ul className="mt-6 space-y-3 text-sm">
              <li><a href="/#features" className="hover:text-brand-300">Features</a></li>
              <li><a href="#" className="hover:text-brand-300">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-300">AI Chatbot</a></li>
              <li><a href="#" className="hover:text-brand-300">Chrome Extension</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-white">Company</h4>
            <ul className="mt-6 space-y-3 text-sm">
              <li><a href="#" className="hover:text-brand-300">About Us</a></li>
              <li><a href="#" className="hover:text-brand-300">Careers</a></li>
              <li><a href="#" className="hover:text-brand-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-300">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm">
          © {new Date().getFullYear()} StudyGen AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
