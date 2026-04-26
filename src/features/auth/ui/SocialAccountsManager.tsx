// استيراد مكتبة React
'use client';

// استيراد مكتبة React مع hooks
import React, { useState } from 'react';
// استيراد مكتبة Framer Motion للرسوم المتحركة
import { motion } from 'framer-motion';
// استيراد hook الترجمة من react-i18next
import { useTranslation } from 'react-i18next';
// استيراد مخزن حالة المصادقة
import { useAuthStore } from '../model/authStore';
// استيراد مكونات UI
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
// استيراد الأيقونات
import { Loader2, AlertCircle, CheckCircle, XCircle, Link, Unlink } from 'lucide-react';

// مكون إدارة الحسابات الاجتماعية
export default function SocialAccountsManager() {
  // استخدام hook الترجمة
  const { t } = useTranslation();
  // استخدام مخزن حالة المصادقة
  const { 
    linkedAccounts, 
    linkSocialAccount, 
    unlinkSocialAccount, 
    isLoading, 
    error, 
    clearError 
  } = useAuthStore();
  
  // قائمة مزودي الخدمة
  const providers = [
    { id: 'google', name: 'Google', icon: '🔵' },
    { id: 'apple', name: 'Apple', icon: '🍎' },
    { id: 'facebook', name: 'Facebook', icon: '🔷' },
  ];

  // دالة ربط حساب اجتماعي
  const handleLink = async (provider: string) => {
    // مسح رسالة الخطأ
    clearError();
    
    // محاكاة ربط الحساب
    const mockToken = `mock-${provider}-token`;
    await linkSocialAccount(provider, mockToken);
  };

  // دالة إلغاء ربط حساب اجتماعي
  const handleUnlink = async (provider: string) => {
    // مسح رسالة الخطأ
    clearError();
    
    // إلغاء ربط الحساب
    await unlinkSocialAccount(provider);
  };

  // التحقق من ربط حساب
  const isLinked = (provider: string) => {
    return linkedAccounts.some(account => account.provider === provider);
  };

  return (
    // حاوية الرسوم المتحركة
    <motion.div
      // إعدادات الحركة
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* بطاقة إدارة الحسابات الاجتماعية */}
      <Card className="w-full max-w-2xl mx-auto">
        {/* رأس البطاقة */}
        <CardHeader className="space-y-1">
          {/* عنوان النموذج */}
          <CardTitle className="text-2xl font-bold text-center">
            {t('auth.register.linkAccounts')}
          </CardTitle>
          {/* وصف النموذج */}
          <CardDescription className="text-center">
            ربط حساباتك الاجتماعية لتسهيل تسجيل الدخول
          </CardDescription>
        </CardHeader>
        
        {/* محتوى البطاقة */}
        <CardContent>
          {/* رسالة الخطأ */}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* قائمة مزودي الخدمة */}
          <div className="space-y-4">
            {providers.map((provider) => {
              const linked = isLinked(provider.id);
              
              return (
                <motion.div
                  key={provider.id}
                  initial={false}
                  animate={{ 
                    backgroundColor: linked ? 'rgba(34, 197, 94, 0.05)' : 'transparent' 
                  }}
                  className="p-4 rounded-lg border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{provider.icon}</span>
                      <div>
                        <h3 className="font-medium">{provider.name}</h3>
                        {linked && (
                          <p className="text-sm text-gray-500">
                            مرتبط بـ {linkedAccounts.find(a => a.provider === provider.id)?.email}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {linked ? (
                        <>
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnlink(provider.id)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Unlink className="h-4 w-4 mr-2" />
                                {t('auth.register.unlinkAccount', { provider: provider.name })}
                              </>
                            )}
                          </Button>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-gray-400" />
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleLink(provider.id)}
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <>
                                <Link className="h-4 w-4 mr-2" />
                                {t('auth.register.linkAccount', { provider: provider.name })}
                              </>
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
