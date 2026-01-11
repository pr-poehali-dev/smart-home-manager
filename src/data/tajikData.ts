export const tajikComplexes = [
  'ЖК Душанбе Сити',
  'ЖК Сомон',
  'ЖК Ориёна',
  'ЖК Сарват',
  'ЖК Истиқлол',
  'ЖК Паёми',
  'ЖК Рудакӣ',
  'ЖК Навруз',
];

export const tajikNames = [
  'Рустам Раҳимов',
  'Фарход Юсупов',
  'Ҷамшед Алиев',
  'Нозанин Маҳмудова',
  'Гулнора Иброҳимова',
  'Дилшод Саидов',
  'Мавлуда Қурбонова',
  'Суҳроб Назаров',
];

export const formatSomoni = (amount: number): string => {
  return `${amount.toLocaleString('ru-RU')} с.`;
};

export const getCurrency = () => ({
  code: 'TJS',
  symbol: 'с.',
  name: 'Сомонӣ',
  nameRu: 'Сомони',
});
