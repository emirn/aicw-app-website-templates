/**
 * Share functionality
 * Copy link to clipboard
 */
(function() {
  'use strict';

  function init() {
    // Copy link buttons
    const copyButtons = document.querySelectorAll('.share-copy');

    copyButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        const url = btn.getAttribute('data-url') || window.location.href;

        copyToClipboard(url).then(function() {
          // Show feedback
          btn.classList.add('copied');

          // Remove feedback after delay
          setTimeout(function() {
            btn.classList.remove('copied');
          }, 2000);
        }).catch(function(err) {
          console.error('Failed to copy:', err);
        });
      });
    });

    // Social share links - open in popup
    const shareLinks = document.querySelectorAll('.share-facebook, .share-twitter, .share-linkedin');

    shareLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const url = link.getAttribute('href');
        openSharePopup(url);
      });
    });
  }

  function copyToClipboard(text) {
    // Modern async clipboard API
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }

    // Fallback for older browsers
    return new Promise(function(resolve, reject) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (successful) {
          resolve();
        } else {
          reject(new Error('Copy command failed'));
        }
      } catch (err) {
        document.body.removeChild(textarea);
        reject(err);
      }
    });
  }

  function openSharePopup(url) {
    const width = 600;
    const height = 400;
    const left = (window.innerWidth - width) / 2 + window.screenX;
    const top = (window.innerHeight - height) / 2 + window.screenY;

    window.open(
      url,
      'share',
      'width=' + width + ',height=' + height + ',left=' + left + ',top=' + top + ',toolbar=no,menubar=no'
    );
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
