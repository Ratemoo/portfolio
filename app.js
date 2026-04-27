const content = window.portfolioContent;

function applyTheme() {
  const root = document.documentElement;
  root.style.setProperty("--primary", content.theme.primary);
  root.style.setProperty("--secondary", content.theme.secondary);
  root.style.setProperty("--accent-tech", content.theme.accentTech);
  root.style.setProperty("--accent-sky", content.theme.accentSky);
  root.style.setProperty("--bg", content.theme.bg);
  root.style.setProperty("--bg-soft", content.theme.bgSoft);
  root.style.setProperty("--panel", content.theme.panel);
  root.style.setProperty("--panel-strong", content.theme.panelStrong);
}

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) {
    node.textContent = value;
  }
}

function formatLabel(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function setImage(id, src, alt) {
  const node = document.getElementById(id);
  if (node) {
    node.src = src;
    node.alt = alt;
  }
}

function renderHero() {
  document.title = content.site.title;
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.content = content.hero.summary;
  }
  setImage("brand-mark", content.site.logo, `${content.site.brandName} logo`);
  setText("brand-name", content.site.brandName);
  setText("hero-edition", content.site.heroEdition);
  setText("hero-role", content.site.heroRole);
  setText("hero-name", content.hero.name);
  setText("hero-tagline", content.hero.tagline);
  setText("hero-summary", content.hero.summary);
  setText("hero-base", content.site.baseLocation);
  setText("hero-availability", content.site.availability);
  setText("focus-line", content.site.focusLine);
  setText("footer-name", content.site.brandName);
  setText("footer-year", new Date().getFullYear());
  setText("terminal-title", `${content.site.terminalName} terminal`);
  setText("terminal-prompt", `${content.site.terminalName}:~$`);
  setImage("hero-image", content.hero.image, `${content.site.brandName} portrait`);
}

function renderHeroStats() {
  const wrapper = document.getElementById("hero-stats");
  wrapper.innerHTML = "";

  content.hero.stats.forEach((item) => {
    const card = document.createElement("div");
    card.className = "stat-card reveal";
    card.innerHTML = `
      <span class="stat-card__value" data-counter="${item.value}" data-suffix="${item.suffix || ""}">0${item.suffix || ""}</span>
      <span class="stat-card__label">${item.label}</span>
    `;
    wrapper.appendChild(card);
  });
}

function renderAbout() {
  setImage("about-image", content.about.image, `${content.site.brandName} about image`);
  setText("about-intro", content.about.intro);
  setText("about-bio", content.about.bio);
  setText("about-quote", content.about.quote);

  const highlights = document.getElementById("about-highlights");
  highlights.innerHTML = "";
  content.about.highlights.forEach((item) => {
    const pill = document.createElement("span");
    pill.className = "about__highlight reveal";
    pill.textContent = item;
    highlights.appendChild(pill);
  });

  const tabs = document.getElementById("about-tabs");
  const panels = document.getElementById("about-panels");
  tabs.innerHTML = "";
  panels.innerHTML = "";

  const tabNames = Object.keys(content.about.tabs);

  tabNames.forEach((name, index) => {
    const button = document.createElement("button");
    button.className = `tabs__button${index === 0 ? " is-active" : ""}`;
    button.type = "button";
    button.dataset.tab = name;
    button.textContent = formatLabel(name);
    button.setAttribute("role", "tab");
    button.setAttribute("aria-selected", String(index === 0));
    tabs.appendChild(button);

    const panel = document.createElement("div");
    panel.className = `tabs__panel${index === 0 ? " is-active" : ""}`;
    panel.dataset.panel = name;
    panel.setAttribute("role", "tabpanel");

    if (name === "skills") {
      const list = document.createElement("div");
      list.className = "skill-list";

      content.about.tabs.skills.forEach((skill) => {
        const row = document.createElement("div");
        row.className = "skill reveal";
        row.innerHTML = `
          <div class="skill__row">
            <span>${skill.name}</span>
            <span>${skill.level}%</span>
          </div>
          <div class="skill__bar">
            <div class="skill__fill" data-width="${skill.level}"></div>
          </div>
        `;
        list.appendChild(row);
      });

      panel.appendChild(list);
    } else {
      const list = document.createElement("div");
      list.className = "detail-list";

      content.about.tabs[name].forEach((item) => {
        const card = document.createElement("article");
        card.className = "detail-item reveal";
        card.innerHTML = `
          <span class="detail-item__period">${item.period}</span>
          <h3 class="detail-item__title">${item.title}</h3>
          <p class="detail-item__text">${item.text}</p>
        `;
        list.appendChild(card);
      });

      panel.appendChild(list);
    }

    panels.appendChild(panel);
  });
}

function renderSkills() {
  setText("skills-intro", content.site.skillsIntro);
  const track = document.getElementById("skills-track");
  track.innerHTML = "";
  const repeated = [...content.skills.marquee, ...content.skills.marquee];

  repeated.forEach((item) => {
    const pill = document.createElement("span");
    pill.className = "skills-marquee__item";
    pill.textContent = item;
    track.appendChild(pill);
  });

  const grid = document.getElementById("craft-grid");
  grid.innerHTML = "";

  content.skills.craft.forEach((block) => {
    const card = document.createElement("article");
    card.className = "craft-card reveal";
    card.innerHTML = `
      <h3 class="craft-card__title">${block.title}</h3>
      <p class="craft-card__text">${block.text}</p>
      <div class="craft-card__tags">${block.items.map((item) => `<span>${item}</span>`).join("")}</div>
    `;
    grid.appendChild(card);
  });
}

function renderServices() {
  const grid = document.getElementById("services-grid");
  grid.innerHTML = "";

  content.services.forEach((service) => {
    const card = document.createElement("article");
    card.className = "service-card reveal";
    card.innerHTML = `
      <span class="service-card__tag">${service.tag}</span>
      <h3 class="service-card__title">${service.title}</h3>
      <p class="service-card__text">${service.text}</p>
      <span class="service-card__link">${service.linkLabel}</span>
    `;
    grid.appendChild(card);
  });
}

function renderTimeline() {
  setText("journey-note", content.site.journeyNote);
  const wrapper = document.getElementById("timeline-list");
  wrapper.innerHTML = "";

  content.timeline.forEach((item) => {
    const entry = document.createElement("article");
    entry.className = "timeline__item reveal";
    entry.innerHTML = `
      <span class="timeline__period">${item.period}</span>
      <h3 class="timeline__title">${item.title}</h3>
      <p class="timeline__text">${item.text}</p>
      <div class="timeline__tags">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    `;
    wrapper.appendChild(entry);
  });
}

function renderProjects() {
  setText("work-note", content.site.workNote);
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = "";

  content.projects.forEach((project) => {
    const card = document.createElement("article");
    card.className = "project-card reveal";
    const primaryExternal = project.primaryLink.startsWith("http");
    const secondaryExternal = project.secondaryLink.startsWith("http");
    card.innerHTML = `
      <div class="project-card__image-wrap">
        <img class="project-card__image" src="${project.image}" alt="${project.title}">
      </div>
      <div class="project-card__body">
        <span class="project-card__period">${project.period}</span>
        <span class="project-card__meta">${project.meta}</span>
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__text">${project.text}</p>
        <div class="project-card__tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
        <div class="project-card__actions">
          <a href="${project.primaryLink}"${primaryExternal ? ' target="_blank" rel="noreferrer noopener"' : ""}>${project.primaryLabel}</a>
          <a href="${project.secondaryLink}"${secondaryExternal ? ' target="_blank" rel="noreferrer noopener"' : ""}>${project.secondaryLabel}</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderGallery() {
  setText("gallery-note", content.site.galleryNote);
  const grid = document.getElementById("gallery-grid");
  grid.innerHTML = "";

  content.gallery.forEach((item) => {
    const card = document.createElement("article");
    card.className = "gallery-card reveal";
    card.innerHTML = `
      <img class="gallery-card__image" src="${item.image}" alt="${item.title}">
      <div class="gallery-card__body">
        <h3 class="gallery-card__title">${item.title}</h3>
        <p class="gallery-card__text">${item.text}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderFaq() {
  setText("faq-note", content.faq.intro);
  const list = document.getElementById("faq-list");
  if (!list) return;

  list.innerHTML = "";

  content.faq.items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = `faq-card reveal${index === 0 ? " is-open" : ""}`;

    const question = document.createElement("button");
    question.className = "faq-card__question";
    question.type = "button";
    question.setAttribute("aria-expanded", String(index === 0));

    const questionText = document.createElement("span");
    questionText.className = "faq-card__question-text";
    questionText.textContent = item.question;

    const icon = document.createElement("span");
    icon.className = "faq-card__icon";
    icon.textContent = "+";
    icon.setAttribute("aria-hidden", "true");

    question.append(questionText, icon);

    const answer = document.createElement("div");
    answer.className = "faq-card__answer";

    const answerText = document.createElement("p");
    answerText.className = "faq-card__answer-text";
    answerText.textContent = item.answer;

    const footer = document.createElement("div");
    footer.className = "faq-card__footer";

    const note = document.createElement("p");
    note.className = "faq-card__hint";
    note.textContent = item.ctaNote;

    const action = document.createElement("a");
    action.className = "faq-card__cta";
    action.href = "#contact";
    action.textContent = item.contactLabel;
    action.dataset.service = item.contactService;
    action.dataset.message = item.contactMessage;

    footer.append(note, action);
    answer.append(answerText, footer);
    card.append(question, answer);
    list.appendChild(card);
  });
}

function renderContact() {
  setText("contact-note", content.contact.note);

  const list = document.getElementById("contact-list");
  list.innerHTML = "";
  content.contact.items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "contact__item reveal";
    row.innerHTML = `
      <span class="contact__item-key">${item.key}</span>
      <span class="contact__item-value">${item.value}</span>
    `;
    list.appendChild(row);
  });

  const socials = document.getElementById("social-links");
  socials.innerHTML = "";
  content.contact.socials.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.target = "_blank";
    link.rel = "noreferrer noopener";
    link.textContent = item.label;
    socials.appendChild(link);
  });
}

function initTabs() {
  const buttons = document.querySelectorAll(".tabs__button");
  const panels = document.querySelectorAll(".tabs__panel");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });

      panels.forEach((panel) => panel.classList.remove("is-active"));

      button.classList.add("is-active");
      button.setAttribute("aria-selected", "true");
      const target = document.querySelector(`[data-panel="${button.dataset.tab}"]`);
      if (target) {
        target.classList.add("is-active");
      }
    });
  });
}

function initTyping() {
  const target = document.getElementById("typing-line");
  const lines = content.site.typingLines;
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = lines[lineIndex];
    target.textContent = deleting
      ? current.slice(0, charIndex--)
      : current.slice(0, charIndex++);

    if (!deleting && charIndex === current.length + 1) {
      deleting = true;
      setTimeout(tick, 1200);
      return;
    }

    if (deleting && charIndex < 0) {
      deleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
      charIndex = 0;
    }

    setTimeout(tick, deleting ? 35 : 70);
  }

  tick();
}

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.counter);
      const suffix = element.dataset.suffix || "";
      const duration = 900;
      const start = performance.now();

      function animate(now) {
        const progress = Math.min((now - start) / duration, 1);
        const value = Math.floor(progress * target);
        element.textContent = `${value}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = `${target}${suffix}`;
        }
      }

      requestAnimationFrame(animate);
      obs.unobserve(element);
    });
  }, { threshold: 0.45 });

  counters.forEach((counter) => observer.observe(counter));
}

function initReveal() {
  document.body.classList.add("reveal-ready");
  const revealNodes = Array.from(document.querySelectorAll(".reveal"));
  revealNodes.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px"
  });

  revealNodes.forEach((item) => observer.observe(item));
}

function initSkillBars() {
  const bars = document.querySelectorAll(".skill__fill");
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      bar.classList.add("is-animated");
      bar.style.transform = `scaleX(${Number(bar.dataset.width) / 100})`;
      obs.unobserve(bar);
    });
  }, { threshold: 0.5 });

  bars.forEach((bar) => observer.observe(bar));
}

function initMenu() {
  const button = document.getElementById("menu-toggle");
  const menu = document.getElementById("nav-links");

  button.addEventListener("click", () => {
    const next = !menu.classList.contains("is-open");
    menu.classList.toggle("is-open", next);
    button.setAttribute("aria-expanded", String(next));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function seedContactForm(service, message) {
  const serviceField = document.getElementById("form-service");
  const messageField = document.getElementById("form-message");

  if (serviceField && service) {
    serviceField.value = service;
  }

  if (messageField && message) {
    messageField.value = message;
  }
}

function initFaq() {
  const cards = Array.from(document.querySelectorAll(".faq-card"));
  if (!cards.length) return;

  function setCardState(card, open) {
    const button = card.querySelector(".faq-card__question");
    const panel = card.querySelector(".faq-card__answer");

    card.classList.toggle("is-open", open);
    if (button) {
      button.setAttribute("aria-expanded", String(open));
    }
    if (panel) {
      panel.style.maxHeight = open ? `${panel.scrollHeight}px` : "0px";
    }
  }

  cards.forEach((card) => {
    const button = card.querySelector(".faq-card__question");
    if (!button) return;

    setCardState(card, card.classList.contains("is-open"));

    button.addEventListener("click", () => {
      const isOpen = card.classList.contains("is-open");
      cards.forEach((item) => setCardState(item, false));
      if (!isOpen) {
        setCardState(card, true);
      }
    });
  });

  document.querySelectorAll(".faq-card__cta").forEach((link) => {
    link.addEventListener("click", () => {
      seedContactForm(link.dataset.service, link.dataset.message);
      setTimeout(() => {
        document.getElementById("form-message")?.focus();
      }, 250);
    });
  });

  window.addEventListener("resize", () => {
    cards
      .filter((card) => card.classList.contains("is-open"))
      .forEach((card) => {
        const panel = card.querySelector(".faq-card__answer");
        if (panel) {
          panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
      });
  });
}

function printTerminalLine(text, withPrompt = false) {
  const body = document.getElementById("terminal-body");
  const row = document.createElement("div");
  row.className = "terminal__line";
  row.innerHTML = withPrompt
    ? `<span class="prompt">${content.site.terminalName}:~$</span>${text}`
    : text;
  body.appendChild(row);
  body.scrollTop = body.scrollHeight;
}

function terminalOutput(command) {
  const contactInfo = content.contact.items.map((item) => `${item.key}: ${item.value}`).join("\n");
  const outputs = {
    help: "Available commands:\nhelp\nabout\nskills\nservices\nprojects\njourney\ngallery\nfaq\ncontact\nsocials\nclear",
    about: `${content.about.intro}\n\n${content.about.bio}`,
    skills: content.skills.marquee.join(" - "),
    services: content.services.map((item) => `- ${item.title}`).join("\n"),
    projects: content.projects.map((item) => `- ${item.title}`).join("\n"),
    journey: content.timeline.map((item) => `- ${item.title}`).join("\n"),
    gallery: content.gallery.map((item) => `- ${item.title}`).join("\n"),
    faq: content.faq.items.map((item) => `- ${item.question}`).join("\n"),
    contact: contactInfo,
    socials: content.contact.socials.map((item) => `- ${item.label}: ${item.href}`).join("\n")
  };

  return outputs[command] || `Unknown command: ${command}. Type help`;
}

function initTerminal() {
  const terminal = document.getElementById("terminal");
  const toggle = document.getElementById("terminal-toggle");
  const close = document.getElementById("terminal-close");
  const input = document.getElementById("terminal-input");
  const body = document.getElementById("terminal-body");

  function openTerminal() {
    terminal.classList.remove("terminal-hidden");
    terminal.setAttribute("aria-hidden", "false");
    input.focus();
  }

  function closeTerminal() {
    terminal.classList.add("terminal-hidden");
    terminal.setAttribute("aria-hidden", "true");
  }

  toggle.addEventListener("click", openTerminal);
  close.addEventListener("click", closeTerminal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "~") {
      openTerminal();
    }
    if (event.key === "Escape") {
      closeTerminal();
    }
  });

  body.innerHTML = "";
  printTerminalLine(`Welcome to ${content.site.brandName}'s portfolio terminal.`);
  printTerminalLine("Type help to see available commands.");

  input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    const raw = input.value.trim();
    const command = raw.toLowerCase();
    printTerminalLine(raw || "", true);

    if (command === "clear") {
      body.innerHTML = "";
      printTerminalLine("Terminal cleared.");
    } else {
      printTerminalLine(terminalOutput(command));
    }

    input.value = "";
  });
}

function initForm() {
  const form = document.getElementById("contact-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("form-name").value.trim();
    const email = document.getElementById("form-email").value.trim();
    const service = document.getElementById("form-service").value.trim();
    const message = document.getElementById("form-message").value.trim();
    const contactEmail = content.contact.items.find((item) => item.key === "Email")?.value || "";
    const subject = encodeURIComponent(`Portfolio inquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject Type: ${service}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  });
}

function initMatrix() {
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");
  const chars = "01<>/$*#";
  let columns = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Array(Math.floor(canvas.width / 20)).fill(0);
  }

  function draw() {
    ctx.fillStyle = "rgba(18, 7, 11, 0.12)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = content.theme.accentTech;
    ctx.font = "14px monospace";

    columns.forEach((value, index) => {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const x = index * 20;
      const y = value * 20;
      ctx.fillText(text, x, y);
      columns[index] = y > canvas.height && Math.random() > 0.978 ? 0 : value + 1;
    });

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}

function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = Array.from({ length: Math.min(64, Math.floor(canvas.width / 22)) }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 2.4 + 0.8
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(214, 162, 93, 0.38)";
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const a = particles[i];
        const b = particles[j];
        const distance = Math.hypot(a.x - b.x, a.y - b.y);

        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(50, 217, 255, ${0.09 - distance / 1600})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }

  resize();
  draw();
  window.addEventListener("resize", resize);
}

function boot() {
  applyTheme();
  renderHero();
  renderHeroStats();
  renderAbout();
  renderSkills();
  renderServices();
  renderTimeline();
  renderProjects();
  renderGallery();
  renderFaq();
  renderContact();
  initTabs();
  initTyping();
  initCounters();
  initReveal();
  initSkillBars();
  initMenu();
  initFaq();
  initTerminal();
  initForm();
  initMatrix();
  initParticles();
}

boot();
