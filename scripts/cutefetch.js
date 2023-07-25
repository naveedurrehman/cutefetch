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

    fetch(element) {
        const self = this;
        const href_url = element.getAttribute('x_href');
        const cutefetch_url = element.getAttribute('cutefetch');
        const createCORSRequest = function (method, cutefetch_url) {
            const xhr = new XMLHttpRequest();
            if ('withCredentials' in xhr) {
                xhr.open(method, cutefetch_url, true);
            } else if (typeof XDomainRequest != 'undefined') {
                xhr = new XDomainRequest();
                xhr.open(method, cutefetch_url, true);
            } else {
                xhr = null;
            }
            return xhr;
        };

        const method = 'GET';
        const xhr = createCORSRequest(method, cutefetch_url);

        xhr.onload = function () {
            history.pushState({ url: href_url }, '', href_url);
            self.windowStates.push(href_url);
            const buffer = JSON.parse(xhr.responseText);
            self.process(buffer);
        };

        xhr.onerror = function () {
            console.error('Error in loading request.');
        };

        xhr.send();
    }

    refresh() {
        const self = this;
        const elements = document.querySelectorAll('a[cutefetch]');
        var element;
        for (var i = 0; i < elements.length; i++) {
            element = elements[i];
            element.setAttribute('x_href', element.getAttribute('href'));
            element.setAttribute('href', '#');
            element.setAttribute('onClick', 'cutefetch.fetch(this);return false;');
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
