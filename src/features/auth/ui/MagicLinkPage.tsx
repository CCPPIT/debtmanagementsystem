// استيراد مكتبة React
'use client';

// استيراد مكتبة React مع hooks
import React, { useState } from 'react';
// استيراد مكتبة Framer Motion للرسوم المتحركة
import { motion } from 'framer-motion';
// استيراد hook الترجمة من react-i18next
import { useTranslation } from 'react-i18next';
// استيراد مخزن حالة المصادقة
import { useAuthStore } from '../model/authStore';
// استيراد مخططات التحقق
import { magicLinkSchema } from '../model/schemas';
// استيراد مكونات UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
// استيراد الأيقونات
import { Loader2, AlertCircle, Mail, CheckCircle } from 'lucide-react';

// مكون صفحة الرابط السحري
export default function MagicLinkPage() {
  // استخدام hook الترجمة
  const { t } = useTranslation();
  // استخدام مخزن حالة المصادقة
  const { sendMagicLink, isLoading, error, clearError } = useAuthStore();
  
  // حالة النموذج
  const [email, setEmail] = useState('');
  // حالة نجاح الإرسال
  const [isSent, setIsSent] = useState(false);
  // حالة أخطاء التحقق
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // دالة التعامل مع تغيير البريد الإلكتروني
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // تحديث البريد الإلكتروني
    setEmail(e.target.value);
    
    // مسح الخطأ
    if (validationErrors.email) {
      setValidationErrors({});
    }
  };

  // دالة التحقق من النموذج
  const validateForm = () => {
    try {
      // التحقق من صحة البيانات باستخدام Zod
      magicLinkSchema.parse({ email });
      // مسح أخطاء التحقق
      setValidationErrors({});
      return true;
    } catch (error: any) {
      // استخراج أخطاء التحقق
      const errors: Record<string, string> = {};
      if (error.errors) {
        error.errors.forEach((err: any) => {
          if (err.path) {
            errors[err.path[0]] = err.message;
          }
        });
      }
      // تعيين أخطاء التحقق
      setValidationErrors(errors);
      return false;
    }
  };

  // دالة التعامل مع إرسال النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    // منع الإرسال الافتراضي
    e.preventDefault();
    // مسح رسالة الخطأ
    clearError();
    
    // التحقق من صحة النموذج
    if (!validateForm()) {
      return;
    }
    
    // استدعاء إرسال الرابط السحري
    await sendMagicLink(email);
    
    // تعيين حالة النجاح
    setIsSent(true);
  };

  return (
    // حاوية الرسوم المتحركة
    <motion.div
      // إعدادات الحركة
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* بطاقة الرابط السحري */}
      <Card className="w-full max-w-md mx-auto">
        {/* رأس البطاقة */}
        <CardHeader className="space-y-1">
          {/* عنوان النموذج */}
          <CardTitle className="text-2xl font-bold text-center">
            {t('auth.register.magicLink')}
          </CardTitle>
          {/* وصف النموذج */}
          <CardDescription className="text-center">
            {t('auth.register.magicLinkSubtitle')}
          </CardDescription>
        </CardHeader>
        
        {/* محتوى البطاقة */}
        <CardContent>
          {/* حالة النجاح */}
          {isSent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">
                {t('auth.register.checkEmail')}
              </h3>
              <p className="text-gray-600">
                تم إرسال رابط تسجيل الدخول إلى بريدك الإلكتروني
              </p>
              <p className="text-sm text-gray-500">
                البريد: <span className="font-medium">{email}</span>
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSent(false);
                  setEmail('');
                }}
                className="mt-4"
              >
                إرسال مرة أخرى
              </Button>
            </motion.div>
          ) : (
            /* نموذج الإرسال */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* رسالة الخطأ */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* البريد الإلكتروني */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t('auth.register.email')}
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="example@email.com"
                  className={validationErrors.email ? 'border-red-500' : ''}
                />
                {validationErrors.email && (
                  <p className="text-sm text-red-500">{validationErrors.email}</p>
                )}
              </div>

              {/* زر الإرسال */}
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('auth.register.sendMagicLink')}...
                  </>
                ) : (
                  t('auth.register.sendMagicLink')
                )}
              </Button>
            </form>
          )}
        </CardContent>

        {/* تذييل البطاقة */}
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            تذكر كلمة المرور؟{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              تسجيل الدخول
            </a>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
