document.addEventListener('DOMContentLoaded', () => {
	gsap.registerPlugin(ScrollTrigger);

	const lenis = new Lenis();
	lenis.on('scroll', ScrollTrigger.update);
	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});
	gsap.ticker.lagSmoothing(0);

	ScrollTrigger.create({
		trigger: '.hero',
		start: 'top top',
		end: `+=${window.innerHeight * 4}px`,
		pin: true,
		pinSpacing: true,
		scrub: 1,
		onUpdate: (self) => {
			const progress = self.progress;
			const totalImages = gsap.utils.toArray('.images .mask-img').length;
			const segmentSize = 1 / totalImages;

			gsap.utils.toArray('.images .mask-img').forEach((img, index) => {
				const imageStart = index * segmentSize;
				const imageEnd = (index + 1) * segmentSize;
				let imageProgress = 0;

				if (progress >= imageStart && progress <= imageEnd) {
					imageProgress = (progress - imageStart) / segmentSize;
				} else if (progress > imageEnd) {
					imageProgress = 1;
				}

				const leftgradie = 50 - (imageProgress * 50);    
				const rightgradie = 50 + (imageProgress * 50); 
				const deg = 90 + (imageProgress * 40);
				gsap.set(img, {
					maskImage: `linear-gradient(${deg}deg, black ${leftgradie}%, transparent ${leftgradie}%, transparent ${rightgradie}%, black ${rightgradie}%)`
				});
			});
		}       
	});
});
