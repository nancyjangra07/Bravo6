// Show sections
function showSection(section) {
  document.querySelectorAll(".section").forEach(sec => {
    sec.classList.add("hidden");
  });
  document.getElementById(section).classList.remove("hidden");
}

// Add profile
function addProfile() {
  const profile = {
    name: document.getElementById("name").value,
    role: document.getElementById("role").value,
    skills: document.getElementById("skills").value.split(","),
    bio: document.getElementById("bio").value
  };

  profiles.push(profile);
  alert("Profile added!");

  renderProfiles();
  showSection("browse");
}

// Render profiles
function renderProfiles(list = profiles) {
  const container = document.getElementById("profiles");
  container.innerHTML = "";

  list.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${p.name}</h3>
      <p><b>${p.role}</b></p>
      <p>${p.bio}</p>
      <div class="skills">
        ${p.skills.map(s => `<span>${s.trim()}</span>`).join("")}
      </div>
    `;

    container.appendChild(div);
  });
}

// Filter profiles
function filterProfiles() {
  const query = document.getElementById("search").value.toLowerCase();

  const filtered = profiles.filter(p =>
    p.skills.some(skill => skill.toLowerCase().includes(query))
  );

  renderProfiles(filtered);
}

// Initial render
renderProfiles();


