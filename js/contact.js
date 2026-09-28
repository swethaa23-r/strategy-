document.addEventListener('DOMContentLoaded', () => {
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.faq-item');
            const content = item.querySelector('.faq-content');
            const icon = header.querySelector('.faq-icon');

            const isCurrentlyActive = !content.classList.contains('hidden');

            // Find all other FAQs in the same container and close them
            const container = item.parentElement;
            container.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherHeader = otherItem.querySelector('.faq-header');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    
                    if (otherContent && !otherContent.classList.contains('hidden')) {
                        otherContent.classList.add('hidden');
                        
                        // Reset icon
                        if (otherIcon) {
                            otherIcon.classList.remove('fa-chevron-up');
                            otherIcon.classList.add('fa-chevron-down');
                        }
                        
                        // Reset classes
                        if (otherHeader.dataset.activeClasses && otherHeader.dataset.inactiveClasses) {
                            const activeClasses = otherHeader.dataset.activeClasses.split(' ');
                            const inactiveClasses = otherHeader.dataset.inactiveClasses.split(' ');
                            otherHeader.classList.remove(...activeClasses);
                            otherHeader.classList.add(...inactiveClasses);
                        }
                    }
                }
            });

            // Toggle current FAQ
            if (isCurrentlyActive) {
                content.classList.add('hidden');
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');

                if (header.dataset.activeClasses && header.dataset.inactiveClasses) {
                    const activeClasses = header.dataset.activeClasses.split(' ');
                    const inactiveClasses = header.dataset.inactiveClasses.split(' ');
                    header.classList.remove(...activeClasses);
                    header.classList.add(...inactiveClasses);
                }
            } else {
                content.classList.remove('hidden');
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');

                if (header.dataset.activeClasses && header.dataset.inactiveClasses) {
                    const activeClasses = header.dataset.activeClasses.split(' ');
                    const inactiveClasses = header.dataset.inactiveClasses.split(' ');
                    header.classList.remove(...inactiveClasses);
                    header.classList.add(...activeClasses);
                }
            }
        });
    });
});
