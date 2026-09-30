function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            easing: 'ease-out-cubic',
            once: true,
            offset: 100,
            delay: 0
        });
    }
}
