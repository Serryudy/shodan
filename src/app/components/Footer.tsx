import { Link } from 'react-router';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    Product: [
      { label: 'Solutions', path: '/solutions' },
      { label: 'Lab', path: '/lab' },
      { label: 'Open Source', path: '/open-source' },
      { label: 'Pricing', path: '/contact' },
    ],
    Company: [
      { label: 'About', path: '/about' },
      { label: 'Blog', path: '/blog' },
      { label: 'Careers', path: '/contact' },
      { label: 'Contact', path: '/contact' },
    ],
    Resources: [
      { label: 'Documentation', path: '/blog' },
      { label: 'API Reference', path: '/blog' },
      { label: 'Community', path: '/open-source' },
      { label: 'Support', path: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: <Github size={20} />, href: '#', label: 'GitHub' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Mail size={20} />, href: '#', label: 'Email' },
  ];

  return (
    <footer className="border-t border-white/5 bg-black/30 backdrop-blur-xl">
      <div className="max-w-[1400px] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <div className="text-2xl tracking-tight">
                <span className="bg-gradient-to-r from-[#FF6A00] via-[#00B3B3] to-[#FF6A00] bg-clip-text text-transparent">
                  BUILD
                </span>
                <span className="text-[#F5F5F5]">.</span>
              </div>
            </Link>
            <p className="text-[#F5F5F5]/60 mb-6 max-w-sm">
              Building futuristic AI and software solutions that empower creators, developers, and innovators.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="p-2 rounded-lg bg-white/5 text-[#F5F5F5]/60 hover:text-[#FF6A00] hover:bg-white/10 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-[#F5F5F5] mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-[#F5F5F5]/60 hover:text-[#F5F5F5] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#F5F5F5]/40 text-sm">
            © 2026 BUILD. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-[#F5F5F5]/40 hover:text-[#F5F5F5] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#F5F5F5]/40 hover:text-[#F5F5F5] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
