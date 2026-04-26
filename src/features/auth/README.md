# نظام المصادقة والصلاحيات (Authentication & Authorization System)

## 📋 نظرة عامة

نظام مصادقة شامل مبني باستخدام Next.js 16 مع تطبيق مبادئ Feature-Sliced Design (FSD) وتقنيات حديثة.

## 🏗️ البنية المعمارية

### المجلدات الرئيسية

```
src/features/auth/
├── lib/              # مكتبات مساعدة (i18n)
├── model/            # إدارة الحالة والمخططات
├── ui/               # مكونات واجهة المستخدم
└── api/              # واجهات برمجة التطبيقات (قيد الإنشاء)
```

## 🛠️ التقنيات المستخدمة

### 1. **Zustand** - إدارة الحالة
- مخزن حالة المصادقة المركزي
- دعم التخزين المحلي (Persist)
- إدارة حالة المستخدم والجلسات

### 2. **Zod** - التحقق من الصحة
- مخططات التحقق من البيانات
- التحقق من كلمة المرور
- التحقق من البريد الإلكتروني والهاتف
- التحقق من OTP

### 3. **Framer Motion** - الرسوم المتحركة
- انتقالات سلسة بين الصفحات
- رسوم متحركة عند التحميل
- تأثيرات بصرية محسنة

### 4. **i18next** - الترجمة
- دعم اللغة العربية والإنجليزية
- تبديل اللغة الديناميكي
- دعم RTL/LTR

## 📦 المكونات المتاحة

### 1. صفحة التسجيل (`/register`)
- ✅ تسجيل بالبريد الإلكتروني
- ✅ تسجيل برقم الهاتف
- ✅ تسجيل باسم المستخدم
- ✅ تسجيل متعدد الخطوات
- ✅ التحقق من قوة كلمة المرور
- ✅ تسجيل حساب شركة/فردي
- ✅ الموافقة على الشروط
- ✅ تسجيل باستخدام Google/Apple/Facebook

### 2. صفحة التحقق (`VerificationStep`)
- ✅ التحقق من البريد الإلكتروني
- ✅ التحقق من رقم الهاتف
- ✅ رمز OTP مكون من 6 أرقام
- ✅ إعادة إرسال رمز التحقق
- ✅ عداد زمني لإعادة الإرسال

### 3. صفحة تسجيل الدخول (`/login`)
- ✅ تسجيل الدخول بالبريد/الهاتف/اسم المستخدم
- ✅ إظهار/إخفاء كلمة المرور
- ✅ التحقق من صحة البيانات
- ✅ تسجيل الدخول الاجتماعي

### 4. صفحة الرابط السحري (`/magic-link`)
- ✅ إرسال رابط تسجيل دخول بدون كلمة مرور
- ✅ التحقق من البريد الإلكتروني
- ✅ رسالة نجاح مخصصة

### 5. إدارة الحسابات الاجتماعية (`/social-accounts`)
- ✅ ربط حسابات Google/Apple/Facebook
- ✅ إلغاء ربط الحسابات
- ✅ عرض حالة الربط

## 🔐 مخططات التحقق (Zod Schemas)

### التحقق من كلمة المرور
```typescript
- 8 أحرف على الأقل
- حرف كبير واحد على الأقل
- حرف صغير واحد على الأقل
- رقم واحد على الأقل
- رمز خاص واحد على الأقل
- منع كلمات المرور الشائعة
```

### التحقق من البريد الإلكتروني
```typescript
- صيغة صحيحة
- غير فارغ
```

### التحقق من رقم الهاتف
```typescript
- صيغة صحيحة
- 8 أرقام على الأقل
- يسمح بالرموز + - () والمسافات
```

### التحقق من اسم المستخدم
```typescript
- 3-30 حرف
- أحرف وأرقام وشرطات فقط
```

## 🌍 الترجمة (i18n)

### اللغات المدعومة
- العربية (ar) - اللغة الافتراضية
- الإنجليزية (en) - اللغة البديلة

### ملفات الترجمة
```typescript
src/features/auth/lib/i18n.ts
```

### استخدام الترجمة
```typescript
const { t } = useTranslation();
t('auth.register.email') // البريد الإلكتروني
```

## 📊 إدارة الحالة (Zustand Store)

### الحالة الرئيسية
```typescript
- isAuthenticated: boolean
- user: User | null
- accessToken: string | null
- refreshToken: string | null
- isLoading: boolean
- error: string | null
- isEmailVerified: boolean
- isPhoneVerified: boolean
- accountType: 'individual' | 'company' | null
- currentStep: number
- tempRegisterData: Partial<BaseRegisterData>
- linkedAccounts: SocialAccount[]
```

### الإجراءات المتاحة
```typescript
- login(data: LoginData)
- logout()
- register(data: BaseRegisterData)
- verifyEmail(data: EmailVerificationData)
- verifyPhone(data: PhoneVerificationData)
- resendVerificationCode(type: 'email' | 'phone')
- sendMagicLink(email: string)
- linkSocialAccount(provider: string, token: string)
- unlinkSocialAccount(provider: string)
```

## 🎨 الرسوم المتحركة (Framer Motion)

### أنواع الرسوم المستخدمة
1. **Page Transitions** - انتقالات بين الصفحات
2. **Form Animations** - رسوم عند إظهار/إخفاء العناصر
3. **Loading States** - رسوم التحميل
4. **Success/Error States** - رسائل النجاح والخطأ

## 📱 Responsive Design

جميع المكونات متجاوبة وتدعم:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large Desktop (1280px+)

## 🔜 الميزات القادمة

### قيد التطوير
- [ ] تسجيل الدخول الثنائي (2FA)
- [ ] استعادة كلمة المرور
- [ ] واجهات برمجة التطبيقات (API Routes)
- [ ] التكامل مع قاعدة البيانات (Prisma)
- [ ] نظام الصلاحيات (Roles & Permissions)
- [ ] تسجيل النشاطات (Activity Logging)
- [ ] حماية CSRF
- [ ] Rate Limiting
- [ ] OAuth 2.0 كامل
- [ ] SSO (Single Sign-On)

## 📝 الاستخدام

### 1. تسجيل مستخدم جديد
```typescript
import { useAuthStore } from '@/features/auth/model/authStore';

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

### 2. تسجيل الدخول
```typescript
const { login } = useAuthStore();

await login({
  identifier: 'user@example.com',
  password: 'SecurePass123!',
});
```

### 3. التحقق من البريد الإلكتروني
```typescript
const { verifyEmail } = useAuthStore();

await verifyEmail({
  email: 'user@example.com',
  otp: '123456',
});
```

## 🐛 معالجة الأخطاء

جميع المكونات تدعم:
- رسائل خطأ واضحة
- التحقق من صحة البيانات
- عرض الأخطاء تحت الحقول
- رسائل خطأ مخصصة

## 🔒 الأمان

### الممارسات المتبعة
- ✅ التحقق من صحة البيانات على العميل والخادم
- ✅ تشفير كلمات المرور (قيد التنفيذ)
- ✅ حماية CSRF (قيد التنفيذ)
- ✅ Rate Limiting (قيد التنفيذ)
- ✅ HTTPS إلزامي
- ✅ HttpOnly Cookies للرموز

## 📖 الوثائق

### ملفات التكوين
- `src/features/auth/lib/i18n.ts` - إعدادات الترجمة
- `src/features/auth/model/schemas.ts` - مخططات التحقق
- `src/features/auth/model/authStore.ts` - مخزن الحالة

### المكونات
- `RegisterStep1.tsx` - خطوة التسجيل الأولى
- `VerificationStep.tsx` - خطوة التحقق
- `LoginPage.tsx` - صفحة تسجيل الدخول
- `MagicLinkPage.tsx` - صفحة الرابط السحري
- `SocialAccountsManager.tsx` - إدارة الحسابات الاجتماعية

## 🤝 المساهمة

للمساهمة في تطوير النظام:
1. Fork المشروع
2. إنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الرخصة

هذا المشروع مرخص تحت رخصة MIT.

## 📞 الدعم

للحصول على المساعدة:
- فتح Issue على GitHub
- مراجعة الوثائق
- قراءة التعليقات في الكود

---

**ملاحظة**: هذا النظام قيد التطوير النشط. بعض الميزات قد تكون غير مكتملة.
