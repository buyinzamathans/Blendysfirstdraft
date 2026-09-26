/* =========================================================
   BLENDY'S — CUSTOM CAKE BUILDER
   Vanilla JS, no dependencies. No data leaves the browser
   until the customer taps Send inside WhatsApp.
   ========================================================= */
(function () {
    'use strict';

    var WA_NUMBER = '256772243509';

    var form = document.getElementById('customOrderForm');
    var sizeSelect = document.getElementById('size');
    var guestInput = document.getElementById('guestCount');
    var estimateBtn = document.getElementById('estimateBtn');
    var estimateResult = document.getElementById('estimateResult');

    var sumOccasion = document.getElementById('sumOccasion');
    var sumFlavour = document.getElementById('sumFlavour');
    var sumSize = document.getElementById('sumSize');
    var sumAddons = document.getElementById('sumAddons');
    var sumDate = document.getElementById('sumDate');
    var sumFulfilment = document.getElementById('sumFulfilment');

    function readForm() {
        var occasionEl = document.getElementById('occasion');
        var flavourEl = document.getElementById('flavour');
        var dateEl = document.getElementById('dateNeeded');
        var notesEl = document.getElementById('notes');
        var fulfilmentEl = form ? form.querySelector('input[name="fulfilment"]:checked') : null;
        var addonEls = form ? form.querySelectorAll('input[name="addons"]:checked') : [];

        var addons = [];
        addonEls.forEach(function (el) { addons.push(el.value); });

        return {
            occasion: occasionEl ? occasionEl.value : '',
            flavour: flavourEl ? flavourEl.value : '',
            size: sizeSelect ? sizeSelect.value : '',
            addons: addons,
            date: dateEl ? dateEl.value : '',
            fulfilment: fulfilmentEl ? fulfilmentEl.value : 'Pickup in Muyenga',
            notes: notesEl ? notesEl.value.trim() : ''
        };
    }

    function formatDate(iso) {
        if (!iso) return '\u2014';
        var parts = iso.split('-');
        if (parts.length !== 3) return iso;
        var d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function updateSummary() {
        var state = readForm();
        if (sumOccasion) sumOccasion.textContent = state.occasion || '\u2014';
        if (sumFlavour) sumFlavour.textContent = state.flavour || '\u2014';
        if (sumSize) sumSize.textContent = state.size || '\u2014';
        if (sumAddons) sumAddons.textContent = state.addons.length ? state.addons.join(', ') : 'None';
        if (sumDate) sumDate.textContent = formatDate(state.date);
        if (sumFulfilment) sumFulfilment.textContent = state.fulfilment;
    }

    if (form) {
        form.addEventListener('input', updateSummary);
        form.addEventListener('change', updateSummary);
        updateSummary();
    }

    function suggestSize(guests) {
        if (guests <= 8) return '1kg (serves ~8)';
        if (guests <= 15) return '2kg (serves ~15)';
        if (guests <= 25) return '3kg (serves ~25)';
        if (guests <= 45) return '4-5kg (serves ~35-45)';
        return 'Multi-tier (custom quote)';
    }

    if (estimateBtn) {
        estimateBtn.addEventListener('click', function () {
            var guests = parseInt(guestInput.value, 10);
            if (!guests || guests < 1) {
                estimateResult.textContent = 'Enter a guest count above to get a suggestion.';
                return;
            }
            var suggested = suggestSize(guests);
            if (sizeSelect) {
                for (var i = 0; i < sizeSelect.options.length; i++) {
                    if (sizeSelect.options[i].value === suggested) {
                        sizeSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            estimateResult.textContent = 'For about ' + guests + ' guests, we\'d suggest: ' + suggested + '. Feel free to adjust below.';
            updateSummary();
        });
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var state = readForm();

            var lines = [
                'Hi! I\'d like to request a custom cake:',
                '- Occasion: ' + (state.occasion || '-'),
                '- Flavour: ' + (state.flavour || '-'),
                '- Size: ' + (state.size || '-'),
                '- Add-ons: ' + (state.addons.length ? state.addons.join(', ') : 'None'),
                '- Date needed: ' + (state.date || '-'),
                '- ' + state.fulfilment
            ];

            if (state.notes) {
                lines.push('- Notes: ' + state.notes);
            }

            var message = lines.join('\n');
            var url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
            window.open(url, '_blank', 'noopener');
        });
    }
})();
