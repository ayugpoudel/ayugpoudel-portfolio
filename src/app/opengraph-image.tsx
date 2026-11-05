import { ImageResponse } from 'next/og';
export const alt = 'Ayug Poudel — Making complex systems feel simple. The Systems Atlas.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#090e16',
        color: '#eaf1f7',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '65px 75px',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{ display: 'flex', justifyContent: 'space-between', color: '#7bafd4', fontSize: 20 }}
      >
        <span>AYUG POUDEL</span>
        <span>THE SYSTEMS ATLAS / 01</span>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 82,
          letterSpacing: -5,
          lineHeight: 1.1,
        }}
      >
        <span>Making complex</span>
        <span>
          systems <span style={{ color: '#7bafd4' }}>feel simple.</span>
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          borderTop: '1px solid #29374a',
          paddingTop: 24,
          color: '#8d9bae',
          fontSize: 19,
        }}
      >
        Full-stack engineering · AI agents · Backend systems · Data
      </div>
    </div>,
    size,
  );
}
