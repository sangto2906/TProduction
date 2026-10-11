(function () {
  var KEY = 'tproduction-lang';
  var root = document.documentElement;

  function savedLang() {
    try {
      return localStorage.getItem(KEY);
    } catch (error) {
      return null;
    }
  }

  function saveLang(lang) {
    try {
      localStorage.setItem(KEY, lang);
    } catch (error) {
      return;
    }
  }

  function applyLang(lang) {
    root.dataset.lang = lang;
    root.lang = lang;
    document.querySelectorAll('img[data-alt-vi]').forEach(function (img) {
      if (!img.dataset.altEn) img.dataset.altEn = img.alt;
      img.alt = lang === 'vi' ? img.dataset.altVi : img.dataset.altEn;
    });
  }

  var initial = savedLang();
  if (initial !== 'en' && initial !== 'vi') {
    initial = (navigator.language || '').toLowerCase().indexOf('vi') === 0 ? 'vi' : 'en';
  }
  applyLang(initial);

  document.querySelectorAll('[data-lang-toggle]').forEach(function (button) {
    button.addEventListener('click', function () {
      var next = root.dataset.lang === 'vi' ? 'en' : 'vi';
      saveLang(next);
      applyLang(next);
    });
  });
})();
