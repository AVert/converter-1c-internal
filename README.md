# parser-1c-internal

## Converts data from/to [1C:Enterprise](https://1c-dn.com/) internal format string

### *1C:Enterprise is a widуle used developing platform in the former USSR countries, so, as that package is useful only for 1C developers, the text below is in russian*

</br>

## 🧐 Описание <a name = "about"></a>

Конвертер данных из строки во внутреннем формате 1С:Предприятие в объекты JavaScript и наоборот.

Будет полезна для организации взаимодействия приложения 1С:Предприятие со сторонними приложениями, работающими на [Node.js®](https://nodejs.org/).

Формат данных внутренней строки содержит идентификаторы (ID) прикладных объектов метаданных (справочники, документы и т.д.), а это позволяет производить быструю синхронизацию данных между 1С:Предприятие и другими базами данных.

</br>

## Начало работы <a name = "getting_started"></a>

### Требования

Для использования модуля на компьюетре должно быть установлено JavaScript-окружение Node.js®. Чтобы установить последнюю стабильную версию, перейдите по [ссылке](https://nodejs.org/).

### Установка

Модуль можно установить в разрабатываемое приложение как зависимость с помощью npm менеджера:

```javascript
npm install --save parser-1c-internal
```

### Запуск тестов <a name = "tests"></a>

```javascript
npm test
```

</br>

## Использование <a name="usage"></a>

### TypeScrit

```javascript
import Converter from "parser-1c-internal";

const internalStringFrom = '{"S", "Это строка из 1С"}';

const value = Converter.convertFrom1C(internalStringFrom);
console.log(value); // 'Это строка из 1С'

const internalStringTo = Converter.convertTo1C("Это строка из Node.js"); 
console.log(internalStringTo); // '{"S", "Это строка из Node.js"}'
```

```bsl
Процедура Тест() 
КонецПроцедуры
```

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)