import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: '🏠',
      title: 'Добро пожаловать',
      description: 'Управляйте своим домом\nв одном приложении',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Что можно делать',
      description: 'Всё необходимое для комфортной жизни',
      features: [
        { emoji: '🛠', text: 'Отправлять заявки' },
        { emoji: '💳', text: 'Оплачивать услуги' },
        { emoji: '📢', text: 'Получать уведомления' },
        { emoji: '🏠', text: 'Контролировать дом' },
        { emoji: '🎥', text: 'Смотреть камеры' },
        { emoji: '💬', text: 'Общаться с соседями' },
      ],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: '⚡',
      title: 'Заявки в 1 клик',
      description: 'Фото, описание —\nи мы уже работаем',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: '🤖',
      title: 'Умный помощник',
      description: 'Поможем 24/7:\nподскажем, оформим заявку, напомним',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: '🔒',
      title: 'Безопасность',
      description: 'Камеры, доступ и контроль\nвашего дома',
      gradient: 'from-indigo-500 to-blue-500',
    },
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
        {currentSlide < slides.length - 1 && (
          <div className="absolute top-6 right-6">
            <Button variant="ghost" size="sm" onClick={handleSkip} className="text-gray-500">
              Пропустить
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
            <h2 className="text-3xl font-bold text-gray-900">{currentSlideData.title}</h2>
            <p className="text-lg text-gray-600 whitespace-pre-line leading-relaxed">
              {currentSlideData.description}
            </p>
          </div>

          {currentSlideData.features && (
            <div className="grid grid-cols-2 gap-4 mt-8">
              {currentSlideData.features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-4xl mb-2 block">{feature.emoji}</span>
                  <p className="text-sm font-medium text-gray-900">{feature.text}</p>
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
          {currentSlide === slides.length - 1 ? 'Начать пользоваться' : 'Далее'}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
