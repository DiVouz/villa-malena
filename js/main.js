(() => {
	"use strict";
	document.documentElement.classList.add("js");
	const navbar = document.querySelector(".navbar");
	const navToggle = document.querySelector(".nav-toggle");
	const closeNavigation = () => {
		navbar.classList.remove("is-open");
		navToggle.setAttribute("aria-expanded", "false");
	};
	navToggle.addEventListener("click", () => {
		const open = navToggle.getAttribute("aria-expanded") === "true";
		navbar.classList.toggle("is-open", !open);
		navToggle.setAttribute("aria-expanded", String(!open));
	});
	document
		.querySelectorAll(".nav-links a")
		.forEach((link) => link.addEventListener("click", closeNavigation));
	const setNavbarState = () =>
		navbar.classList.toggle("is-fixed", window.scrollY > 40);
	setNavbarState();
	window.addEventListener("scroll", setNavbarState, { passive: true });

	const imageCount = 27;
	const gallery = document.querySelector(".gallery");
	const galleryImage = document.getElementById("gallery-image");
	const currentImage = document.getElementById("current-image");
	const thumbnailStrip = document.getElementById("thumbnail-strip");
	const previousButton = document.querySelector(".gallery-button.previous");
	const nextButton = document.querySelector(".gallery-button.next");
	let galleryIndex = 0;
	let galleryLoading = false;
	const imagePath = (index) => `img/HousePhotos/house${index + 1}.jpg`;
	const thumbnails = Array.from({ length: imageCount }, (_, index) => {
		const button = document.createElement("button");
		button.type = "button";
		button.className = "thumbnail";
		button.textContent = String(index + 1).padStart(2, "0");
		button.setAttribute("aria-label", `Show image ${index + 1}`);
		button.addEventListener("click", () => showImage(index));
		thumbnailStrip.appendChild(button);
		return button;
	});
	const setGalleryLoading = (loading) => {
		galleryLoading = loading;
		gallery.classList.toggle("is-loading", loading);
		gallery.setAttribute("aria-busy", String(loading));
		previousButton.disabled = loading;
		nextButton.disabled = loading;
		thumbnails.forEach((thumbnail) => {
			thumbnail.disabled = loading;
		});
	};
	const preloadNeighbours = (index) => {
		[index - 1, index + 1].forEach((neighbour) => {
			const preload = new Image();
			preload.src = imagePath((neighbour + imageCount) % imageCount);
		});
	};
	const loadGalleryImage = (index) =>
		new Promise((resolve, reject) => {
			const image = new Image();
			image.onload = async () => {
				try {
					await image.decode();
				} catch {
					// The load event already confirms that the image is available.
				}
				resolve();
			};
			image.onerror = reject;
			image.src = imagePath(index);
		});
	const updateImage = (index, scrollThumbnail = true) => {
		galleryIndex = (index + imageCount) % imageCount;
		galleryImage.src = imagePath(galleryIndex);
		galleryImage.alt = `Villa Malena photo ${galleryIndex + 1} of ${imageCount}`;
		currentImage.textContent = String(galleryIndex + 1).padStart(2, "0");
		thumbnails.forEach((thumbnail, thumbnailIndex) => {
			const active = thumbnailIndex === galleryIndex;
			thumbnail.classList.toggle("is-active", active);
			if (active) thumbnail.setAttribute("aria-current", "true");
			else thumbnail.removeAttribute("aria-current");
		});
		if (scrollThumbnail)
			thumbnails[galleryIndex].scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		galleryImage.classList.remove("is-changing");
		preloadNeighbours(galleryIndex);
	};
	async function showImage(index) {
		const nextIndex = (index + imageCount) % imageCount;
		if (galleryLoading || nextIndex === galleryIndex) return;

		setGalleryLoading(true);
		try {
			await loadGalleryImage(nextIndex);
			galleryImage.classList.add("is-changing");
			await new Promise((resolve) => window.setTimeout(resolve, 180));
			updateImage(nextIndex);
		} catch {
			galleryImage.classList.remove("is-changing");
		} finally {
			setGalleryLoading(false);
		}
	}
	previousButton.addEventListener("click", () => showImage(galleryIndex - 1));
	nextButton.addEventListener("click", () => showImage(galleryIndex + 1));
	gallery.addEventListener("keydown", (event) => {
		if (event.key === "ArrowLeft") {
			event.preventDefault();
			showImage(galleryIndex - 1);
		}
		if (event.key === "ArrowRight") {
			event.preventDefault();
			showImage(galleryIndex + 1);
		}
	});
	let touchStartX = 0;
	galleryImage.addEventListener(
		"touchstart",
		(event) => {
			touchStartX = event.changedTouches[0].screenX;
		},
		{ passive: true },
	);
	galleryImage.addEventListener(
		"touchend",
		(event) => {
			const distance = event.changedTouches[0].screenX - touchStartX;
			if (Math.abs(distance) > 50)
				showImage(galleryIndex + (distance < 0 ? 1 : -1));
		},
		{ passive: true },
	);
	updateImage(0, false);

	if (
		"IntersectionObserver" in window &&
		!window.matchMedia("(prefers-reduced-motion: reduce)").matches
	) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		document
			.querySelectorAll(".reveal")
			.forEach((element) => observer.observe(element));
	} else {
		document
			.querySelectorAll(".reveal")
			.forEach((element) => element.classList.add("is-visible"));
	}
})();
