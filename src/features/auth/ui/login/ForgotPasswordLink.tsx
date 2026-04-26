// استيراد مكتبة React
'use client';

// واجهة الخصائص
interface ForgotPasswordLinkProps {
  href?: string;
  text?: string;
}

// مكون رابط نسيت كلمة المرور
export default function ForgotPasswordLink({
  href = '/forgot-password',
  text = 'نسيت كلمة المرور؟',
}: ForgotPasswordLinkProps) {
  return (
    // حاوية الرابط
    <div className="flex justify-end">
      {/* رابط نسيت كلمة المرور */}
      <a 
        href={href} 
        className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
      >
        {text}
      </a>
    </div>
  );
}
