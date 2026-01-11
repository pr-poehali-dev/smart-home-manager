import { useState, useEffect } from 'react';
import OnboardingScreen from '@/components/OnboardingScreen';
import AuthScreen from '@/components/AuthScreen';
import MainApp from '@/components/MainApp';

type AppState = 'onboarding' | 'auth' | 'main';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('onboarding');
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    const savedUser = localStorage.getItem('userData');
    
    if (hasSeenOnboarding && savedUser) {
      setUserData(JSON.parse(savedUser));
      setAppState('main');
    } else if (hasSeenOnboarding) {
      setAppState('auth');
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setAppState('auth');
  };

  const handleAuthComplete = (user: any) => {
    setUserData(user);
    localStorage.setItem('userData', JSON.stringify(user));
    setAppState('main');
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    setUserData(null);
    setAppState('auth');
  };

  if (appState === 'onboarding') {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  if (appState === 'auth') {
    return <AuthScreen onComplete={handleAuthComplete} />;
  }

  return <MainApp userData={userData} onLogout={handleLogout} />;
};

export default Index;
