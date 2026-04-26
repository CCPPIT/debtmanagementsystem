// استيراد مكتبة React
'use client';

// استيراد مكتبة React مع hooks
import React, { useState } from 'react';
// استيراد مكتبة Framer Motion للرسوم المتحركة
import { motion, AnimatePresence } from 'framer-motion';
// استيراد hook الترجمة من react-i18next
import { useTranslation } from 'react-i18next';
// استيراد مخزن حالة المصادقة
import { useAuthStore } from '../model/authStore';
// استيراد مخططات التحقق
import { baseRegisterSchema } from '../model/schemas';
// استيراد مكونات UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
// استيراد الأيقونات
import { Eye, EyeOff, Loader2, AlertCircle, CheckCircle, Mail, Phone, User, Building2 } from 'lucide-react';

// مكون خطوة التسجيل الأساسي
export default function RegisterStep1() {
  // استخدام hook الترجمة
  const { t } = useTranslation();
  // استخدام مخزن حالة المصادقة
  const { register, isLoading, error, setError, clearError, setTempRegisterData, tempRegisterData } = useAuthStore();
  
  // حالة النموذج
  const [formData, setFormData] = useState({
    accountType: (tempRegisterData.accountType || 'individual') as 'individual' | 'company',
    email: tempRegisterData.email || '',
    phone: tempRegisterData.phone || '',
    username: tempRegisterData.username || '',
    password: tempRegisterData.password || '',
    confirmPassword: tempRegisterData.confirmPassword || '',
    firstName: tempRegisterData.firstName || '',
    lastName: tempRegisterData.lastName || '',
    companyName: tempRegisterData.companyName || '',
    agreeTerms: tempRegisterData.agreeTerms || false,
  });

  // حالة إظهار كلمة المرور
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // حالة قوة كلمة المرور
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | 'veryStrong' | null>(null);

  // حالة أخطاء التحقق
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // دالة التحقق من قوة كلمة المرور
  const checkPasswordStrength = (password: string) => {
    // حساب قوة كلمة المرور
    let strength = 0;
    
    // التحقق من الطول
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // التحقق من الأحرف الكبيرة
    if (/[A-Z]/.test(password)) strength++;
    
    // التحقق من الأحرف الصغيرة
    if (/[a-z]/.test(password)) strength++;
    
    // التحقق من الأرقام
    if (/[0-9]/.test(password)) strength++;
    
    // التحقق من الرموز الخاصة
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // تحديد مستوى القوة
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    if (strength <= 5) return 'strong';
    return 'veryStrong';
  };

  // دالة التعامل مع تغيير الحقول
  const handleFieldChange = (field: string, value: string | boolean | null) => {
    // تحديث حالة النموذج
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // التحقق من قوة كلمة المرور
    if (field === 'password') {
      setPasswordStrength(checkPasswordStrength(value as string));
    }
    
    // مسح الخطأ عند التعديل
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // دالة التحقق من النموذج
  const validateForm = () => {
    try {
      // التحقق من صحة البيانات باستخدام Zod
      baseRegisterSchema.parse(formData);
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
    
    // حفظ البيانات المؤقتة
    setTempRegisterData(formData);
    
    // استدعاء إجراء التسجيل
    await register(formData as any);
  };

  // ألوان قوة كلمة المرور
  const strengthColors = {
    weak: 'bg-red-500',
    medium: 'bg-yellow-500',
    strong: 'bg-green-500',
    veryStrong: 'bg-emerald-500',
  };

  // نصوص قوة كلمة المرور
  const strengthTexts = {
    weak: t('auth.register.weak'),
    medium: t('auth.register.medium'),
    strong: t('auth.register.strong'),
    veryStrong: t('auth.register.veryStrong'),
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
      {/* بطاقة التسجيل */}
      <Card className="w-full max-w-lg mx-auto">
        {/* رأس البطاقة */}
        <CardHeader className="space-y-1">
          {/* عنوان النموذج */}
          <CardTitle className="text-2xl font-bold text-center">
            {t('auth.register.title')}
          </CardTitle>
          {/* وصف النموذج */}
          <CardDescription className="text-center">
            {t('auth.register.subtitle')}
          </CardDescription>
        </CardHeader>
        
        {/* محتوى البطاقة */}
        <CardContent>
          {/* نموذج التسجيل */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* رسالة الخطأ */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* نوع الحساب */}
            <div className="space-y-2">
              <Label htmlFor="accountType">{t('auth.register.accountType')}</Label>
              <Select 
                value={formData.accountType} 
                onValueChange={(value) => handleFieldChange('accountType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('auth.register.accountType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {t('auth.register.individual')}
                    </div>
                  </SelectItem>
                  <SelectItem value="company">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4" />
                      {t('auth.register.company')}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {validationErrors.accountType && (
                <p className="text-sm text-red-500">{validationErrors.accountType}</p>
              )}
            </div>

            {/* الاسم الأول واسم العائلة */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">{t('auth.register.firstName')}</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleFieldChange('firstName', e.target.value)}
                  placeholder={t('auth.register.firstName')}
                  className={validationErrors.firstName ? 'border-red-500' : ''}
                />
                {validationErrors.firstName && (
                  <p className="text-sm text-red-500">{validationErrors.firstName}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">{t('auth.register.lastName')}</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleFieldChange('lastName', e.target.value)}
                  placeholder={t('auth.register.lastName')}
                  className={validationErrors.lastName ? 'border-red-500' : ''}
                />
                {validationErrors.lastName && (
                  <p className="text-sm text-red-500">{validationErrors.lastName}</p>
                )}
              </div>
            </div>

            {/* اسم الشركة (للحسابات الشركات) */}
            {formData.accountType === 'company' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <Label htmlFor="companyName">{t('auth.register.companyName')}</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleFieldChange('companyName', e.target.value)}
                  placeholder={t('auth.register.companyName')}
                  className={validationErrors.companyName ? 'border-red-500' : ''}
                />
                {validationErrors.companyName && (
                  <p className="text-sm text-red-500">{validationErrors.companyName}</p>
                )}
              </motion.div>
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
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                placeholder="example@email.com"
                className={validationErrors.email ? 'border-red-500' : ''}
              />
              {validationErrors.email && (
                <p className="text-sm text-red-500">{validationErrors.email}</p>
              )}
            </div>

            {/* رقم الهاتف */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {t('auth.register.phone')}
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                placeholder="+966500000000"
                className={validationErrors.phone ? 'border-red-500' : ''}
              />
              {validationErrors.phone && (
                <p className="text-sm text-red-500">{validationErrors.phone}</p>
              )}
            </div>

            {/* اسم المستخدم */}
            <div className="space-y-2">
              <Label htmlFor="username">{t('auth.register.username')}</Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleFieldChange('username', e.target.value)}
                placeholder="username"
                className={validationErrors.username ? 'border-red-500' : ''}
              />
              {validationErrors.username && (
                <p className="text-sm text-red-500">{validationErrors.username}</p>
              )}
            </div>

            {/* كلمة المرور */}
            <div className="space-y-2">
              <Label htmlFor="password">{t('auth.register.password')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleFieldChange('password', e.target.value)}
                  placeholder="••••••••"
                  className={validationErrors.password ? 'border-red-500' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-sm text-red-500">{validationErrors.password}</p>
              )}
              
              {/* مؤشر قوة كلمة المرور */}
              {formData.password && passwordStrength && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>{t('auth.register.passwordStrength')}</span>
                    <span className={
                      passwordStrength === 'weak' ? 'text-red-500' :
                      passwordStrength === 'medium' ? 'text-yellow-500' :
                      passwordStrength === 'strong' ? 'text-green-500' :
                      'text-emerald-500'
                    }>
                      {strengthTexts[passwordStrength]}
                    </span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${strengthColors[passwordStrength]}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(passwordStrength === 'weak' ? 25 : passwordStrength === 'medium' ? 50 : passwordStrength === 'strong' ? 75 : 100)}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* تأكيد كلمة المرور */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{t('auth.register.confirmPassword')}</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                  placeholder="••••••••"
                  className={validationErrors.confirmPassword ? 'border-red-500' : ''}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {validationErrors.confirmPassword && (
                <p className="text-sm text-red-500">{validationErrors.confirmPassword}</p>
              )}
            </div>

            {/* الموافقة على الشروط */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => handleFieldChange('agreeTerms', checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('auth.register.terms')}{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  {t('auth.register.privacyPolicy')}
                </a>
              </label>
            </div>
            {validationErrors.agreeTerms && (
              <p className="text-sm text-red-500">{validationErrors.agreeTerms}</p>
            )}

            {/* زر الإرسال */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('auth.register.submit')}...
                </>
              ) : (
                t('auth.register.submit')
              )}
            </Button>
          </form>

          {/* فاصل */}
          <div className="relative my-6">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-2 text-sm text-gray-500">
                {t('auth.register.socialLogin')}
              </span>
            </div>
          </div>

          {/* أزرار التسجيل الاجتماعي */}
          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {t('auth.register.google')}
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {t('auth.register.apple')}
            </Button>
            <Button variant="outline" className="w-full">
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              {t('auth.register.facebook')}
            </Button>
          </div>
        </CardContent>

        {/* تذييل البطاقة */}
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            {t('auth.register.alreadyHaveAccount')}{' '}
            <a href="/login" className="text-blue-600 hover:underline">
              {t('auth.register.login')}
            </a>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
