document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(element => {
        observer.observe(element);
    });
    
    // Dynamic year in footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Interactive Background Blobs
    const blob1 = document.querySelector('.blob-1');
    const blob2 = document.querySelector('.blob-2');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let blob1X = window.innerWidth / 3;
    let blob1Y = window.innerHeight / 3;
    let blob2X = (window.innerWidth / 3) * 2;
    let blob2Y = (window.innerHeight / 3) * 2;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateBlobs = () => {
        // Smooth interpolation (lerp) toward mouse
        blob1X += (mouseX - blob1X) * 0.04;
        blob1Y += (mouseY - blob1Y) * 0.04;
        
        // Blob 2 follows inversely and trails slower
        blob2X += ((window.innerWidth - mouseX) - blob2X) * 0.02;
        blob2Y += ((window.innerHeight - mouseY) - blob2Y) * 0.02;

        if (blob1) {
            blob1.style.transform = `translate(${blob1X}px, ${blob1Y}px) translate(-50%, -50%) scale(1.2)`;
        }
        if (blob2) {
            blob2.style.transform = `translate(${blob2X}px, ${blob2Y}px) translate(-50%, -50%) scale(1.4)`;
        }
        
        requestAnimationFrame(animateBlobs);
    };

    // Start background animation
    if (blob1 && blob2) {
        animateBlobs();
    }

    // Modal / About Me functionality
    const aboutBtn = document.getElementById('about-btn');
    const profileTrigger = document.getElementById('profile-trigger');
    const aboutModal = document.getElementById('about-modal');
    const closeModal = document.querySelector('.close-modal');

    const typeWriterElement = document.getElementById('typewriter-text');
    let typeWriterInterval;

    const startTypewriter = () => {
        if (!typeWriterElement) return;
        typeWriterElement.innerHTML = '';
        typeWriterElement.classList.add('typing');
        
        const p1 = "Mohamed has graduated from Tanta University majoring in Business Information Systems and he is also a data professional with a strong passion for data analysis and data engineering. His journey in the data field began with a deep curiosity about how raw data can be transformed into meaningful insights, which drove him to master many tools.";
        const p2 = "Through hands-on projects and real-world applications, Mohamed has developed solid expertise in analyzing data, building interactive dashboards, and designing data solutions that support informed decision-making. He has also expanded his skill set into data engineering, working with data pipelines and modern data practices to handle and process data more efficiently.";
        const p3 = "Beyond technical skills, Mohamed is proactive in applying his knowledge in real-world scenarios, aiming to support businesses with data-driven strategies that enhance performance and growth. With a strong commitment to continuous learning and improvement, he is focused on delivering impactful solutions and building a successful career in the data field.";
        const fullText = p1 + "<br><br>" + p2 + "<br><br>" + p3;
        
        let i = 0;
        clearInterval(typeWriterInterval);
        
        typeWriterInterval = setInterval(() => {
            if (i < fullText.length) {
                if (fullText.substring(i, i + 8) === "<br><br>") {
                    typeWriterElement.innerHTML += "<br><br>";
                    i += 8;
                } else {
                    typeWriterElement.innerHTML += fullText.charAt(i);
                    i++;
                }
            } else {
                clearInterval(typeWriterInterval);
                typeWriterElement.classList.remove('typing');
            }
        }, 12); // Adjust typing speed here (lower is faster)
    };

    const stopTypewriter = () => {
        clearInterval(typeWriterInterval);
        if (typeWriterElement) {
            typeWriterElement.innerHTML = '';
            typeWriterElement.classList.remove('typing');
        }
    };

    const openModal = (e) => {
        e.preventDefault();
        aboutModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling in background
        startTypewriter(); // Trigger typing effect when modal opens
    };

    if (aboutModal && closeModal) {
        if (aboutBtn) aboutBtn.addEventListener('click', openModal);
        if (profileTrigger) profileTrigger.addEventListener('click', openModal);

        closeModal.addEventListener('click', () => {
            aboutModal.classList.remove('active');
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            stopTypewriter();
        });

        // Close when clicking outside modal content
        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.remove('active');
                document.body.style.overflow = 'auto'; // Re-enable scrolling
                stopTypewriter();
            }
        });
    }

    // Projects Hover Modal Logic
    const projectCards = document.querySelectorAll('.project-card');
    const projectHoverModal = document.getElementById('project-hover-modal');
    const hoverProjectImg = document.getElementById('hover-project-img');
    const hoverProjectTitle = document.getElementById('hover-project-title');
    const hoverProjectDesc = document.getElementById('hover-project-desc');

    if (projectHoverModal) {
        projectCards.forEach(card => {
            const projectImage = card.querySelector('.project-image');
            
            projectImage.addEventListener('mouseenter', () => {
                // Extract background image, title, and description from the hovered card
                const bgImageStyle = projectImage.style.backgroundImage;
                const imgUrlMatch = bgImageStyle.match(/url\(["']?(.*?)["']?\)/);
                const title = card.querySelector('h3').textContent;
                const desc = card.querySelector('p').textContent;

                // Populate the hover modal
                if (imgUrlMatch && imgUrlMatch[1]) {
                    hoverProjectImg.src = imgUrlMatch[1];
                }
                hoverProjectTitle.textContent = title;
                hoverProjectDesc.textContent = desc;

                // Display the modal
                projectHoverModal.classList.add('active');
            });

            projectImage.addEventListener('mouseleave', () => {
                // Hide the modal when the mouse leaves the project photo
                projectHoverModal.classList.remove('active');
            });
        });
    }
});
