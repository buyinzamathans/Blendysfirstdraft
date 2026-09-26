// Shared site navigation behavior — scroll shadow + mobile menu toggle + floating WhatsApp button.
document.addEventListener('DOMContentLoaded', function () {
    var nav = document.getElementById('siteNav');
    if (nav) {
        window.addEventListener('scroll', function () {
            nav.classList.toggle('is-scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            var isOpen = menu.classList.toggle('is-open');
            toggle.classList.toggle('is-open', isOpen);
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            document.body.classList.toggle('nav-open', isOpen);
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                menu.classList.remove('is-open');
                toggle.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('nav-open');
            });
        });
    }

    // Persistent floating "checkout" button — WhatsApp is the actual order flow on this site.
    if (!document.querySelector('.floating-wa')) {
        var fab = document.createElement('a');
        fab.href = 'https://wa.me/message/24DMSW3JZMJVN1';
        fab.target = '_blank';
        fab.rel = 'noopener noreferrer';
        fab.className = 'floating-wa';
        fab.setAttribute('aria-label', 'Order on WhatsApp');
        fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg><span>Order</span>';
        document.body.appendChild(fab);
    }
});
