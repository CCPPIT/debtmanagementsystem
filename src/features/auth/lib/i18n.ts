// استيراد مكتبة i18next للتعامل مع الترجمات
import i18n from 'i18next';
// استيراد مكتبة react-i18next لدمج i18next مع React
import { initReactI18next } from 'react-i18next';
// استيراد مكتبة اكتشاف اللغة تلقائياً من المتصفح
import LanguageDetector from 'i18next-browser-languagedetector';

// تهيئة i18next مع الإعدادات المطلوبة
i18n
  // استخدام مكتبة اكتشاف اللغة
  .use(LanguageDetector)
  // دمج i18next مع React
  .use(initReactI18next)
  // تهيئة i18next بالإعدادات
  .init({
    // الموارد الترجمية (العربية والإنجليزية)
    resources: {
      // الترجمات العربية
      ar: {
        translation: {
          auth: {
            register: {
              title: 'إنشاء حساب جديد',
              subtitle: 'ابدأ رحلتك مع نظام إدارة الديون',
              email: 'البريد الإلكتروني',
              phone: 'رقم الهاتف',
              username: 'اسم المستخدم',
              password: 'كلمة المرور',
              confirmPassword: 'تأكيد كلمة المرور',
              firstName: 'الاسم الأول',
              lastName: 'اسم العائلة',
              companyName: 'اسم الشركة',
              accountType: 'نوع الحساب',
              individual: 'حساب فردي',
              company: 'حساب شركة',
              terms: 'أوافق على الشروط والأحكام',
              privacyPolicy: 'سياسة الخصوصية',
              submit: 'إنشاء الحساب',
              alreadyHaveAccount: 'لديك حساب بالفعل؟',
              login: 'تسجيل الدخول',
              socialLogin: 'أو التسجيل باستخدام',
              google: 'Google',
              apple: 'Apple',
              facebook: 'Facebook',
              magicLink: 'إرسال رابط سحري',
              magicLinkSubtitle: 'سنرسل لك رابط لتسجيل الدخول بدون كلمة مرور',
              sendMagicLink: 'إرسال الرابط السحري',
              checkEmail: 'تحقق من بريدك الإلكتروني',
              checkPhone: 'تحقق من رقم هاتفك',
              verifyEmail: 'التحقق من البريد الإلكتروني',
              verifyPhone: 'التحقق من رقم الهاتف',
              verificationCode: 'رمز التحقق',
              resendCode: 'إعادة إرسال الرمز',
              resendIn: 'إعادة الإرسال خلال {{seconds}} ثانية',
              step: 'الخطوة {{current}} من {{total}}',
              next: 'التالي',
              previous: 'السابق',
              createPassword: 'إنشاء كلمة مرور',
              passwordStrength: 'قوة كلمة المرور',
              weak: 'ضعيفة',
              medium: 'متوسطة',
              strong: 'قوية',
              veryStrong: 'قوية جداً',
              passwordRequirements: 'متطلبات كلمة المرور:',
              minLength: '8 أحرف على الأقل',
              uppercase: 'حرف كبير واحد على الأقل',
              lowercase: 'حرف صغير واحد على الأقل',
              number: 'رقم واحد على الأقل',
              specialChar: 'رمز خاص واحد على الأقل',
              commonPassword: 'هذه كلمة مرور شائعة، يرجى اختيار كلمة أخرى',
              emailExists: 'البريد الإلكتروني مسجل بالفعل',
              phoneExists: 'رقم الهاتف مسجل بالفعل',
              usernameExists: 'اسم المستخدم مسجل بالفعل',
              verificationSent: 'تم إرسال رمز التحقق',
              verificationFailed: 'فشل التحقق',
              registrationSuccess: 'تم إنشاء الحساب بنجاح',
              registrationFailed: 'فشل إنشاء الحساب',
              linkAccounts: 'ربط الحسابات الاجتماعية',
              linkAccount: 'ربط حساب {{provider}}',
              unlinkAccount: 'إلغاء ربط حساب {{provider}}',
              accountLinked: 'تم ربط الحساب بنجاح',
              accountUnlinked: 'تم إلغاء ربط الحساب',
            },
          },
        },
      },
      // الترجمات الإنجليزية
      en: {
        translation: {
          auth: {
            register: {
              title: 'Create New Account',
              subtitle: 'Start your journey with our debt management system',
              email: 'Email',
              phone: 'Phone Number',
              username: 'Username',
              password: 'Password',
              confirmPassword: 'Confirm Password',
              firstName: 'First Name',
              lastName: 'Last Name',
              companyName: 'Company Name',
              accountType: 'Account Type',
              individual: 'Individual Account',
              company: 'Company Account',
              terms: 'I agree to the Terms and Conditions',
              privacyPolicy: 'Privacy Policy',
              submit: 'Create Account',
              alreadyHaveAccount: 'Already have an account?',
              login: 'Login',
              socialLogin: 'Or register with',
              google: 'Google',
              apple: 'Apple',
              facebook: 'Facebook',
              magicLink: 'Send Magic Link',
              magicLinkSubtitle: "We'll send you a link to login without a password",
              sendMagicLink: 'Send Magic Link',
              checkEmail: 'Check your email',
              checkPhone: 'Check your phone',
              verifyEmail: 'Verify Email',
              verifyPhone: 'Verify Phone',
              verificationCode: 'Verification Code',
              resendCode: 'Resend Code',
              resendIn: 'Resend in {{seconds}} seconds',
              step: 'Step {{current}} of {{total}}',
              next: 'Next',
              previous: 'Previous',
              createPassword: 'Create Password',
              passwordStrength: 'Password Strength',
              weak: 'Weak',
              medium: 'Medium',
              strong: 'Strong',
              veryStrong: 'Very Strong',
              passwordRequirements: 'Password Requirements:',
              minLength: 'At least 8 characters',
              uppercase: 'At least one uppercase letter',
              lowercase: 'At least one lowercase letter',
              number: 'At least one number',
              specialChar: 'At least one special character',
              commonPassword: 'This is a common password, please choose another',
              emailExists: 'Email is already registered',
              phoneExists: 'Phone number is already registered',
              usernameExists: 'Username is already registered',
              verificationSent: 'Verification code sent',
              verificationFailed: 'Verification failed',
              registrationSuccess: 'Account created successfully',
              registrationFailed: 'Account creation failed',
              linkAccounts: 'Link Social Accounts',
              linkAccount: 'Link {{provider}} Account',
              unlinkAccount: 'Unlink {{provider}} Account',
              accountLinked: 'Account linked successfully',
              accountUnlinked: 'Account unlinked successfully',
            },
          },
        },
      },
    },
    // اللغة الافتراضية
    lng: 'ar',
    // اللغة البديلة عند عدم توفر الترجمة
    fallbackLng: 'en',
    // دعم اكتشاف اللغة من المتصفح
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    // تعطيل الهروب من الأحرف الخاصة
    interpolation: {
      escapeValue: false,
    },
  });

// تصدير كائن i18n لاستخدامه في التطبيق
export default i18n;
