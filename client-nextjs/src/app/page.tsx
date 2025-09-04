'use client';

import { useEffect } from 'react';
import { homeService } from '@/services/homeService';

export default function Home() {
  useEffect(() => {
    async function load() {
      try {
        const root = await homeService.root();
        const health = await homeService.health();
        const info = await homeService.info();

        console.log("Home API root:", root);
        console.log("Home API health:", health);
        console.log("Home API info:", info);
      } catch (err) {
        console.error("Failed to call Home API:", err);
      }
    }

    load();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to SnapOut</h1>
      <p>This is a asdfas collapsible sidebar layout with beautiful dark mode.</p>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '8px' }}>
          Primary Button
        </button>
        <button style={{ padding: '8px 16px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '8px' }}>
          Success Button
        </button>
        <button style={{ padding: '8px 16px', backgroundColor: '#d97706', color: 'white', border: 'none', borderRadius: '8px' }}>
          Warning Button
        </button>
        <button style={{ padding: '8px 16px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '8px' }}>
          Error Button
        </button>
      </div>
    </div>
  );
}
