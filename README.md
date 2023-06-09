# Paint Online
### Link - http://79.143.31.186
### Как лучше посмотреть проект:
1. Открываете ссылку http://79.143.31.186 вводите никнейм, у вас появляется Paint <br />
2. Копируете ссылку из строки браузера и по ней открываете новое окно, вводите другой никнейм<br />
3. Делаете 2 вкладки браузера в разных окнах, рисуете видя полный функционал приложения <br />


## Описание
Приложение копия paint в браузере с возможностью совместного рисования <br />
Написана и серверная часть на Express - https://github.com/WheatleyCODE/paint-server <br />
Описаны простейшие Unit тесты <br />
Приложение упаковано в Docker и залито на VPS <br />
Составлена схема проекта файл schema.drawio, вы можете скачать и просмотреть его в онлайн редакторе: https://app.diagrams.net/

### Важно:
Если у вас стоит приближение или отдаление браузера более 100%, поставьте 100%, иначе возможны несовпадения размера курсора и рисуемой области кисти 

## Функционал
- Приложение полностью адаптивно под разные размеры экрана <br />
- Отображение подключенных пользователей <br />
- Возможность отменить последнее действие или вернуть назад <br />
- Выбор основного и второстепенного цвета и возможность его переключать как в Paint (ПКМ / ЛКМ)<br />
- Отображение подключенных пользователей <br />
- Предварительное отображение кисти <br />
- Возможность рисовать кистью <br />
- Ластик <br />
- Возможность рисовать Квадраты, круги и треугольники <br />
- Возможность рисовать Свободные фигуры и линии <br />
- Рисование "Магической кистью" и ее настройки <br />
- Возможность применять эффекты к кистям (Ластик не является кистью)<br />
- Эффект расширения и уменьшения, от большого к малому, от малого к большому<br />
- Возможность регулировки фигур<br />
- Возможность регулировки кистей<br />
- Возможность cохранения изображения как картинки<br />
- Возможность очистки холста<br />
- Возможность изменять размер холста (Наведите курсор на край холста мышкой и потяните)<br />
- Все корректно работает с подключенными пользователями и любыми размера окна браузера<br />
- Если пользователь2 использует фигуру пользователь1 видит его выделение<br />


## Технологии
- SCSS
- TypeScript 
- React
- Redux, RTK 
- React Bootstrap
- Axios
- RxJs
- WebSocket
- Jest
- React testing library


## Концепции
Использованы паттерны и построена ООП логика инструментов <br />
Во время разработки вел схему проекта с наглядным представлением всех сущностей, вы тоже можете просмотреть ее файл schema.drawio <br />
