# 📘 دليل نظام المصادقة والصلاحيات

## 🎯 مقدمة

هذا الدليل يشرح بالتفصيل نظام المصادقة والصلاحيات الذي تم بناؤه باستخدام:
- **Feature-Sliced Design (FSD)** - منهجية تنظيم الكود
- **Zustand** - إدارة الحالة
- **Zod** - التحقق من صحة البيانات
- **Framer Motion** - الرسوم المتحركة
- **i18next** - الترجمة المتعددة اللغات

---

## 📂 بنية المجلدات

```
src/features/auth/
│
├── lib/                          # المكتبات المساعدة
│   └── i18n.ts                   # إعدادات الترجمة (i18next)
│
├── model/                        # طبقة البيانات والمنطق
│   ├── schemas.ts                # مخططات التحقق من الصحة (Zod)
│   └── authStore.ts              # مخزن حالة المصادقة (Zustand)
│
├── ui/                           # مكونات واجهة المستخدم
│   ├── RegisterStep1.tsx         # الخطوة الأولى من التسجيل
│   ├── VerificationStep.tsx      # خطوة التحقق من البريد/الهاتف
│   ├── RegisterPage.tsx          # صفحة التسجيل الرئيسية
│   ├── LoginPage.tsx             # صفحة تسجيل الدخول
│   ├── MagicLinkPage.tsx         # صفحة الرابط السحري
│   └── SocialAccountsManager.tsx # إدارة الحسابات الاجتماعية
│
└── api/                          # واجهات برمجة التطبيقات (قيد الإنشاء)
```

---

## 🔧 الإعداد والتثبيت

### 1. تثبيت المكتبات المطلوبة

```bash
npm install zod i18next react-i18next i18next-browser-languagedetector
```

### 2. تهيئة i18n في التطبيق

تم إنشاء ملف `src/app/providers.tsx` لتوفير الترجمة في جميع أنحاء التطبيق:

```typescript
'use client';

import React from 'react';
import i18n from '@/features/auth/lib/i18n';
import { I18nextProvider } from 'react-i18next';

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
```

### 3. تحديث Layout الرئيسي

تم تحديث `src/app/layout.tsx` لاستخدام Provider:

```typescript
import AppProvider from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
```

---

## 📝 مخططات التحقق من الصحة (Zod Schemas)

### 1. التحقق من كلمة المرور

```typescript
export const passwordSchema = z
  .string()
  .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
  .regex(/[A-Z]/, 'كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل')
  .regex(/[a-z]/, 'كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل')
  .regex(/[0-9]/, 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل')
  .regex(/[^A-Za-z0-9]/, 'كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل')
  .refine((password) => {
    const lowerPassword = password.toLowerCase();
    if (commonPasswords.includes(lowerPassword)) {
      return false;
    }
    return true;
  }, 'هذه كلمة مرور شائعة، يرجى اختيار كلمة أخرى');
```

**المتطلبات:**
- ✅ 8 أحرف على الأقل
- ✅ حرف كبير واحد (A-Z)
- ✅ حرف صغير واحد (a-z)
- ✅ رقم واحد (0-9)
- ✅ رمز خاص (!@#$%^&*...)
- ✅ عدم استخدام كلمات مرور شائعة

### 2. التحقق من البريد الإلكتروني

```typescript
export const emailSchema = z
  .string()
  .min(1, 'البريد الإلكتروني مطلوب')
  .email('صيغة البريد الإلكتروني غير صحيحة');
```

### 3. التحقق من رقم الهاتف

```typescript
export const phoneSchema = z
  .string()
  .min(1, 'رقم الهاتف مطلوب')
  .regex(/^\+?[0-9\s\-()]{8,}$/, 'صيغة رقم الهاتف غير صحيحة');
```

**الصيغ المسموحة:**
- `+966500000000`
- `0500000000`
- `+966-50-000-0000`
- `(050) 000-0000`

### 4. التحقق من اسم المستخدم

```typescript
export const usernameSchema = z
  .string()
  .min(1, 'اسم المستخدم مطلوب')
  .min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل')
  .max(30, 'اسم المستخدم يجب أن يكون 30 حرف كحد أقصى')
  .regex(/^[a-zA-Z0-9_-]+$/, 'اسم المستخدم يجب أن يحتوي على أحرف وأرقام وشرطات فقط');
```

**مسموح:**
- أحرف (a-z, A-Z)
- أرقام (0-9)
- شرطة سفلية (_)
- شرطة عادية (-)

### 5. مخطط التسجيل الكامل

```typescript
export const baseRegisterSchema = z.object({
  accountType: z.enum(['individual', 'company'], {
    message: 'نوع الحساب غير صحيح',
  }),
  email: emailSchema,
  phone: phoneSchema,
  username: usernameSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  companyName: companyNameSchema.optional(),
  agreeTerms: termsSchema,
})
.refine((data) => data.password === data.confirmPassword, {
  message: 'كلمتا المرور غير متطابقتين',
  path: ['confirmPassword'],
})
.refine((data) => {
  if (data.accountType === 'company' && !data.companyName) {
    return false;
  }
  return true;
}, {
  message: 'اسم الشركة مطلوب للحسابات الشركات',
  path: ['companyName'],
});
```

---

## 🗄️ مخزن حالة المصادقة (Zustand Store)

### تعريف الحالة

```typescript
interface AuthState {
  // حالة تسجيل الدخول
  isAuthenticated: boolean;
  // بيانات المستخدم الحالي
  user: User | null;
  // رمز الوصول (Access Token)
  accessToken: string | null;
  // رمز التحديث (Refresh Token)
  refreshToken: string | null;
  // حالة التحميل
  isLoading: boolean;
  // رسالة الخطأ
  error: string | null;
  // حالة التحقق من البريد الإلكتروني
  isEmailVerified: boolean;
  // حالة التحقق من رقم الهاتف
  isPhoneVerified: boolean;
  // نوع الحساب
  accountType: 'individual' | 'company' | null;
  // الخطوة الحالية في التسجيل متعدد الخطوات
  currentStep: number;
  // إجمالي الخطوات في التسجيل
  totalSteps: number;
  // بيانات التسجيل المؤقتة
  tempRegisterData: Partial<BaseRegisterData>;
  // الحسابات الاجتماعية المرتبطة
  linkedAccounts: SocialAccount[];
  // حالة تسجيل الدخول الثنائي (2FA)
  is2FAEnabled: boolean;
  // رمز 2FA المؤقت
  temp2FASecret: string | null;
}
```

### الإجراءات المتاحة

#### 1. تسجيل الدخول

```typescript
const { login } = useAuthStore();

await login({
  identifier: 'user@example.com', // بريد أو هاتف أو اسم مستخدم
  password: 'SecurePass123!',
});
```

#### 2. التسجيل

```typescript
const { register } = useAuthStore();

await register({
  accountType: 'individual',
  email: 'user@example.com',
  phone: '+966500000000',
  username: 'testuser',
  password: 'SecurePass123!',
  confirmPassword: 'SecurePass123!',
  firstName: 'Test',
  lastName: 'User',
  agreeTerms: true,
});
```

#### 3. التحقق من البريد الإلكتروني

```typescript
const { verifyEmail } = useAuthStore();

await verifyEmail({
  email: 'user@example.com',
  otp: '123456',
});
```

#### 4. التحقق من رقم الهاتف

```typescript
const { verifyPhone } = useAuthStore();

await verifyPhone({
  phone: '+966500000000',
  otp: '123456',
});
```

#### 5. إعادة إرسال رمز التحقق

```typescript
const { resendVerificationCode } = useAuthStore();

await resendVerificationCode('email'); // أو 'phone'
```

#### 6. إرسال رابط سحري

```typescript
const { sendMagicLink } = useAuthStore();

await sendMagicLink('user@example.com');
```

#### 7. ربط حساب اجتماعي

```typescript
const { linkSocialAccount } = useAuthStore();

await linkSocialAccount('google', 'oauth-token');
```

#### 8. إلغاء ربط حساب اجتماعي

```typescript
const { unlinkSocialAccount } = useAuthStore();

await unlinkSocialAccount('google');
```

#### 9. تسجيل الخروج

```typescript
const { logout } = useAuthStore();

logout();
```

### التخزين المحلي (Persist)

يتم حفظ البيانات التالية في التخزين المحلي تلقائياً:

```typescript
persist(
  (set, get) => ({ ... }),
  {
    name: 'auth-storage',
    partialize: (state) => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      isEmailVerified: state.isEmailVerified,
      isPhoneVerified: state.isPhoneVerified,
      accountType: state.accountType,
      linkedAccounts: state.linkedAccounts,
      is2FAEnabled: state.is2FAEnabled,
    }),
  }
)
```

---

## 🎨 مكونات واجهة المستخدم

### 1. صفحة التسجيل (`RegisterPage.tsx`)

**الميزات:**
- ✅ تسجيل متعدد الخطوات (3 خطوات)
- ✅ مؤشر تقدم مرئي
- ✅ رسوم متحركة سلسة
- ✅ دعم RTL/LTR
- ✅ تبديل اللغة

**الخطوات:**
1. **الخطوة 1**: إدخال البيانات الأساسية
2. **الخطوة 2**: التحقق من البريد/الهاتف
3. **الخطوة 3**: رسالة النجاح

### 2. خطوة التسجيل الأولى (`RegisterStep1.tsx`)

**الحقول:**
- نوع الحساب (فردي/شركة)
- الاسم الأول واسم العائلة
- اسم الشركة (للحسابات الشركات)
- البريد الإلكتروني
- رقم الهاتف
- اسم المستخدم
- كلمة المرور
- تأكيد كلمة المرور
- الموافقة على الشروط

**الميزات:**
- ✅ التحقق من قوة كلمة المرور
- ✅ إظهار/إخفاء كلمة المرور
- ✅ رسائل خطأ فورية
- ✅ تسجيل اجتماعي (Google, Apple, Facebook)

### 3. خطوة التحقق (`VerificationStep.tsx`)

**الميزات:**
- ✅ التحقق من البريد الإلكتروني
- ✅ التحقق من رقم الهاتف
- ✅ إدخال OTP مكون من 6 أرقام
- ✅ عداد زمني لإعادة الإرسال (60 ثانية)
- ✅ التبديل بين البريد والهاتف

### 4. صفحة تسجيل الدخول (`LoginPage.tsx`)

**الميزات:**
- ✅ تسجيل بالبريد/الهاتف/اسم المستخدم
- ✅ إظهار/إخفاء كلمة المرور
- ✅ رابط "نسيت كلمة المرور"
- ✅ تسجيل اجتماعي

### 5. صفحة الرابط السحري (`MagicLinkPage.tsx`)

**الميزات:**
- ✅ إرسال رابط تسجيل دخول بدون كلمة مرور
- ✅ رسالة نجاح مخصصة
- ✅ التحقق من البريد الإلكتروني

### 6. إدارة الحسابات الاجتماعية (`SocialAccountsManager.tsx`)

**الميزات:**
- ✅ عرض الحسابات المرتبطة
- ✅ ربط حساب جديد
- ✅ إلغاء ربط حساب
- ✅ عرض البريد المرتبط

---

## 🌍 الترجمة (i18n)

### إعداد اللغة

```typescript
// src/features/auth/lib/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: { ... } },
      en: { translation: { ... } },
    },
    lng: 'ar',
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

### استخدام الترجمة في المكونات

```typescript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  // استخدام الترجمة
  return (
    <div>
      <h1>{t('auth.register.title')}</h1>
      <p>{t('auth.register.subtitle')}</p>
      
      {/* تبديل اللغة */}
      <button onClick={() => i18n.changeLanguage('en')}>
        English
      </button>
    </div>
  );
}
```

### إضافة ترجمة جديدة

```typescript
// في ملف i18n.ts
resources: {
  ar: {
    translation: {
      auth: {
        register: {
          newKey: 'النص العربي',
        },
      },
    },
  },
  en: {
    translation: {
      auth: {
        register: {
          newKey: 'English Text',
        },
      },
    },
  },
}
```

---

## 🎬 الرسوم المتحركة (Framer Motion)

### 1. انتقالات الصفحات

```typescript
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence mode="wait">
  {currentStep === 1 && (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <RegisterStep1 />
    </motion.div>
  )}
</AnimatePresence>
```

### 2. إظهار/إخفاء العناصر

```typescript
<motion.div
  initial={{ opacity: 0, height: 0 }}
  animate={{ opacity: 1, height: 'auto' }}
  exit={{ opacity: 0, height: 0 }}
>
  {formData.accountType === 'company' && (
    <Input id="companyName" />
  )}
</motion.div>
```

### 3. مؤشر قوة كلمة المرور

```typescript
<motion.div
  className={`h-full ${strengthColors[passwordStrength]}`}
  initial={{ width: 0 }}
  animate={{ 
    width: `${
      passwordStrength === 'weak' ? 25 : 
      passwordStrength === 'medium' ? 50 : 
      passwordStrength === 'strong' ? 75 : 100
    }%` 
  }}
  transition={{ duration: 0.3 }}
/>
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile */
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

### استخدام Tailwind CSS

```typescript
// Mobile First
<div className="
  grid 
  grid-cols-1        /* Mobile */
  md:grid-cols-2     /* Tablet */
  lg:grid-cols-3     /* Desktop */
  gap-4
">
  {...}
</div>
```

---

## 🔒 الأمان

### 1. التحقق من صحة البيانات

```typescript
// على العميل
const validateForm = () => {
  try {
    baseRegisterSchema.parse(formData);
    return true;
  } catch (error) {
    // عرض الأخطاء
    return false;
  }
};
```

### 2. حماية routes (قيد التنفيذ)

```typescript
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('auth-token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}
```

### 3. تشفير كلمات المرور (قيد التنفيذ)

```typescript
import bcrypt from 'bcryptjs';

// تشفير
const hashedPassword = await bcrypt.hash(password, 10);

// التحقق
const isValid = await bcrypt.compare(password, hashedPassword);
```

---

## 🚀 التشغيل

### 1. تشغيل خادم التطوير

```bash
npm run dev
```

### 2. فتح المتصفح

```
http://localhost:3000/register
http://localhost:3000/login
http://localhost:3000/magic-link
http://localhost:3000/social-accounts
```

---

## 🐛 معالجة الأخطاء

### 1. أخطاء التحقق

```typescript
const [validationErrors, setValidationErrors] = useState({});

try {
  schema.parse(data);
  setValidationErrors({});
} catch (error) {
  const errors = {};
  error.errors.forEach((err) => {
    errors[err.path[0]] = err.message;
  });
  setValidationErrors(errors);
}
```

### 2. أخطاء API

```typescript
const { error, clearError } = useAuthStore();

{error && (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription>{error}</AlertDescription>
  </Alert>
)}
```

---

## 📊 debugging

### 1. تتبع حالة المصادقة

```typescript
const state = useAuthStore.getState();
console.log('Auth State:', state);
```

### 2. مراقبة التغييرات

```typescript
useAuthStore.subscribe((state) => {
  console.log('State changed:', state);
});
```

---

## 📚 موارد إضافية

### وثائق المكتبات

- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [Zod Documentation](https://zod.dev/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [i18next Documentation](https://www.i18next.com/)
- [React-i18next Documentation](https://react.i18next.com/)

### FSD

- [Feature-Sliced Design Official Guide](https://feature-sliced.design/)

---

## ❓ الأسئلة الشائعة

### 1. كيف أضيف لغة جديدة؟

```typescript
// في i18n.ts
resources: {
  fr: {
    translation: {
      auth: {
        register: {
          title: 'Créer un nouveau compte',
          // ...
        },
      },
    },
  },
}
```

### 2. كيف أضيف خطوة جديدة للتسجيل؟

```typescript
// في RegisterPage.tsx
{currentStep === 4 && (
  <motion.div key="step4">
    <NewStepComponent />
  </motion.div>
)}
```

### 3. كيف أضيف حقل جديد للنموذج؟

```typescript
// 1. أضف المخطط في schemas.ts
export const newFieldSchema = z.string().min(1, 'Required');

// 2. أضف في حالة النموذج
const [formData, setFormData] = useState({
  newField: '',
  // ...
});

// 3. أضف في واجهة المستخدم
<Input
  value={formData.newField}
  onChange={(e) => handleFieldChange('newField', e.target.value)}
/>
```

---

## 🎯 الخطوات القادمة

### الميزات المخطط لها

1. **تسجيل الدخول الثنائي (2FA)**
   - دعم Google Authenticator
   - دعم SMS
   - دعم Email

2. **استعادة كلمة المرور**
   - إرسال رابط استعادة
   - إدخال رمز التحقق
   - تعيين كلمة مرور جديدة

3. **API Routes**
   - `/api/auth/register`
   - `/api/auth/login`
   - `/api/auth/verify`
   - `/api/auth/logout`

4. **قاعدة البيانات**
   - تكامل مع Prisma
   - حفظ المستخدمين
   - إدارة الجلسات

5. **نظام الصلاحيات**
   - Roles (Admin, User, etc.)
   - Permissions
   - Access Control

---

## 📞 الدعم

للحصول على المساعدة:
- راجع ملف `README.md`
- اقرأ التعليقات في الكود
- افتح Issue على GitHub

---

**تم إنشاء هذا الدليل بتاريخ: 2026-04-22**
