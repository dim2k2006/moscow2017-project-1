(function () {
    if ('modules' in app && 'formSelectMultiple' in app.modules) {
        return;
    }

    /**
     * Creates a new FormSelectMultiple class.
     * @class
     */
    var FormSelectMultiple = function () {
        var self = this;

        self.body = '';
        self.container = document.querySelector('.formSelectMultiple');
        self.content = document.querySelector('.formSelectMultiple__content');
        self.footer = document.querySelector('.formSelectMultiple__footer');

        /**
         * Add event listeners
         */
        self.setupListener = function() {
            self.content.addEventListener('change', self.handleChange);
            self.footer.addEventListener('click', self.handleClick);
        };

        /**
         * Handle change event
         */
        self.handleChange = function() {
            var container = this.closest('.formSelectMultiple'),
                select = container.querySelector('.formSelectMultiple__select'),
                selectedValue = select.value,
                result = container.querySelector('.formSelectMultiple__list'),
                initialList = container.dataset.list ? JSON.parse(container.dataset.list) : [],
                options = [].slice.call(select.querySelectorAll('option')),
                list = [],
                selectList = [],
                resultList = [];

            if (!container.classList.contains('formSelectMultiple_state_inited')) {

                [].slice.call(select.querySelectorAll('option')).forEach(function(item) {
                    var value = item.value,
                        text = item.innerHTML;

                    if (value && text) {

                        initialList.push({
                            value: value,
                            text: text
                        });

                    }
                });

                container.dataset.list = JSON.stringify(initialList);

                container.classList.add('formSelectMultiple_state_inited');

            }

            options.forEach(function(item) {
                var value = item.value,
                    text = item.innerHTML;

                if (value && text) {

                    list.push({
                        value: value,
                        text: text
                    })

                }
            });

            selectList = list.filter(function(item) {
                return item.value !== selectedValue
            });

            selectList.forEach(function(selectItem) {
                initialList.forEach(function(initialItem, index) {
                    if (initialItem.value === selectItem.value) {

                        initialList.splice(index, 1);

                    }
                });
            });

            resultList = initialList;

            self.renderSelect(select, selectList);
            self.renderResult(result, resultList);
        };

        /**
         * Handle click event
         * @param {Object} event
         */
        self.handleClick = function(event) {
            event.preventDefault();

            var container = this,
                link = event.target,
                selectedValue = parseInt(link.getAttribute('href')),
                initialList = container.dataset.list ? JSON.parse(container.dataset.list) : [],
                links = [].slice.call(container.querySelectorAll('a')),
                list = [],
                selectList = initialList.slice(),
                resultList = [];

            links.forEach(function(item) {
                console.log(item);

                var value = item.getAttribute('href'),
                    text = item.innerHTML;

                if (value && text) {

                    list.push({
                        value: value,
                        text: text
                    })

                }
            });



        };

        /**
         * Render select content
         * @param {Element} container
         * @param {Object} data
         */
        self.renderSelect = function(container, data) {
            var html = '<option value=""></option>';

            data.forEach(function(item) {
                html += '<option value="'+ item.value +'">'+ item.text +'</option>';
            });

            container.innerHTML = html;
        };

        /**
         * Render result content
         * @param {Element} container
         * @param {Object} data
         */
        self.renderResult = function(container, data) {
            var html = '';

            data.forEach(function(item) {
                html += '<li class="formSelectMultiple__item"><a href="'+ item.value +'" class="formSelectMultiple__link">'+ item.text +'</a></li>';
            });

            container.innerHTML = html;
        };

        /**
         * Import properties from Main class
         */
        self.importDefaults = function() {
            self.body = app.modules.main.body;
        };

        /**
         * Init module
         */
        self.init = function() {
            if (self.container) {

                self.importDefaults();
                self.setupListener();

            }
        };
    };

    if (!('modules' in app)) {
        app.modules = {};
    }

    app.modules.formSelectMultiple = new FormSelectMultiple();
})();
