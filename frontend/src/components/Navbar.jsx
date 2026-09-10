import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Cpu, Terminal, Menu, X, ArrowUpRight, Activity, ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Architecture", href: "#hardware-reveal" },
    { label: "Core Capabilities", href: "#features" },
    { label: "Zero-Egress Proof", href: "#sovereignty" },
    { label: "Refinery Cases", href: "#industrial" },
    { label: "Live Simulation", href: "#live-demo" },
  ];

  const handleNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      {/* Kore.ai Style Top Announcement Strip */}
      <div className="top-announcement-bar">
        <span className="badge-new">MRPL PS-26117</span>
        <span>100% On-Premise Air-Gapped Sovereign AI Architecture</span>
        <Link to="/workbench">
          <span>Evaluate Sovereign Node</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <header
        className={`main-navbar ${scrolled ? "scrolled" : ""}`}
        role="banner"
      >
        <div className="nav-container">
          {/* Brand Logo */}
          <Link to="/" className="nav-brand" aria-label="AeroSovereign Home">
            <div className="nav-logo-icon">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="nav-brand-text">
              <span className="brand-name">AeroSovereign</span>
              <span className="brand-badge">MRPL PS-26117</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action: Theme Switch, Air-Gap Status & Workbench Launch CTA */}
          <div className="nav-actions">
            <ThemeToggle />

            <div className="airgap-pill" title="Hardware Firewall: Zero Outbound Egress Guaranteed">
              <span className="airgap-indicator"></span>
              <span>0 KB EGRESS • AIR-GAPPED</span>
            </div>

            <Link
              to="/workbench"
              className="workbench-cta-btn"
              aria-label="Launch AI Workbench"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch Workbench</span>
              <ArrowUpRight className="w-3.5 h-3.5 ml-0.5 opacity-80" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="mobile-drawer-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="drawer-header">
            <div className="nav-brand">
              <div className="nav-logo-icon">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="brand-name">AeroSovereign</span>
            </div>
            <button
              className="drawer-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="drawer-body">
            <div className="drawer-security-status">
              <Activity className="w-4 h-4" />
              <span>Network Egress: 0 KB / Strict Local GPU</span>
            </div>

            <nav className="mobile-nav-links">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="mobile-nav-item"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="drawer-cta-wrapper" style={{ marginTop: "auto" }}>
              <Link
                to="/workbench"
                className="drawer-cta-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Terminal className="w-4 h-4" />
                <span>Launch Interactive Workbench</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
