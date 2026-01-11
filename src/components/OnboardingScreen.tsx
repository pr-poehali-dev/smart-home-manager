import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: '🏠',
      titleKey: 'welcome' as const,
      descriptionKey: 'welcomeDesc' as const,
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      titleKey: 'features' as const,
      descriptionKey: 'featuresDesc' as const,
      showFeatures: true,
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: '⚡',
      titleKey: 'quickRequests' as const,
      descriptionKey: 'quickRequestsDesc' as const,
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: '🤖',
      titleKey: 'assistant' as const,
      descriptionKey: 'assistantDesc' as const,
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: '🔒',
      titleKey: 'security' as const,
      descriptionKey: 'securityDesc' as const,
      gradient: 'from-indigo-500 to-blue-500',
    },
  ];

  const features = [
    { emoji: '🛠', textKey: 'feature1' as const },
    { emoji: '💳', textKey: 'feature2' as const },
    { emoji: '📢', textKey: 'feature3' as const },
    { emoji: '🏠', textKey: 'feature4' as const },
    { emoji: '🎥', textKey: 'feature5' as const },
    { emoji: '💬', textKey: 'feature6' as const },
  ];

  const currentSlideData = slides[currentSlide];

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      onComplete();
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="absolute top-6 left-6">
          <LanguageSwitcher />
        </div>

        {currentSlide < slides.length - 1 && (
          <div className="absolute top-6 right-6">
            <Button variant="ghost" size="sm" onClick={handleSkip} className="text-gray-500">
              {t.onboarding.skip}
            </Button>
          </div>
        )}

        <div className="w-full max-w-md text-center space-y-8 animate-fade-in">
          {currentSlideData.icon && (
            <div
              className={`w-32 h-32 mx-auto rounded-3xl bg-gradient-to-br ${currentSlideData.gradient} flex items-center justify-center shadow-2xl animate-scale-in`}
            >
              <span className="text-6xl">{currentSlideData.icon}</span>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              {t.onboarding[currentSlideData.titleKey]}
            </h2>
            <p className="text-lg text-gray-600 whitespace-pre-line leading-relaxed">
              {t.onboarding[currentSlideData.descriptionKey]}
            </p>
          </div>

          {currentSlideData.showFeatures && (
            <div className="grid grid-cols-2 gap-4 mt-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-4xl mb-2 block">{feature.emoji}</span>
                  <p className="text-sm font-medium text-gray-900">
                    {t.onboarding[feature.textKey]}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={handleNext}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          {currentSlide === slides.length - 1 ? t.onboarding.start : t.onboarding.next}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
