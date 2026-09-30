document.addEventListener("DOMContentLoaded", function() {
    const preloader = document.getElementById('preloader');
    const percText = document.getElementById('preloader-percentage-text');
    let progress = 0;
    
    // Simulate loading percentage taking exactly 2 seconds
    const interval = setInterval(() => {
        progress += 5;
        if (progress > 100) progress = 100;
        if (percText) percText.innerText = progress + '%';
        
        if (progress === 100) {
            clearInterval(interval);
            if (document.readyState === 'complete') {
                finishLoading();
            } else {
                window.addEventListener('load', finishLoading);
            }
        }
    }, 100);

    function finishLoading() {
        if (!preloader) {
            if (typeof initAOS === 'function') initAOS();
            return;
        }
        preloader.classList.add('fade-out');
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
            preloader.style.display = 'none';
            // Start AOS scroll animations now that page is visible
            if (typeof initAOS === 'function') {
                initAOS();
            }
        }, 600);
    }
});
