// استيراد مكتبة React
'use client';

// استيراد مكتبة React مع hooks
import React, { useEffect } from 'react';
// استيراد مكتبة Framer Motion للرسوم المتحركة
import { AnimatePresence, motion } from 'framer-motion';
// استيراد hook الترجمة من react-i18next
import { useTranslation } from 'react-i18next';
// استيراد مخزن حالة المصادقة
import { useAuthStore } from '../model/authStore';
// استيراد مكونات الخطوات
import RegisterStep1 from './RegisterStep1';
import VerificationStep from './VerificationStep';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// مكون زر تبديل اللغة
function LanguageToggle({ i18n }: { i18n: any }) {
  // دالة تبديل اللغة
  const toggleLanguage = () => {
    if (i18n.language === 'ar') {
      i18n.changeLanguage('en');
    } else {
      i18n.changeLanguage('ar');
    }
  };

  return (
    // زر متجاوب مع دعم الوضع الداكن
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLanguage}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 px-4 sm:px-6 py-2 sm:py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300"
    >
      <span className="flex items-center gap-2">
        {/* أيقونة الكرة الأرضية */}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
        {i18n.language === 'ar' ? 'English' : 'العربية'}
      </span>
    </motion.button>
  );
}

// مكون مؤشر الخطوات
function StepIndicator({ currentStep, totalSteps = 3 }: { currentStep: number; totalSteps?: number }) {
  // خطوات التسجيل
  const steps = [
    { number: 1, title: 'البيانات الأساسية' },
    { number: 2, title: 'التحقق' },
    { number: 3, title: 'اكتمال التسجيل' },
  ];

  return (
    // حاوية المؤشر - متجاوبة مع دعم الوضع الداكن
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6">
      {/* البطاقة */}
      <Card className="p-4 sm:p-6 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 shadow-xl">
        {/* شبكة الخطوات */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              {/* خطوة */}
              <motion.div
                initial={false}
                animate={{
                  scale: currentStep === step.number ? 1.1 : 1,
                }}
                className="flex flex-col items-center gap-2"
              >
                {/* دائرة الخطوة */}
                <div
                  className={`
                    w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-bold transition-all duration-300
                    ${
                      currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : currentStep === step.number
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }
                  `}
                >
                  {currentStep > step.number ? (
                    // أيقونة الصح للخطوات المكتملة
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    // رقم الخطوة
                    step.number
                  )}
                </div>
                
                {/* عنوان الخطوة - مخفي على الموبايل */}
                <div className="hidden sm:block text-center">
                  <div
                    className={`
                      text-xs font-medium whitespace-nowrap
                      ${
                        currentStep >= step.number
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400'
                      }
                    `}
                  >
                    {step.title}
                  </div>
                </div>
              </motion.div>

              {/* خط الربط بين الخطوات */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2 sm:mx-4 mb-8 sm:mb-10">
                  <div className="h-1 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                      initial={{ width: '0%' }}
                      animate={{
                        width: currentStep > step.number ? '100%' : '0%',
                      }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </Card>
    </div>
  );
}

// مكون شاشة النجاح
function SuccessScreen() {
  return (
    // حاوية النجاح مع رسوم متحركة
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      {/* بطاقة النجاح */}
      <Card className="p-8 sm:p-12 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl sm:rounded-3xl text-center">
        {/* أيقونة النجاح */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
        >
          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>

        {/* عنوان النجاح */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4"
        >
          تم إنشاء الحساب بنجاح!
        </motion.h2>

        {/* وصف النجاح */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 dark:text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base"
        >
          يمكنك الآن تسجيل الدخول والبدء في استخدام النظام
        </motion.p>

        {/* زر تسجيل الدخول */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <a 
            href="/login"
            className="block w-full px-8 py-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-center text-base sm:text-lg"
          >
            تسجيل الدخول الآن
            <svg className="w-5 h-5 mr-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>

        {/* معلومات إضافية */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            تم إرسال بريد إلكتروني للتأكيد إلى بريدك الإلكتروني
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
}

// مكون الخلفية الزخرفية
function DecorativeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* دوائر زخرفية - مخفية على الموبايل */}
      <div className="hidden sm:block absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob" />
      <div className="hidden sm:block absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="hidden sm:block absolute top-1/3 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
    </div>
  );
}

// مكون صفحة التسجيل الرئيسية
export default function RegisterPage() {
  // استخدام hook الترجمة
  const { i18n } = useTranslation();
  // استخدام مخزن حالة المصادقة
  const { currentStep, isEmailVerified, isPhoneVerified } = useAuthStore();

  // تعيين اتجاه الصفحة حسب اللغة
  useEffect(() => {
    if (i18n.language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ar';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = 'en';
    }
  }, [i18n.language]);

  return (
    // الحاوية الرئيسية - متجاوبة مع جميع الأجهزة
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 relative">
      {/* الخلفية الزخرفية */}
      <DecorativeBackground />

      {/* زر تبديل اللغة */}
      <LanguageToggle i18n={i18n} />

      {/* حاوية المحتوى الرئيسية */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        {/* شبكة المحتوى - عمود واحد */}
        <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* مؤشر الخطوات */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StepIndicator currentStep={currentStep} />
          </motion.div>

          {/* منطقة المحتوى */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {/* الخطوة 1: التسجيل الأساسي */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl"
                >
                  <RegisterStep1 />
                </motion.div>
              )}

              {/* الخطوة 2: التحقق */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-md sm:max-w-lg"
                >
                  <VerificationStep />
                </motion.div>
              )}

              {/* الخطوة 3: النجاح */}
              {currentStep === 3 && (isEmailVerified || isPhoneVerified) && (
                <SuccessScreen />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* CSS مخصص للرسوم المتحركة - استخدام global بدلاً من jsx لتجنب مشاكل hydration */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
