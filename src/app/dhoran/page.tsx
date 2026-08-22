import React from 'react';
import DhoranSection from '@/components/home/DhoranSection';

export const metadata = {
  title: 'ધોરણ ૭ થી ૧૨ અભ્યાસક્રમ | વિદ્યા વાણી એપ',
  description: 'ધોરણ ૭, ૮, ૯, ૧૦, ૧૧ અને ૧૨ ના તમામ વિષયોના વિડિઓ લેક્ચર્સ અને અભ્યાસ નોંધો.',
};

export default function DhoranListPage() {
  return (
    <div className="py-8">
      <DhoranSection />
    </div>
  );
}
