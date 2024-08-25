document.addEventListener("DOMContentLoaded", function() {
	"use strict";
  
	// Page loading animation
	window.addEventListener('load', function() {
	  document.getElementById('js-preloader').classList.add('loaded');
	});
  
	// Scroll event for header background change
	window.addEventListener('scroll', function() {
	  var scroll = window.scrollY;
	  var box = document.querySelector('.header-text').offsetHeight;
	  var header = document.querySelector('header').offsetHeight;
  
	  if (scroll >= box - header) {
		document.querySelector('header').classList.add('background-header');
	  } else {
		document.querySelector('header').classList.remove('background-header');
	  }
	});
  
	// Owl Carousel initialization (requires Owl Carousel JavaScript library)
	var owlBanner = document.querySelector('.owl-banner');
	if (owlBanner) {
	  $(owlBanner).owlCarousel({
		center: true,
		items: 1,
		loop: true,
		nav: true,
		dots: true,
		navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>', '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
		margin: 30,
		responsive: {
		  992: { items: 1 },
		  1200: { items: 1 }
		}
	  });
	}
  
	// Handle window resize event
	var width = window.innerWidth;
	window.addEventListener('resize', function() {
	  if (width > 767 && window.innerWidth < 767) {
		location.reload();
	  } else if (width < 767 && window.innerWidth > 767) {
		location.reload();
	  }
	});
  
	// Isotope initialization and filter
	var elem = document.querySelector('.properties-box');
	var filtersElem = document.querySelector('.properties-filter');
	if (elem) {
	  var rdnEventsList = new Isotope(elem, {
		itemSelector: '.properties-items',
		layoutMode: 'masonry'
	  });
  
	  if (filtersElem) {
		filtersElem.addEventListener('click', function(event) {
		  if (!event.target.matches('a')) return;
  
		  var filterValue = event.target.getAttribute('data-filter');
		  rdnEventsList.arrange({ filter: filterValue });
		  filtersElem.querySelector('.is_active').classList.remove('is_active');
		  event.target.classList.add('is_active');
		  event.preventDefault();
		});
	  }
	}
  
	// Menu Dropdown Toggle
	var menuTrigger = document.querySelector('.menu-trigger');
	if (menuTrigger) {
	  menuTrigger.addEventListener('click', function() {
		this.classList.toggle('active');
		var nav = document.querySelector('.header-area .nav');
		if (nav) {
		  nav.classList.toggle('visible');
		}
	  });
	}
  
	// Menu elevator animation
	document.querySelectorAll('.scroll-to-section a[href*="#"]:not([href="#"])').forEach(function(anchor) {
	  anchor.addEventListener('click', function(event) {
		var target = document.querySelector(this.getAttribute('href'));
		if (target) {
		  var width = window.innerWidth;
		  if (width < 991) {
			menuTrigger.classList.remove('active');
			document.querySelector('.header-area .nav').classList.remove('visible');
		  }
		  window.scrollTo({
			top: target.offsetTop - 80,
			behavior: 'smooth'
		  });
		  event.preventDefault();
		}
	  });
	});
  
	// Page loading animation (additional)
	window.addEventListener('load', function() {
	  var cover = document.querySelector('.cover');
	  if (cover) {
		// Parallax effect (requires a custom parallax library or implementation)
		cover.style.backgroundImage = 'url(' + cover.getAttribute('data-image') + ')';
		cover.style.zIndex = '1';
	  }
  
	  var preloader = document.getElementById('preloader');
	  if (preloader) {
		preloader.style.opacity = '0';
		setTimeout(function() {
		  preloader.style.visibility = 'hidden';
		  preloader.style.display = 'none';
		}, 600);
	  }
	});
  });
  