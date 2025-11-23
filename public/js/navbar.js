document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const overlay = document.querySelector(".overlay");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    menuToggle.textContent = navLinks.classList.contains("active") ? "✖" : "☰";
  });

  overlay.addEventListener("click", () => {
    navLinks.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
    menuToggle.textContent = "☰";
  });
});
