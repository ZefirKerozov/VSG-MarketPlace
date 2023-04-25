// Dark mode functionality

document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));

const darkModeSwitchHeader = document.querySelector('#dark-mode-header');
const darkModeSwitchAside = document.querySelector('#dark-mode-aside');

const theme = localStorage.getItem('theme');

if (theme === undefined) {
    localStorage.setItem('theme', 'light');
}

if (theme === 'dark') {
    darkModeSwitchHeader.checked = true;
    darkModeSwitchAside.checked = true;
} else if (theme === 'light') {
    darkModeSwitchHeader.checked = false;
    darkModeSwitchAside.checked = false;
}

darkModeSwitchHeader.addEventListener('change', onDarkModeSwitchHeader);
darkModeSwitchAside.addEventListener('change', onDarkModeSwitchAside);

function onDarkModeSwitchHeader() {
    if (darkModeSwitchHeader.checked) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    }
};

function onDarkModeSwitchAside() {
    if (darkModeSwitchAside.checked) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    }
};