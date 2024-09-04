// JavaScript for Smooth Scrolling to Sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// JavaScript for Sticky Header Shrink on Scroll
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.padding = "10px 0"; // Shrink header
    } else {
        header.style.padding = "20px 0"; // Default padding
    }
});

// JavaScript for Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.setAttribute('id', 'scrollTopBtn');
document.body.appendChild(scrollTopBtn);

window.onscroll = function () {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Optional: JavaScript for Floating Effects on Scroll
const floatElements = document.querySelectorAll('.cta-button, .skill-item');
window.addEventListener('scroll', () => {
    floatElements.forEach(el => {
        let rect = el.getBoundingClientRect();
        let scrollEffect = rect.top - window.innerHeight + 100;

        if (scrollEffect < 0) {
            el.style.transform = 'translateY(0)';
            el.style.opacity = '1';
        } else {
            el.style.transform = 'translateY(20px)';
            el.style.opacity = '0';
        }
    });
});

// Optional: JavaScript for Lazy Loading Images
document.addEventListener("DOMContentLoaded", function () {
    let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove("lazy");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function (lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    } else {
        // Fallback for older browsers
        let lazyLoad = throttle(() => {
            lazyImages.forEach(img => {
                if (img.getBoundingClientRect().top <= window.innerHeight && img.getBoundingClientRect().bottom >= 0 && getComputedStyle(img).display !== "none") {
                    img.src = img.dataset.src;
                    img.classList.remove("lazy");
                }
            });
            if (lazyImages.length == 0) {
                document.removeEventListener("scroll", lazyLoad);
                window.removeEventListener("resize", lazyLoad);
                window.removeEventListener("orientationChange", lazyLoad);
            }
        }, 20);

        document.addEventListener("scroll", lazyLoad);
        window.addEventListener("resize", lazyLoad);
        window.addEventListener("orientationChange", lazyLoad);
    }
});

// Throttle Function (for performance optimization)
function throttle(fn, wait) {
    let time = Date.now();
    return function () {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    };
}
