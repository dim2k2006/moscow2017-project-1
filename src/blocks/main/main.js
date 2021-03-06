var initApp = function() {
    if ('modules' in app && 'main' in app.modules) {
        return;
    }

    /**
     * Creates a new Main class.
     * @class
     */
    var Main = function() {
        var self = this;

        self.html = document.querySelector('html');
        self.body = document.querySelector('body');
        self.modules = app.modules;
        self.library = new Library();

        /**
         * Init library module
         */
        self.initLibrary = function() {
            self.library.init();
        };

        /**
         * Init polyFills
         */
        self.initPolyfills = function() {
            if (!Element.prototype.closest) {

                Element.prototype.closest = function(css) {
                    var node = this;

                    while (node) {
                        if (node.matches(css)) return node;
                        else node = node.parentElement;
                    }
                    return null;
                };

            }

            if (!Element.prototype.matches) {

                Element.prototype.matches = Element.prototype.matchesSelector ||
                    Element.prototype.webkitMatchesSelector ||
                    Element.prototype.mozMatchesSelector ||
                    Element.prototype.msMatchesSelector;

            }
        };

        /**
         * Init all modules in $.modules
         */
        self.initModules = function() {
            for (var module in self.modules) {

                if (self.modules.hasOwnProperty(module)) {

                    if (typeof self.modules[module].init !== 'undefined' && module !== 'main' && module !== 'library') {

                        self.modules[module].init();

                    }

                }

            }
        };

        /**
         * Init module
         */
        self.init = function() {
            self.initLibrary();
            self.initPolyfills();
            self.initModules();
        };
    };

    if (!('modules' in app)) {
        app.modules = {};
    }

    app.modules.main = new Main();

    app.modules.main.init();
};

window.addEventListener('load', initApp);
