const DASHBOARD = Object.freeze({
  metrics: [
    { label: "Revenue focus", value: "CathedralImage", detail: "One monetizable offer system", tone: "accent" },
    { label: "Keep active", value: "3 + 2", detail: "Core plus enablement cap", tone: "accent" },
    { label: "P1 posture", value: "Contained", detail: "2 remediated · 2 lifecycle-gated", tone: "accent" },
    { label: "P2 quality wave", value: "Catalog verified", detail: "YouTube catalog pass complete", tone: "accent" },
    { label: "Idea runway", value: "Open", detail: "Capture without derailing delivery", tone: "accent" }
  ],
  revenue: [
    { number: "01", title: "Request & qualify", detail: "A church chooses the assignment and sends the smallest useful brief.", status: "Live", statusTone: "live", link: "https://www.cathedralimage.com/start.html", linkLabel: "Open request flow ↗" },
    { number: "02", title: "Curate & preview", detail: "Approved content becomes a reviewable mobile experience before launch.", status: "Operator-led", statusTone: "review", link: "https://www.cathedralimage.com/portfolio.html", linkLabel: "View proof of work ↗" },
    { number: "03", title: "Deposit", detail: "A Stripe-hosted deposit creates a clear commitment point without exposing payment data here.", status: "Ready to configure", statusTone: "review" },
    { number: "04", title: "Launch & handoff", detail: "Written approval and paid state precede publishing, transfer, and domain handoff.", status: "Guarded", statusTone: "guarded" },
    { number: "05", title: "Monthly care", detail: "Updates turn a one-time mini-site into a useful continuing relationship.", status: "Live path", statusTone: "live", link: "https://www.cathedralimage.com/care.html", linkLabel: "Open care path ↗" }
  ],
  cleanup: [
    { phase: "P0", title: "Credential rotation", detail: "Tavily and Gmail OAuth rotation are complete and verified; shared-history purge remains a separate decision.", status: "Contained", tone: "live" },
    { phase: "P1", title: "Public control surface", detail: "The dashboard is read-only and no longer exposes private filesystem paths, credentials, or editable operational data.", status: "Released", tone: "live" },
    { phase: "P1", title: "Deployment triage", detail: "Lead scraper and AI Chief of Staff are remediated; site-generation and source have no active alias or deployment. Archive remains owner-gated.", status: "Contained", tone: "live" },
    { phase: "P2", title: "Portfolio quality", detail: "YouTube catalog quality pass is verified; remaining projects follow by evidence and score. Return to inactive Vercel project records after this wave.", status: "Catalog verified", tone: "accent" }
  ],
  triage: [
    { category: "Core", name: "CathedralImage", focus: "Primary ministry mini-site offer", score: 20, lane: "Keep", tone: "live", reason: "Direct revenue path, active production, and the main monetization objective." },
    { category: "Core", name: "Control Center", focus: "Portfolio operating view", score: 19, lane: "Keep", tone: "live", reason: "Single control plane for cleanup, revenue, and portfolio decisions." },
    { category: "Core", name: "IdeaForge", focus: "Gated idea intake", score: 18, lane: "Keep", tone: "live", reason: "Keeps new ideas open while protecting CathedralImage focus." },
    { category: "Enablement", name: "Client-intake-doc-generator", focus: "Delivery document automation", score: 16, lane: "Maintain", tone: "review", reason: "Reduces delivery friction; keep if it is used in current client work." },
    { category: "Enablement", name: "Voice receptionist", focus: "Lead qualification and intake", score: 14, lane: "Maintain", tone: "review", reason: "Potential revenue support; require a measurable lead or booking path." },
    { category: "Enablement", name: "Audit / lead pipeline", focus: "Research and acquisition tooling", score: 13, lane: "Maintain", tone: "review", reason: "Useful for active campaigns, but should not become an always-on build." },
    { category: "Asset", name: "YouTube subscription catalog", focus: "Research catalog utility", score: 11, lane: "Maintain", tone: "review", reason: "Source-backed utility; keep only while it serves a current research workflow." },
    { category: "Asset", name: "CathedralImage market research", focus: "Research and proof asset", score: 11, lane: "Maintain", tone: "review", reason: "Supports the core offer as reference material, not as a separate product build." },
    { category: "Seasonal", name: "Holy Convocation itinerary", focus: "Event ministry asset", score: 10, lane: "Maintain", tone: "review", reason: "Keep through the event lifecycle, then archive with recovery retained." },
    { category: "Source matched", name: "Orbit Hub / link hub", focus: "Agency navigation", score: 10, lane: "Validate", tone: "review", reason: "Keep only one canonical agency hub; compare against the duplicate below." },
    { category: "Source matched", name: "Vidmine", focus: "Media utility", score: 9, lane: "Validate", tone: "review", reason: "Source exists, but current usage and revenue contribution are not yet evidenced." },
    { category: "Source matched", name: "Caldrive", focus: "Calendar utility", score: 9, lane: "Validate", tone: "review", reason: "Source exists, but current usage and ownership priority need confirmation." },
    { category: "Source matched", name: "Cimedia Rebrand", focus: "Brand project", score: 9, lane: "Validate", tone: "review", reason: "Retain if it supports current positioning; otherwise move to reference status." },
    { category: "Utility", name: "NC Real ID checklist", focus: "Standalone checklist", score: 8, lane: "Pause", tone: "planned", reason: "Working utility, but no current monetization or distribution evidence." },
    { category: "Utility", name: "Anti-mediacreator dashboard", focus: "Private digest/dashboard", score: 8, lane: "Pause", tone: "planned", reason: "Public auth gate exists, but source and owner identity remain ambiguous." },
    { category: "Snapshot", name: "Catalog-build", focus: "Snapshot-backed catalog", score: 7, lane: "Pause", tone: "planned", reason: "Useful only if the live data feed is needed; otherwise consolidate with the catalog asset." },
    { category: "Proposal", name: "Media Command Center", focus: "System proposal / portfolio asset", score: 7, lane: "Pause", tone: "planned", reason: "Keep as a proposal reference, not an active engineering commitment." },
    { category: "Campaign", name: "Lead scraper report", focus: "Public research brief", score: 9, lane: "Maintain", tone: "review", reason: "Now publication-safe; activate only for a defined acquisition campaign." },
    { category: "Duplicate", name: "Agency Linktree", focus: "Likely duplicate agency hub", score: 4, lane: "Consolidate", tone: "critical", reason: "Likely overlaps Orbit Hub; choose one canonical destination before more work." },
    { category: "Unfinished", name: "Site", focus: "SanctuaryStudio-style landing page", score: 4, lane: "Pause", tone: "critical", reason: "Incomplete legal links, zero proof metrics, and mailto-only conversion path." },
    { category: "Orphaned", name: "Site-generation", focus: "Unmapped Vercel project", score: 2, lane: "Archive gate", tone: "review", reason: "No alias, latest deployment, or production URL remains; no exact source match. Preserve until the owner approves archival." },
    { category: "Unmapped", name: "Source", focus: "Unmapped Vercel project", score: 2, lane: "Archive gate", tone: "review", reason: "No alias, latest deployment, or production URL remains. source.vercel.app is unrelated to this team; no exact source match. Preserve until owner approval." },
    { category: "Sensitive", name: "AI Chief of Staff", focus: "Institutional FX/AI report", score: 4, lane: "Archive gate", tone: "critical", reason: "Public content is gated; no connected Git source and no active product case." }
  ],
  ideas: [
    { stage: "Captured", description: "A useful possibility is recorded without interrupting the committed build.", examples: ["New ministry mini-site format", "Automation improvement"] },
    { stage: "Clarified", description: "The user, problem, outcome, and smallest useful version are named.", examples: ["Who benefits?", "What changes in 14 days?"] },
    { stage: "Tested", description: "Evidence, demand, feasibility, and revenue fit are checked.", examples: ["Existing asset reuse", "Paid path or strategic value"] },
    { stage: "V1 defined", description: "A narrow build has an owner, acceptance criteria, and a stop rule.", examples: ["One route", "One proof point"] },
    { stage: "Ready", description: "Capacity exists and the idea earns a place beside CathedralImage work.", examples: ["Build window", "Launch / learn / decide"] }
  ],
  workstreams: [
    { name: "CathedralImage mini-sites", status: "Revenue focus", tone: "live", next: "Confirm offer terms and configure payment products only after pricing and production credentials are intentionally approved.", links: [{ label: "Production site", href: "https://www.cathedralimage.com/" }, { label: "Request flow", href: "https://www.cathedralimage.com/start.html" }] },
    { name: "Control center", status: "Live", tone: "live", next: "Live on Vercel; triage view now shows the recommended keep, maintain, pause, and archive-gate lanes.", links: [] },
    { name: "Workspace security", status: "Contained", tone: "live", next: "Tavily and Gmail OAuth rotation are verified. Defer shared-history rewrite until separately approved.", links: [] },
    { name: "P1 deployment review", status: "Contained", tone: "live", next: "Public runtime risk is contained. Preserve site-generation and source records; return to the Vercel project records after the P2 quality wave, then archive only after explicit owner approval and rollback confirmation.", links: [] },
    { name: "P2 quality wave", status: "Catalog verified", tone: "live", next: "YouTube Research Catalog passed live interaction, responsive, API, metadata, 404, runtime, test, and production-build checks. Continue through the remaining P2 queue next.", links: [{ label: "Open catalog", href: "https://youtube-subscription-catalog.vercel.app/" }] },
    { name: "New ideas", status: "Open runway", tone: "planned", next: "Capture ideas in the pipeline, then advance only the ones with a clear user, evidence, V1, and revenue or strategic case.", links: [{ label: "Idea lab", href: "https://idea-forge-wheat.vercel.app/" }] }
  ]
});

function make(tag, className, content) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content !== undefined) node.textContent = content;
  return node;
}

function addLink(parent, href, label, className = "text-link") {
  const link = document.createElement("a");
  link.className = className;
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = label;
  parent.append(link);
}

function renderMetrics() {
  const root = document.querySelector("#metrics");
  DASHBOARD.metrics.forEach((metric) => {
    const card = make("article", `metric-card ${metric.tone}`);
    card.append(make("span", "metric-label", metric.label), make("strong", "metric-value", metric.value), make("span", "metric-detail", metric.detail));
    root.append(card);
  });
}

function renderRevenue() {
  const root = document.querySelector("#revenue-grid");
  DASHBOARD.revenue.forEach((stage) => {
    const card = make("article", "revenue-card");
    const top = make("div", "card-top");
    top.append(make("span", "step-number", stage.number), make("span", `state-pill ${stage.statusTone}`, stage.status));
    card.append(top, make("h3", null, stage.title), make("p", null, stage.detail));
    if (stage.link) addLink(card, stage.link, stage.linkLabel);
    root.append(card);
  });
}

function renderCleanup() {
  const root = document.querySelector("#cleanup-grid");
  DASHBOARD.cleanup.forEach((item) => {
    const card = make("article", `cleanup-card ${item.tone}`);
    const top = make("div", "card-top");
    top.append(make("span", "phase-label", item.phase), make("span", `state-pill ${item.tone}`, item.status));
    card.append(top, make("h3", null, item.title), make("p", null, item.detail));
    root.append(card);
  });
}

function renderTriage() {
  const root = document.querySelector("#triage-grid");
  DASHBOARD.triage.forEach((item) => {
    const card = make("article", `triage-card ${item.tone}`);
    const top = make("div", "card-top");
    const score = make("span", "triage-score", `${item.score}/21`);
    top.append(make("span", "triage-category", item.category), score);
    card.append(top, make("h3", null, item.name), make("p", "triage-focus", item.focus));
    card.append(make("span", `state-pill ${item.tone}`, item.lane), make("p", "triage-reason", item.reason));
    root.append(card);
  });
}

function renderIdeas() {
  const root = document.querySelector("#idea-grid");
  DASHBOARD.ideas.forEach((idea, index) => {
    const card = make("article", "idea-card");
    card.append(make("span", "idea-index", String(index + 1).padStart(2, "0")), make("h3", null, idea.stage), make("p", null, idea.description));
    const list = make("ul", "mini-list");
    idea.examples.forEach((example) => list.append(make("li", null, example)));
    card.append(list);
    root.append(card);
  });
}

function renderWorkstreams() {
  const root = document.querySelector("#workstream-list");
  DASHBOARD.workstreams.forEach((workstream) => {
    const card = make("article", "workstream-card");
    const header = make("div", "workstream-header");
    const title = make("div");
    title.append(make("h3", null, workstream.name), make("span", `state-pill ${workstream.tone}`, workstream.status));
    header.append(title);
    card.append(header, make("p", null, workstream.next));
    if (workstream.links.length) {
      const links = make("div", "workstream-links");
      workstream.links.forEach((item) => addLink(links, item.href, item.label));
      card.append(links);
    }
    root.append(card);
  });
}

function init() {
  renderMetrics();
  renderRevenue();
  renderCleanup();
  renderTriage();
  renderIdeas();
  renderWorkstreams();
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
else init();
