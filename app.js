// Aether Pipeline - Project State & Interactions Engine

// Default pre-seeded database
const DEFAULT_PROJECTS = [
  {
    id: "christmas-gift-advisor",
    name: "christmas_gift_advisor",
    path: "C:\\Users\\Augustus\\Downloads\\Pamela Duffis video\\christmas_gift_advisor",
    status: "active",
    value: 45000,
    health: "green",
    docUrl: "https://docs.google.com/document/d/1DqKWz_s1cM2MOfQpMzqZTwtYycdisfhC/edit",
    backlog: [
      { text: "Deploy Version 2 Paid Upsell Paywall", completed: false },
      { text: "Optimize image generation with Imagen 3", completed: true },
      { text: "Implement leads CSV export panel", completed: false }
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: "bahamas-promo-web",
    name: "bahamas_promo_web",
    path: "C:\\Users\\Augustus\\Downloads\\Pamela Duffis video\\bahamas_promo_web",
    status: "deployed",
    value: 30000,
    health: "green",
    docUrl: "https://docs.google.com/document/d/1DqKWz_s1cM2MOfQpMzqZTwtYycdisfhC/edit",
    backlog: [
      { text: "Configure custom HTML5 video controls", completed: true },
      { text: "Integrate byte-range requests for seeking", completed: true },
      { text: "Upload final video package to Drive", completed: true }
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: "skill-discovery-service",
    name: "agent_skill_discovery_service",
    path: "H:\\Anti-mediacreator\\agent_skill_discovery_service.py",
    status: "deployed",
    value: 25000,
    health: "green",
    docUrl: "https://docs.google.com/document/d/1DqKWz_s1cM2MOfQpMzqZTwtYycdisfhC/edit",
    backlog: [
      { text: "Filter out non-design skills", completed: true },
      { text: "Add a custom scheduled frequency selector", completed: false },
      { text: "Log run statistics in discovered_skills.json", completed: true }
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: "cimedia-landing-page",
    name: "cimedia-landing-page",
    path: "C:\\Users\\Augustus\\cimedia-landing-page",
    status: "deployed",
    value: 60000,
    health: "green",
    docUrl: "",
    backlog: [
      { text: "Setup active contact forms", completed: true },
      { text: "Improve loading speed", completed: false }
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: "agency-linktree",
    name: "agency-linktree",
    path: "C:\\Users\\Augustus\\agency-linktree",
    status: "deployed",
    value: 15000,
    health: "green",
    docUrl: "",
    backlog: [
      { text: "Sync social link API updates", completed: true }
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: "gumroad-webhook-deploy",
    name: "GumroadWebhookDeploy",
    path: "C:\\Users\\Augustus\\GumroadWebhookDeploy",
    status: "deployed",
    value: 35000,
    health: "yellow",
    docUrl: "",
    backlog: [
      { text: "Test transaction webhooks", completed: true },
      { text: "Add logs monitor dashboard", completed: false }
    ],
    updatedAt: new Date().toISOString()
  },
  {
    id: "kraken-deck",
    name: "kraken-deck",
    path: "C:\\Users\\Augustus\\kraken-deck",
    status: "deployed",
    value: 50000,
    health: "green",
    docUrl: "",
    backlog: [
      { text: "Refine deck slider navigation", completed: true }
    ],
    updatedAt: new Date().toISOString()
  }
];

let projects = [];
let activeProjectId = null;
let currentFilter = "all";

// DOM Elements
const viewBoard = document.getElementById("view-board");
const viewAdd = document.getElementById("view-add");
const viewStats = document.getElementById("view-stats");
const navItems = document.querySelectorAll(".mobile-nav .nav-item");
const tabViews = document.querySelectorAll(".tab-view");

// LocalStorage Integration
function loadProjects() {
  const data = localStorage.getItem("aether_pipeline_projects");
  if (data) {
    try {
      projects = jsonParseDates(JSON.parse(data));
    } catch (e) {
      projects = [...DEFAULT_PROJECTS];
    }
  } else {
    projects = [...DEFAULT_PROJECTS];
    saveProjects();
  }
}

function saveProjects() {
  localStorage.setItem("aether_pipeline_projects", JSON.stringify(projects));
}

// Helpers to handle date strings
function jsonParseDates(arr) {
  return arr.map(p => ({
    ...p,
    updatedAt: new Date(p.updatedAt).toISOString()
  }));
}

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  loadProjects();
  setupNavigation();
  setupKanbanFilters();
  setupAddProjectForm();
  setupDrawerListeners();
  renderDashboard();
});

// 1. Navigation Controller (Tabs)
function setupNavigation() {
  // Mobile Tab bar
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      
      const tabId = item.getAttribute("data-tab");
      switchTab(tabId);
    });
  });
}

function switchTab(tabId) {
  tabViews.forEach(view => {
    if (view.id === tabId) {
      view.classList.add("active");
    } else {
      view.classList.remove("active");
    }
  });
  
  // Refresh views specifically on tab changes
  if (tabId === "view-board") {
    renderKanban();
  } else if (tabId === "view-stats") {
    renderStats();
  }
  
  // Recalculate summary metrics always
  calculateMetrics();
}

// 2. Metrics Calculator
function calculateMetrics() {
  // Active = scoping, active, qa
  const activeBuilds = projects.filter(p => ["scoping", "active", "qa"].includes(p.status));
  document.getElementById("val-active-count").innerText = activeBuilds.length;
  
  // Pipeline Revenue = sum of non-complete
  const pipelineRevenue = projects
    .filter(p => p.status !== "deployed")
    .reduce((sum, p) => sum + (Number(p.value) || 0), 0);
  
  document.getElementById("val-pipeline-rev").innerText = "$" + pipelineRevenue.toLocaleString();
  
  // Attention = Health Red
  const blockedProjects = projects.filter(p => p.health === "red");
  document.getElementById("val-alert-count").innerText = blockedProjects.length;
  
  // Engine Load = active count / 5 * 100 (capped at 100)
  // Or weighted load
  let loadScore = 0;
  projects.forEach(p => {
    if (p.status === "active") loadScore += 25;
    else if (p.status === "qa") loadScore += 15;
    else if (p.status === "scoping") loadScore += 10;
  });
  const capPct = Math.min(loadScore, 100);
  document.getElementById("val-capacity-pct").innerText = capPct + "%";
  document.getElementById("val-capacity-bar").style.width = capPct + "%";
}

// 3. Kanban Filters
function setupKanbanFilters() {
  const filterBtns = document.querySelectorAll(".view-filters .btn-filter");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      renderKanban();
    });
  });
}

// 4. Kanban Rendering
function renderKanban() {
  const stages = ["proposal", "scoping", "active", "qa", "deployed"];
  
  // Clear lists
  stages.forEach(stage => {
    document.getElementById(`list-${stage}`).innerHTML = "";
  });
  
  // Filter and populate
  const filteredProjects = projects.filter(p => {
    if (currentFilter === "all") return true;
    if (currentFilter === "active") return ["scoping", "active", "qa"].includes(p.status);
    if (currentFilter === "production") return p.status === "deployed";
    if (currentFilter === "future") return p.status === "proposal";
    return true;
  });
  
  // Count counts per stage
  const counts = { proposal: 0, scoping: 0, active: 0, qa: 0, deployed: 0 };
  
  filteredProjects.forEach(proj => {
    counts[proj.status]++;
    const card = createProjectCard(proj);
    const container = document.getElementById(`list-${proj.status}`);
    if (container) {
      container.appendChild(card);
    }
  });
  
  // Render count badges
  stages.forEach(stage => {
    document.getElementById(`count-${stage}`).innerText = counts[stage];
  });
}

function createProjectCard(proj) {
  const card = document.createElement("div");
  card.className = "project-card";
  card.setAttribute("data-id", proj.id);
  
  // Format budget
  const valDisplay = proj.value ? "$" + Number(proj.value).toLocaleString() : "$0";
  
  // Status text display
  const statusLabels = {
    proposal: "Proposal",
    scoping: "Scoping",
    active: "Active Build",
    qa: "QA",
    deployed: "Deployed"
  };
  
  const statusLabel = statusLabels[proj.status] || proj.status;
  
  // Check backlog completed ratio
  const completedCount = proj.backlog.filter(b => b.completed).length;
  const totalCount = proj.backlog.length;
  const backlogText = totalCount > 0 ? `${completedCount}/${totalCount} Tasks` : "No Tasks";
  
  card.innerHTML = `
    <div class="card-title-row">
      <h4>${proj.name}</h4>
      <span class="badge-status ${proj.status}">${statusLabel}</span>
    </div>
    <span class="card-path" title="${proj.path}">${proj.path}</span>
    <div class="card-footer">
      <span class="card-val">${valDisplay}</span>
      <div class="card-meta">
        <span class="backlog-pill">${backlogText}</span>
        <span class="health-dot ${proj.health}"></span>
      </div>
    </div>
  `;
  
  card.addEventListener("click", () => {
    openProjectDetails(proj.id);
  });
  
  return card;
}

// 5. Drawer Controller (Project Details Modal)
const drawerOverlay = document.getElementById("detail-drawer");
const btnCloseDrawer = document.getElementById("btn-close-drawer");

function setupDrawerListeners() {
  btnCloseDrawer.addEventListener("click", closeDrawer);
  
  // Close on backdrop tap
  drawerOverlay.addEventListener("click", (e) => {
    if (e.target === drawerOverlay) {
      closeDrawer();
    }
  });
  
  // Select updates
  document.getElementById("edit-proj-status").addEventListener("change", (e) => {
    if (activeProjectId) {
      updateProjectField(activeProjectId, "status", e.target.value);
    }
  });
  
  document.getElementById("edit-proj-health").addEventListener("change", (e) => {
    if (activeProjectId) {
      updateProjectField(activeProjectId, "health", e.target.value);
    }
  });
  
  document.getElementById("edit-proj-value").addEventListener("input", (e) => {
    if (activeProjectId) {
      updateProjectField(activeProjectId, "value", Number(e.target.value) || 0);
    }
  });
  
  document.getElementById("edit-proj-doc").addEventListener("input", (e) => {
    if (activeProjectId) {
      const url = e.target.value.strip ? e.target.value.strip() : e.target.value.trim();
      updateProjectField(activeProjectId, "docUrl", url);
      
      const docLinkEl = document.getElementById("btn-open-doc");
      if (url) {
        docLinkEl.href = url;
        docLinkEl.style.display = "flex";
      } else {
        docLinkEl.style.display = "none";
      }
    }
  });
  
  // Add backlog item
  const btnAddBacklog = document.getElementById("btn-add-backlog-item");
  const backlogEntryArea = document.getElementById("backlog-add-entry-row");
  const btnSaveBacklog = document.getElementById("btn-save-new-backlog-item");
  const newBacklogInput = document.getElementById("new-backlog-text");
  
  btnAddBacklog.addEventListener("click", () => {
    backlogEntryArea.style.display = "flex";
    newBacklogInput.focus();
  });
  
  btnSaveBacklog.addEventListener("click", () => {
    const text = newBacklogInput.value.trim();
    if (text && activeProjectId) {
      addBacklogItem(activeProjectId, text);
      newBacklogInput.value = "";
      backlogEntryArea.style.display = "none";
    }
  });
  
  newBacklogInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      btnSaveBacklog.click();
    }
  });
  
  // Delete project button
  document.getElementById("btn-delete-project").addEventListener("click", () => {
    if (activeProjectId) {
      const proj = projects.find(p => p.id === activeProjectId);
      const confirmDelete = confirm(`Are you sure you want to delete the project "${proj.name}"?`);
      if (confirmDelete) {
        deleteProject(activeProjectId);
        closeDrawer();
      }
    }
  });
}

function openProjectDetails(id) {
  activeProjectId = id;
  const proj = projects.find(p => p.id === id);
  if (!proj) return;
  
  // Populate drawer elements
  document.getElementById("drawer-proj-name").innerText = proj.name;
  document.getElementById("drawer-proj-path").innerText = proj.path;
  
  document.getElementById("edit-proj-status").value = proj.status;
  document.getElementById("edit-proj-health").value = proj.health;
  document.getElementById("edit-proj-value").value = proj.value || "";
  
  const docUrl = proj.docUrl || "";
  document.getElementById("edit-proj-doc").value = docUrl;
  
  const docLinkEl = document.getElementById("btn-open-doc");
  if (docUrl) {
    docLinkEl.href = docUrl;
    docLinkEl.style.display = "flex";
  } else {
    docLinkEl.style.display = "none";
  }
  
  // Close add-backlog input if open
  document.getElementById("backlog-add-entry-row").style.display = "none";
  document.getElementById("new-backlog-text").value = "";
  
  renderDrawerBacklog(proj.backlog);
  
  // Open Sheet
  drawerOverlay.classList.add("active");
}

function closeDrawer() {
  drawerOverlay.classList.remove("active");
  activeProjectId = null;
  renderDashboard();
}

function renderDrawerBacklog(backlog) {
  const container = document.getElementById("backlog-items-container");
  container.innerHTML = "";
  
  if (backlog.length === 0) {
    container.innerHTML = `<div class="metric-trend" style="text-align:center; padding:10px 0;">No backlog items. Click "Add Item" above.</div>`;
    return;
  }
  
  backlog.forEach((item, idx) => {
    const row = document.createElement("div");
    row.className = "backlog-item-row";
    
    const checkedClass = item.completed ? "checked" : "";
    
    row.innerHTML = `
      <div class="chk-backlog ${checkedClass}" data-idx="${idx}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <span class="backlog-text ${checkedClass}">${item.text}</span>
      <button class="btn-del-backlog" data-idx="${idx}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6"/>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
        </svg>
      </button>
    `;
    
    // Checkbox toggle
    row.querySelector(".chk-backlog").addEventListener("click", () => {
      toggleBacklogItem(activeProjectId, idx);
    });
    
    // Delete button
    row.querySelector(".btn-del-backlog").addEventListener("click", () => {
      removeBacklogItem(activeProjectId, idx);
    });
    
    container.appendChild(row);
  });
}

// Update operations
function updateProjectField(id, field, value) {
  const proj = projects.find(p => p.id === id);
  if (proj) {
    proj[field] = value;
    proj.updatedAt = new Date().toISOString();
    saveProjects();
  }
}

function addBacklogItem(id, text) {
  const proj = projects.find(p => p.id === id);
  if (proj) {
    proj.backlog.push({ text: text, completed: false });
    proj.updatedAt = new Date().toISOString();
    saveProjects();
    renderDrawerBacklog(proj.backlog);
  }
}

function toggleBacklogItem(id, idx) {
  const proj = projects.find(p => p.id === id);
  if (proj && proj.backlog[idx]) {
    proj.backlog[idx].completed = !proj.backlog[idx].completed;
    proj.updatedAt = new Date().toISOString();
    saveProjects();
    renderDrawerBacklog(proj.backlog);
  }
}

function removeBacklogItem(id, idx) {
  const proj = projects.find(p => p.id === id);
  if (proj && proj.backlog[idx]) {
    proj.backlog.splice(idx, 1);
    proj.updatedAt = new Date().toISOString();
    saveProjects();
    renderDrawerBacklog(proj.backlog);
  }
}

function deleteProject(id) {
  projects = projects.filter(p => p.id !== id);
  saveProjects();
}

// 6. Form Submission (Add Build Tab)
function setupAddProjectForm() {
  const form = document.getElementById("project-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const name = document.getElementById("proj-name").value.trim();
    const path = document.getElementById("proj-path").value.trim();
    const status = document.getElementById("proj-status").value;
    const value = Number(document.getElementById("proj-value").value) || 0;
    const docUrl = document.getElementById("proj-doc").value.trim();
    const backlogText = document.getElementById("proj-backlog").value;
    
    // Parse backlog lines
    const backlog = backlogText
      .split("\n")
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => ({ text: line, completed: false }));
      
    // Generate simple slug ID from name
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    
    const newProj = {
      id: id,
      name: name,
      path: path,
      status: status,
      value: value,
      health: "green",
      docUrl: docUrl,
      backlog: backlog,
      updatedAt: new Date().toISOString()
    };
    
    // Check duplication
    if (projects.find(p => p.id === id)) {
      alert("A project with a similar name already exists.");
      return;
    }
    
    projects.push(newProj);
    saveProjects();
    
    // Reset and switch view
    form.reset();
    
    // Switch navigation active states
    navItems.forEach(i => i.classList.remove("active"));
    document.querySelector("[data-tab='view-board']").classList.add("active");
    switchTab("view-board");
  });
}

// 7. Render Stats View (Charts)
function renderStats() {
  // 1. Donut Chart update
  const totalCount = projects.length;
  document.getElementById("chart-total-count").innerText = totalCount;
  
  const greenCount = projects.filter(p => p.health === "green").length;
  const yellowCount = projects.filter(p => p.health === "yellow").length;
  const redCount = projects.filter(p => p.health === "red").length;
  
  // Set legend labels
  document.getElementById("lbl-cnt-green").innerText = greenCount;
  document.getElementById("lbl-cnt-yellow").innerText = yellowCount;
  document.getElementById("lbl-cnt-red").innerText = redCount;
  
  // Donut conic gradient percentages
  const donutEl = document.getElementById("chart-health-donut");
  if (totalCount > 0) {
    const greenPct = (greenCount / totalCount) * 100;
    const yellowPct = (yellowCount / totalCount) * 100;
    const redPct = (redCount / totalCount) * 100;
    
    const degGreen = (greenPct / 100) * 360;
    const degYellow = ((greenPct + yellowPct) / 100) * 360;
    
    donutEl.style.background = `conic-gradient(
      var(--state-green) 0deg ${degGreen}deg, 
      var(--state-yellow) ${degGreen}deg ${degYellow}deg, 
      var(--state-red) ${degYellow}deg 360deg
    )`;
  } else {
    donutEl.style.background = "var(--border-glass)";
  }
  
  // 2. Bar Chart value distribution by stage
  const stages = ["proposal", "scoping", "active", "qa", "deployed"];
  const stageLabels = {
    proposal: "Proposal",
    scoping: "Scoping",
    active: "Active Build",
    qa: "QA Review",
    deployed: "Deployed"
  };
  
  const values = { proposal: 0, scoping: 0, active: 0, qa: 0, deployed: 0 };
  projects.forEach(p => {
    values[p.status] += (Number(p.value) || 0);
  });
  
  const maxVal = Math.max(...Object.values(values), 1); // Avoid division by zero
  
  const barContainer = document.getElementById("bar-chart-container");
  barContainer.innerHTML = "";
  
  stages.forEach(stage => {
    const val = values[stage];
    const pct = (val / maxVal) * 100;
    const valDisplay = "$" + val.toLocaleString();
    
    const row = document.createElement("div");
    row.className = "chart-bar-row";
    row.innerHTML = `
      <div class="bar-row-label">
        <span>${stageLabels[stage]}</span>
        <span class="bar-val-total">${valDisplay}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width: ${pct}%;"></div>
      </div>
    `;
    barContainer.appendChild(row);
  });
}

// 8. General Render Coordinator
function renderDashboard() {
  calculateMetrics();
  renderKanban();
}
