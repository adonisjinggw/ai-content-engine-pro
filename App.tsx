

import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { HomeIcon, FireIcon, ChartBarIcon, PhotoIcon, DocumentTextIcon, Cog6ToothIcon, VideoCameraIcon, ArrowUpOnSquareIcon, LanguageIcon, UserCircleIcon, ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon, AcademicCapIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { useLocalization } from './hooks/useLocalization';
import { useAuth } from './hooks/useAuth';
import { AppRoutes, AUTH_MODAL_TYPES } from './constants';
import { getApiKeyStatus, ApiKeyStatusState } from './services/geminiService';


import HotNewsSection from './components/HotNewsSection';
import TrendsSection from '@/components/TrendsSection';
import TextToImageSection from './components/TextToImageSection';
import ImageToImageSection from './components/ImageToImageSection';
import ArticleGeneratorSection from './components/ArticleGeneratorSection';
import VideoToolsSection from './components/VideoToolsSection';
import AutoPublishSection from './components/AutoPublishSection';
import SettingsSection from './components/SettingsSection';
import Modal from './components/common/Modal';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import PricingPage from './components/membership/PricingPage';


const App: React.FC = () => {
  const [apiKeyStatus, setApiKeyStatus] = useState<ApiKeyStatusState>(ApiKeyStatusState.MISSING);
  const location = useLocation();
  const { t, language, setLanguage, translationsLoaded } = useLocalization(); // Added translationsLoaded
  const { isAuthenticated, user, logout, isLoading: authLoading, openAuthModal, closeAuthModal, activeModal } = useAuth();

  const refreshApiKeyStatus = useCallback(() => {
    setApiKeyStatus(getApiKeyStatus().status);
  }, []);

  useEffect(() => {
    if (translationsLoaded) { // Only run after translations are loaded
        refreshApiKeyStatus();
        document.title = t('appTitle');
    }
  }, [t, translationsLoaded, refreshApiKeyStatus]);

  // Listen for custom event to refresh API key status when changed in Settings
  useEffect(() => {
    const handleApiKeyChange = () => {
      refreshApiKeyStatus();
    };
    window.addEventListener('apiKeyChanged', handleApiKeyChange);
    return () => {
      window.removeEventListener('apiKeyChanged', handleApiKeyChange);
    };
  }, [refreshApiKeyStatus]);


  const navItems = [
    { path: AppRoutes.HOT_NEWS, labelKey: 'nav.hotNews', icon: FireIcon },
    { path: AppRoutes.TRENDS, labelKey: 'nav.trends', icon: ChartBarIcon },
    { path: AppRoutes.TEXT_TO_IMAGE, labelKey: 'nav.textToImage', icon: PhotoIcon },
    { path: AppRoutes.IMAGE_TO_IMAGE, labelKey: 'nav.imageToImage', icon: SparklesIcon }, // Changed icon
    { path: AppRoutes.ARTICLE_GENERATOR, labelKey: 'nav.articleGenerator', icon: DocumentTextIcon },
    { path: AppRoutes.VIDEO_TOOLS, labelKey: 'nav.videoTools', icon: VideoCameraIcon },
    { path: AppRoutes.AUTO_PUBLISH, labelKey: 'nav.autoPublish', icon: ArrowUpOnSquareIcon },
    { path: AppRoutes.SETTINGS, labelKey: 'nav.settings', icon: Cog6ToothIcon },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };
  
  if (authLoading || !translationsLoaded) { // Check translationsLoaded as well
    return (
      <div className="flex items-center justify-center h-screen bg-secondary-100">
        <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-xl text-secondary-700">{t('general.loadingApp')}</p>
      </div>
    );
  }

  const renderApiKeyWarning = () => {
    if (apiKeyStatus === ApiKeyStatusState.MISSING) {
      return (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md shadow animate-fade-in" role="alert">
          <p className="font-bold">{t('apiKeyMissing.titleUser')}</p>
          <p>{t('apiKeyMissing.messageUser', { settingsPath: AppRoutes.SETTINGS })}</p>
        </div>
      );
    }
    // No demo key warning anymore, only configured or missing (by user)
    return null;
  };

  return (
    <>
      <div className="flex h-screen bg-secondary-100 text-secondary-800">
        <nav className="w-72 bg-gradient-to-b from-secondary-900 to-secondary-800 text-white p-6 space-y-3 shadow-xl flex flex-col">
          <div className="text-3xl font-extrabold mb-6 text-primary-300 tracking-tight">
            {t('appTitle')}
          </div>
          
          {isAuthenticated && user && (
            <div className="mb-6 p-3 bg-secondary-700 rounded-lg text-center">
              <UserCircleIcon className="w-12 h-12 mx-auto text-primary-300 mb-2" />
              <p className="text-sm font-medium text-white">{t('auth.loggedInAs', { username: user.username })}</p>
              {user.membershipTier === 'pro' && <p className="text-xs text-accent-300 font-semibold">{t('auth.proMember')}</p>}
            </div>
          )}

          <div className="flex-grow space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-primary-600 hover:text-white transition-all duration-200 ease-in-out group ${
                  location.pathname === item.path || (location.pathname === '/' && item.path === AppRoutes.HOT_NEWS)
                    ? 'bg-primary-500 text-white shadow-md'
                    : 'text-secondary-300 hover:text-white'
                }`}
              >
                <item.icon className={`w-6 h-6 transition-transform duration-200 group-hover:scale-110 ${ location.pathname === item.path ? 'text-white' : 'text-primary-300 group-hover:text-white'}`} />
                <span className="font-medium">{t(item.labelKey as any)}</span>
              </Link>
            ))}
          </div>

          <div className="mt-auto space-y-2">
            {!isAuthenticated && (
              <>
                <button
                  onClick={() => openAuthModal(AUTH_MODAL_TYPES.LOGIN)}
                  className="w-full flex items-center space-x-2 p-3 rounded-lg text-secondary-300 hover:bg-secondary-700 hover:text-white transition-colors duration-200 ease-in-out"
                >
                  <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                  <span>{t('auth.login')}</span>
                </button>
                <button
                  onClick={() => openAuthModal(AUTH_MODAL_TYPES.REGISTER)}
                  className="w-full flex items-center space-x-2 p-3 rounded-lg text-secondary-300 hover:bg-secondary-700 hover:text-white transition-colors duration-200 ease-in-out"
                >
                  <UserCircleIcon className="w-6 h-6" /> 
                  <span>{t('auth.register')}</span>
                </button>
              </>
            )}
            <button
                onClick={() => openAuthModal(AUTH_MODAL_TYPES.PRICING)}
                className="w-full flex items-center space-x-2 p-3 rounded-lg text-secondary-300 hover:bg-secondary-700 hover:text-white transition-colors duration-200 ease-in-out"
              >
              <AcademicCapIcon className="w-6 h-6 text-accent-400" />
              <span>{t('nav.membership')}</span>
            </button>
            <button
              onClick={toggleLanguage}
              title={t(language === 'zh' ? 'settings.language.en' : 'settings.language.zh')}
              className="w-full flex items-center space-x-2 p-3 rounded-lg text-secondary-300 hover:bg-secondary-700 hover:text-white transition-colors duration-200 ease-in-out"
            >
              <LanguageIcon className="w-6 h-6" />
              <span>{language === 'zh' ? 'English' : '中文'}</span>
            </button>
            {isAuthenticated && (
              <button
                onClick={logout}
                className="w-full flex items-center space-x-2 p-3 rounded-lg text-secondary-300 hover:bg-red-600 hover:text-white transition-colors duration-200 ease-in-out"
              >
                <ArrowRightOnRectangleIcon className="w-6 h-6" />
                <span>{t('auth.logout')}</span>
              </button>
            )}
          </div>
        </nav>
        <main className="flex-1 p-6 sm:p-8 md:p-10 overflow-auto">
          {renderApiKeyWarning()}
          <div className="animate-fade-in">
            <Routes>
              <Route path={AppRoutes.HOT_NEWS} element={<HotNewsSection />} />
              <Route path={AppRoutes.TRENDS} element={<TrendsSection />} />
              <Route path={AppRoutes.TEXT_TO_IMAGE} element={<TextToImageSection />} />
              <Route path={AppRoutes.IMAGE_TO_IMAGE} element={<ImageToImageSection />} />
              <Route path={AppRoutes.ARTICLE_GENERATOR} element={<ArticleGeneratorSection />} />
              <Route path={AppRoutes.VIDEO_TOOLS} element={<VideoToolsSection />} />
              <Route path={AppRoutes.AUTO_PUBLISH} element={<AutoPublishSection />} />
              <Route path={AppRoutes.SETTINGS} element={<SettingsSection onApiKeyChange={refreshApiKeyStatus} />} />
              <Route path="/" element={<HotNewsSection />} />
            </Routes>
          </div>
        </main>
      </div>

      <Modal isOpen={activeModal === AUTH_MODAL_TYPES.LOGIN} onClose={closeAuthModal} title={t('auth.loginTitle')}>
        <LoginForm />
      </Modal>
      <Modal isOpen={activeModal === AUTH_MODAL_TYPES.REGISTER} onClose={closeAuthModal} title={t('auth.registerTitle')}>
        <RegisterForm />
      </Modal>
      <Modal isOpen={activeModal === AUTH_MODAL_TYPES.PRICING} onClose={closeAuthModal} title={t('membership.title')} size="lg">
         <PricingPage />
      </Modal>
    </>
  );
};

export default App;
