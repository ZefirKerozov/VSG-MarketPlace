// Dark mode functionality

document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));

const darkModeSwitchHeader = document.querySelector('#dark-mode-header');

const theme = localStorage.getItem('theme');

if (theme === undefined) {
    localStorage.setItem('theme', 'light');
}

if (theme === 'dark') {
    darkModeSwitchHeader.checked = true;
} else if (theme === 'light') {
    darkModeSwitchHeader.checked = false;
}

darkModeSwitchHeader.addEventListener('change', onDarkModeSwitchHeader);

function onDarkModeSwitchHeader() {
    if (darkModeSwitchHeader.checked) {
        localStorage.setItem('theme', 'dark');
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    }
};