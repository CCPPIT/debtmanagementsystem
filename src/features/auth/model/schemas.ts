// استيراد مكتبة Zod للتحقق من صحة البيانات
import { z } from 'zod';

// قائمة كلمات المرور الشائعة لمنع استخدامها
const commonPasswords = [
  'password',
  '12345678',
  'qwerty',
  'abc123',
  'password123',
  'admin',
  'letmein',
  'welcome',
  'monkey',
  'master',
  'dragon',
  '111111',
  'baseball',
  'iloveyou',
  'trustno1',
];

// مخطط التحقق من كلمة المرور
export const passwordSchema = z
  .string()
  // التحقق من أن الطول 8 أحرف على الأقل
  .min(8, 'كلمة المرور يجب أن تكون 8 أحرف على الأقل')
  // التحقق من وجود حرف كبير
  .regex(/[A-Z]/, 'كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل')
  // التحقق من وجود حرف صغير
  .regex(/[a-z]/, 'كلمة المرور يجب أن تحتوي على حرف صغير واحد على الأقل')
  // التحقق من وجود رقم
  .regex(/[0-9]/, 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل')
  // التحقق من وجود رمز خاص
  .regex(/[^A-Za-z0-9]/, 'كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل')
  // التحقق من أن كلمة المرور ليست شائعة
  .refine((password) => {
    // تحويل كلمة المرور إلى أحرف صغيرة للمقارنة
    const lowerPassword = password.toLowerCase();
    // إرجاع خطأ إذا كانت كلمة المرور شائعة
    if (commonPasswords.includes(lowerPassword)) {
      return false;
    }
    return true;
  }, 'هذه كلمة مرور شائعة، يرجى اختيار كلمة أخرى');

// مخطط التحقق من البريد الإلكتروني
export const emailSchema = z
  .string()
  // التحقق من أن البريد الإلكتروني ليس فارغاً
  .min(1, 'البريد الإلكتروني مطلوب')
  // التحقق من صيغة البريد الإلكتروني
  .email('صيغة البريد الإلكتروني غير صحيحة');

// مخطط التحقق من رقم الهاتف
export const phoneSchema = z
  .string()
  // التحقق من أن رقم الهاتف ليس فارغاً
  .min(1, 'رقم الهاتف مطلوب')
  // التحقق من صيغة رقم الهاتف (يسمح بالأرقام والرموز + - () والمسافات)
  .regex(/^\+?[0-9\s\-()]{8,}$/, 'صيغة رقم الهاتف غير صحيحة');

// مخطط التحقق من اسم المستخدم
export const usernameSchema = z
  .string()
  // التحقق من أن اسم المستخدم ليس فارغاً
  .min(1, 'اسم المستخدم مطلوب')
  // التحقق من أن اسم المستخدم 3 أحرف على الأقل
  .min(3, 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل')
  // التحقق من أن اسم المستخدم 30 حرف كحد أقصى
  .max(30, 'اسم المستخدم يجب أن يكون 30 حرف كحد أقصى')
  // التحقق من أن اسم المستخدم يحتوي على أحرف وأرقام وشرطات فقط
  .regex(/^[a-zA-Z0-9_-]+$/, 'اسم المستخدم يجب أن يحتوي على أحرف وأرقام وشرطات فقط');

// مخطط التحقق من الاسم الأول
export const firstNameSchema = z
  .string()
  // التحقق من أن الاسم الأول ليس فارغاً
  .min(1, 'الاسم الأول مطلوب')
  // التحقق من أن الاسم الأول 2 أحرف على الأقل
  .min(2, 'الاسم الأول يجب أن يكون حرفين على الأقل')
  // التحقق من أن الاسم الأول 50 حرف كحد أقصى
  .max(50, 'اسم الأول يجب أن يكون 50 حرف كحد أقصى');

// مخطط التحقق من اسم العائلة
export const lastNameSchema = z
  .string()
  // التحقق من أن اسم العائلة ليس فارغاً
  .min(1, 'اسم العائلة مطلوب')
  // التحقق من أن اسم العائلة 2 أحرف على الأقل
  .min(2, 'اسم العائلة يجب أن يكون حرفين على الأقل')
  // التحقق من أن اسم العائلة 50 حرف كحد أقصى
  .max(50, 'اسم العائلة يجب أن يكون 50 حرف كحد أقصى');

// مخطط التحقق من اسم الشركة
export const companyNameSchema = z
  .string()
  // التحقق من أن اسم الشركة ليس فارغاً
  .min(1, 'اسم الشركة مطلوب')
  // التحقق من أن اسم الشركة 2 أحرف على الأقل
  .min(2, 'اسم الشركة يجب أن يكون حرفين على الأقل')
  // التحقق من أن اسم الشركة 100 حرف كحد أقصى
  .max(100, 'اسم الشركة يجب أن يكون 100 حرف كحد أقصى');

// مخطط التحقق من رمز التحقق OTP
export const otpSchema = z
  .string()
  // التحقق من أن رمز التحقق ليس فارغاً
  .min(1, 'رمز التحقق مطلوب')
  // التحقق من أن رمز التحقق 6 أرقام
  .length(6, 'رمز التحقق يجب أن يكون 6 أرقام')
  // التحقق من أن رمز التحقق يحتوي على أرقام فقط
  .regex(/^[0-9]+$/, 'رمز التحقق يجب أن يحتوي على أرقام فقط');

// مخطط التحقق من الموافقة على الشروط
export const termsSchema = z
  .boolean()
  // التحقق من أن المستخدم وافق على الشروط
  .refine((val) => val === true, 'يجب الموافقة على الشروط والأحكام');

// نوع بيانات التسجيل الأساسي
export const baseRegisterSchema = z.object({
  // نوع الحساب (فردي أو شركة)
  accountType: z.enum(['individual', 'company'], {
    message: 'نوع الحساب غير صحيح',
  }),
  // البريد الإلكتروني
  email: emailSchema,
  // رقم الهاتف
  phone: phoneSchema,
  // اسم المستخدم
  username: usernameSchema,
  // كلمة المرور
  password: passwordSchema,
  // تأكيد كلمة المرور
  confirmPassword: z.string(),
  // الاسم الأول
  firstName: firstNameSchema,
  // اسم العائلة
  lastName: lastNameSchema,
  // اسم الشركة (اختياري)
  companyName: companyNameSchema.optional(),
  // الموافقة على الشروط
  agreeTerms: termsSchema,
})
// التحقق من تطابق كلمتي المرور
.refine((data) => data.password === data.confirmPassword, {
  message: 'كلمتا المرور غير متطابقتين',
  path: ['confirmPassword'],
})
// التحقق من وجود اسم الشركة إذا كان نوع الحساب شركة
.refine((data) => {
  if (data.accountType === 'company' && !data.companyName) {
    return false;
  }
  return true;
}, {
  message: 'اسم الشركة مطلوب للحسابات الشركات',
  path: ['companyName'],
});

// مخطط التحقق من التسجيل بالبريد الإلكتروني
export const emailRegisterSchema = z.object({
  accountType: z.enum(['individual', 'company'], {
    message: 'نوع الحساب غير صحيح',
  }),
  email: emailSchema,
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

// مخطط التحقق من التسجيل برقم الهاتف
export const phoneRegisterSchema = z.object({
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

// مخطط التحقق من التسجيل باسم المستخدم فقط
export const usernameRegisterSchema = z.object({
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

// مخطط التحقق من رابط سحري (Magic Link)
export const magicLinkSchema = z.object({
  // البريد الإلكتروني
  email: emailSchema,
});

// مخطط التحقق من التحقق من البريد الإلكتروني
export const emailVerificationSchema = z.object({
  // البريد الإلكتروني
  email: emailSchema,
  // رمز التحقق
  otp: otpSchema,
});

// مخطط التحقق من التحقق من رقم الهاتف
export const phoneVerificationSchema = z.object({
  // رقم الهاتف
  phone: phoneSchema,
  // رمز التحقق
  otp: otpSchema,
});

// مخطط التحقق من تسجيل الدخول
export const loginSchema = z.object({
  // البريد الإلكتروني أو اسم المستخدم أو رقم الهاتف
  identifier: z.string().min(1, 'مطلوب'),
  // كلمة المرور
  password: z.string().min(1, 'كلمة المرور مطلوبة'),
});

// تصدير أنواع البيانات
export type BaseRegisterData = z.infer<typeof baseRegisterSchema>;
export type EmailRegisterData = z.infer<typeof emailRegisterSchema>;
export type PhoneRegisterData = z.infer<typeof phoneRegisterSchema>;
export type UsernameRegisterData = z.infer<typeof usernameRegisterSchema>;
export type MagicLinkData = z.infer<typeof magicLinkSchema>;
export type EmailVerificationData = z.infer<typeof emailVerificationSchema>;
export type PhoneVerificationData = z.infer<typeof phoneVerificationSchema>;
export type LoginData = z.infer<typeof loginSchema>;
