  // ====== EDIT THESE THREE VALUES AFTER YOU SET UP EMAILJS (see README.md) ======
  const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
  const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
  const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
  // ================================================================================

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Sidebar open/close ---------- */
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const sidebarClose = document.getElementById('sidebarClose');

  function openSidebar(){
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
    menuBtn.setAttribute('aria-expanded', 'true');
  }
  function closeSidebar(){
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
  menuBtn.addEventListener('click', openSidebar);
  sidebarClose.addEventListener('click', closeSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeSidebar(); });

  /* ---------- Page routing (single-file, hash based) ---------- */
  const pages = document.querySelectorAll('.page');
  const navAnchors = document.querySelectorAll('[data-page]');

  function showPage(pageId){
    pages.forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageId) || document.getElementById('page-home');
    target.classList.add('active');

    navAnchors.forEach(a => {
      if(a.closest('.sidebar-links') || a.closest('.top-nav')){
        a.classList.toggle('active', a.dataset.page === pageId);
      }
    });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  navAnchors.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = a.dataset.page;
      history.pushState(null, '', '#' + pageId);
      showPage(pageId);
      closeSidebar();
    });
  });

  window.addEventListener('popstate', () => {
    const pageId = location.hash.replace('#', '') || 'home';
    showPage(pageId);
  });

  // initial page on load
  showPage(location.hash.replace('#', '') || 'home');

  /* ---------- Contact form (EmailJS) ---------- */
  if (window.emailjs && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  }

  const form = document.getElementById('contactForm');
  const statusEl = document.getElementById('formStatus');
  const submitBtn = document.getElementById('submitBtn');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    if (EMAILJS_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      statusEl.textContent = "Contact form isn't connected yet — see README.md to finish EmailJS setup (takes 5 minutes).";
      statusEl.className = "form-status err";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    statusEl.textContent = "";
    statusEl.className = "form-status";

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        statusEl.textContent = "Message sent — thanks for reaching out!";
        statusEl.className = "form-status ok";
        form.reset();
      })
      .catch((err) => {
        statusEl.textContent = "Something went wrong. Please try again or email me directly.";
        statusEl.className = "form-status err";
        console.error(err);
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send message";
      });
  });
