document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebarClose = document.querySelector('.sidebar__close');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.querySelector('.overlay');

  function openMenu() {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
    menuToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener('click', () => {
      if (sidebar.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    sidebarClose?.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && sidebar.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  const copyBtn = document.getElementById('copy-btn');
  const passwordEl = document.getElementById('wifi-password');

  if (copyBtn && passwordEl) {
    copyBtn.addEventListener('click', async () => {
      const password = passwordEl.textContent.trim();
      const copyText = copyBtn.querySelector('.copy-text');
      const feedback = copyBtn.querySelector('.copy-feedback');

      try {
        await navigator.clipboard.writeText(password);
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = password;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      if (copyText && feedback) {
        copyText.hidden = true;
        feedback.hidden = false;

        setTimeout(() => {
          copyText.hidden = false;
          feedback.hidden = true;
        }, 2000);
      }
    });
  }
});
