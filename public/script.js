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
        'nav.validation': '市場驗證',
        'nav.work': '作品',
        'nav.experience': '經驗',
        'nav.contact': '聯絡',
        'nav.cta': '聯絡我',

        'hero.headline': '數碼及市場拓展夥伴',
        'hero.subheadline': '協助企業打造數碼工具，並驗證食品品牌在香港、日本及新加坡的市場機會。',
        'hero.tag1': '商業分析',
        'hero.tag2': '數碼開發及自動化',
        'hero.tag3': '港 / 日 / 新 市場驗證',
        'hero.btn_work': '瀏覽作品',
        'hero.btn_contact': '展開對話',
        'hero.trust': '曾於 Barclays、Bank of America 及 Goldman Sachs 工作，亦有獨立開發產品經驗。',
        'hero.availability': '現接受香港 freelance 項目。',

        'whatido.title': '我做甚麼',
        'whatido.content': '<p class="text-lead">我在三個實際範疇協助企業：理解業務問題、打造實用的數碼方案，以及驗證新的市場機會。</p><p>有些客戶需要網站、應用程式原型或自動化工具；有些則需要研究市場、整理構思，或在接觸合作夥伴或客戶之前準備相關材料。</p><p>我的工作介乎於商業分析、數碼執行及實際市場驗證之間。</p>',

        'services.title': '服務範圍',
        'services.intro': '在商業分析、數碼開發、自動化及早期市場驗證等範疇提供實際支援。',
        'services.examples_label': '例子',
        'services.s1.title': '商業分析及策略支援',
        'services.s1.text': '協助釐清業務問題、比較不同方案、研究競爭對手、整理需求，將不清晰的構思轉化為實際可行的下一步。',
        'services.s1.benefit': '更清晰的決策、更佳規劃，減少執行上的浪費。',
        'services.s1.examples': '市場研究、競爭分析、業務需求整理、流程檢視、項目規劃。',
        'services.s2.title': '網站、應用程式及 MVP',
        'services.s2.text': '為企業打造實用的網站、Landing Page、應用程式原型及 MVP，清楚呈現價值並快速驗證構思。',
        'services.s2.benefit': '更快推出、更清晰呈現、更低成本驗證。',
        'services.s2.examples': '公司網站、Landing Page、MVP、預約／聯絡流程、Portfolio 網站。',
        'services.s3.title': '工作流程自動化及內部工具',
        'services.s3.text': '透過 Excel、VBA、Python、儀表板及輕量內部工具，減少重複的人手操作。',
        'services.s3.benefit': '節省時間、減少錯誤，提升日常運作效率。',
        'services.s3.examples': 'Excel 自動化、報表工具、數據清理、內部行政工具、流程改善。',
        'services.s4.title': '食品品牌市場驗證 — 港 / 日 / 新',
        'services.s4.text': '為希望進入香港、日本及新加坡的食品品牌，提供早期市場研究、本地化、定位、驗證規劃及對外聯繫準備，主力以香港及日本為主。',
        'services.s4.benefit': '在大額投入之前，先降低進入市場的風險。',
        'services.s4.examples': '競爭研究、價格檢視、消費者契合度、產品定位、中／日／英本地化、Pop-up 研究、合作夥伴搜尋、聯繫文案準備。',

        'validation.eyebrow': '市場驗證',
        'validation.title': '香港、日本及新加坡食品品牌驗證',
        'validation.intro': '對於有意進入香港、日本或新加坡的食品品牌，我協助處理正式進入市場前的早期驗證階段。主力範圍為香港及日本，新加坡則提供研究、定位及對外聯繫準備等支援。',
        'validation.body': '目標是在投入大量資源前，先了解產品、定價、品牌故事及推出形式是否切合本地市場。',
        'validation.c1.title': '市場研究',
        'validation.c1.text': '競爭格局、價格區間、相似產品、選址參考、消費者行為，以及香港、日本及新加坡的市場案例。',
        'validation.c2.title': '本地化',
        'validation.c2.text': '為產品描述、品牌故事、餐牌、Landing Page 及對外聯繫材料，提供中文、日文及英文表達。',
        'validation.c3.title': '驗證規劃',
        'validation.c3.text': 'Landing Page、問卷、輪候名單、Pop-up 概念、試食方案、小型推廣計劃及成效指標。',
        'validation.c4.title': '合作夥伴聯繫支援',
        'validation.c4.text': '研究可能的本地合作夥伴、準備聯繫文案、接觸相關公司，並協助早期溝通。',
        'validation.note': '服務範圍以早期驗證及準備工作為主 — 研究、本地化、定位及對外聯繫。法律、入口牌照及分銷協議並不包括在服務範圍之內。',

        'work.title': '精選作品',
        'work.intro': '涵蓋客戶項目、全端產品、流動應用開發及市場驗證的獨立作品。',
        'work.w1.category': '全端產品',
        'work.w1.title': 'Gourney — 飲食探索社交應用程式',
        'work.w1.desc': '一般飲食應用程式只顯示附近餐廳，不會幫你記住去過哪間、哪間值得再去。Gourney 讓用戶記錄到訪餐廳、按菜系評分排名，透過朋友推薦而非廣告發掘新餐廳。整個產品由我獨立完成：iOS 應用程式、後端 API 及管理後台。',
        'work.w1.focus': '獨立開發 — iOS 應用程式、後端 API 及管理後台',
        'work.w2.category': '客戶項目',
        'work.w2.title': 'A&J HAKKO — 企業網站及管理平台',
        'work.w2.desc': '新加坡日資食品物流公司需要一個雙語網站，並能讓員工自行更新產品資料、新聞及活動內容，無需每次依賴開發者。我負責設計及開發整個網站，連同方便員工直接管理內容的管理後台。',
        'work.w2.focus': '客戶交付 — 雙語網站連自助內容管理',
        'work.w3.category': 'iOS 應用程式',
        'work.w3.title': 'Triovel — 群組旅行計劃應用程式',
        'work.w3.desc': '群組旅行的計劃往往散落在群組對話中——行程零碎、開支混亂、相片分散各處。Triovel 提供共享行程表、協作相簿及多幣種分賬功能，採用離線優先設計，無網絡時亦可正常使用，連線後自動同步。',
        'work.w3.focus': '離線優先設計，數據自動同步',
        'work.w4.caption': '食品品牌驗證',
        'work.w4.category': '市場研究 ／ 本地化 ／ 合作夥伴聯繫',
        'work.w4.title': '亞洲食品品牌驗證項目',
        'work.w4.desc': '為有意進入香港、日本及新加坡的海外食品品牌，建立早期驗證方法。內容包括競爭研究、Pop-up 及零售可行性檢視、本地化定位，以及對潛在本地合作夥伴的聯繫準備。',
        'work.w4.focus': '早期驗證、定位及對外聯繫準備',
        'work.w4.tag1': '食品品牌研究',
        'work.w4.tag2': '港 / 日 / 新 市場',
        'work.w4.tag3': '本地化',
        'work.w4.tag4': '合作夥伴聯繫',
        'work.w4.tag5': '驗證規劃',

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
        'capabilities.d4': '跨團隊協調',

        'why.title': '這能如何幫助你',
        'why.lead': '<p>當你正在判斷該做什麼、如何改善營運，或一個市場是否值得測試時，我可以協助你把不確定的想法整理成清晰的下一步。</p><p>目標很簡單：幫助你作出更清楚的決策、更好地呈現業務、在投入大量成本前先驗證方向，並透過實用的執行減少重複人手工作。</p>',
        'why.b1.title': '釐清下一步',
        'why.b1.text': '透過研究、分析和結構化規劃，將模糊的想法、流程問題或市場疑問轉化為實際可執行的下一步。',
        'why.b2.title': '清楚呈現品牌',
        'why.b2.text': '建立網站、Landing Page 和數碼材料，讓客戶、合作夥伴和潛在客戶更容易理解、信任並分享你的業務。',
        'why.b3.title': '先驗證，再投入',
        'why.b3.text': '在投入較大成本前，先研究競爭環境、價格、定位和本地市場適配度。',
        'why.b4.title': '節省人手時間',
        'why.b4.text': '透過實用工具、工作流程和自動化，減少重複性人手工作，讓團隊專注於更高價值的事情。',

        'experience.title': '工作經驗',
        'experience.intro': '<p>我的背景結合金融營運、業務流程改善、自動化，以及香港、日本及新加坡之間的跨境溝通經驗。</p><p>我並非大型顧問公司。我最適合與創辦人或小型團隊合作 — 需要一位實際的人：能分析現況、整理下一步、打造實用的數碼工具，並協助項目向前推進。</p>',
        'experience.e1.role': '交易及銷售助理（利率）— AVP',
        'experience.e1.time': '2025年4月至今',
        'experience.e1.location': '東京',
        'experience.e1.desc': '支援前台交易流程、記賬、確認、問題處理及系統測試。',
        'experience.e2.role': '定息收益交易處理 — 高級分析師',
        'experience.e2.time': '2022年4月 – 2024年10月',
        'experience.e2.location': '新加坡',
        'experience.e2.desc': '負責日常交易支援、結算協調、自動化工具開發，以及定息收益產品相關流程優化。',
        'experience.e3.role': '股票執行服務 — 分析師',
        'experience.e3.time': '2021年5月 – 2022年1月',
        'experience.e3.location': '新加坡',
        'experience.e3.desc': '支援分配、確認、開戶，以及客戶相關營運流程優化。',
        'experience.e4.role': '軟件工程師（兼職）',
        'experience.e4.time': '2018年8月 – 2021年4月',
        'experience.e4.location': '東京',
        'experience.e4.desc': '開發用於實際房地產交易的 Python 住宅物業 AI 定價模型。',

        'contact.title': '聯絡我',
        'contact.body': '如果你希望在商業分析、網站或 MVP、工作流程自動化，或者於香港、日本或新加坡的食品品牌早期驗證方面取得協助，歡迎聯絡我。',
        'contact.supporting': '我可以協助釐清構思、研究市場、準備本地化材料、建立數碼資產，並協助推進具體下一步。',
        'contact.btn': '展開對話',
        'contact.email_label': '電郵',
        'contact.phone_label': '電話',

        'footer.role': '數碼及市場拓展夥伴'
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
            ? 'Kaho Tsang — 數碼及市場拓展夥伴'
            : 'Kaho Tsang — Digital & Market Entry Partner';

        var meta = document.querySelector('meta[name="description"]');
        if (meta) {
            meta.setAttribute('content', isZh
                ? '為企業及食品品牌提供數碼開發、自動化，以及香港、日本及新加坡的早期市場驗證支援。'
                : 'Digital build, automation, and early-stage market validation support for businesses and food brands exploring Hong Kong, Japan, and Singapore.'
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
