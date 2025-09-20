// components/navbar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/#about", label: "About" },
    { href: "/#attractions", label: "Attractions" },
    { href: "/#visit", label: "Visit Us" },
    { href: "/#contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-transparent background-blur-md fixed ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex justify-between h-16">
          {/* Brand + Desktop Nav */}
          <div className="flex items-center gap-10">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold tracking-tight text-black">
                Queens Park
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-black hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden sm:flex sm:items-center">
            <Button asChild className="rounded-md px-6">
              <Link href="/tickets">Buy Tickets</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-foreground/5"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={[
          "sm:hidden border-t border-border/60 bg-background/70 backdrop-blur-md transition-[max-height,opacity] duration-300",
          mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden",
        ].join(" ")}
      >
        <div className="px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item, idx) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={[
                "block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                idx === 0
                  ? "border-l-4 border-foreground/60 bg-foreground/5 text-foreground"
                  : "border-l-4 border-transparent text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
              ].join(" ")}
            >
              {item.label}
            </Link>
          ))}

          <Button asChild className="w-full mt-2 rounded-md border border-black text-black">
            <Link href="/tickets">Buy Tickets</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
