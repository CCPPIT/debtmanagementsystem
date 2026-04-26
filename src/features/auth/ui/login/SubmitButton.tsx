// استيراد مكتبة React
'use client';

// استيراد مكتبة React
import React from 'react';
// استيراد مكونات Button
import { Button } from '@/components/ui/button';
// استيراد الأيقونات
import { Loader2 } from 'lucide-react';

// واجهة الخصائص
interface SubmitButtonProps {
  isLoading: boolean;
  loadingText?: string;
  defaultText?: string;
  disabled?: boolean;
}

// مكون زر تسجيل الدخول
export default function SubmitButton({
  isLoading,
  loadingText = 'جاري تسجيل الدخول...',
  defaultText = 'تسجيل الدخول',
  disabled = false,
}: SubmitButtonProps) {
  return (
    // زر الإرسال
    <Button
      type="submit"
      className="w-full"
      disabled={isLoading || disabled}
      aria-busy={isLoading}
    >
      {/* عرض حالة التحميل */}
      {isLoading ? (
        <>
          {/* أيقونة التحميل */}
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        defaultText
      )}
    </Button>
  );
}
