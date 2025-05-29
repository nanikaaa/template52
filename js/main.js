document.addEventListener("DOMContentLoaded", () => {
  const loadComponent = (selector, file) => {
    const container = document.querySelector(selector);
    if (container) {
      fetch(file)
        .then((res) => res.text())
        .then((html) => {
          container.innerHTML = html;

          if (selector === "#header") {
            setTimeout(() => {
              setupLangSwitch();
            }, 0);
          }
        })

        .catch((err) => console.error(`Error loading ${file}:`, err));
    }
  };

  loadComponent("#header", "header.html");
  loadComponent("#footer", "footer.html");

  function setupLangSwitch() {
    const langSwitch = document.getElementById("lang-switch");
    if (!langSwitch) return;

    const jp = langSwitch.querySelector(".lang-jp");
    const en = langSwitch.querySelector(".lang-en");

    const savedLang = localStorage.getItem("siteLang");
    if (savedLang === "ENG") {
      jp.classList.remove("active");
      en.classList.add("active");
    } else {
      en.classList.remove("active");
      jp.classList.add("active");
    }

    langSwitch.addEventListener("click", () => {
      const isJP = jp.classList.contains("active");

      if (isJP) {
        jp.classList.remove("active");
        en.classList.add("active");
        en.classList.add("highlight");
        setTimeout(() => en.classList.remove("highlight"), 500);
        localStorage.setItem("siteLang", "ENG");
        console.log("Switched to ENG");
      } else {
        en.classList.remove("active");
        jp.classList.add("active");
        jp.classList.add("highlight");
        setTimeout(() => jp.classList.remove("highlight"), 500);
        localStorage.setItem("siteLang", "JP");
        console.log("Switched to JP");
      }
    });
  }
});
