// استيراد مكتبة React
'use client';

// استيراد مكتبة React مع hooks
import React, { useState } from 'react';
// استيراد مكونات UI
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// استيراد الأيقونات
import { Eye, EyeOff, Lock } from 'lucide-react';

// واجهة الخصائص
interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  showStrength?: boolean;
}

// مكون حقل إدخال كلمة المرور
export default function PasswordField({
  value,
  onChange,
  error,
  placeholder = '••••••••',
  disabled = false,
  showStrength = false,
}: PasswordFieldProps) {
  // حالة إظهار/إخفاء كلمة المرور
  const [showPassword, setShowPassword] = useState(false);

  // دالة تبديل إظهار كلمة المرور
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // حساب قوة كلمة المرور
  const getPasswordStrength = (): { strength: string; color: string; width: string } => {
    if (!value) return { strength: '', color: '', width: '0%' };
    
    let strength = 0;
    if (value.length >= 6) strength++;
    if (value.length >= 8) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/[0-9]/.test(value)) strength++;
    if (/[^A-Za-z0-9]/.test(value)) strength++;

    if (strength <= 2) return { strength: 'ضعيفة', color: 'bg-red-500', width: '25%' };
    if (strength <= 3) return { strength: 'متوسطة', color: 'bg-yellow-500', width: '50%' };
    if (strength <= 4) return { strength: 'قوية', color: 'bg-green-500', width: '75%' };
    return { strength: 'قوية جداً', color: 'bg-emerald-500', width: '100%' };
  };

  const passwordStrength = showStrength ? getPasswordStrength() : null;

  return (
    // حاوية الحقل
    <div className="space-y-2">
      {/* التسمية مع أيقونة */}
      <Label htmlFor="password" className="flex items-center gap-2">
        <Lock className="h-4 w-4" />
        كلمة المرور
      </Label>
      
      {/* حاوية نسبية للحقل والزر */}
      <div className="relative">
        {/* حقل إدخال كلمة المرور */}
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          // تغيير لون الحدود عند وجود خطأ
          className={error ? 'border-red-500 focus-visible:ring-red-500 pr-10' : 'pr-10'}
          // دعم إمكانية الوصول
          aria-invalid={!!error}
          aria-describedby={error ? 'password-error' : undefined}
          autoComplete="current-password"
        />
        
        {/* زر إظهار/إخفاء كلمة المرور */}
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
          aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
        >
          {/* تبديل الأيقونة حسب الحالة */}
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      
      {/* عرض رسالة الخطأ إن وجدت */}
      {error && (
        <p 
          id="password-error"
          className="text-sm text-red-500 flex items-center gap-1"
          role="alert"
        >
          {error}
        </p>
      )}

      {/* مؤشر قوة كلمة المرور */}
      {showStrength && value && passwordStrength && (
        <div className="space-y-1 mt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">قوة كلمة المرور:</span>
            <span className={`font-medium ${
              passwordStrength.strength === 'ضعيفة' ? 'text-red-500' :
              passwordStrength.strength === 'متوسطة' ? 'text-yellow-500' :
              passwordStrength.strength === 'قوية' ? 'text-green-500' :
              'text-emerald-500'
            }`}>
              {passwordStrength.strength}
            </span>
          </div>
          <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${passwordStrength.color} transition-all duration-300`}
              style={{ width: passwordStrength.width }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
