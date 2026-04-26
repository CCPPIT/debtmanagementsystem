// استيراد مكتبة React
'use client';

// استيراد مكتبة Framer Motion للرسوم المتحركة
import { motion } from 'framer-motion';
// استيراد مكونات Alert
import { Alert, AlertDescription } from '@/components/ui/alert';
// استيراد الأيقونات
import { AlertCircle } from 'lucide-react';

// واجهة الخصائص
interface ErrorMessageProps {
  message: string;
}

// مكون عرض رسالة الخطأ
export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    // حاوية رسالة الخطأ مع رسوم متحركة
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {/* مكون Alert للخطأ */}
      <Alert variant="destructive">
        {/* أيقونة الخطأ */}
        <AlertCircle className="h-4 w-4" />
        {/* نص الخطأ */}
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </motion.div>
  );
}
