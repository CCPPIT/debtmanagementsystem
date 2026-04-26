// استيراد مكتبة React
'use client';

// استيراد مكتبة React مع hooks
import React, { useState, useEffect } from 'react';
// استيراد مكتبة Framer Motion للرسوم المتحركة
import { motion } from 'framer-motion';
// استيراد hook الترجمة من react-i18next
import { useTranslation } from 'react-i18next';
// استيراد مخزن حالة المصادقة
import { useAuthStore } from '../model/authStore';
// استيراد مخططات التحقق
import { emailVerificationSchema, phoneVerificationSchema } from '../model/schemas';
// استيراد مكونات UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
// استيراد الأيقونات
import { Loader2, AlertCircle, Mail, Phone, ArrowLeft } from 'lucide-react';

// مكون خطوة التحقق
export default function VerificationStep() {
  // استخدام hook الترجمة
  const { t } = useTranslation();
  // استخدام مخزن حالة المصادقة
  const { 
    verifyEmail, 
    verifyPhone, 
    resendVerificationCode,
    isLoading, 
    error, 
    setError, 
    clearError,
    tempRegisterData,
    accountType,
    setCurrentStep,
  } = useAuthStore();
  
  // حالة نوع التحقق (بريد أو هاتف)
  const [verificationType, setVerificationType] = useState<'email' | 'phone'>('email');
  
  // حالة رمز التحقق
  const [otpCode, setOtpCode] = useState('');
  
  // حالة أخطاء التحقق
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
  // حالة عداد إعادة الإرسال
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // عداد إعادة الإرسال
  useEffect(() => {
    // إذا كان العداد أكبر من 0
    if (resendTimer > 0) {
      // إنشاء مؤقت
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      
      // تنظيف المؤقت
      return () => clearTimeout(timer);
    } else {
      // السماح بإعادة الإرسال
      setCanResend(true);
    }
  }, [resendTimer]);

  // دالة التعامل مع تغيير رمز التحقق
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // الحصول على القيمة
    const value = e.target.value;
    
    // السماح بالأرقام فقط
    if (value === '' || /^[0-9]+$/.test(value)) {
      // تحديث رمز التحقق (6 أرقام كحد أقصى)
      setOtpCode(value.slice(0, 6));
      
      // مسح الخطأ
      if (validationErrors.otp) {
        setValidationErrors({});
      }
    }
  };

  // دالة التحقق من النموذج
  const validateForm = () => {
    try {
      // التحقق من صحة البيانات باستخدام Zod
      if (verificationType === 'email') {
        emailVerificationSchema.parse({
          email: tempRegisterData.email,
          otp: otpCode,
        });
      } else {
        phoneVerificationSchema.parse({
          phone: tempRegisterData.phone,
          otp: otpCode,
        });
      }
      
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
    
    // استدعاء إجراء التحقق
    if (verificationType === 'email') {
      await verifyEmail({
        email: tempRegisterData.email || '',
        otp: otpCode,
      });
    } else {
      await verifyPhone({
        phone: tempRegisterData.phone || '',
        otp: otpCode,
      });
    }
  };

  // دالة التعامل مع إعادة الإرسال
  const handleResend = async () => {
    // إذا لم يكن بإمكاننا إعادة الإرسال
    if (!canResend) return;
    
    // مسح رسالة الخطأ
    clearError();
    
    // استدعاء إجراء إعادة الإرسال
    await resendVerificationCode(verificationType);
    
    // إعادة تعيين العداد
    setResendTimer(60);
    setCanResend(false);
  };

  // دالة التعامل مع الرجوع
  const handleBack = () => {
    // الرجوع إلى الخطوة السابقة
    setCurrentStep(1);
  };

  return (
    // حاوية الرسوم المتحركة
    <motion.div
      // إعدادات الحركة
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* بطاقة التحقق */}
      <Card className="w-full max-w-lg mx-auto">
        {/* رأس البطاقة */}
        <CardHeader className="space-y-1">
          {/* زر الرجوع */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="w-fit -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t('auth.register.previous')}
          </Button>
          
          {/* عنوان النموذج */}
          <CardTitle className="text-2xl font-bold text-center">
            {verificationType === 'email' 
              ? t('auth.register.verifyEmail') 
              : t('auth.register.verifyPhone')}
          </CardTitle>
          {/* وصف النموذج */}
          <CardDescription className="text-center">
            {verificationType === 'email' 
              ? t('auth.register.checkEmail') 
              : t('auth.register.checkPhone')}
          </CardDescription>
        </CardHeader>
        
        {/* محتوى البطاقة */}
        <CardContent>
          {/* أزرار اختيار نوع التحقق */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={verificationType === 'email' ? 'default' : 'outline'}
              onClick={() => setVerificationType('email')}
              className="flex-1"
            >
              <Mail className="h-4 w-4 mr-2" />
              {t('auth.register.email')}
            </Button>
            <Button
              variant={verificationType === 'phone' ? 'default' : 'outline'}
              onClick={() => setVerificationType('phone')}
              className="flex-1"
            >
              <Phone className="h-4 w-4 mr-2" />
              {t('auth.register.phone')}
            </Button>
          </div>

          {/* نموذج التحقق */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* رسالة الخطأ */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* عرض البريد الإلكتروني أو رقم الهاتف */}
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-600 mb-1">
                {verificationType === 'email' ? t('auth.register.email') : t('auth.register.phone')}
              </p>
              <p className="font-medium">
                {verificationType === 'email' 
                  ? tempRegisterData.email 
                  : tempRegisterData.phone}
              </p>
            </div>

            {/* رمز التحقق */}
            <div className="space-y-2">
              <Label htmlFor="otp">{t('auth.register.verificationCode')}</Label>
              <Input
                id="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otpCode}
                onChange={handleOtpChange}
                placeholder="000000"
                className={`text-center text-2xl tracking-widest ${validationErrors.otp ? 'border-red-500' : ''}`}
              />
              {validationErrors.otp && (
                <p className="text-sm text-red-500">{validationErrors.otp}</p>
              )}
            </div>

            {/* زر إعادة الإرسال */}
            <div className="text-center">
              <Button
                type="button"
                variant="link"
                onClick={handleResend}
                disabled={!canResend || isLoading}
              >
                {canResend 
                  ? t('auth.register.resendCode') 
                  : t('auth.register.resendIn', { seconds: resendTimer })}
              </Button>
            </div>

            {/* زر الإرسال */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || otpCode.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري التحقق...
                </>
              ) : (
                'تحقق'
              )}
            </Button>
          </form>
        </CardContent>

        {/* تذييل البطاقة */}
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-600">
            لم تستلم الرمز؟ تحقق من مجلد البريد العشوائي أو أعد المحاولة لاحقاً
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
