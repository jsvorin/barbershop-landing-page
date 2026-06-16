const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        const mobileBtn = document.getElementById('mobileBtn');
        const navLinks = document.getElementById('navLinks');
        const navItems = navLinks.querySelectorAll('a');

        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileBtn.querySelector('i').classList.replace('ph-x', 'ph-list');
            });
        });

        const revealElements = document.querySelectorAll('.reveal');
        
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });


        const form = document.getElementById('appointmentForm');
        const modal = document.getElementById('previewModal');
        const closeModal = document.getElementById('closeModal');
        const btnCancel = document.getElementById('btnCancel');
        const btnSendWA = document.getElementById('btnSendWA');

        const prevName = document.getElementById('prevName');
        const prevPhone = document.getElementById('prevPhone');
        const prevService = document.getElementById('prevService');
        const prevDate = document.getElementById('prevDate');
        const prevTime = document.getElementById('prevTime');

        let bookingData = {};

        const toggleModal = (show) => {
            if (show) {
                modal.classList.add('active');
            } else {
                modal.classList.remove('active');
            }
        };

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const serviceSelect = document.getElementById('service');
            const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;

            bookingData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                service: serviceText,
                date: document.getElementById('date').value,
                time: document.getElementById('time').value
            };

            prevName.textContent = bookingData.name;
            prevPhone.textContent = bookingData.phone;
            prevService.textContent = bookingData.service;
            prevDate.textContent = bookingData.date;
            prevTime.textContent = bookingData.time;

            toggleModal(true);
        });

        closeModal.addEventListener('click', () => toggleModal(false));
        btnCancel.addEventListener('click', () => toggleModal(false));

        modal.addEventListener('click', (e) => {
            if (e.target === modal) toggleModal(false);
        });

        btnSendWA.addEventListener('click', () => {
            const waNumber = "6285723216899"; 

            const textWA = `Halo Fuyu Barber, saya ingin melakukan reservasi jadwal dengan detail berikut:%0A%0A` +
                           `*Nama:* ${bookingData.name}%0A` +
                           `*No. HP:* ${bookingData.phone}%0A` +
                           `*Layanan:* ${bookingData.service}%0A` +
                           `*Tanggal:* ${bookingData.date}%0A` +
                           `*Waktu:* ${bookingData.time}%0A%0A` +
                           `Apakah jadwal ini tersedia?`;

            const waLink = `https://wa.me/${waNumber}?text=${textWA}`;

            window.open(waLink, '_blank');

            toggleModal(false);
            form.reset();

            const toast = document.getElementById('toast');
            document.getElementById('toastName').textContent = bookingData.name;

            if (window.toastTimer) clearTimeout(window.toastTimer);

            toast.classList.add('show');

            window.toastTimer = setTimeout(() => {
                toast.classList.remove('show');
            }, 4000);
        });

        const filterBtns = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');

                    item.classList.remove('filter-reveal');

                    if (filterValue === itemCategory) {
                        item.classList.remove('hide');

                        setTimeout(() => {
                            item.classList.add('filter-reveal');
                        }, 10);
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });

        if (document.querySelector('.filter-btn.active')) {
            document.querySelector('.filter-btn.active').click();
        }