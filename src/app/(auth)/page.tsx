// استيراد مكتبة React
'use client';

// استيراد مكتبة Framer Motion للرسوم المتحركة
import { motion } from 'framer-motion';
// استيراد hook الترجمة من react-i18next
import { useTranslation } from 'react-i18next';
// استيراد مكونات UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// مكون الصفحة الرئيسية للمصادقة
export default function AuthHomePage() {
  // استخدام hook الترجمة
  const { t } = useTranslation();

  return (
    // حاوية الرسوم المتحركة
    <motion.div
      // إعدادات الحركة
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"
    >
      {/* البطاقة الرئيسية */}
      <Card className="w-full max-w-4xl">
        {/* رأس البطاقة */}
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-bold">
            نظام إدارة الديون
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            نظام شامل لإدارة الديون والبقالات
          </CardDescription>
        </CardHeader>

        {/* محتوى البطاقة */}
        <CardContent>
          {/* شبكة الخيارات */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {/* تسجيل الدخول */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
                  <CardDescription>
                    أدخل إلى حسابك الحالي
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a href="/login" className="block">
                    <Button className="w-full">تسجيل الدخول</Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* إنشاء حساب */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">إنشاء حساب</CardTitle>
                  <CardDescription>
                    أنشئ حساب جديد الآن
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a href="/register" className="block">
                    <Button variant="default" className="w-full">إنشاء حساب</Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* الرابط السحري */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">الرابط السحري</CardTitle>
                  <CardDescription>
                    تسجيل دخول بدون كلمة مرور
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a href="/magic-link" className="block">
                    <Button variant="outline" className="w-full">إرسال الرابط</Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>

            {/* الحسابات الاجتماعية */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="text-2xl">الحسابات الاجتماعية</CardTitle>
                  <CardDescription>
                    إدارة الحسابات المرتبطة
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <a href="/social-accounts" className="block">
                    <Button variant="outline" className="w-full">إدارة الحسابات</Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* معلومات إضافية */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">مميزات النظام</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">تسجيل متعدد الخطوات</h4>
                  <p className="text-sm text-gray-600">عملية تسجيل سهلة ومنظمة</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">تحقق من قوة كلمة المرور</h4>
                  <p className="text-sm text-gray-600">حماية حسابك بأمان عالي</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">دعم اللغة العربية</h4>
                  <p className="text-sm text-gray-600">واجهة كاملة بالعربية والإنجليزية</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">تسجيل اجتماعي</h4>
                  <p className="text-sm text-gray-600">Google, Apple, Facebook</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
