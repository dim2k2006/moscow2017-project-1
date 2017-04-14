(function() {
    if ('modules' in app && 'schedule' in app.modules) {
        return;
    }

    /**
     * Creates a new Schedule class.
     * @class
     */
    var Schedule = function () {
        var self = this;

        self.body = '';
        self.getSchedule = '';
        self.getPlace = '';
        self.getSchool = '';
        self.getAuthor = '';
        self.expand = '';
        self.container = document.querySelector('.schedule');
        self.content = document.querySelector('.scheduleList__content');
        self.template = document.querySelector('#scheduleItem-template').innerHTML;
        self.monthNames = [
            'январь',
            'февраль',
            'март',
            'апрель',
            'май',
            'июнь',
            'июль',
            'август',
            'сентябрь',
            'октябрь',
            'ноябрь',
            'декабрь'
        ];
        self.dataList = '';


        // self.dateFromInput = self.container.querySelector('.formInput__input[name="from"]');
        // self.dateToInput = self.container.querySelector('.formInput__input[name="to"]');


        /**
         * Add event listeners
         */
        self.setupListener = function() {
            // self.dateFromInput.addEventListener('change', self.getData);
            // self.dateToInput.addEventListener('change', self.getData);
            // self.placeSelect.addEventListener('change', self.getData);
        };

        /**
         * Setup place filter values
         */
        // self.setupPlaceFilter = function() {
        //     self.getPlace().then(function(response) {
        //         var html = '<option value=""></option>';
        //
        //         response.forEach(function(item) {
        //             html += '<option value="'+ item.id +'">'+ item.title +'</option>';
        //         });
        //
        //         self.placeSelect.innerHTML = html;
        //     });
        // };

        /**
         * Get data from library according to filter values
         */
        self.getData = function() {
            var dateFrom = '',//self.dateFromInput.value.replace(/-/g, '/'),
                dateTo = '',//self.dateToInput.value.replace(/-/g, '/'),
                place = '';//self.placeSelect.value ? parseInt(self.placeSelect.value) : '';

            self.getSchedule(dateFrom, dateTo, place).then(function(response) {
                self.render(response);
            });
        };

        /**
         * Render schedule list
         * @param {Object} response
         */
        self.render = function(response) {
            var contentList = document.createElement('ul');

            contentList.classList.add('scheduleList__list');

            response.lectures.forEach(function(item) {
                var element = document.createElement('li');

                element.classList.add('scheduleList__item');
                element.innerHTML = self.template;

                var date = new Date(item.date),
                    day = date.getDate(),
                    month = self.monthNames[date.getMonth()];

                element.querySelector('.scheduleItem__day').innerHTML = day;

                element.querySelector('.scheduleItem__month').innerHTML = month;

                element.querySelector('.scheduleItem__time').innerHTML = item.time;

                element.querySelector('.scheduleItem__title').innerHTML = item.title;

                element.querySelector('.scheduleItem__place__link').innerHTML = self.expand([item.place], {title: 'places', data: response.places});

//                     schools = '',
//                     authors = '',
//
//
//
//
//
//
//
//
//
//
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



                ///////////////////////


                // contentItem.querySelector('.adminSchedule__box__name').innerHTML = item.title;

                // contentItem.querySelector('.adminSchedule__box__school').innerHTML += self.expand(item.school, {title: 'schools', data: response.schools});

                // contentItem.querySelector('.adminSchedule__box__author').innerHTML += self.expand(item.author, {title: 'authors', data: response.authors});

                // contentItem.querySelector('.adminSchedule__box__date').innerHTML += item.date;

                // contentItem.querySelector('.adminSchedule__box__time').innerHTML += item.time;

                // contentItem.querySelector('.adminSchedule__box__place').innerHTML += self.expand([item.place], {title: 'places', data: response.places});

                // contentItem.querySelector('.adminSchedule__box__status').innerHTML += item.isOver ? 'Лекция закончилась' : 'Лекция еще не закончилась';

                // contentItem.querySelector('.adminSchedule__box__resources a').href = item.resources;

                contentList.appendChild(element);
            });

            self.content.innerHTML = '';

            self.content.appendChild(contentList);
        };

        /**
         * Import properties from Main class
         */
        self.importDefaults = function() {
            self.body = app.modules.main.body;
            self.getSchedule = app.modules.main.library.getSchedule;
            // self.getPlace = app.modules.main.library.getPlace;
            // self.getSchool = app.modules.main.library.getSchool;
            // self.getAuthor = app.modules.main.library.getAuthor;
            self.expand = app.modules.main.library.expand;
        };

        /**
         * Init module
         */
        self.init = function() {
            if (self.container) {

                self.importDefaults();
                // self.setupPlaceFilter();
                self.getData();
                self.setupListener();

            }
        };
    };

    if (!('modules' in app)) {
        app.modules = {};
    }

    app.modules.schedule = new Schedule();
})();

// (function() {
//     if ('modules' in app && 'schedule' in app.modules) {
//         return;
//     }
//
    /**
     * Creates a new Schedule class.
     * @class
     */
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
