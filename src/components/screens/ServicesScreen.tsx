import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useLanguage } from '@/context/LanguageContext';
import { formatSomoni } from '@/data/tajikData';

interface ServicesScreenProps {
  onBack: () => void;
}

interface Service {
  id: string;
  titleKey: 'construction' | 'electricity' | 'cleaning' | 'plumbing' | 'otherServices';
  icon: string;
  color: string;
  price: number | null;
  rating: number;
  reviews: number;
}

const ServicesScreen = ({ onBack }: ServicesScreenProps) => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [orderDetails, setOrderDetails] = useState({
    date: '',
    time: '',
    comment: '',
    phone: '',
  });

  const services: Service[] = [
    {
      id: '1',
      titleKey: 'construction',
      icon: '🔨',
      color: 'from-orange-50 to-orange-100',
      price: 150,
      rating: 4.8,
      reviews: 124,
    },
    {
      id: '2',
      titleKey: 'electricity',
      icon: '⚡',
      color: 'from-purple-50 to-purple-100',
      price: 120,
      rating: 4.9,
      reviews: 98,
    },
    {
      id: '3',
      titleKey: 'cleaning',
      icon: '🧹',
      color: 'from-green-50 to-green-100',
      price: 250,
      rating: 4.7,
      reviews: 156,
    },
    {
      id: '4',
      titleKey: 'plumbing',
      icon: '🔧',
      color: 'from-blue-50 to-blue-100',
      price: 100,
      rating: 4.8,
      reviews: 87,
    },
    {
      id: '5',
      titleKey: 'otherServices',
      icon: '➕',
      color: 'from-gray-50 to-gray-100',
      price: null,
      rating: 4.5,
      reviews: 43,
    },
  ];

  const handleOrderService = () => {
    setSelectedService(null);
    setOrderDetails({ date: '', time: '', comment: '', phone: '' });
  };

  const getServiceTitle = (titleKey: Service['titleKey']) => {
    return t.services[titleKey];
  };

  const getServiceDescription = (titleKey: Service['titleKey']) => {
    return t.services[`${titleKey}Desc` as keyof typeof t.services];
  };

  const getPriceDisplay = (price: number | null) => {
    return price ? `от ${formatSomoni(price)}/час` : t.services.byAgreement;
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
            <h1 className="text-xl font-bold text-gray-900">{t.services.title}</h1>
            <p className="text-sm text-gray-600">{t.services.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Сетка услуг */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => (
            <Card
              key={service.id}
              className="cursor-pointer hover:shadow-md transition-all border border-gray-200 overflow-hidden rounded-3xl"
              onClick={() => setSelectedService(service)}
            >
              <div className={`h-40 bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                <span className="text-6xl">{service.icon}</span>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-gray-900 text-base mb-3 line-clamp-2 min-h-[48px]">
                  {getServiceTitle(service.titleKey)}
                </h3>
                <p className="text-sm font-semibold text-gray-700">{getPriceDisplay(service.price)}</p>
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
              <span>{selectedService && getServiceTitle(selectedService.titleKey)}</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <p className="text-gray-600 text-sm mb-2">
                {selectedService && getServiceDescription(selectedService.titleKey)}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                  {selectedService?.rating}
                </Badge>
                <span className="text-gray-600">
                  {selectedService?.reviews} {t.services.reviews}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-gray-600 mb-1">{t.services.price}</p>
              <p className="text-xl font-bold text-blue-600">
                {selectedService && getPriceDisplay(selectedService.price)}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-900 mb-2 block">
                  {t.services.desiredDate} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Icon name="Calendar" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="date"
                    value={orderDetails.date}
                    onChange={(e) =>
                      setOrderDetails({ ...orderDetails, date: e.target.value })
                    }
                    className="pl-10 h-12 rounded-xl border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-900 mb-2 block">
                  {t.services.desiredTime} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Icon name="Clock" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="time"
                    value={orderDetails.time}
                    onChange={(e) =>
                      setOrderDetails({ ...orderDetails, time: e.target.value })
                    }
                    className="pl-10 h-12 rounded-xl border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-900 mb-2 block">
                  {t.services.comment}
                </label>
                <Textarea
                  placeholder={t.services.commentPlaceholder}
                  value={orderDetails.comment}
                  onChange={(e) =>
                    setOrderDetails({ ...orderDetails, comment: e.target.value })
                  }
                  rows={4}
                  className="rounded-xl border-gray-300 resize-none"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-900 mb-2 block">
                  {t.services.contactPhone} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Icon name="Phone" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder="+992 (__) ___-__-__"
                    value={orderDetails.phone}
                    onChange={(e) =>
                      setOrderDetails({ ...orderDetails, phone: e.target.value })
                    }
                    className="pl-10 h-12 rounded-xl border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 h-12 rounded-xl font-semibold"
                onClick={() => setSelectedService(null)}
              >
                {t.cancel}
              </Button>
              <Button
                className="flex-1 h-12 rounded-xl bg-green-500 hover:bg-green-600 font-semibold"
                onClick={handleOrderService}
              >
                {t.services.orderService}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ServicesScreen;
