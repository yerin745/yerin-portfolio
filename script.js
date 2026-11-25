const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "메뉴 닫기" : "메뉴 열기");
});

document.querySelectorAll(".nav-link, .nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const progress = document.querySelector(".scroll-progress");
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = [...document.querySelectorAll("main section[id]")];
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => navObserver.observe(section));

const form = document.querySelector("#contact-form");
const toast = document.querySelector(".toast");
form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`포트폴리오 문의 - ${data.get("name")}`);
  const body = encodeURIComponent(
    `이름: ${data.get("name")}\n이메일: ${data.get("email")}\n\n${data.get("message")}`
  );
  toast.textContent = "메일 앱에서 메시지를 이어서 보내 주세요.";
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3200);
  window.location.href = `mailto:iyelini@gmail.com?subject=${subject}&body=${body}`;
});
