/*
	Starlight Women Berlin/Brandenburg e.V.
	Shared page behavior for the team page.
 */

(function () {
	'use strict';

	const header = document.getElementById('site-header');
	const menuToggle = document.getElementById('menu-toggle');
	const mobileMenu = document.getElementById('mobile-menu');
	const iconOpen = document.getElementById('icon-menu-open');
	const iconClose = document.getElementById('icon-menu-close');
	const themeToggle = document.getElementById('theme-toggle');
	const root = document.documentElement;
	const lightbox = document.getElementById('team-lightbox');
	const lightboxImage = document.getElementById('team-lightbox-image');
	const lightboxTitle = document.getElementById('team-lightbox-title');
	const lightboxRole = document.getElementById('team-lightbox-role');
	const lightboxCaption = document.getElementById('team-lightbox-caption');
	const lightboxClose = document.getElementById('team-lightbox-close');
	let activeTrigger = null;

	function applyTheme(theme) {
		if (theme === 'dark') {
			root.classList.add('dark');
			themeToggle.setAttribute('aria-pressed', 'true');
			themeToggle.setAttribute('aria-label', 'Activate light mode');
			themeToggle.querySelector('.theme-toggle__icon').textContent = '☀️';
			themeToggle.querySelector('.theme-toggle__label').textContent = 'Light';
		} else {
			root.classList.remove('dark');
			themeToggle.setAttribute('aria-pressed', 'false');
			themeToggle.setAttribute('aria-label', 'Activate dark mode');
			themeToggle.querySelector('.theme-toggle__icon').textContent = '🌙';
			themeToggle.querySelector('.theme-toggle__label').textContent = 'Dark';
		}
	}

	function saveTheme(theme) {
		try {
			window.localStorage.setItem('starlight-theme', theme);
		} catch (error) {
			// Ignore private mode storage errors.
		}
	}

	function getPreferredTheme() {
		try {
			const stored = window.localStorage.getItem('starlight-theme');
			if (stored === 'dark' || stored === 'light') {
				return stored;
			}
		} catch (error) {
			// Ignore private mode.
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function openMenu() {
		mobileMenu.classList.add('is-open');
		menuToggle.setAttribute('aria-expanded', 'true');
		menuToggle.setAttribute('aria-label', 'Close menu');
		iconOpen.classList.add('hidden');
		iconClose.classList.remove('hidden');
	}

	function closeMenu() {
		mobileMenu.classList.remove('is-open');
		menuToggle.setAttribute('aria-expanded', 'false');
		menuToggle.setAttribute('aria-label', 'Open menu');
		iconOpen.classList.remove('hidden');
		iconClose.classList.add('hidden');
	}

	function isMenuOpen() {
		return mobileMenu.classList.contains('is-open');
	}

	function openLightbox(trigger) {
		if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxRole || !lightboxCaption) {
			return;
		}

		const photo = trigger.getAttribute('data-team-photo') || '';
		const title = trigger.getAttribute('data-team-title') || '';
		const role = trigger.getAttribute('data-team-role') || '';
		const caption = trigger.getAttribute('data-team-caption') || '';
		const alt = trigger.getAttribute('data-team-alt') || title;

		lightboxImage.src = photo;
		lightboxImage.alt = alt;
		lightboxTitle.textContent = title;
		lightboxRole.textContent = role;
		lightboxCaption.textContent = caption;
		lightbox.hidden = false;
		document.body.classList.add('team-lightbox-open');
		activeTrigger = trigger;
		lightboxClose && lightboxClose.focus();
	}

	function closeLightbox() {
		if (!lightbox || lightbox.hidden) {
			return;
		}

		lightbox.hidden = true;
		document.body.classList.remove('team-lightbox-open');
		if (activeTrigger) {
			activeTrigger.focus();
			activeTrigger = null;
		}
	}

	if (!header || !menuToggle || !mobileMenu || !themeToggle) return;

	applyTheme(getPreferredTheme());

	menuToggle.addEventListener('click', function () {
		isMenuOpen() ? closeMenu() : openMenu();
	});

	themeToggle.addEventListener('click', function () {
		const nextTheme = root.classList.contains('dark') ? 'light' : 'dark';
		applyTheme(nextTheme);
		saveTheme(nextTheme);
	});

	mobileMenu.querySelectorAll('a').forEach(function (link) {
		link.addEventListener('click', closeMenu);
	});

	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape') {
			if (isMenuOpen()) {
				closeMenu();
				menuToggle.focus();
			}
			if (lightbox && !lightbox.hidden) {
				closeLightbox();
			}
		}
	});

	const desktopQuery = window.matchMedia('(min-width: 1024px)');
	desktopQuery.addEventListener('change', function (event) {
		if (event.matches && isMenuOpen()) closeMenu();
	});

	const SCROLL_THRESHOLD = 8;
	let ticking = false;

	function updateHeaderState() {
		if (window.scrollY > SCROLL_THRESHOLD) {
			header.classList.add('is-scrolled');
		} else {
			header.classList.remove('is-scrolled');
		}
		ticking = false;
	}

	window.addEventListener('scroll', function () {
		if (!ticking) {
			window.requestAnimationFrame(updateHeaderState);
			ticking = true;
		}
	}, { passive: true });

	document.querySelectorAll('[data-team-photo]').forEach(function (trigger) {
		trigger.addEventListener('click', function () {
			openLightbox(trigger);
		});
	});

	if (lightbox) {
		lightbox.addEventListener('click', function (event) {
			if (event.target && (event.target.matches('[data-lightbox-close]') || event.target === lightbox)) {
				closeLightbox();
			}
		});
	}

	if (lightboxClose) {
		lightboxClose.addEventListener('click', closeLightbox);
	}

	updateHeaderState();
})();
