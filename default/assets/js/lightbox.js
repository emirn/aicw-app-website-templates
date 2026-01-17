/**
 * Lightbox - Image zoom functionality
 * Click on images to view full size
 */
(function() {
  'use strict';

  let lightbox = null;
  let lightboxImg = null;

  function createLightbox() {
    // Create lightbox container
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Image viewer');

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'lightbox-close';
    closeBtn.setAttribute('aria-label', 'Close image viewer');
    closeBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

    // Create image element
    lightboxImg = document.createElement('img');
    lightboxImg.alt = '';

    lightbox.appendChild(closeBtn);
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard support
    document.addEventListener('keydown', function(e) {
      if (lightbox.classList.contains('active') && e.key === 'Escape') {
        closeLightbox();
      }
    });
  }

  function openLightbox(src, alt) {
    if (!lightbox) {
      createLightbox();
    }

    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus trap
    lightbox.querySelector('.lightbox-close').focus();
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function init() {
    // Find all images in article content
    const articleContent = document.querySelector('.article-content');
    if (!articleContent) return;

    const images = articleContent.querySelectorAll('img');

    images.forEach(function(img) {
      // Make image clickable
      img.style.cursor = 'zoom-in';
      img.setAttribute('tabindex', '0');
      img.setAttribute('role', 'button');
      img.setAttribute('aria-label', 'Click to enlarge: ' + (img.alt || 'Image'));

      // Click handler
      img.addEventListener('click', function() {
        openLightbox(img.src, img.alt);
      });

      // Keyboard handler
      img.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(img.src, img.alt);
        }
      });
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
