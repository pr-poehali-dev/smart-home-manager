import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
      <button
        onClick={() => setLanguage('ru')}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          language === 'ru'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        РУС
      </button>
      <button
        onClick={() => setLanguage('tj')}
        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
          language === 'tj'
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        ТОҶ
      </button>
    </div>
  );
};

export default LanguageSwitcher;
