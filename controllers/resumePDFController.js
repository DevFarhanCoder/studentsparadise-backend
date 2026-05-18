const htmlPdfNode = require("html-pdf-node");

// ── HTML escape ─────────────────────────────────────────────────────────────
function esc(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Section wrapper (mirrors frontend Section component) ─────────────────────
function section(title, content) {
  if (!content || !content.trim()) return "";
  return `
    <div style="margin-bottom:18px;">
      <h2 style="font-size:10px;font-weight:800;color:#1e3a8a;text-transform:uppercase;
                 letter-spacing:1.2px;border-bottom:2px solid #3b82f6;padding-bottom:4px;
                 margin:0 0 10px;">
        ${esc(title)}
      </h2>
      ${content}
    </div>`;
}

// ── Build complete resume HTML (mirrors ResumePreview.tsx exactly) ────────────
function buildResumeHTML(data) {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = [],
    projects = [],
    certifications = [],
  } = data;

  const contactParts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.address,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean);

  // ── Header ────────────────────────────────────────────────────────────────
  const header = `
    <div style="background:linear-gradient(135deg,#1e3a8a 0%,#1d4ed8 100%);
                padding:28px 32px 22px;">
      <div style="display:flex;align-items:flex-start;gap:16px;">
        <div style="flex:1;min-width:0;">
          <h1 style="font-size:24px;font-weight:800;color:#fff;margin:0 0 4px;
                     letter-spacing:0.3px;line-height:1.2;">
            ${esc(personalInfo.name || "Your Name")}
          </h1>
          ${
            personalInfo.jobTitle
              ? `<p style="color:#93c5fd;font-size:12px;margin:0 0 12px;font-weight:500;
                          letter-spacing:0.8px;text-transform:uppercase;">
                   ${esc(personalInfo.jobTitle)}
                 </p>`
              : ""
          }
          ${
            contactParts.length > 0
              ? `<p style="color:#bfdbfe;font-size:9.5px;margin:0;line-height:1.8;">
                   ${contactParts.map(esc).join("  &bull;  ")}
                 </p>`
              : ""
          }
        </div>
        ${
          personalInfo.profilePhoto
            ? `<img src="${personalInfo.profilePhoto}" alt="Profile"
                   style="width:72px;height:72px;border-radius:50%;object-fit:cover;
                          border:3px solid rgba(255,255,255,0.35);flex-shrink:0;" />`
            : ""
        }
      </div>
    </div>`;

  // ── Sidebar ───────────────────────────────────────────────────────────────
  const skillsContent = skills
    .map((sg) => {
      const items = sg.items.split(",").filter((s) => s.trim());
      if (!items.length) return "";
      return `
        <div style="margin-bottom:10px;">
          ${
            sg.category
              ? `<p style="font-weight:700;font-size:10px;color:#374151;margin-bottom:5px;
                          text-transform:uppercase;letter-spacing:0.5px;">${esc(sg.category)}</p>`
              : ""
          }
          <div style="display:flex;flex-wrap:wrap;gap:4px;">
            ${items
              .map(
                (s) =>
                  `<span style="background:#dbeafe;color:#1e40af;padding:2px 8px;
                               border-radius:10px;font-size:9.5px;font-weight:500;">
                     ${esc(s.trim())}
                   </span>`
              )
              .join("")}
          </div>
        </div>`;
    })
    .join("");

  const educationContent = education
    .map(
      (edu) => `
      <div style="margin-bottom:12px;">
        <p style="font-weight:700;font-size:11px;color:#111827;margin:0 0 2px;">
          ${esc(edu.degree)}${edu.field ? ` in ${esc(edu.field)}` : ""}
        </p>
        <p style="color:#374151;font-size:10.5px;margin:0 0 2px;">${esc(edu.institution)}</p>
        ${
          edu.startDate || edu.endDate
            ? `<p style="color:#6b7280;font-size:10px;margin:0 0 1px;">
                 ${esc(edu.startDate)}${edu.startDate && edu.endDate ? " &ndash; " : ""}${esc(edu.endDate)}
               </p>`
            : ""
        }
        ${
          edu.grade
            ? `<p style="color:#6b7280;font-size:10px;margin:0;">Grade: ${esc(edu.grade)}</p>`
            : ""
        }
      </div>`
    )
    .join("");

  const certsContent = certifications
    .map(
      (cert) => `
      <div style="margin-bottom:8px;">
        <p style="font-weight:700;font-size:11px;color:#111827;margin:0 0 1px;">${esc(cert.name)}</p>
        <p style="color:#6b7280;font-size:10px;margin:0;">
          ${esc(cert.issuer)}${cert.date ? `  &middot;  ${esc(cert.date)}` : ""}
        </p>
      </div>`
    )
    .join("");

  const sidebar = `
    <div style="width:31%;background:#f8fafc;padding:22px 18px;
                border-right:1px solid #e2e8f0;flex-shrink:0;">
      ${section("Skills", skillsContent)}
      ${section("Education", educationContent)}
      ${section("Certifications", certsContent)}
    </div>`;

  // ── Right Content ─────────────────────────────────────────────────────────
  const summaryContent = personalInfo.summary
    ? `<p style="color:#374151;font-size:11px;line-height:1.65;margin:0;">${esc(personalInfo.summary)}</p>`
    : "";

  const expContent = experience
    .map(
      (exp) => `
      <div style="margin-bottom:16px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:3px;">
          <div>
            <p style="font-weight:700;font-size:12px;color:#111827;margin:0 0 2px;">${esc(exp.position)}</p>
            <p style="font-weight:600;color:#2563eb;font-size:11px;margin:0;">
              ${esc(exp.company)}${exp.location ? `  &middot;  ${esc(exp.location)}` : ""}
            </p>
          </div>
          ${
            exp.startDate || exp.endDate || exp.current
              ? `<span style="color:#6b7280;font-size:10px;white-space:nowrap;
                             margin-left:10px;margin-top:1px;">
                   ${esc(exp.startDate)}${exp.startDate ? " &ndash; " : ""}${
                     exp.current ? "Present" : esc(exp.endDate)
                   }
                 </span>`
              : ""
          }
        </div>
        ${
          exp.bullets
            ? `<ul style="margin:6px 0 0 0;padding-left:15px;">
                 ${exp.bullets
                   .split("\n")
                   .filter((b) => b.trim())
                   .map(
                     (b) =>
                       `<li style="color:#374151;font-size:10.5px;margin-bottom:3px;line-height:1.5;">
                          ${esc(b.replace(/^[-•*]\s*/, ""))}
                        </li>`
                   )
                   .join("")}
               </ul>`
            : ""
        }
      </div>`
    )
    .join("");

  const projContent = projects
    .map(
      (proj) => `
      <div style="margin-bottom:13px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;">
          <p style="font-weight:700;font-size:11.5px;color:#111827;margin:0 0 2px;">
            ${esc(proj.name)}
          </p>
          ${
            proj.link
              ? `<span style="color:#2563eb;font-size:9.5px;margin-left:8px;">${esc(proj.link)}</span>`
              : ""
          }
        </div>
        ${
          proj.technologies
            ? `<p style="color:#6b7280;font-size:10px;margin:0 0 3px;">
                 <strong>Tech:</strong> ${esc(proj.technologies)}
               </p>`
            : ""
        }
        ${
          proj.description
            ? `<p style="color:#374151;font-size:10.5px;margin:0;line-height:1.5;">
                 ${esc(proj.description)}
               </p>`
            : ""
        }
      </div>`
    )
    .join("");

  const rightContent = `
    <div style="flex:1;padding:22px 26px;">
      ${section("Professional Summary", summaryContent)}
      ${section("Work Experience", expContent)}
      ${section("Projects", projContent)}
    </div>`;

  // ── Full HTML document ────────────────────────────────────────────────────
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>${esc(personalInfo.name || "Resume")}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box;
        -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: Arial, Helvetica, sans-serif; font-size: 11px;
           line-height: 1.45; color: #1f2937; background: #fff; }
    ul { list-style-type: disc; }
    @page { size: A4; margin: 0; }
  </style>
</head>
<body>
  ${header}
  <div style="display:flex;">
    ${sidebar}
    ${rightContent}
  </div>
</body>
</html>`;
}

// ── Validate incoming resume data (basic sanitisation) ────────────────────────
function validateResumeData(data) {
  if (!data || typeof data !== "object") return false;
  if (!data.personalInfo || typeof data.personalInfo !== "object") return false;
  if (!Array.isArray(data.experience)) return false;
  if (!Array.isArray(data.education)) return false;
  if (!Array.isArray(data.skills)) return false;
  if (!Array.isArray(data.projects)) return false;
  if (!Array.isArray(data.certifications)) return false;
  return true;
}

// ── Controller ────────────────────────────────────────────────────────────────
exports.generatePDF = async (req, res) => {
  try {
    const { resumeData } = req.body;

    if (!validateResumeData(resumeData)) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume data provided.",
      });
    }

    const html = buildResumeHTML(resumeData);

    const file = { content: html };
    const options = {
      format: "A4",
      printBackground: true,
      margin: { top: "0", bottom: "0", left: "0", right: "0" },
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    };

    const pdfBuffer = await htmlPdfNode.generatePdf(file, options);

    const safeName = (resumeData.personalInfo.name || "Resume")
      .replace(/[^a-zA-Z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-")
      .slice(0, 60);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${safeName}-Resume.pdf"`
    );
    res.setHeader("Content-Length", pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to generate PDF. Please try again.",
    });
  }
};
