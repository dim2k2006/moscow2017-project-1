(function () {
    if ('modules' in app && 'modal' in app.modules) {
        return;
    }

    /**
     * Creates a new Modal class.
     * @class
     */
    var Modal = function () {
        var self = this;

        self.html = '';
        self.body = '';
        self.container = document.querySelector('.modal');
        self.openButton = document.querySelector('.modal_trigger');
        self.closeButton = document.querySelector('.modal_close');

        /**
         * Add event listeners
         */
        self.setupListener = function() {
            self.body.addEventListener('click', self.router);
            // self.openButton.addEventListener('click', self.open);
            // self.closeButton.addEventListener('click', self.close);
        };

        /**
         * Route click event
         * @param {Object} event
         */
        self.router = function(event) {
            var target = event.target;

            if (target.classList.contains('modal_trigger')) {

                event.preventDefault();

                self.open(event.target);

            } else if (target.classList.contains('modal_close')) {

                event.preventDefault();

                self.close(event.target);

            }
        };

        self.open = function(target) {
            var src = target.getAttribute('href'),
                container = document.querySelector(src);

            self.html.classList.add('modal_state_open');
            container.classList.add('modal_state_open');
        };

        self.close = function(target) {
            var container = target.closest('.modal');

            container.classList.remove('modal_state_open');
            self.html.classList.remove('modal_state_open');
        };

        /**
         * Import properties from Main class
         */
        self.importDefaults = function() {
            self.html = app.modules.main.html;
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

    app.modules.modal = new Modal();
})();
