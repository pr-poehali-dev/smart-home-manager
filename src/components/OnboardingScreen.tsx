import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface OnboardingScreenProps {
  onComplete: () => void;
}

const OnboardingScreen = ({ onComplete }: OnboardingScreenProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: 'Building2',
      title: 'Добро пожаловать',
      description: 'Управляйте своим домом в одном приложении',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: 'Sparkles',
      title: 'Всё что нужно',
      description: 'Отправляйте заявки, оплачивайте услуги, получайте важные уведомления, контролируйте дом',
      features: [
        { icon: 'Wrench', text: 'Заявки' },
        { icon: 'Wallet', text: 'Платежи' },
        { icon: 'Bell', text: 'Уведомления' },
        { icon: 'Home', text: 'Контроль' },
      ],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: 'Zap',
      title: 'Заявки в 1 клик',
      description: 'Фото, описание — и мы уже работаем',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: 'Bot',
      title: 'Умный помощник',
      description: 'Поможем 24/7: подскажем, оформим заявку, напомним',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: 'ShieldCheck',
      title: 'Безопасность',
      description: 'Ваш дом под контролем',
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 animate-fade-in">
        <div className="flex justify-end mb-4">
          {currentSlide < slides.length - 1 && (
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Пропустить
            </Button>
          )}
        </div>

        <div className="text-center space-y-6">
          <div
            className={`w-24 h-24 mx-auto rounded-full bg-gradient-to-br ${currentSlideData.gradient} flex items-center justify-center animate-scale-in`}
          >
            <Icon name={currentSlideData.icon} className="text-white" size={48} />
          </div>

          <div>
            <h2 className="text-3xl font-heading font-bold mb-3">{currentSlideData.title}</h2>
            <p className="text-gray-600 text-lg">{currentSlideData.description}</p>
          </div>

          {currentSlideData.features && (
            <div className="grid grid-cols-2 gap-3 mt-6">
              {currentSlideData.features.map((feature, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon name={feature.icon} className="text-primary mb-2" size={32} />
                  <p className="text-sm font-medium">{feature.text}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-center gap-2 py-4">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-8 bg-primary' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button onClick={handleNext} className="w-full py-6 text-lg" size="lg">
            {currentSlide === slides.length - 1 ? 'Перейти к входу' : 'Начать'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingScreen;
