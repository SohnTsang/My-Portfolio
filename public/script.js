/* ========================================
   KAHO TSANG — PORTFOLIO
   ======================================== */

// ── Header scroll behavior ──
(function () {
    var header = document.getElementById('header');
    if (!header) return;

    function onScroll() {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
})();


// ── Mobile menu ──
(function () {
    var menuBtn = document.getElementById('menu-btn');
    var mobileMenu = document.getElementById('mobile-menu');
    if (!menuBtn || !mobileMenu) return;

    function closeMenu() {
        mobileMenu.classList.remove('open');
        menuBtn.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', function () {
        var isOpen = mobileMenu.classList.toggle('open');
        menuBtn.classList.toggle('open', isOpen);
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Expose for lang toggle
    window.__closeMenu = closeMenu;
})();


// ── Smooth scroll for anchor links ──
(function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            var headerHeight = parseInt(
                getComputedStyle(document.documentElement)
                    .getPropertyValue('--header-height')
            ) || 72;

            var top = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });
})();


// ── Scroll reveal ──
(function () {
    var els = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        els.forEach(function (el) { obs.observe(el); });
    } else {
        els.forEach(function (el) { el.classList.add('visible'); });
    }
})();


// ── Active nav link tracking ──
(function () {
    var navLinks = document.querySelectorAll('.header-nav-link');
    var sections = [];

    navLinks.forEach(function (link) {
        var id = link.getAttribute('href').replace('#', '');
        var section = document.getElementById(id);
        if (section) sections.push({ id: id, el: section });
    });

    if ('IntersectionObserver' in window && sections.length) {
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var link = document.querySelector(
                    '.header-nav-link[href="#' + entry.target.id + '"]'
                );
                if (link && entry.isIntersecting) {
                    navLinks.forEach(function (l) { l.classList.remove('active'); });
                    link.classList.add('active');
                }
            });
        }, { threshold: 0.2, rootMargin: '-80px 0px -50% 0px' });

        sections.forEach(function (s) { obs.observe(s.el); });
    }
})();


// ========================================
// LOCALIZATION — EN / ZH-HK
// ========================================
(function () {
    var dict = {
        'nav.services': '服務',
        'nav.work': '作品',
        'nav.experience': '經驗',
        'nav.contact': '聯絡',
        'nav.cta': '聯絡我',

        'hero.headline': '網頁、應用程式及自動化顧問',
        'hero.subheadline': '我幫助企業建立更好的數碼產品，並改善營運流程。',
        'hero.body': '由網站及應用程式原型，到工作流程自動化及流程改善，我因應實際業務需求，設計清晰、實用的解決方案。',
        'hero.btn_work': '瀏覽作品',
        'hero.trust': '曾於 Barclays、Bank of America、Goldman Sachs 工作，並擁有獨立產品開發經驗。',
        'hero.availability': '可接受香港遠端自由工作項目。',

        'whatido.title': '我做甚麼',
        'whatido.content': '<p class="text-lead">我服務的企業，需要的不僅僅是設計或程式碼。</p><p>有些需要一個能好好呈現自己的網站；有些需要一個節省時間、減少人手操作的工具；有些需要有人幫手將混亂的流程理順，變得更清晰易管理。</p><p>我的背景結合了業務營運、流程改善及實際產品開發，兼備策略思維與落手執行能力。</p>',

        'services.title': '服務範圍',
        'services.intro': '我承接數碼產品開發、自動化及業務流程改善方面的自由工作項目。',
        'services.s1.title': '網頁設計及開發',
        'services.s1.text': '為企業設計及開發網站、Landing Page 及前端系統，確保專業外觀、清晰表達，並配合實際業務目標。',
        'services.s2.title': '應用程式原型及產品開發',
        'services.s2.text': '為初期構想、內部工具或面向客戶的產品，進行 iOS 及網頁產品開發，具備完善架構及清晰的用戶體驗。',
        'services.s3.title': '工作流程自動化',
        'services.s3.text': '運用 Excel、VBA 及 Python 開發工具，減少人手操作、提升準確度，令團隊運作更有效率。',
        'services.s4.title': '流程改善及內部工具',
        'services.s4.text': '審視業務流程、找出問題所在，並建立實用的系統或工具，令日常營運更加順暢。',

        'work.title': '精選作品',
        'work.intro': '涵蓋自動化、內部工具、產品開發及數碼建設的作品精選。',
        'work.w1.visual': '利率業務流程',
        'work.w1.category': '自動化 / 內部工具',
        'work.w1.title': '利率業務拍賣記賬工具',
        'work.w1.desc': '重建一套用於利率業務流程的 Excel/VBA 記賬工具，改善輸入流程，減少人為錯誤，並在時間緊迫的操作中建立更清晰的審計紀錄。',
        'work.w1.focus': '重點：速度、準確度、審計就緒',
        'work.w2.visual': '結算流程',
        'work.w2.category': '流程改善 / 自動化',
        'work.w2.title': '結算工作流程自動化',
        'work.w2.desc': '開發基於 VBA 的結算支援自動化工具，涵蓋未配對交易提醒、Pair-off 處理，以及面向大量客戶的 SSI 分發。',
        'work.w2.focus': '重點：減少重複人手操作，提升一致性',
        'work.w3.category': '數據產品 / 商業工具',
        'work.w3.title': '住宅物業定價模型',
        'work.w3.desc': '開發一套覆蓋東京 23 區的 Python 住宅物業定價模型，包含數據採集、特徵工程、訓練邏輯及持續模型維護。',
        'work.w3.focus': '重點：房地產業務流程中的實用決策支援',
        'work.w4.category': '網頁設計 / 產品開發',
        'work.w4.title': '網站、Landing Page 及產品開發',
        'work.w4.desc': '獨立設計及開發多個數碼產品，包括企業 Landing Page、iOS 健身應用程式及安全報到應用程式，由規劃、架構、開發到測試一手包辦。',
        'work.w4.focus': '重點：產品思維、介面質素、務實執行',

        'capabilities.title': '技術能力',
        'capabilities.intro': '涵蓋前端、產品開發、自動化及企業系統的實用技術組合。',
        'capabilities.frontend': '前端開發',
        'capabilities.app': '應用程式開發',
        'capabilities.automation': '自動化及數據',
        'capabilities.backend': '後端 / 系統',
        'capabilities.delivery': '產品交付',
        'capabilities.d1': '測試',
        'capabilities.d2': '流程設計',
        'capabilities.d3': '內部工具',
        'capabilities.d4': '持份者協調',

        'why.title': '為何客戶選擇與我合作',
        'why.lead': '<p>我不僅僅是一個畫介面或寫程式碼的人。</p><p>我的背景涵蓋對準確度、時效及流程有嚴格要求的實際商業環境。我曾在前台、中台、營運及技術相關崗位工作，同時亦獨立開發產品。</p><p>這代表我能理解業務問題背後的流程，並設計出實用的解決方案。</p>',
        'why.b1.title': '商業理解',
        'why.b1.text': '在節奏快、講求細節的營運環境中累積的實戰經驗。',
        'why.b2.title': '親手交付',
        'why.b2.text': '能夠由構思到開發、測試、完善直至推出，一手處理。',
        'why.b3.title': '清晰溝通',
        'why.b3.text': '能以英語、日語、廣東話及普通話進行工作溝通。',

        'experience.title': '工作經驗',
        'experience.intro': '涵蓋金融、營運、自動化及產品開發的工作經歷。',
        'experience.e1.role': '交易及銷售助理，利率部門',
        'experience.e1.desc': '支援前台交易工作流程、記賬、確認、問題處理，以及系統測試。',
        'experience.e2.role': '定息收益交易處理，高級分析師',
        'experience.e2.desc': '負責日常交易支援、結算協調、自動化，以及定息收益產品的流程改善。',
        'experience.e3.role': '股票執行服務，分析師',
        'experience.e3.desc': '支援分配、確認、帳戶設立，以及面向客戶營運的流程改善。',
        'experience.e4.role': '軟件工程師',
        'experience.e4.desc': '開發一套用於實際房地產交易的 Python 住宅物業定價模型。',

        'contact.title': '聯絡我',
        'contact.body': '如果你需要網站、應用程式原型、工作流程自動化，或者更好的業務流程管理方案，歡迎隨時聯絡我。',
        'contact.supporting': '我可接受香港遠端自由工作項目，樂意討論短期或長期合作。',
        'contact.btn': '聯絡我',
        'contact.email_label': '電郵',
        'contact.phone_label': '電話',

        'footer.role': '網頁、應用程式及自動化顧問'
    };

    var originalTexts = {};
    var currentLang = 'en';

    // Cache the original English innerHTML on load
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        originalTexts[el.getAttribute('data-i18n')] = el.innerHTML;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
        originalTexts[el.getAttribute('data-i18n-html')] = el.innerHTML;
    });

    function applyLanguage(lang) {
        var isZh = (lang === 'zh-HK');

        document.documentElement.lang = isZh ? 'zh-HK' : 'en';
        document.body.classList.toggle('lang-zh', isZh);

        // Title & meta
        document.title = isZh
            ? 'Kaho Tsang — 網頁、應用程式及自動化顧問'
            : 'Kaho Tsang — Web, App & Automation Consultant';

        var meta = document.querySelector('meta[name="description"]');
        if (meta) {
            meta.setAttribute('content', isZh
                ? '我幫助企業建立更好的數碼產品，並改善營運流程。網頁設計、應用程式開發、工作流程自動化及流程改善。'
                : 'I help businesses build better digital products and improve the way they work. Web design, app development, workflow automation, and process improvement in Hong Kong.'
            );
        }

        // Text elements
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.getAttribute('data-i18n');
            if (isZh && dict[key]) {
                el.textContent = dict[key];
            } else if (!isZh && originalTexts[key]) {
                el.innerHTML = originalTexts[key];
            }
        });

        // HTML block elements
        document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
            var key = el.getAttribute('data-i18n-html');
            if (isZh && dict[key]) {
                el.innerHTML = dict[key];
            } else if (!isZh && originalTexts[key]) {
                el.innerHTML = originalTexts[key];
            }
        });

        // Toggle labels
        var label = isZh ? 'EN' : '中文';
        var el1 = document.getElementById('lang-label');
        var el2 = document.getElementById('lang-label-mobile');
        if (el1) el1.textContent = label;
        if (el2) el2.textContent = label;

        currentLang = lang;

        try { localStorage.setItem('lang', lang); } catch (e) {}
    }

    function toggle() {
        applyLanguage(currentLang === 'en' ? 'zh-HK' : 'en');
    }

    // Attach click handlers
    var btn1 = document.getElementById('lang-toggle');
    var btn2 = document.getElementById('lang-toggle-mobile');

    if (btn1) btn1.addEventListener('click', toggle);
    if (btn2) btn2.addEventListener('click', function () {
        toggle();
        if (window.__closeMenu) window.__closeMenu();
    });

    // Restore saved preference
    try {
        var saved = localStorage.getItem('lang');
        if (saved === 'zh-HK') {
            currentLang = 'en'; // so toggle flips to zh-HK
            toggle();
        }
    } catch (e) {}
})();
