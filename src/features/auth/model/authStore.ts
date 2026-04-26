// استيراد مكتبة Zustand لإنشاء مخزن الحالة
import { create } from 'zustand';
// استيراد مكتبة persist من Zustand لحفظ الحالة في التخزين المحلي
import { persist } from 'zustand/middleware';
// استيراد أنواع البيانات من ملفات المخططات
import type {
  BaseRegisterData,
  EmailVerificationData,
  PhoneVerificationData,
  LoginData,
} from '../model/schemas';

// تعريف نوع حالة المصادقة
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

  // إجراءات المصادقة
  // تسجيل الدخول
  login: (data: LoginData) => Promise<void>;
  // تسجيل الدخول باستخدام 2FA
  loginWith2FA: (code: string) => Promise<void>;
  // تسجيل الخروج
  logout: () => void;
  // تحديث رمز الوصول
  refreshAccessToken: () => Promise<void>;
  // التسجيل الأساسي
  register: (data: BaseRegisterData) => Promise<void>;
  // التحقق من البريد الإلكتروني
  verifyEmail: (data: EmailVerificationData) => Promise<void>;
  // التحقق من رقم الهاتف
  verifyPhone: (data: PhoneVerificationData) => Promise<void>;
  // إعادة إرسال رمز التحقق
  resendVerificationCode: (type: 'email' | 'phone') => Promise<void>;
  // إرسال رابط سحري
  sendMagicLink: (email: string) => Promise<void>;
  // تسجيل الدخول باستخدام رابط سحري
  loginWithMagicLink: (token: string) => Promise<void>;
  // ربط حساب اجتماعي
  linkSocialAccount: (provider: string, token: string) => Promise<void>;
  // إلغاء ربط حساب اجتماعي
  unlinkSocialAccount: (provider: string) => Promise<void>;
  // تحديث الخطوة الحالية
  setCurrentStep: (step: number) => void;
  // تحديث بيانات التسجيل المؤقتة
  setTempRegisterData: (data: Partial<BaseRegisterData>) => void;
  // مسح بيانات التسجيل المؤقتة
  clearTempRegisterData: () => void;
  // مسح رسالة الخطأ
  clearError: () => void;
  // تعيين رسالة الخطأ
  setError: (error: string) => void;
  // تعيين حالة التحميل
  setLoading: (loading: boolean) => void;
}

// تعريف نوع بيانات المستخدم
interface User {
  // المعرف الفريد
  id: string;
  // البريد الإلكتروني
  email: string;
  // رقم الهاتف
  phone: string;
  // اسم المستخدم
  username: string;
  // الاسم الأول
  firstName: string;
  // اسم العائلة
  lastName: string;
  // اسم الشركة
  companyName?: string;
  // نوع الحساب
  accountType: 'individual' | 'company';
  // حالة التحقق من البريد الإلكتروني
  isEmailVerified: boolean;
  // حالة التحقق من رقم الهاتف
  isPhoneVerified: boolean;
  // الصورة الشخصية
  avatar?: string;
  // تاريخ الإنشاء
  createdAt: string;
  // تاريخ التحديث
  updatedAt: string;
}

// تعريف نوع الحسابات الاجتماعية
interface SocialAccount {
  // مزود الخدمة
  provider: string;
  // المعرف الفريد لدى المزود
  providerId: string;
  // البريد الإلكتروني المرتبط
  email?: string;
  // تاريخ الربط
  linkedAt: string;
}

// إنشاء مخزن حالة المصادقة
export const useAuthStore = create<AuthState>()(
  // استخدام persist لحفظ الحالة في التخزين المحلي
  persist(
    // دالة الإنشاء
    (set, get) => ({
      // القيم الافتراضية
      // حالة تسجيل الدخول
      isAuthenticated: false,
      // بيانات المستخدم الحالي
      user: null,
      // رمز الوصول
      accessToken: null,
      // رمز التحديث
      refreshToken: null,
      // حالة التحميل
      isLoading: false,
      // رسالة الخطأ
      error: null,
      // حالة التحقق من البريد الإلكتروني
      isEmailVerified: false,
      // حالة التحقق من رقم الهاتف
      isPhoneVerified: false,
      // نوع الحساب
      accountType: null,
      // الخطوة الحالية في التسجيل
      currentStep: 1,
      // إجمالي الخطوات في التسجيل
      totalSteps: 3,
      // بيانات التسجيل المؤقتة
      tempRegisterData: {},
      // الحسابات الاجتماعية المرتبطة
      linkedAccounts: [],
      // حالة تسجيل الدخول الثنائي
      is2FAEnabled: false,
      // رمز 2FA المؤقت
      temp2FASecret: null,

      // إجراء تسجيل الدخول
      login: async (data: LoginData) => {
        // تعيين حالة التحميل إلى true
        set({ isLoading: true, error: null });
        try {
          // هنا سيتم استدعاء API لتسجيل الدخول
          // const response = await fetch('/api/auth/login', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify(data),
          // });
          // const result = await response.json();

          // محاكاة استجابة API
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // تعيين حالة المصادقة وبيانات المستخدم
          set({
            isAuthenticated: true,
            user: {
              id: 'user-123',
              email: data.identifier,
              phone: '+966500000000',
              username: 'testuser',
              firstName: 'Test',
              lastName: 'User',
              accountType: 'individual',
              isEmailVerified: true,
              isPhoneVerified: true,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            accessToken: 'mock-access-token',
            refreshToken: 'mock-refresh-token',
            isLoading: false,
          });
        } catch (error) {
          // تعيين رسالة الخطأ
          set({
            error: error instanceof Error ? error.message : 'فشل تسجيل الدخول',
            isLoading: false,
          });
        }
      },

      // إجراء تسجيل الدخول باستخدام 2FA
      loginWith2FA: async (code: string) => {
        // تعيين حالة التحميل إلى true
        set({ isLoading: true, error: null });
        try {
          // هنا سيتم استدعاء API للتحقق من رمز 2FA
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // تعيين حالة المصادقة
          set({
            isAuthenticated: true,
            isLoading: false,
            temp2FASecret: null,
          });
        } catch (error) {
          // تعيين رسالة الخطأ
          set({
            error: error instanceof Error ? error.message : 'فشل التحقق من رمز 2FA',
            isLoading: false,
          });
        }
      },

      // إجراء تسجيل الخروج
      logout: () => {
        // مسح جميع بيانات المصادقة
        set({
          isAuthenticated: false,
          user: null,
          accessToken: null,
          refreshToken: null,
          isEmailVerified: false,
          isPhoneVerified: false,
          accountType: null,
          currentStep: 1,
          tempRegisterData: {},
          linkedAccounts: [],
          is2FAEnabled: false,
          temp2FASecret: null,
          error: null,
        });
      },

      // إجراء تحديث رمز الوصول
      refreshAccessToken: async () => {
        // تعيين حالة التحميل إلى true
        set({ isLoading: true });
        try {
          // هنا سيتم استدعاء API لتحديث رمز الوصول
          await new Promise((resolve) => setTimeout(resolve, 500));

          // تعيين رمز الوصول الجديد
          set({
            accessToken: 'new-mock-access-token',
            isLoading: false,
          });
        } catch (error) {
          // تعيين رسالة الخطأ
          set({
            error: error instanceof Error ? error.message : 'فشل تحديث رمز الوصول',
            isLoading: false,
          });
        }
      },

      // إجراء التسجيل
      register: async (data: BaseRegisterData) => {
        // تعيين حالة التحميل إلى true
        set({ isLoading: true, error: null });
        try {
          // هنا سيتم استدعاء API للتسجيل
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // تعيين نوع الحساب والخطوة التالية
          set({
            accountType: data.accountType,
            currentStep: 2,
            tempRegisterData: data,
            isLoading: false,
          });
        } catch (error) {
          // تعيين رسالة الخطأ
          set({
            error: error instanceof Error ? error.message : 'فشل إنشاء الحساب',
            isLoading: false,
          });
        }
      },

      // إجراء التحقق من البريد الإلكتروني
      verifyEmail: async (data: EmailVerificationData) => {
        // تعيين حالة التحميل إلى true
        set({ isLoading: true, error: null });
        try {
          // هنا سيتم استدعاء API للتحقق من البريد الإلكتروني
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // تعيين حالة التحقق من البريد الإلكتروني
          set({
            isEmailVerified: true,
            isLoading: false,
          });
        } catch (error) {
          // تعيين رسالة الخطأ
          set({
            error: error instanceof Error ? error.message : 'فشل التحقق من البريد الإلكتروني',
            isLoading: false,
          });
        }
      },

      // إجراء التحقق من رقم الهاتف
      verifyPhone: async (data: PhoneVerificationData) => {
        // تعيين حالة التحميل إلى true
        set({ isLoading: true, error: null });
        try {
          // هنا سيتم استدعاء API للتحقق من رقم الهاتف
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // تعيين حالة التحقق من رقم الهاتف
          set({
            isPhoneVerified: true,
            isLoading: false,
          });
        } catch (error) {
          // تعيين رسالة الخطأ
          set({
            error: error instanceof Error ? error.message : 'فشل التحقق من رقم الهاتف',
            isLoading: false,
          });
        }
      },

      // إجراء إعادة إرسال رمز التحقق
      resendVerificationCode: async (type: 'email' | 'phone') => {
        // تعيين حالة التحميل إلى true
        set({ isLoading: true, error: null });
        try {
          // هنا سيتم استدعاء API لإعادة إرسال رمز التحقق
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // تعيين حالة التحميل إلى false
          set({ isLoading: false });
        } catch (error) {
          // تعيين رسالة الخطأ
          set({
            error: error instanceof Error ? error.message : 'فشل إعادة إرسال رمز التحقق',
            isLoading: false,
          });
        }
      },

      // إجراء إرسال رابط سحري
      sendMagicLink: async (email: string) => {
        // تعيين حالة التحميل إلى true
        set({ isLoading: true, error: null });
        try {
          // هنا سيتم استدعاء API لإرسال الرابط السحري
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // تعيين حالة التحميل إلى false
          set({ isLoading: false });
        } catch (error) {
          // تعيين رسالة الخطأ
          set({
            error: error instanceof Error ? error.message : 'فشل إرسال الرابط السحري',
            isLoading: false,
          });
        }
      },

      // إجراء تسجيل الدخول باستخدام رابط سحري
      loginWithMagicLink: async (token: string) => {
        // تعيين حالة التحميل إلى true
        set({ isLoading: true, error: null });
        try {
          // هنا سيتم استدعاء API لتسجيل الدخول باستخدام الرابط السحري
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // تعيين حالة المصادقة
          set({
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // تعيين رسالة الخطأ
          set({
            error: error instanceof Error ? error.message : 'فشل تسجيل الدخول',
            isLoading: false,
          });
        }
      },

      // إجراء ربط حساب اجتماعي
      linkSocialAccount: async (provider: string, token: string) => {
        // تعيين حالة التحميل إلى true
        set({ isLoading: true, error: null });
        try {
          // هنا سيتم استدعاء API لربط الحساب الاجتماعي
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // إضافة الحساب الاجتماعي المرتبط
          set((state) => ({
            linkedAccounts: [
              ...state.linkedAccounts,
              {
                provider,
                providerId: `mock-${provider}-id`,
                email: `user@${provider}.com`,
                linkedAt: new Date().toISOString(),
              },
            ],
            isLoading: false,
          }));
        } catch (error) {
          // تعيين رسالة الخطأ
          set({
            error: error instanceof Error ? error.message : 'فشل ربط الحساب',
            isLoading: false,
          });
        }
      },

      // إجراء إلغاء ربط حساب اجتماعي
      unlinkSocialAccount: async (provider: string) => {
        // تعيين حالة التحميل إلى true
        set({ isLoading: true, error: null });
        try {
          // هنا سيتم استدعاء API لإلغاء ربط الحساب الاجتماعي
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // إزالة الحساب الاجتماعي المرتبط
          set((state) => ({
            linkedAccounts: state.linkedAccounts.filter(
              (account) => account.provider !== provider
            ),
            isLoading: false,
          }));
        } catch (error) {
          // تعيين رسالة الخطأ
          set({
            error: error instanceof Error ? error.message : 'فشل إلغاء ربط الحساب',
            isLoading: false,
          });
        }
      },

      // إجراء تعيين الخطوة الحالية
      setCurrentStep: (step: number) => {
        // تعيين الخطوة الحالية
        set({ currentStep: step });
      },

      // إجراء تعيين بيانات التسجيل المؤقتة
      setTempRegisterData: (data: Partial<BaseRegisterData>) => {
        // تحديث بيانات التسجيل المؤقتة
        set((state) => ({
          tempRegisterData: { ...state.tempRegisterData, ...data },
        }));
      },

      // إجراء مسح بيانات التسجيل المؤقتة
      clearTempRegisterData: () => {
        // مسح بيانات التسجيل المؤقتة
        set({ tempRegisterData: {} });
      },

      // إجراء مسح رسالة الخطأ
      clearError: () => {
        // مسح رسالة الخطأ
        set({ error: null });
      },

      // إجراء تعيين رسالة الخطأ
      setError: (error: string) => {
        // تعيين رسالة الخطأ
        set({ error });
      },

      // إجراء تعيين حالة التحميل
      setLoading: (loading: boolean) => {
        // تعيين حالة التحميل
        set({ isLoading: loading });
      },
    }),
    // إعدادات persist
    {
      // اسم المفتاح في التخزين المحلي
      name: 'auth-storage',
      // تحديد الحقول التي سيتم حفظها
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
);
