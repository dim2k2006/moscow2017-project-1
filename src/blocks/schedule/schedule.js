// (function() {
//     if ('modules' in app && 'schedule' in app.modules) {
//         return;
//     }
//
//     /**
//      * Creates a new Schedule class.
//      * @class
//      */
//     var Schedule = function () {
//         var self = this;
//
//         self.container = document.querySelector('.schedule');
//         self.endPoint = 'https://raw.githubusercontent.com/dim2k2006/moscow2017-project-1/master/src/schedule.json?cache=' + Math.random();
//         self.template = document.querySelector('#scheduleItem-template').innerHTML;
//         self.content = document.querySelector('.scheduleList__content');
//         self.monthNames = [
//             'январь',
//             'февраль',
//             'март',
//             'апрель',
//             'май',
//             'июнь',
//             'июль',
//             'август',
//             'сентябрь',
//             'октябрь',
//             'ноябрь',
//             'декабрь'
//         ];
//         self.dataList = '';
//
//         /**
//          * Retrieve data for schedule
//          */
//         self.getData = function() {
//             var xhr = new XMLHttpRequest();
//
//             xhr.open('GET', self.endPoint, true);
//
//             xhr.send();
//
//             xhr.onreadystatechange = function() {
//                 if (this.readyState !== 4) {
//                     return
//                 }
//
//                 if (this.status !== 200) {
//                     return;
//                 }
//
//                 self.dataList = JSON.parse(this.responseText);
//
//                 self.render(self.dataList);
//             };
//         };
//
//         /**
//          * Render schedule
//          */
//         self.render = function(list) {
//             var content = document.createElement('ul');
//
//             content.classList.add('scheduleList__list');
//
//             list.forEach(function(item) {
//                 var element = document.createElement('li'),
//                     schools = '',
//                     authors = '',
//                     date = new Date(item.date),
//                     day = date.getDate(),
//                     month = self.monthNames[date.getMonth()];
//
//                 element.classList.add('scheduleList__item');
//                 element.innerHTML = self.template;
//
//                 element.querySelector('.scheduleItem__day').innerHTML = day;
//                 element.querySelector('.scheduleItem__month').innerHTML = month;
//                 element.querySelector('.scheduleItem__time').innerHTML = item.time;
//                 element.querySelector('.scheduleItem__title').innerHTML = item.title;
//                 element.querySelector('.scheduleItem__place__link').innerHTML = item.place.title;
//                 element.querySelector('.scheduleItem__place__link').href = item.place.link;
//
//                 item.school.forEach(function(item) {
//                     schools += '<span class="scheduleItem__' + item.id +'">'+ item.name +'</span>';
//                 });
//
//                 element.querySelector('.scheduleItem__school').innerHTML = schools;
//
//                 item.author.forEach(function(item) {
//                     authors += '<li class="scheduleItem__author__item"><span class="scheduleItem__author__label">Лектор:</span> <a class="scheduleItem__author__link modal_trigger" href="#author">'+ item.name +'</a></li>';
//                 });
//
//                 element.querySelector('.scheduleItem__author__list').innerHTML = authors;
//
//                 content.appendChild(element);
//             });
//
//             self.content.appendChild(content);
//         };
//
//         /**
//          * Import properties from Main class
//          */
//         self.importDefaults = function() {
//             self.body = app.modules.main.body;
//         };
//
//         /**
//          * Init module
//          */
//         self.init = function() {
//             if (self.container) {
//
//                 self.importDefaults();
//                 self.getData();
//
//             }
//         };
//     };
//
//     if (!('modules' in app)) {
//         app.modules = {};
//     }
//
//     app.modules.schedule = new Schedule();
// })();
//
//
