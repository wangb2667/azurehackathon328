"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tool", label: "Tool" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-[#8cb9ed] text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div
            className="text-2xl font-bold px-4 h-16 flex items-center text-blue-600"
            style={{ fontFamily: "'Tektur', sans-serif" }}
          >
            FridgeLens
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex h-16 items-center">
            {navLinks.map((link) => (
              <Link
              key={link.href}
              href={link.href}
              className={`text-xl w-36 px-4 mx-1 flex items-center justify-center transition-all duration-300 ease-in-out relative
                ${
                  isActive(link.href)
                    ? "bg-[#519df5] font-semibold shadow-inner"
                    : "hover:text-white hover:font-semibold hover:scale-105 hover:after:w-full"
                }
                after:absolute after:-bottom-3.5 after:left-1/2 after:-translate-x-1/2 after:h-[2px] after:w-0 after:bg-white after:transition-all after:duration-300`}
              style={{ fontFamily: "'Inconsolata', monospace" }}
            >
              {link.label}
            </Link>
            
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-4 h-16 flex items-center hover:bg-[#519df5] transition-colors duration-200"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full px-4 h-12 flex items-center transition-all duration-300 ease-in-out relative
                  ${
                    isActive(link.href)
                      ? "bg-[#519df5] font-semibold"
                      : "hover:bg-[#519df5] hover:font-semibold"
                  }`}
                style={{ fontFamily: "'Inconsolata', monospace" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
