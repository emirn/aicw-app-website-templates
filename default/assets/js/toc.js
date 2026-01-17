/**
 * Table of Contents Generator
 * Automatically generates TOC from article headings
 */
(function() {
  'use strict';

  function init() {
    const tocContainer = document.getElementById('toc');
    const articleContent = document.querySelector('.article-content');

    if (!tocContainer || !articleContent) return;

    const tocList = tocContainer.querySelector('.toc-list');
    const tocToggle = tocContainer.querySelector('.toc-toggle');
    const tocNav = tocContainer.querySelector('.toc-nav');

    // Get all headings h2, h3, h4
    const headings = articleContent.querySelectorAll('h2, h3, h4');

    if (headings.length === 0) {
      // Hide TOC if no headings
      tocContainer.style.display = 'none';
      return;
    }

    // Generate TOC items
    const fragment = document.createDocumentFragment();

    headings.forEach(function(heading, index) {
      // Add ID to heading if not present
      if (!heading.id) {
        heading.id = 'heading-' + index;
      }

      // Create TOC item
      const li = document.createElement('li');
      const a = document.createElement('a');

      a.href = '#' + heading.id;
      a.textContent = heading.textContent;

      // Add class based on heading level
      const level = heading.tagName.toLowerCase();
      li.classList.add('toc-' + level);

      // Smooth scroll on click
      a.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.getElementById(heading.id);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Update URL hash
          history.pushState(null, null, '#' + heading.id);
        }
      });

      li.appendChild(a);
      fragment.appendChild(li);
    });

    tocList.appendChild(fragment);

    // Toggle functionality
    if (tocToggle && tocNav) {
      tocToggle.addEventListener('click', function() {
        const isExpanded = tocToggle.getAttribute('aria-expanded') === 'true';
        tocToggle.setAttribute('aria-expanded', !isExpanded);
        tocNav.classList.toggle('collapsed');
      });
    }

    // Highlight current section on scroll
    let ticking = false;
    const tocLinks = tocList.querySelectorAll('a');

    function highlightCurrentSection() {
      const scrollPos = window.scrollY;
      let currentHeading = null;

      headings.forEach(function(heading) {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          currentHeading = heading;
        }
      });

      tocLinks.forEach(function(link) {
        link.classList.remove('active');
        if (currentHeading && link.getAttribute('href') === '#' + currentHeading.id) {
          link.classList.add('active');
        }
      });

      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(highlightCurrentSection);
        ticking = true;
      }
    });

    // Initial highlight
    highlightCurrentSection();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
