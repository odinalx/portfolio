import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const alt = 'Odin Alexandre - Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  // Read at build time (the route is statically prerendered)
  const interBold = await readFile(path.join(process.cwd(), 'app/fonts/Inter-Bold.ttf'));

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 96px',
          background: '#0D0D0D',
          color: '#E3E3E3',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <svg width="140" height="100" viewBox="0 0 33.77 24.22" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#D83A49"
            d="M25.89.8l-6.17.02-.62,1.82h0c.9.8,1.66,1.78,2.28,2.92.34.62.61,1.3.83,2.02h0s.61-1.6.61-1.6l2.89,8.54h-8.9c-.12.66-.3,1.26-.54,1.81-.34.78-.78,1.44-1.31,1.96h6.6s0,0,0,0h4.86l2.21,5.12,5.13-.02L25.89.8Z"
          />
          <path
            fill="#D83A49"
            d="M13.98,19.06c-.85.5-1.83.76-2.94.76-1.21,0-2.26-.3-3.15-.89s-1.59-1.46-2.09-2.6c-.5-1.14-.74-2.55-.74-4.21s.25-3.07.74-4.21c.5-1.14,1.19-2.01,2.09-2.6s1.95-.89,3.15-.89,2.26.3,3.15.89c.9.59,1.59,1.46,2.09,2.6.5,1.14.74,2.55.74,4.21,0,.58-.03,1.13-.1,1.65h5.07c.05-.53.08-1.08.08-1.65,0-2.57-.49-4.76-1.46-6.56-.97-1.8-2.29-3.18-3.96-4.13-1.67-.95-3.54-1.42-5.62-1.42s-3.98.47-5.64,1.42c-1.67.95-2.98,2.32-3.95,4.13-.97,1.8-1.45,3.99-1.45,6.56s.48,4.75,1.45,6.55c.97,1.8,2.28,3.18,3.95,4.13,1.67.95,3.55,1.43,5.64,1.43s3.95-.47,5.62-1.42c1.55-.88,2.79-2.13,3.74-3.74h-6.42Z"
          />
        </svg>
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, marginTop: 48, letterSpacing: -2 }}>
          Odin Alexandre
        </div>
        <div style={{ display: 'flex', fontSize: 44, fontWeight: 600, color: '#B8B8B8', marginTop: 8 }}>
          Full Stack Developer
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#959595', marginTop: 40 }}>
          odinalx.fr
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Inter', data: interBold, weight: 700, style: 'normal' }],
    },
  );
}
