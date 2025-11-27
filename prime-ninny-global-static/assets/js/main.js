$(document).ready(function() {
  // Hamburger menu (ENHANCED: Auto-close on link click + outside/main page click)
  const hamburger = $('.hamburger');
  const navUL = $('.nav ul');
  const header = $('.header'); // For outside click detection
  
  hamburger.click(function() {
    navUL.toggleClass('active');
    hamburger.toggleClass('open');
  });
  
  // Close on nav link click (already smooth scroll integrated)
  $('.nav a').click(function(e) {
    navUL.removeClass('active');
    hamburger.removeClass('open');
  });
  
  // NEW: Close on outside click (main page/body clicks, excluding header/nav)
  $(document).on('click', function(e) {
    if (navUL.hasClass('active') && !header.is(e.target) && !header.has(e.target).length && !hamburger.is(e.target) && !hamburger.has(e.target).length) {
      navUL.removeClass('active');
      hamburger.removeClass('open');
    }
  });
  
  // Smooth scroll for anchor links (ultra-smooth: 200ms, header offset)
  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    const target = $($(this).attr('href'));
    if (target.length) {
      const offsetTop = target.offset().top - $('.header').outerHeight();
      $('html, body').animate({
        scrollTop: offsetTop
      }, 200);
    }
  });
  // Back to Top button visibility
  const backToTop = $('#backToTop');
  $(window).scroll(function() {
    if ($(window).scrollTop() > $(window).height() * 0.8) {
      backToTop.fadeIn(100);
    } else {
      backToTop.fadeOut(100);
    }
    // NEW: Dynamic opacity for floating WhatsApp (always show, adjust based on underlying content)
    updateWhatsAppOpacity();
  });
  backToTop.click(function() {
    $('html, body').animate({scrollTop: 0}, 200);
    backToTop.fadeOut(100);
  });
  // NEW: Function to update WhatsApp opacity based on content below (text → low opacity; empty → high)
  function updateWhatsAppOpacity() {
    const whatsappIcon = $('#floatingWhatsApp');
    if (!whatsappIcon.length) return;
    
    // Temporarily hide to detect underlying element
    const wasVisible = whatsappIcon.is(':visible');
    whatsappIcon.css('visibility', 'hidden');
    
    // Get center position of icon
    const rect = whatsappIcon[0].getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Find element at that point
    const elementBelow = document.elementFromPoint(x, y);
    
    // Restore visibility
    whatsappIcon.css('visibility', wasVisible ? 'visible' : 'hidden');
    
    if (!elementBelow) {
      whatsappIcon.css('opacity', '0.9'); // Base over nothing
      return;
    }
    
    // Check if it's text-heavy (p, h1-h6, li, span with text, etc.)
    const tagName = elementBelow.tagName.toLowerCase();
    const textSelectors = ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'td', 'th'];
    const hasTextContent = elementBelow.textContent && elementBelow.textContent.trim().length > 0;
    
    if (textSelectors.includes(tagName) || (hasTextContent && ['span', 'div', 'a'].includes(tagName))) {
      whatsappIcon.css('opacity', '0.4'); // Transparent over text/content
    } else {
      whatsappIcon.css('opacity', '0.9'); // Opaque over empty/background
    }
  }
  
  // Initial opacity check
  updateWhatsAppOpacity();
  
  // Throttle scroll for performance (debounce ~100ms)
  let scrollTimeout;
  $(window).on('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(updateWhatsAppOpacity, 100);
  });
  
  // Section fade-in on scroll (smooth, no jitter)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  document.querySelectorAll('.fade-section').forEach(section => {
    observer.observe(section);
  });
});

// Video playback rate adjustment
// document.querySelector('.hero-video').playbackRate = 0.75;

// Hero video freeze-frame cycle (disabled for now)
// const video = document.getElementById('heroVideo');
//   const freeze = document.querySelector('.freeze-frame');

//   const playTime  = 10000;   // 3 seconds playing
//   const pauseTime = 5000;  // 10 seconds frozen

//   function cycle() {
//     // video.currentTime = 0;
//     video.play();
//     freeze.classList.remove('active');

//     // After 3s → smooth fade to freeze frame
//     setTimeout(() => {
//       freeze.style.backgroundImage = `url(${video.currentSrc})`; // capture exact frame
//       freeze.classList.add('active');
//       video.pause();
      
//       // After 10s pause → smooth fade back to video
//       setTimeout(() => {
//         freeze.classList.remove('active');
//         setTimeout(cycle, 600); // tiny delay so video has time to start again
//       }, pauseTime);
//     }, playTime);
//   }

//   // Start when video is ready
//   video.oncanplay = cycle;
//   if (video.readyState >= 3) cycle();