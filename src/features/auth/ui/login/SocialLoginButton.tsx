// استيراد مكتبة React
'use client';

// استيراد مكتبة React
import React from 'react';
// استيراد مكونات Button
import { Button } from '@/components/ui/button';

// واجهة الخصائص
interface SocialLoginButtonProps {
  provider: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

// مكون زر تسجيل الدخول الاجتماعي
export default function SocialLoginButton({
  provider,
  icon,
  onClick,
  disabled = false,
}: SocialLoginButtonProps) {
  return (
    // زر التسجيل الاجتماعي
    <Button 
      variant="outline" 
      className="w-full" 
      onClick={onClick}
      disabled={disabled}
      type="button"
      aria-label={`تسجيل الدخول باستخدام ${provider}`}
    >
      {/* أيقونة المزود */}
      <span className="mr-2">{icon}</span>
      {/* اسم المزود */}
      {provider}
    </Button>
  );
}
