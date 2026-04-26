// استيراد مكتبة React
'use client';

// استيراد مكتبة React
import React from 'react';
// استيراد مكونات UI
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// استيراد الأيقونات
import { Mail } from 'lucide-react';

// واجهة الخصائص
interface IdentifierFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}

// مكون حقل إدخال البريد الإلكتروني/اسم المستخدم
export default function IdentifierField({
  value,
  onChange,
  error,
  placeholder = 'example@email.com',
  disabled = false,
}: IdentifierFieldProps) {
  return (
    // حاوية الحقل
    <div className="space-y-2">
      {/* التسمية مع أيقونة */}
      <Label htmlFor="identifier" className="flex items-center gap-2">
        <Mail className="h-4 w-4" />
        البريد الإلكتروني أو اسم المستخدم
      </Label>
      
      {/* حقل الإدخال */}
      <Input
        id="identifier"
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        // تغيير لون الحدود عند وجود خطأ
        className={error ? 'border-red-500 focus-visible:ring-red-500' : ''}
        // دعم إمكانية الوصول
        aria-invalid={!!error}
        aria-describedby={error ? 'identifier-error' : undefined}
        autoComplete="email"
      />
      
      {/* عرض رسالة الخطأ إن وجدت */}
      {error && (
        <p 
          id="identifier-error"
          className="text-sm text-red-500 flex items-center gap-1"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
