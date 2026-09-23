// JavaScript interactivity for PixelGrow Agency Website

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // 2. Case Studies Filter Logic
    const filterBtns = document.querySelectorAll('.filter-btn');
    const caseCards = document.querySelectorAll('.case-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active', 'bg-brand-deepPurple', 'text-white'));
            filterBtns.forEach(b => b.classList.add('text-slate-400'));
            
            btn.classList.add('active', 'bg-brand-deepPurple', 'text-white');
            btn.classList.remove('text-slate-400');

            const filter = btn.getAttribute('data-filter');

            caseCards.forEach(card => {
                if (filter === 'all' || card.classList.contains(filter)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. Ad Simulator Switcher
    const simBtnEcom = document.getElementById('sim-btn-ecom');
    const simBtnRe = document.getElementById('sim-btn-re');
    const simBrandName = document.getElementById('sim-brand-name');
    const simImage = document.getElementById('sim-image');
    const simBadge = document.getElementById('sim-badge');
    const simHeadline = document.getElementById('sim-headline');
    const simCopy = document.getElementById('sim-copy');
    const simCtaText = document.getElementById('sim-cta-text');

    const simData = {
        ecom: {
            brand: 'LuxeAura Official',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
            badge: '40% OFF TODAY',
            headline: 'Upgrade Your Daily Wear Essentials',
            copy: 'Experience premium comfort engineered for modern life. Free worldwide shipping on orders over $50.',
            cta: 'Shop Now & Save'
        },
        realestate: {
            brand: 'Apex Luxury Estates',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80',
            badge: 'VIP LAUNCH',
            headline: 'Modern Waterfront Penthouses From $850k',
            copy: 'Private ocean views, zero tax incentives, and flexible 5-year payment plans. Book a private tour now.',
            cta: 'Download Floor Plan'
        }
    };

    if (simBtnEcom && simBtnRe) {
        simBtnEcom.addEventListener('click', () => {
            simBtnEcom.classList.add('border-purple-500/50', 'bg-purple-900/30', 'text-white');
            simBtnRe.classList.remove('border-purple-500/50', 'bg-purple-900/30', 'text-white');
            simBtnRe.classList.add('text-slate-400');

            updateSimulator('ecom');
        });

        simBtnRe.addEventListener('click', () => {
            simBtnRe.classList.add('border-purple-500/50', 'bg-purple-900/30', 'text-white');
            simBtnEcom.classList.remove('border-purple-500/50', 'bg-purple-900/30', 'text-white');
            simBtnEcom.classList.add('text-slate-400');

            updateSimulator('realestate');
        });
    }

    function updateSimulator(type) {
        const data = simData[type];
        simBrandName.textContent = data.brand;
        simImage.src = data.image;
        simBadge.textContent = data.badge;
        simHeadline.textContent = data.headline;
        simCopy.textContent = data.copy;
        simCtaText.textContent = data.cta;
    }

    // 4. ROI Interactive Calculator Logic
    const budgetSlider = document.getElementById('budget-slider');
    const budgetValue = document.getElementById('budget-value');
    const calcIndustry = document.getElementById('calc-industry');
    const calcRevenue = document.getElementById('calc-revenue');
    const calcMetric1 = document.getElementById('calc-metric-1');
    const calcMetric2 = document.getElementById('calc-metric-2');

    function calculateROI() {
        if (!budgetSlider) return;
        const budget = parseInt(budgetSlider.value);
        const industry = calcIndustry.value;

        budgetValue.textContent = `$${budget.toLocaleString()}`;

        if (industry === 'ecom') {
            const roas = 5.8;
            const revenue = budget * roas;
            const profit = revenue - budget;

            calcRevenue.textContent = `$${revenue.toLocaleString()}`;
            calcMetric1.textContent = `${roas}x Est. ROAS`;
            calcMetric2.textContent = `$${profit.toLocaleString()}`;
        } else {
            const costPerLead = 18;
            const leads = Math.floor(budget / costPerLead);
            const estEstatesSoldValue = budget * 8;

            calcRevenue.textContent = `${leads.toLocaleString()} Qualified Leads`;
            calcMetric1.textContent = `$${costPerLead}/lead avg`;
            calcMetric2.textContent = `$${estEstatesSoldValue.toLocaleString()} Pipeline`;
        }
    }

    if (budgetSlider && calcIndustry) {
        budgetSlider.addEventListener('input', calculateROI);
        calcIndustry.addEventListener('change', calculateROI);
        calculateROI(); // Initial calculation
    }

    // 5. Lead Generation Form Submission (Integrate Email Receiver)
    const leadForm = document.getElementById('lead-form');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('lead-name').value;
            const email = document.getElementById('lead-email').value;
            const phone = document.getElementById('lead-phone').value;
            const industry = document.getElementById('lead-industry').value;
            const website = document.getElementById('lead-website').value;
            const budget = document.getElementById('lead-budget').value;



            // 5. Lead Generation Form Submission
const leadForm = document.getElementById('lead-form');

if (leadForm) {
    leadForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = document.getElementById('submit-btn');
        submitBtn.innerText = "Sending...";

        // Collect Form Data
        const formData = {
            // PASTE YOUR KEY INSIDE THE QUOTES BELOW 👇
            access_key: "e347f322-9624-4d2e-b36d-b81bc45c7637", 
            name: document.getElementById('lead-name').value,
            email: document.getElementById('lead-email').value,
            phone: document.getElementById('lead-phone').value,
            industry: document.getElementById('lead-industry').value,
            website: document.getElementById('lead-website').value,
            budget: document.getElementById('lead-budget').value
        };
        // Send data directly to Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                alert("Thank you! Your request has been sent successfully. We will contact you soon.");
                leadForm.reset();
            } else {
                alert("Submission failed: " + json.message);
            }
        })
        .catch(error => {
            alert("Something went wrong. Please try again.");
        })
        .finally(() => {
            submitBtn.innerHTML = '<span>Send Audit Request</span> <i class="fa-solid fa-paper-plane text-xs"></i>';
        });
    });
}

          

            // Form Feedback
            alert(`Thank you, ${name}! Your request has been submitted successfully.\nWe will reach out to ${email} shortly.`);
            leadForm.reset();
        });
    }
});

// 6. Case Study Modal Functions
function openModal(title, category, metric1, metric2, desc) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-category').textContent = category;
    document.getElementById('modal-metric1').textContent = metric1;
    document.getElementById('modal-metric2').textContent = metric2;
    document.getElementById('modal-desc').textContent = desc;

    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}