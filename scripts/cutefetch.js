window.addEventListener('load', function (event) {
    cutefetch = new cutefetch();
});

class cutefetch {

    constructor() {
        const self = this;
        self.windowStates = [];
        self.refresh();
        self.windowStates.push(window.location.href);
        addEventListener('popstate', function (e) {
            try {
                self.windowStates.pop();
                const prev = self.windowStates[self.windowStates.length - 1];
                if (prev) {
                    window.location.href = prev;
                    window.location.reload();
                }
                e.preventDefault();
            } catch (error) { console.error(error); }
        });

    }

    fetch(url, data = '') {
        const self = this;
        const createCORSRequest = function (method, url) {
            const xhr = new XMLHttpRequest();
            if ('withCredentials' in xhr) {
                xhr.open(method, url, true);
            } else if (typeof XDomainRequest != 'undefined') {
                xhr = new XDomainRequest();
                xhr.open(method, url, true);
            } else {
                xhr = null;
            }
            return xhr;
        };

        const method = 'POST';
        const xhr = createCORSRequest(method, url);

        xhr.onload = function () {
            const buffer = JSON.parse(xhr.responseText);
            self.process(buffer);
        };

        xhr.onerror = function () {
            console.error('Error in loading request.');
        };

        xhr.send(data);
    }

    href(element) {
        const self = this;
        const cutefetch = element.getAttribute('cutefetch');
        self.fetch(cutefetch);
    }

    form(element) {
        const self = this;
        const cutefetch = element.getAttribute('cutefetch');
        const data = new FormData(element);
        element.setAttribute('action', '');
        element.setAttribute('method', 'POST');
        self.fetch(cutefetch, data);
    }

    refresh() {
        const self = this;
        var elements;
        var element;

        elements = document.querySelectorAll('a[cutefetch]');
        for (var i = 0; i < elements.length; i++) {
            element = elements[i];
            element.setAttribute('href', '#');
            element.setAttribute('onClick', 'cutefetch.href(this);return false;');
        }

        elements = document.querySelectorAll('form[cutefetch]');
        for (var i = 0; i < elements.length; i++) {
            element = elements[i];
            element.setAttribute('action', '');
            element.setAttribute('onSubmit', 'cutefetch.form(this);return false;');
        }

    }

    process(buffer) {
        const self = this;
        Object.entries(buffer).forEach(([key, command]) => {
            try {
                if (command[0] == 'script') {
                    const element = document.createElement('script');
                    element.text = command[1];
                    document.body.appendChild(element);
                }
            } catch (error) {
                console.error(error);
            }
        });
        self.refresh();
    }
}


/*
            history.pushState({ url: href_url }, '', href_url);
            self.windowStates.push(href_url);

*/