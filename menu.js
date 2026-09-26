/* =========================================================
   BLENDY'S — MENU FILTERING
   Vanilla JS, no dependencies.
   ========================================================= */
(function () {
    'use strict';

    var buttons = document.querySelectorAll('.menu-filter-btn');
    var cards = document.querySelectorAll('.menu-item');
    var resultsCount = document.getElementById('menuResultsCount');

    function applyFilter(filter) {
        var visible = 0;
        cards.forEach(function (card) {
            var show = (filter === 'all') || card.getAttribute('data-category') === filter;
            card.style.display = show ? '' : 'none';
            if (show) visible++;
        });
        buttons.forEach(function (b) {
            var active = b.getAttribute('data-filter') === filter;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        if (resultsCount) {
            resultsCount.textContent = visible;
        }
    }

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            applyFilter(btn.getAttribute('data-filter'));
        });
    });

    // Allow other pages to deep-link into a category, e.g. menu.html?cat=wedding
    var params = new URLSearchParams(window.location.search);
    var initial = params.get('cat');
    if (initial && document.querySelector('.menu-filter-btn[data-filter="' + initial + '"]')) {
        applyFilter(initial);
    }
})();
