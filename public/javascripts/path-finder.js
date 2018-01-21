let pathDOM = document.getElementById('path');

function go() {
    let path = pathDOM.value;
    window.location.href = `/${path}`;
}