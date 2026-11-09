const cards = [...document.querySelectorAll(".listing-card")];
const grid = document.getElementById("listingGrid");
const count = document.getElementById("resultCount");
const empty = document.getElementById("emptyState");
let activeType = "all";

function applyFilters() {
  const location = document.getElementById("locationInput").value.trim().toLowerCase();
  const type = document.getElementById("typeInput").value;
  const budget = document.getElementById("budgetInput").value;
  let visible = 0;
  cards.forEach(card => {
    const matchesLocation = !location || card.dataset.location.includes(location);
    const matchesType = (type === "all" || card.dataset.type === type) &&
                        (activeType === "all" || card.dataset.type === activeType);
    const matchesBudget = budget === "all" || Number(card.dataset.price) <= Number(budget);
    const show = matchesLocation && matchesType && matchesBudget;
    card.hidden = !show;
    if (show) visible++;
  });
  count.textContent = `${visible} ${visible === 1 ? "place" : "places"}`;
  empty.hidden = visible !== 0;
}
document.getElementById("searchForm").addEventListener("submit", e => { e.preventDefault(); applyFilters(); document.getElementById("accommodation").scrollIntoView({behavior:"smooth"}); });
document.getElementById("filterPills").addEventListener("click", e => {
  const button = e.target.closest("button[data-filter]");
  if (!button) return;
  activeType = button.dataset.filter;
  document.querySelectorAll(".filter-pill").forEach(p => p.classList.toggle("selected", p === button));
  applyFilters();
});
document.getElementById("clearFilters").addEventListener("click", () => {
  document.getElementById("locationInput").value = "";
  document.getElementById("typeInput").value = "all";
  document.getElementById("budgetInput").value = "all";
  activeType = "all";
  document.querySelectorAll(".filter-pill").forEach(p => p.classList.toggle("selected", p.dataset.filter === "all"));
  applyFilters();
});
document.querySelectorAll(".save-button").forEach(button => button.addEventListener("click", () => {
  button.classList.toggle("saved");
  button.textContent = button.classList.contains("saved") ? "♥" : "♡";
}));
const modal = document.getElementById("detailsModal");
function closeModal(){ modal.classList.remove("open"); modal.setAttribute("aria-hidden","true"); document.body.style.overflow=""; }
document.querySelectorAll(".details-button").forEach(button => button.addEventListener("click", () => {
  const d = button.dataset;
  document.getElementById("modalImage").src = d.image;
  document.getElementById("modalImage").alt = d.title;
  document.getElementById("modalLocation").textContent = "⌖ " + d.location + " · " + d.type;
  document.getElementById("modalTitle").textContent = d.title;
  document.getElementById("modalPrice").textContent = d.price;
  document.getElementById("modalDescription").textContent = d.description;
  document.getElementById("modalFacilities").textContent = d.facilities;
  modal.classList.add("open"); modal.setAttribute("aria-hidden","false"); document.body.style.overflow="hidden";
}));
document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalBackdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });
document.getElementById("contactOwner").addEventListener("click", closeModal);
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  document.getElementById("contactFeedback").textContent = "Thank you! This is a front-end demo, so the message has not been sent.";
  e.target.reset();
});
document.getElementById("menuToggle").addEventListener("click", () => document.getElementById("mainNav").classList.toggle("show"));
document.querySelectorAll("#mainNav a").forEach(a => a.addEventListener("click", () => document.getElementById("mainNav").classList.remove("show")));
