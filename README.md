# ШРИ 2017, Задание 1

> Данный проект представляет собой расписание лекций проекта «Мобилизация».

## Содержание

- [Установка](#Установка)
- [Деплой](#Деплой)
- [Описание](#Описание)

## Установка

1. git clone git@github.com:dim2k2006/moscow2017-project-1.git

2. cd moscow2017-project-1

3. npm i && bower i

4. gulp build

> Собранный проект находится в папке static

## Деплой

1. git subtree push --prefix static origin gh-pages

## Описание

Для отображения расписания лекций используется библиотека с данными из [Задания 2](https://github.com/dim2k2006/moscow2017-project-2).
 
Данная бибилиотека устанавливается как bower зависимость:

```json
{
  "name": "shri-2017-project-1",
  "version": "0.1.0",
  "dependencies": {
    "normalize.css": "~3.0.3",
    "shri-2017-project-2": "git@github.com:dim2k2006/moscow2017-project-2.git"
  }
}
```

После сборки проекта библиотека подключается как вендорный скрипт:

```html
<script src="scripts/vendor.min.js"></script>
```

Далее используя встроенный метод библиотеки [getSchedule](https://github.com/dim2k2006/moscow2017-project-2#getscheduledatefrom-dateto-placeid) скрипт получает массив данных для вывода. 

