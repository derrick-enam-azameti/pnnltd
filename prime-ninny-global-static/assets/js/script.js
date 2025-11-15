// jQuery ready
$(document).ready(function() {
    // Smooth scrolling
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $($(this).attr('href'));
        if (target.length) {
            var offset = $('.header').outerHeight() || 0;
            $('html, body').animate({
                scrollTop: target.offset().top - offset
            }, 200, 'swing');
        }
    });

    // Back-to-top
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#backToTop').addClass('show');
        } else {
            $('#backToTop').removeClass('show');
        }
    });
    $('#backToTop').click(function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 300, 'swing');
    });

    // Mobile menu
    $('.hamburger').click(function() {
        $('.nav-links').toggleClass('active');
    });

    // Dark mode toggle
    const toggle = $('#darkToggle');
    const body = $('body');
    const isDark = localStorage.getItem('darkMode') === 'true';
    if (isDark) body.addClass('dark-mode');
    toggle.find('i').toggleClass('fa-moon fa-sun', isDark);
    toggle.click(function() {
        body.toggleClass('dark-mode');
        const dark = body.hasClass('dark-mode');
        localStorage.setItem('darkMode', dark);
        toggle.find('i').toggleClass('fa-moon fa-sun', dark);
    });
});

// Fade-ins
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    sections.forEach(section => observer.observe(section));
});
