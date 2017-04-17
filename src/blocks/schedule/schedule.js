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
        self.schoolSelect = document.querySelector('.formSelectMultiple__select[name="school"]');
        self.authorSelect = document.querySelector('.formSelectMultiple__select[name="author"]');
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
         * Setup school filter values
         */
        self.setupSchoolFilter = function() {
            self.getSchool().then(function(response) {
                var html = '<option value=""></option>';

                response.forEach(function(item) {
                    html += '<option value="'+ item.id +'">'+ item.title +'</option>';
                });

                self.schoolSelect.innerHTML = html;
            });
        };

        /**
         * Setup author filter values
         */
        self.setupAuthorFilter = function() {
            self.getAuthor().then(function(response) {
                var html = '<option value=""></option>';

                response.forEach(function(item) {
                    html += '<option value="'+ item.id +'">'+ item.title +'</option>';
                });

                self.authorSelect.innerHTML = html;
            });
        };

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
                    month = self.monthNames[date.getMonth()],
                    school = [],
                    author = [];

                item.school.forEach(function(item) {
                    var itemTitle = self.expand([item], {title: 'schools', data: response.schools}, 'title'),
                        itemId = self.expand([item], {title: 'schools', data: response.schools}, 'id');

                    school.push('<span class="scheduleItem__school__item scheduleItem__school__item_'+ itemId +'">'+ itemTitle +'</span>');
                });

                item.author.forEach(function(item) {
                    var itemTitle = self.expand([item], {title: 'authors', data: response.authors}, 'title'),
                        itemPhoto = self.expand([item], {title: 'authors', data: response.authors}, 'photo'),
                        itemDescription = self.expand([item], {title: 'authors', data: response.authors}, 'description');

                    author.push('<a class="scheduleItem__author__link modal_trigger" href="#author" title="Посмотреть дополнительную информацию" data-photo="'+ itemPhoto +'" data-title="'+ itemTitle +'" data-description="'+ itemDescription +'">'+ itemTitle +'</a>');
                });

                if (item.isOver) {

                    element.querySelector('.scheduleItem').classList.add('scheduleItem_state_inactive');

                }

                element.querySelector('.scheduleItem__day').innerHTML = day;

                element.querySelector('.scheduleItem__month').innerHTML = month;

                element.querySelector('.scheduleItem__time').innerHTML = item.time;

                element.querySelector('.scheduleItem__title').innerHTML = item.title;

                element.querySelector('.scheduleItem__school').innerHTML = school.join('');

                element.querySelector('.scheduleItem__author').innerHTML += author.join(', ');

                element.querySelector('.scheduleItem__audience').innerHTML += self.expand([item.place], {title: 'places', data: response.places}, 'title');

                element.querySelector('.scheduleItem__place__link').innerHTML = self.expand([item.place], {title: 'places', data: response.places}, 'address');

                element.querySelector('.scheduleItem__place__link').href = self.expand([item.place], {title: 'places', data: response.places}, 'link');

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
            self.getSchool = app.modules.main.library.getSchool;
            self.getAuthor = app.modules.main.library.getAuthor;
            self.expand = app.modules.main.library.expand;
        };

        /**
         * Init module
         */
        self.init = function() {
            if (self.container) {

                self.importDefaults();
                self.setupSchoolFilter();
                self.setupAuthorFilter();
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
