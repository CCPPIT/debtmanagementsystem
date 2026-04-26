// استيراد مكتبة React
'use client';

// استيراد مكتبة React مع hooks
import React, { useState } from 'react';
// استيراد مكتبة Framer Motion للرسوم المتحركة
import { motion } from 'framer-motion';
// استيراد مخزن حالة المصادقة
import { useAuthStore } from '../model/authStore';
// استيراد مكونات UI
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// استيراد مكونات تسجيل الدخول المنفصلة
import {
  ErrorMessage,
  IdentifierField,
  PasswordField,
  ForgotPasswordLink,
  SubmitButton,
  SeparatorWithText,
  SocialLoginButtons,
} from './login';

// مكون بطاقة تسجيل الدخول الرئيسية
function LoginCard() {
  return (
    // بطاقة متجاوبة مع تأثيرات زجاجية
    <Card className="w-full backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-700 shadow-2xl rounded-2xl sm:rounded-3xl">
      {/* رأس البطاقة - حجم متجاوب */}
      <CardHeader className="space-y-3 sm:space-y-4 px-4 sm:px-6 pt-6 sm:pt-8">
        {/* الشعار - يظهر فقط على الموبايل */}
        <div className="flex justify-center lg:hidden mb-2">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        
        {/* عنوان النموذج - حجم نص متجاوب */}
        <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-gray-900 dark:text-white">
          تسجيل الدخول
        </CardTitle>
        {/* وصف النموذج - حجم نص متجاوب */}
        <CardDescription className="text-center text-sm sm:text-base text-gray-600 dark:text-gray-400">
          أدخل بياناتك لتسجيل الدخول إلى حسابك
        </CardDescription>
      </CardHeader>
      
      {/* محتوى البطاقة - حشوة متجاوبة */}
      <CardContent className="px-4 sm:px-6 pb-6 sm:pb-8">
        <LoginForm />

        <SeparatorWithText />

        <SocialLoginButtons />
      </CardContent>

      <LoginFooter />
    </Card>
  );
}

// مكون نموذج تسجيل الدخول الرئيسي
function LoginForm() {
  // استخدام مخزن حالة المصادقة
  const { login, isLoading, error, clearError } = useAuthStore();
  
  // حالة النموذج
  const [formData, setFormData] = useState({
    identifier: '',
    password: '',
  });

  // حالة أخطاء التحقق
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // دالة التعامل مع تغيير حقل المعرف
  const handleIdentifierChange = (value: string) => {
    setFormData(prev => ({ ...prev, identifier: value }));
    
    if (validationErrors.identifier) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.identifier;
        return newErrors;
      });
    }
  };

  // دالة التعامل مع تغيير كلمة المرور
  const handlePasswordChange = (value: string) => {
    setFormData(prev => ({ ...prev, password: value }));
    
    if (validationErrors.password) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.password;
        return newErrors;
      });
    }
  };

  // دالة التحقق من صحة النموذج
  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.identifier.trim()) {
      errors.identifier = 'البريد الإلكتروني أو اسم المستخدم مطلوب';
    }
    
    if (!formData.password) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }
    
    setValidationErrors(errors);
    
    return Object.keys(errors).length === 0;
  };

  // دالة التعامل مع إرسال النموذج
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!validateForm()) {
      return;
    }
    
    await login(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* عرض رسالة الخطأ */}
      {error && (
        <ErrorMessage message={error} />
      )}

      {/* حقل البريد الإلكتروني/اسم المستخدم */}
      <IdentifierField
        value={formData.identifier}
        onChange={handleIdentifierChange}
        error={validationErrors.identifier}
        disabled={isLoading}
      />

      {/* حقل كلمة المرور */}
      <PasswordField
        value={formData.password}
        onChange={handlePasswordChange}
        error={validationErrors.password}
        disabled={isLoading}
        showStrength={false}
      />

      {/* رابط نسيت كلمة المرور */}
      <ForgotPasswordLink />

      {/* زر تسجيل الدخول */}
      <SubmitButton
        isLoading={isLoading}
        loadingText="جاري تسجيل الدخول..."
        defaultText="تسجيل الدخول"
      />
    </form>
  );
}

// مكون تذييل البطاقة
function LoginFooter() {
  return (
    <CardFooter className="flex flex-col space-y-4">
      <div className="text-center text-sm">
        ليس لديك حساب؟{' '}
        <a href="/register" className="text-blue-600 hover:underline">
          إنشاء حساب جديد
        </a>
      </div>
    </CardFooter>
  );
}

// مكون صفحة تسجيل الدخول الرئيسية
export default function LoginPage() {
  return (
    // الحاوية الرئيسية - متجاوبة مع جميع الأحجام
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900">
      {/* الخلفية الزخرفية - تتكيف مع حجم الشاشة */}
      <div className="absolute inset-0 overflow-hidden">
        {/* الدوائر الزخرفية - مخفية على الموبايل */}
        <div className="hidden sm:block absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob" />
        <div className="hidden sm:block absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        <div className="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      </div>

      {/* حاوية المحتوى - متجاوبة */}
      <div className="relative min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        {/* الشبكة - عمود واحد على الموبايل، عمودين على التابلت والديسكتوب */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* القسم الأيسر - معلومات إضافية (مخفي على الموبايل) */}
          <div className="hidden lg:flex flex-col space-y-8">
            {/* العنوان الرئيسي */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl xl:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                مرحباً بك في نظام إدارة الديون
              </h1>
              <p className="text-lg xl:text-xl text-gray-600 dark:text-gray-300">
                نظام شامل ومتكامل لإدارة الديون والبقالات بكفاءة عالية
              </p>
            </motion.div>

            {/* المميزات - شبكة 2x2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {/* ميزة 1 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">أمان عالي</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">حماية متقدمة لبياناتك مع تشفير شامل</p>
              </div>

              {/* ميزة 2 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">سرعة فائقة</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">أداء محسّن لتجربة مستخدم سلسة</p>
              </div>

              {/* ميزة 3 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">متجاوب</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">يعمل على جميع الأجهزة بسلاسة</p>
              </div>

              {/* ميزة 4 */}
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">متعدد اللغات</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">دعم كامل للعربية والإنجليزية</p>
              </div>
            </motion.div>

            {/* إحصائيات */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center space-x-8"
            >
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">+1000</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">مستخدم نشط</div>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600" />
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">+5000</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">عملية يومية</div>
              </div>
              <div className="w-px h-12 bg-gray-300 dark:bg-gray-600" />
              <div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white">99.9%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">وقت التشغيل</div>
              </div>
            </motion.div>
          </div>

          {/* القسم الأيمن - نموذج تسجيل الدخول */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center"
          >
            {/* حاوية البطاقة - متجاوبة */}
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-md xl:max-w-lg">
              <LoginCard />
            </div>
          </motion.div>
        </div>
      </div>

      {/* CSS مخصص للرسوم المتحركة - استخدام global لتجنب مشاكل hydration */}
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
