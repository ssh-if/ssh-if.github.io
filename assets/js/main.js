/**
 * 简历网站渲染与交互
 * 所有内容来自 data.js 中的 RESUME 对象，这里只负责渲染与交互。
 */

(function () {
  "use strict";

  if (typeof RESUME === "undefined") {
    console.error("未找到 RESUME 数据，请确认 data.js 已正确加载。");
    return;
  }

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /** 转义 HTML，避免配置里的特殊字符破坏结构 */
  function esc(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  const icon = (name, cls = "") =>
    `<svg class="${cls}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

  /* ---------------- 填充基础信息 ---------------- */
  function fillMeta() {
    const m = RESUME.meta;

    $$("[data-name]").forEach((el) => (el.textContent = m.name));
    $$("[data-name-en]").forEach((el) => (el.textContent = m.nameEn));
    $$("[data-initials], [data-logo]").forEach((el) => (el.textContent = m.initials));
    $$("[data-role]").forEach((el) => (el.textContent = m.role));
    $$("[data-availability]").forEach((el) => (el.textContent = m.availability));
    $$("[data-location]").forEach((el) => (el.textContent = m.location));
    $$("[data-email]").forEach((el) => (el.textContent = m.email));
    $$("[data-phone]").forEach((el) => (el.textContent = m.phone));
    $$("[data-intro]").forEach((el) => (el.textContent = m.intro));
    $$("[data-status]").forEach((el) => (el.textContent = RESUME.heroCard.status));
    $$("[data-highlight]").forEach((el) => (el.textContent = RESUME.heroCard.highlight));
    $$("[data-footer-note]").forEach((el) => (el.textContent = RESUME.footer.note));

    document.title = m.siteName;

    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", `${m.name} — ${m.role}。${m.intro}`);

    const yearEl = $("#year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // 社交图标：未配置时直接隐藏相关区块
    const socials = $("#heroSocials");
    const hasSocials = Array.isArray(m.socials) && m.socials.length > 0;

    if (socials) {
      if (hasSocials) {
        socials.innerHTML = m.socials
          .map(
            (s) =>
              `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(
                s.label
              )}" title="${esc(s.label)}">${icon(s.icon)}</a>`
          )
          .join("");
      } else {
        socials.remove();
      }
    }

    const inline = $("#socialInline");
    if (inline) {
      if (hasSocials) {
        inline.textContent = m.socials.map((s) => s.label).join(" / ");
      } else {
        const row = inline.closest(".contact-row");
        if (row) row.remove();
      }
    }

    // 邮箱按钮
    const mailto = `mailto:${m.email}?subject=${encodeURIComponent(
      "来自个人简历网站的沟通"
    )}`;
    ["#mailBtn", "#mailRow"].forEach((sel) => {
      const el = $(sel);
      if (el) el.href = mailto;
    });

    // 有 PDF 才显示下载按钮
    const pdfBtn = $("#downloadResume");
    if (pdfBtn && m.resumePdf) {
      pdfBtn.href = m.resumePdf;
      pdfBtn.hidden = false;
    }
  }

  /* ---------------- 首屏名片指标 + 数据条 ---------------- */
  function renderHeroMetrics() {
    const wrap = $("#heroMetrics");
    if (!wrap) return;
    wrap.innerHTML = RESUME.heroCard.metrics
      .map((item) => `<div><b>${esc(item.value)}</b><small>${esc(item.label)}</small></div>`)
      .join("");
  }

  function renderStats() {
    const wrap = $("#statsStrip");
    if (!wrap) return;
    wrap.innerHTML = RESUME.stats
      .map(
        (s, i) =>
          `<div class="stat-item reveal" style="--delay:${i * 70}ms">
             <span class="stat-value">${esc(s.value)}</span>
             <span class="stat-label">${esc(s.label)}</span>
           </div>`
      )
      .join("");
  }

  /* ---------------- 关于我 ---------------- */
  function renderAbout() {
    const text = $("#aboutText");
    if (text) {
      text.innerHTML = RESUME.about.paragraphs
        .map((p, i) => `<p class="reveal" style="--delay:${i * 90}ms">${esc(p)}</p>`)
        .join("");
    }

    const facts = $("#aboutFacts");
    if (facts) {
      facts.innerHTML = RESUME.about.facts
        .map(
          (f) =>
            `<div class="fact-row"><span>${esc(f.label)}</span><strong>${esc(
              f.value
            )}</strong></div>`
        )
        .join("");
    }
  }

  /* ---------------- 技能 ---------------- */
  function renderSkills() {
    const wrap = $("#skillsGrid");
    if (!wrap) return;
    wrap.innerHTML = RESUME.skills
      .map(
        (group, i) => `
        <article class="skill-card reveal" style="--delay:${i * 80}ms">
          <div class="skill-head">
            <span class="skill-icon">${icon(group.icon)}</span>
            <div>
              <h3>${esc(group.title)}</h3>
              <p>${esc(group.desc)}</p>
            </div>
          </div>
          <div class="skill-tags">
            ${group.items.map((item) => `<span class="skill-tag">${esc(item)}</span>`).join("")}
          </div>
        </article>`
      )
      .join("");
  }

  /* ---------------- 工作经历 ---------------- */
  function renderExperience() {
    const wrap = $("#timeline");
    if (!wrap) return;
    wrap.innerHTML = RESUME.experience
      .map(
        (job, i) => `
        <div class="timeline-item reveal" style="--delay:${i * 90}ms">
          <article class="exp-card">
            <div class="exp-top">
              <h3 class="exp-company">${esc(job.company)}</h3>
              <span class="exp-period">${esc(job.period)}</span>
            </div>
            <p class="exp-role">
              <span>${esc(job.role)}</span>
              <span class="sep">·</span>
              <span>${esc(job.location)}</span>
            </p>
            <p class="exp-summary">${esc(job.summary)}</p>
            <ul class="exp-list">
              ${job.highlights.map((h) => `<li>${esc(h)}</li>`).join("")}
            </ul>
            <div class="exp-tags">
              ${job.tags.map((t) => `<span>${esc(t)}</span>`).join("")}
            </div>
          </article>
        </div>`
      )
      .join("");
  }

  /* ---------------- 项目 ---------------- */
  function renderProjects() {
    const wrap = $("#projectsGrid");
    if (!wrap) return;

    // 首张 featured 占两列，若剩余卡片为奇数，最后一张横向铺满，避免落单
    const hasFeatured = RESUME.projects.some((p) => p.featured);
    const cells = RESUME.projects.length + (hasFeatured ? 1 : 0);

    wrap.innerHTML = RESUME.projects
      .map((p, i) => {
        const index = String(i + 1).padStart(2, "0");
        const isLast = i === RESUME.projects.length - 1;
        const isWide = !p.featured && isLast && cells % 2 === 1;
        return `
        <article class="project-card reveal ${p.featured ? "featured" : ""} ${
          isWide ? "wide" : ""
        }"
          style="--delay:${(i % 2) * 80}ms"
          data-project="${i}"
          tabindex="0"
          role="button"
          aria-label="查看项目：${esc(p.name)}">
          <div class="project-cover cover-${esc(p.theme || "cyan")}">
            <span class="cover-index">${index}</span>
            <div class="cover-meta">
              <span class="cover-category">${esc(p.category)}</span>
              <span class="cover-year">${esc(p.period || p.year)}</span>
            </div>
          </div>
          <div class="project-body">
            <h3 class="project-title">${esc(p.name)}${icon("arrow")}</h3>
            <p class="project-brief">${esc(p.brief)}</p>
            <div class="project-footer">
              <div class="project-tags">
                ${p.stack
                  .slice(0, 3)
                  .map((s) => `<span>${esc(s)}</span>`)
                  .join("")}
              </div>
              <span class="project-more">查看详情 ${icon("arrow")}</span>
            </div>
          </div>
        </article>`;
      })
      .join("");

    // 点击 / 键盘打开详情
    $$("[data-project]", wrap).forEach((card) => {
      const open = () => openProject(Number(card.dataset.project));
      card.addEventListener("click", open);
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      });
    });
  }

  /* ---------------- 项目弹窗 ---------------- */
  const modal = $("#projectModal");
  const modalBody = $("#modalBody");
  const closeBtn = $(".modal-close", modal);
  let lastFocused = null;

  function openProject(index) {
    const p = RESUME.projects[index];
    if (!p || !modal) return;

    const idx = String(index + 1).padStart(2, "0");
    modalBody.innerHTML = `
      <div class="modal-hero cover-${esc(p.theme || "cyan")}">
        <span class="cover-index">${idx}</span>
        <span class="modal-category">${esc(p.category)} · ${esc(p.period || p.year)}</span>
        <h3 id="modalTitle">${esc(p.name)}</h3>
      </div>
      <div class="modal-content">
        <p class="modal-desc">${esc(p.description)}</p>

        <div class="modal-section">
          <h4>我的角色</h4>
          <p class="modal-desc" style="margin:0">${esc(p.role)}</p>
        </div>

        <div class="modal-section">
          <h4>项目成果</h4>
          <ul class="modal-outcomes">
            ${p.outcomes.map((o) => `<li>${esc(o)}</li>`).join("")}
          </ul>
        </div>

        <div class="modal-section">
          <h4>技术栈</h4>
          <div class="modal-tags">
            ${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}
          </div>
        </div>

        ${
          p.links && p.links.length
            ? `<div class="modal-links">
                 ${p.links
                   .map(
                     (l) =>
                       `<a class="btn btn-ghost btn-sm" href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(
                         l.label
                       )}${icon("external")}</a>`
                   )
                   .join("")}
               </div>`
            : ""
        }
      </div>`;

    lastFocused = document.activeElement;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (closeBtn) closeBtn.focus();
  }

  function closeProject() {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  if (modal) {
    $$("[data-close-modal]", modal).forEach((el) => el.addEventListener("click", closeProject));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (modal.classList.contains("open")) closeProject();
        closeMenu();
      }
    });
  }

  /* ---------------- 教育与证书 ---------------- */
  function renderEducation() {
    const list = $("#educationList");
    if (list) {
      list.innerHTML = RESUME.education
        .map(
          (edu, i) => `
          <article class="edu-item reveal" style="--delay:${i * 80}ms">
            <h3 class="edu-school">${esc(edu.school)}</h3>
            <p class="edu-degree">${esc(edu.degree)}</p>
            <span class="edu-period">${esc(edu.period)}</span>
            <p class="edu-detail">${esc(edu.detail)}</p>
          </article>`
        )
        .join("");
    }

    const certs = $("#certList");
    if (certs) {
      certs.innerHTML = RESUME.certificates
        .map(
          (c) => `
          <li>
            <div class="cert-main">
              <b>${esc(c.name)}</b>
              <span>${esc(c.issuer)}</span>
            </div>
            <em class="cert-year">${esc(c.year)}</em>
          </li>`
        )
        .join("");
    }
  }

  /* ---------------- 打字机 ---------------- */
  function startTyping() {
    const target = $("#typed");
    if (!target) return;

    const phrases =
      Array.isArray(RESUME.meta.typing) && RESUME.meta.typing.length
        ? RESUME.meta.typing
        : ["数据开发", "数据分析", "AI 应用"];

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      target.textContent = phrases[0];
      return;
    }

    let phraseIndex = 0;
    let charIndex = phrases[0].length;
    let deleting = false;

    target.textContent = phrases[0];

    function tick() {
      const phrase = phrases[phraseIndex];

      if (!deleting && charIndex === phrase.length) {
        setTimeout(() => {
          deleting = true;
          tick();
        }, 2000);
        return;
      }

      if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        target.textContent = "";
        setTimeout(tick, 420);
        return;
      }

      charIndex += deleting ? -1 : 1;
      target.textContent = phrase.slice(0, charIndex);
      setTimeout(tick, deleting ? 55 : 110);
    }

    setTimeout(tick, 1200);
  }

  /* ---------------- 滚动动效 ---------------- */
  function initReveal() {
    const items = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    items.forEach((el) => io.observe(el));
  }

  /* ---------------- 导航 / 滚动 ---------------- */
  const nav = $("#nav");
  const navLinks = $$("[data-nav]");
  const sections = ["about", "skills", "experience", "projects", "education"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;

    const bar = $("#scrollProgress");
    if (bar) bar.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;

    if (nav) nav.classList.toggle("scrolled", y > 12);

    const topBtn = $("#toTop");
    if (topBtn) topBtn.classList.toggle("show", y > 600);

    // 当前章节高亮
    let current = "";
    sections.forEach((sec) => {
      if (sec.getBoundingClientRect().top <= 140) current = sec.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(() => {
          onScroll();
          ticking = false;
        });
      }
    },
    { passive: true }
  );

  const toTop = $("#toTop");
  if (toTop) {
    toTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  /* ---------------- 移动端菜单 ---------------- */
  const menuToggle = $("#menuToggle");
  const linksBox = $("#navLinks");

  function closeMenu() {
    if (!linksBox) return;
    linksBox.classList.remove("open");
    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "打开菜单");
    }
  }

  if (menuToggle && linksBox) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = linksBox.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    });

    linksBox.addEventListener("click", (e) => {
      if (e.target.closest("a")) closeMenu();
    });

    document.addEventListener("click", (e) => {
      if (!linksBox.classList.contains("open")) return;
      if (!linksBox.contains(e.target) && !menuToggle.contains(e.target)) closeMenu();
    });
  }

  /* ---------------- 复制邮箱 ---------------- */
  function initCopyEmail() {
    const btn = $("#copyEmailBtn");
    const toast = $("#copyToast");
    if (!btn) return;

    let timer = null;

    function showToast() {
      if (!toast) return;
      toast.classList.add("show");
      clearTimeout(timer);
      timer = setTimeout(() => toast.classList.remove("show"), 2200);
    }

    btn.addEventListener("click", async () => {
      const email = RESUME.meta.email;
      try {
        await navigator.clipboard.writeText(email);
        showToast();
      } catch (err) {
        // 兼容不支持 Clipboard API 的环境
        const input = document.createElement("textarea");
        input.value = email;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.appendChild(input);
        input.select();
        try {
          document.execCommand("copy");
          showToast();
        } catch (e) {
          console.warn("复制失败，请手动复制：", email);
        }
        document.body.removeChild(input);
      }
    });
  }

  /* ---------------- 初始化 ---------------- */
  fillMeta();
  renderHeroMetrics();
  renderStats();
  renderAbout();
  renderSkills();
  renderExperience();
  renderProjects();
  renderEducation();
  initCopyEmail();
  initReveal();
  startTyping();
  onScroll();
})();
