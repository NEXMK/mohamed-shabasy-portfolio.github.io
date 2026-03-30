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

    // Terminal Modal / About Me functionality
    const aboutBtn = document.getElementById('about-btn');
    const profileTrigger = document.getElementById('profile-trigger');

    // The two modals
    const aboutModal = document.getElementById('about-modal');
    const sqlAboutModal = document.getElementById('sql-about-modal');

    const closeModals = document.querySelectorAll('.close-modal');

    // 1. Text Typewriter Logic (For photo click)
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
        }, 12);
    };

    const stopTypewriter = () => {
        clearInterval(typeWriterInterval);
        if (typeWriterElement) {
            typeWriterElement.innerHTML = '';
            typeWriterElement.classList.remove('typing');
        }
    };


    // 2. Terminal Sequence Logic (For button click)
    let typeWriterTimeouts = [];

    const startTerminalSequence = () => {
        const termBody = document.getElementById('sql-terminal-body');
        if (!termBody) return;

        // Clear previous timeouts and content
        typeWriterTimeouts.forEach(clearTimeout);
        typeWriterTimeouts = [];
        termBody.innerHTML = '';

        let cursorHtml = '<span class="term-blinking-cursor"></span>';

        const lines = [
            { text: `<span class="term-prompt">shabasy@portfolio:~$</span> mysql -u recruiter -p`, delay: 600, type: 'type' },
            { text: `Enter password: `, delay: 400, type: 'type', waitAfter: 600 },
            { text: `<span class="term-prompt">shabasy@portfolio:~$</span> mysql -u recruiter -p<br>Enter password: ********<br><br>Welcome to the PortfolioDB monitor. Commands end with ; or \\g.<br>Your MySQL connection id is 10<br>Server version: 8.0.32 PortfolioDB Server<br>`, type: 'instant', replacePrev: 2, delay: 500 },
            { text: `<span class="term-db-prompt">PortfolioDB></span> <span class="sql-keyword">SELECT</span> <span class="sql-field">*</span> <span class="sql-keyword">FROM</span> <span class="sql-field">candidates</span> <span class="sql-keyword">WHERE</span> <span class="sql-field">name</span> = <span class="sql-string">'Mohamed Shabasy'</span>\\G`, delay: 800, type: 'type', waitAfter: 400 },
            { text: `<br>*************************** 1. row ***************************`, type: 'instant', delay: 100 },
            { text: `       <span class="sql-key">Name:</span> <span class="sql-string">"Mohamed Shabasy"</span>`, type: 'instant', delay: 150 },
            { text: `      <span class="sql-key">Title:</span> <span class="sql-string">"Data Analyst & Data Engineer"</span>`, type: 'instant', delay: 150 },
            { text: `  <span class="sql-key">Education:</span> <span class="sql-string">"Business Information Systems, Tanta University"</span>`, type: 'instant', delay: 150 },
            { text: `     <span class="sql-key">Skills:</span> [ <span class="sql-string">"SQL"</span>, <span class="sql-string">"Python"</span>, <span class="sql-string">"PowerBI"</span>, <span class="sql-string">"Excel"</span>, <span class="sql-string">"Databricks"</span>, <span class="sql-string">"Azure"</span> ]`, type: 'instant', delay: 150 },
            { text: `    <span class="sql-key">Mission:</span> <span class="sql-string">"To bridge the gap between raw data and business value. I design robust data pipelines and interactive executive dashboards to support data-driven decision making at standard."</span>`, type: 'instant', delay: 400 },
            { text: `<span style="color:#94a3b8">1 row in set (0.01 sec)</span><br>`, type: 'instant', delay: 600 },
            { text: `<span class="term-db-prompt">PortfolioDB></span> `, type: 'instant', delay: 0 }
        ];

        let currentDelay = 0;
        let lineElements = [];

        lines.forEach((line, index) => {
            currentDelay += line.delay || 0;

            typeWriterTimeouts.push(setTimeout(() => {
                if (line.replacePrev) {
                    for (let i = 0; i < line.replacePrev; i++) {
                        if (lineElements.length > 0) {
                            let el = lineElements.pop();
                            termBody.removeChild(el);
                        }
                    }
                }

                const lineDiv = document.createElement('div');
                lineDiv.className = 'term-line';
                termBody.appendChild(lineDiv);
                lineElements.push(lineDiv);

                document.querySelectorAll('.term-blinking-cursor').forEach(c => c.remove());

                if (line.type === 'instant') {
                    lineDiv.innerHTML = line.text + cursorHtml;
                } else if (line.type === 'type') {
                    let isTag = false;
                    let typedContent = '';
                    let charIndex = 0;
                    const chars = line.text.split('');

                    const typingInterval = setInterval(() => {
                        if (charIndex >= chars.length) {
                            clearInterval(typingInterval);
                            return;
                        }

                        let char = chars[charIndex];
                        if (char === '<') isTag = true;

                        typedContent += char;
                        if (char === '>') isTag = false;

                        if (!isTag) {
                            lineDiv.innerHTML = typedContent + cursorHtml;
                        }
                        charIndex++;
                        termBody.scrollTop = termBody.scrollHeight;
                    }, 25);

                    typeWriterTimeouts.push(typingInterval);
                }

                termBody.scrollTop = termBody.scrollHeight;
            }, currentDelay));

            if (line.waitAfter) currentDelay += line.waitAfter;
        });
    };

    const stopTerminalSequence = () => {
        typeWriterTimeouts.forEach(t => {
            clearTimeout(t);
            clearInterval(t);
        });
        typeWriterTimeouts = [];
        const termBody = document.getElementById('sql-terminal-body');
        if (termBody) termBody.innerHTML = '';
    };

    // 3. Modals Event Setup
    if (aboutBtn) {
        aboutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (sqlAboutModal) {
                sqlAboutModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                startTerminalSequence();
            }
        });
    }

    if (profileTrigger) {
        profileTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            if (aboutModal) {
                aboutModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                startTypewriter();
            }
        });
    }

    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
                if (modal.id === 'about-modal') stopTypewriter();
                if (modal.id === 'sql-about-modal') stopTerminalSequence();
            }
        });
    });

    // Close when clicking outside modal content
    if (aboutModal) {
        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                stopTypewriter();
            }
        });
    }

    if (sqlAboutModal) {
        sqlAboutModal.addEventListener('click', (e) => {
            if (e.target === sqlAboutModal) {
                sqlAboutModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                stopTerminalSequence();
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

    // Case Study Fullscreen Modal Logic
    const caseModal = document.getElementById('case-study-modal');
    if (caseModal) {
        const caseModalClose = document.querySelector('.case-study-close');
        const modalBtns = document.querySelectorAll('.project-modal-btn');

        // Modal Elements
        const csBanner = document.getElementById('cs-banner');
        const csTag = document.getElementById('cs-tag');
        const csTitle = document.getElementById('cs-title');
        const csSituation = document.getElementById('cs-situation');
        const csTask = document.getElementById('cs-task');
        const csAction = document.getElementById('cs-action');
        const csResult = document.getElementById('cs-result');
        const csRepoLink = document.getElementById('cs-repo-link');

        modalBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.currentTarget.closest('.project-card');

                // Extract and Set Background Image
                const bgImageStyle = card.querySelector('.project-image').style.backgroundImage;
                const imgUrlMatch = bgImageStyle.match(/url\(["']?(.*?)["']?\)/);
                if (imgUrlMatch && imgUrlMatch[1]) {
                    csBanner.style.backgroundImage = `url('${imgUrlMatch[1]}')`;
                } else {
                    csBanner.style.backgroundImage = 'none';
                }

                // Extract text from card elements
                csTag.textContent = card.querySelector('.project-tag').textContent;
                csTitle.textContent = card.querySelector('h3').textContent;

                // Set STAR content directly from data attributes on the card
                csSituation.textContent = card.getAttribute('data-star-situation') || "Information not provided.";
                csTask.textContent = card.getAttribute('data-star-task') || "Information not provided.";
                csAction.textContent = card.getAttribute('data-star-action') || "Information not provided.";
                csResult.textContent = card.getAttribute('data-star-result') || "Information not provided.";

                // Configure Repo link button logic
                const repoLink = card.querySelector('.project-link').href;
                if (repoLink && repoLink !== "#" && !repoLink.endsWith("#")) {
                    csRepoLink.href = repoLink;
                    csRepoLink.style.display = 'inline-flex';
                } else {
                    // Hide button if no valid repo linked
                    csRepoLink.style.display = 'none';
                }

                // Trigger opening transition
                caseModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        const closeCaseModal = () => {
            caseModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        caseModalClose.addEventListener('click', closeCaseModal);

        // Ensure clicking outside the core modal content closes the modal
        caseModal.addEventListener('click', (e) => {
            if (e.target === caseModal) {
                closeCaseModal();
            }
        });
    }

    // Mobile Menu Toggle Logic
    const navToggle = document.querySelector('.nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navToggleIcon = navToggle ? navToggle.querySelector('i') : null;

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');

            // Toggle between menu and close icon
            if (navToggleIcon) {
                if (navLinksContainer.classList.contains('active')) {
                    navToggleIcon.className = 'bx bx-x';
                } else {
                    navToggleIcon.className = 'bx bx-menu';
                }
            }
        });

        // Close menu when a link is clicked
        const links = navLinksContainer.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                if (navToggleIcon) {
                    navToggleIcon.className = 'bx bx-menu';
                }
            });
        });
    }

    // Skill Cards Edge Glow Logic
    const edgeGlowOverlay = document.getElementById('edge-glow-overlay');
    const skillCards = document.querySelectorAll('.skill-card');
    
    const skillColors = {
        'skill-sql': 'rgba(242, 145, 17, 0.7)',
        'skill-python': 'rgba(55, 118, 171, 0.7)',
        'skill-powerbi': 'rgba(242, 200, 17, 0.7)',
        'skill-excel': 'rgba(33, 115, 70, 0.7)',
        'skill-databricks': 'rgba(255, 54, 33, 0.7)',
        'skill-azure': 'rgba(0, 120, 212, 0.7)',
        'skill-spark': 'rgba(226, 90, 28, 0.7)',
        'skill-ai': 'rgba(139, 92, 246, 0.7)'
    };

    if (edgeGlowOverlay && skillCards.length > 0) {
        skillCards.forEach(card => {
            const handleGlow = () => {
                const color = skillColors[card.id] || 'rgba(59, 130, 246, 0.7)';
                edgeGlowOverlay.style.setProperty('--glow-color', color);
                edgeGlowOverlay.classList.add('active');
            };

            const removeGlow = () => {
                edgeGlowOverlay.classList.remove('active');
            };

            card.addEventListener('mouseenter', handleGlow);
            card.addEventListener('mouseleave', removeGlow);
            
            // For mobile touches
            card.addEventListener('touchstart', handleGlow, { passive: true });
            card.addEventListener('touchend', removeGlow, { passive: true });
        });
    }
});
