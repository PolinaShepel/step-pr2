const menu = document.getElementById("menu-mobile");
const button = document.querySelector(".menu-button");
const buttonSmallImg = document.querySelector(".menu-button__stick_small");
const buttonSecondBigImg = document.querySelector(".menu-button__stick_third");
const buttonFirstBigImg = document.querySelector(".menu-button__stick");

function closeMenu() {
    menu.classList.remove("menu_open");
    buttonSmallImg.classList.add("animation1_reverse");
    buttonFirstBigImg.classList.add("animation2_reverse");
    buttonSecondBigImg.classList.add("animation3_reverse");
    setTimeout(function () {
        buttonSmallImg.classList.remove("animation1");
        buttonSecondBigImg.classList.remove("animation3");
        buttonFirstBigImg.classList.remove("animation2");
    }, 0);
}

function openMenu() {
    buttonSmallImg.classList.remove("animation1_reverse");
    buttonFirstBigImg.classList.remove("animation2_reverse");
    buttonSecondBigImg.classList.remove("animation3_reverse");
    setTimeout(function () {
        menu.classList.add("menu_open");
        buttonSmallImg.classList.add("animation1");
        buttonSecondBigImg.classList.add("animation3");
        buttonFirstBigImg.classList.add("animation2");
    }, 0);
}

button.addEventListener('click', (e) => {
    if (menu.classList.contains('menu_open')) {
        closeMenu();
    } else {
        openMenu();
    }
});
document.addEventListener('click', (e) => {
    const withinBoundaries = e.composedPath().includes(menu) || e.composedPath().includes(button);

    if (!withinBoundaries) {
        closeMenu();
    }
});
