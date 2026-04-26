// استيراد مكتبة React
'use client';

// استيراد مكونات Separator
import { Separator } from '@/components/ui/separator';

// واجهة الخصائص
interface SeparatorWithTextProps {
  text?: string;
}

// مكون فاصل "أو"
export default function SeparatorWithText({
  text = 'أو تسجيل الدخول باستخدام',
}: SeparatorWithTextProps) {
  return (
    // حاوية الفاصل
    <div className="relative my-6">
      {/* خط الفاصل */}
      <Separator />
      {/* النص في المنتصف */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="bg-white dark:bg-gray-900 px-2 text-sm text-gray-500 dark:text-gray-400">
          {text}
        </span>
      </div>
    </div>
  );
}
