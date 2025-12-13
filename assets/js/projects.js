document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const noProjectsMessage = document.getElementById("noProjects");
  const projectsContainer = document.getElementById("projectsContainer");
  const saveButtons = document.querySelectorAll(".action-btn.save");
  const shareButtons = document.querySelectorAll(".action-btn.share");

  let visibleProjects = 20;
  const totalProjects = projectCards.length;

  // Initialize: Show projects
  projectCards.forEach((card, index) => {
    if (index >= visibleProjects) {
      card.style.display = "none";
    }
  });

  // Filter projects
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const filterValue = this.getAttribute("data-filter");
      let visibleCount = 0;

      // Filter and show projects
      projectCards.forEach((card, index) => {
        const category = card.getAttribute("data-category");

        if (filterValue === "all" || category === filterValue) {
          if (index < visibleProjects) {
            card.style.display = "block";
            visibleCount++;
          } else {
            card.style.display = "none";
          }
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Save button functionality
  saveButtons.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");
      const icon = this.querySelector("i");

      if (this.classList.contains("active")) {
        icon.classList.remove("far", "fa-bookmark");
        icon.classList.add("fas", "fa-bookmark");
      } else {
        icon.classList.remove("fas", "fa-bookmark");
        icon.classList.add("far", "fa-bookmark");
      }
    });
  });

  // Share button functionality
  shareButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const projectCard = this.closest(".project-card");
      const projectTitle =
        projectCard.querySelector(".project-title").textContent;
      const projectImage = projectCard.querySelector(".project-img").src;

      // Create share modal or use Web Share API if available
      if (navigator.share) {
        navigator.share({
          title: projectTitle,
          text: "Check out this amazing project by Casa Decor",
          url: window.location.href,
        });
      } else {
        // Fallback: Copy link to clipboard
        const tempInput = document.createElement("input");
        document.body.appendChild(tempInput);
        tempInput.value = window.location.href;
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);

        showNotification("Link copied to clipboard!");
      }
    });
  });
});
