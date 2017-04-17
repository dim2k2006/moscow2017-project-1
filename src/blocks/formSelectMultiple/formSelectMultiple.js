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
                initialList = container.dataset.list ? JSON.parse(container.dataset.list) : [],
                options = [].slice.call(select.querySelectorAll('option')),
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

                    selectList.push({
                        value: value,
                        text: text
                    });

                }
            });

            selectList = selectList.filter(function(item) {
                return item.value !== selectedValue;
            });

            selectList.forEach(function(selectItem) {
                initialList.forEach(function(initialItem, index) {
                    if (initialItem.value === selectItem.value) {

                        initialList.splice(index, 1);

                    }
                });
            });

            resultList = initialList;

            self.render(container, selectList, resultList);
        };

        /**
         * Handle click event
         * @param {Object} event
         */
        self.handleClick = function(event) {
            event.preventDefault();

            var container = this.closest('.formSelectMultiple'),
                target = event.target,
                selectedValue = target.getAttribute('href'),
                initialList = container.dataset.list ? JSON.parse(container.dataset.list) : [],
                links = [].slice.call(container.querySelectorAll('a')),
                selectList = [],
                resultList = [];

            resultList = links.map(function(item) {
                var value = item.getAttribute('href'),
                    text = item.innerHTML;

                return {
                    value: value,
                    text: text
                }
            }).filter(function(item) {
                return item.value !== selectedValue;
            });

            resultList.forEach(function(resultItem) {
                initialList.forEach(function(initialItem, index) {
                    if (initialItem.value === resultItem.value) {

                        initialList.splice(index, 1);

                    }
                });
            });

            selectList = initialList;

            self.render(container, selectList, resultList);
        };

        /**
         * Return container selected value
         * @param container
         * @returns {Array}
         */
        self.getValue = function(container) {
            var resultList = [];

            if (container) {

                var links = [].slice.call(container.querySelectorAll('a'));

                resultList = links.map(function(item) {
                    var value = item.getAttribute('href'),
                        text = item.innerHTML;

                    return {
                        value: value,
                        text: text
                    }
                });

            }

            return resultList;
        };

        /**
         * Render data for container
         * @param {Element} container
         * @param {Array} selectData
         * @param {Array} resultData
         */
        self.render = function(container, selectData, resultData) {
            var selectContainer = container.querySelector('.formSelectMultiple__select'),
                resultContainer = container.querySelector('.formSelectMultiple__list'),
                selectHtml = '<option value=""></option>',
                resultHtml = '';

            if (selectData.length > 0) {

                selectData.forEach(function(item) {
                    selectHtml += '<option value="'+ item.value +'">'+ item.text +'</option>';
                });

            }

            if (resultData.length > 0) {

                resultData.forEach(function(item) {
                    resultHtml += '<li class="formSelectMultiple__item"><a href="'+ item.value +'" class="formSelectMultiple__link">'+ item.text +'</a></li>';
                });

            }

            if (selectContainer) {

                selectContainer.innerHTML = selectHtml;

            }

            if (resultContainer) {

                resultContainer.innerHTML = resultHtml;

            }

            container.dispatchEvent(new Event('change'));
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
