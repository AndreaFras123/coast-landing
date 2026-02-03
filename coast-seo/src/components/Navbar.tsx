// components/Navbar.tsx - Shared navigation matching landing page

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#fff',
      borderBottom: '1px solid #eee',
      padding: '16px 64px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      {/* Logo - links to main landing page */}
      <a href="https://coast.academy" style={{ textDecoration: 'none' }}>
        <Image
          src="/logo.svg"
          alt="Coast"
          width={120}
          height={40}
          priority
        />
      </a>

      {/* Nav Links */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '40px'
      }}>
        <Link 
          href="/university" 
          style={{ 
            color: '#333', 
            textDecoration: 'none', 
            fontSize: '1rem',
            fontWeight: 500,
            fontFamily: 'var(--font-body)'
          }}
        >
          Universities
        </Link>
        <a 
          href="https://coast.academy/#features" 
          style={{ 
            color: '#333', 
            textDecoration: 'none', 
            fontSize: '1rem',
            fontWeight: 500,
            fontFamily: 'var(--font-body)'
          }}
        >
          Features
        </a>
        <a 
          href="https://coast.academy/#join" 
          style={{ 
            color: '#333', 
            textDecoration: 'none', 
            fontSize: '1rem',
            fontWeight: 500,
            fontFamily: 'var(--font-body)'
          }}
        >
          Join Beta
        </a>
      </div>
    </nav>
  );
}
