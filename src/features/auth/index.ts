// تصدير مكونات واجهة المستخدم
export { default as RegisterPage } from './ui/RegisterPage';
export { default as RegisterStep1 } from './ui/RegisterStep1';
export { default as VerificationStep } from './ui/VerificationStep';
export { default as LoginPage } from './ui/LoginPage';
export { default as MagicLinkPage } from './ui/MagicLinkPage';
export { default as SocialAccountsManager } from './ui/SocialAccountsManager';

// تصدير مخزن الحالة
export { useAuthStore } from './model/authStore';

// تصدير مخططات التحقق
export {
  passwordSchema,
  emailSchema,
  phoneSchema,
  usernameSchema,
  firstNameSchema,
  lastNameSchema,
  companyNameSchema,
  otpSchema,
  termsSchema,
  baseRegisterSchema,
  emailRegisterSchema,
  phoneRegisterSchema,
  usernameRegisterSchema,
  magicLinkSchema,
  emailVerificationSchema,
  phoneVerificationSchema,
  loginSchema,
} from './model/schemas';

// تصدير الأنواع
export type {
  BaseRegisterData,
  EmailRegisterData,
  PhoneRegisterData,
  UsernameRegisterData,
  MagicLinkData,
  EmailVerificationData,
  PhoneVerificationData,
  LoginData,
} from './model/schemas';
