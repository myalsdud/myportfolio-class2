const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector("#site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const year = document.querySelector("#year");
const projectModal = document.querySelector("#project-modal");
const projectCards = document.querySelectorAll(".project-card[data-project-id]");
const modalCloseButton = document.querySelector(".modal-close");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
const modalRole = document.querySelector("#modal-role");
const modalTechnologies = document.querySelector("#modal-technologies");
const modalOutcome = document.querySelector("#modal-outcome");

const projectDetails = {
  lumio: {
    name: "Lumio",
    description: "투자를 처음 시작하는 사람도 자산 흐름을 쉽게 이해하도록 돕는 금융 서비스입니다.",
    role: "프로덕트 디자이너 및 프런트엔드 개발자",
    technologies: ["HTML", "CSS", "JavaScript"],
    outcome: "핵심 자산 정보를 한 화면에서 확인하는 대시보드와 이해하기 쉬운 투자 안내 흐름을 설계했습니다.",
  },
  mori: {
    name: "Mori",
    description: "바쁜 일상 속에서 짧은 호흡과 마음 챙김을 돕는 웰니스 서비스입니다.",
    role: "UX/UI 디자이너",
    technologies: ["Figma", "HTML", "CSS"],
    outcome: "짧은 시간에도 매일 이용할 수 있도록 간결한 마음 챙김 경험과 차분한 시각 디자인을 제안했습니다.",
  },
  "ondo-studio": {
    name: "Ondo Studio",
    description: "디자인 커뮤니티의 프로젝트와 구성원을 소개하는 문화 플랫폼입니다.",
    role: "브랜드 디자이너 및 프런트엔드 개발자",
    technologies: ["Figma", "HTML", "CSS", "JavaScript"],
    outcome: "작업물과 참여자 이야기를 함께 보여주는 포트폴리오 페이지 구조를 만들었습니다.",
  },
};

let lastFocusedCard = null;

if (year) year.textContent = new Date().getFullYear();

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// 프로젝트 예시 정보를 모달에 채우고, 연 카드를 기억해 포커스를 되돌립니다.
function openProjectModal(card) {
  const project = projectDetails[card.dataset.projectId];
  if (!project) {
    console.error(`프로젝트 상세 정보를 찾을 수 없습니다: ${card.dataset.projectId}`);
    return;
  }

  modalTitle.textContent = project.name;
  modalDescription.textContent = project.description;
  modalRole.textContent = project.role;
  modalTechnologies.textContent = project.technologies.join(" · ");
  modalOutcome.textContent = project.outcome;
  lastFocusedCard = card;

  if (typeof projectModal.showModal === "function") {
    projectModal.showModal();
    modalCloseButton.focus();
  }
}

// 모달을 닫고, 닫은 뒤에는 이전에 선택한 카드로 포커스를 돌려보냅니다.
function closeProjectModal() {
  if (projectModal.open) projectModal.close();
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => openProjectModal(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectModal(card);
    }
  });
});

modalCloseButton.addEventListener("click", closeProjectModal);

projectModal.addEventListener("click", (event) => {
  if (event.target === projectModal) closeProjectModal();
});

projectModal.addEventListener("close", () => {
  lastFocusedCard?.focus();
  lastFocusedCard = null;
});

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Thank you! I'll be in touch soon.";
  contactForm.reset();
});
