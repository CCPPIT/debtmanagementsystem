// استيراد مكتبة React
'use client';

// استيراد مكتبة React مع hooks
import React, { useEffect } from 'react';
// استيراد i18n
import i18n from '@/features/auth/lib/i18n';
// استيراد I18nextProvider من react-i18next
import { I18nextProvider } from 'react-i18next';

// مكون Provider للتطبيق
export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // استخدام i18n
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
