import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface ServicesScreenProps {
  onBack: () => void;
}

interface Service {
  id: string;
  title: string;
  icon: string;
  color: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
}

const ServicesScreen = ({ onBack }: ServicesScreenProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [orderDetails, setOrderDetails] = useState({
    date: '',
    time: '',
    comment: '',
  });

  const services: Service[] = [
    {
      id: '1',
      title: 'Строительные работы',
      icon: '🔨',
      color: 'from-orange-100 to-orange-200',
      description: 'Ремонт, отделка, установка конструкций',
      price: 'от 1500 ₽/час',
      rating: 4.8,
      reviews: 124,
    },
    {
      id: '2',
      title: 'Электрика',
      icon: '⚡',
      color: 'from-purple-100 to-purple-200',
      description: 'Установка розеток, светильников, ремонт проводки',
      price: 'от 1200 ₽/час',
      rating: 4.9,
      reviews: 98,
    },
    {
      id: '3',
      title: 'Уборка помещений',
      icon: '🧹',
      color: 'from-green-100 to-green-200',
      description: 'Генеральная, поддерживающая уборка квартиры',
      price: 'от 2500 ₽',
      rating: 4.7,
      reviews: 156,
    },
    {
      id: '4',
      title: 'Сантехника',
      icon: '🔧',
      color: 'from-blue-100 to-blue-200',
      description: 'Установка, ремонт сантехники и труб',
      price: 'от 1000 ₽/час',
      rating: 4.8,
      reviews: 87,
    },
    {
      id: '5',
      title: 'Доставка воды',
      icon: '💧',
      color: 'from-cyan-100 to-cyan-200',
      description: 'Доставка питьевой воды 19л',
      price: '350 ₽/бутыль',
      rating: 4.9,
      reviews: 234,
    },
    {
      id: '6',
      title: 'Клининг',
      icon: '✨',
      color: 'from-pink-100 to-pink-200',
      description: 'Химчистка мебели, ковров, матрасов',
      price: 'от 1500 ₽',
      rating: 4.6,
      reviews: 72,
    },
    {
      id: '7',
      title: 'Мастер на час',
      icon: '🔩',
      color: 'from-yellow-100 to-yellow-200',
      description: 'Мелкий ремонт, сборка мебели',
      price: '800 ₽/час',
      rating: 4.7,
      reviews: 145,
    },
    {
      id: '8',
      title: 'Грузоперевозки',
      icon: '🚚',
      color: 'from-red-100 to-red-200',
      description: 'Перевозка мебели, грузчики',
      price: 'от 2000 ₽',
      rating: 4.8,
      reviews: 91,
    },
    {
      id: '9',
      title: 'Другое',
      icon: '➕',
      color: 'from-gray-100 to-gray-200',
      description: 'Другие бытовые услуги',
      price: 'По договоренности',
      rating: 4.5,
      reviews: 43,
    },
  ];

  const handleOrderService = () => {
    // Логика заказа услуги
    setSelectedService(null);
    setOrderDetails({ date: '', time: '', comment: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Шапка */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">Платные услуги</h1>
            <p className="text-sm text-gray-600">Выберите нужную услугу</p>
          </div>
        </div>
      </div>

      {/* Сетка услуг */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="cursor-pointer hover:shadow-lg transition-all border-0 overflow-hidden"
              onClick={() => setSelectedService(service)}
            >
              <div className={`h-32 bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                <span className="text-5xl">{service.icon}</span>
              </div>
              <CardContent className="p-3">
                <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                  {service.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                  <Icon name="Star" size={12} className="text-yellow-500 fill-yellow-500" />
                  <span>{service.rating}</span>
                  <span>({service.reviews})</span>
                </div>
                <p className="text-xs font-semibold text-blue-600">{service.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Диалог заказа услуги */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="text-3xl">{selectedService?.icon}</span>
              <span>{selectedService?.title}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm mb-2">{selectedService?.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                  {selectedService?.rating}
                </Badge>
                <span className="text-gray-600">
                  {selectedService?.reviews} отзывов
                </span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-1">Стоимость услуги</p>
              <p className="text-xl font-bold text-blue-600">{selectedService?.price}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Желаемая дата
                </label>
                <Input
                  type="date"
                  value={orderDetails.date}
                  onChange={(e) =>
                    setOrderDetails({ ...orderDetails, date: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Желаемое время
                </label>
                <Input
                  type="time"
                  value={orderDetails.time}
                  onChange={(e) =>
                    setOrderDetails({ ...orderDetails, time: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Комментарий к заказу
                </label>
                <Textarea
                  placeholder="Опишите подробности..."
                  value={orderDetails.comment}
                  onChange={(e) =>
                    setOrderDetails({ ...orderDetails, comment: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSelectedService(null)}
              >
                Отмена
              </Button>
              <Button
                className="flex-1 bg-blue-500 hover:bg-blue-600"
                onClick={handleOrderService}
              >
                Заказать
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesScreen;
