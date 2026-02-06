export const TEST_SCENARIOS = [
  // --- BASICS ---
  {
    id: "basic_01",
    name: "Snake Case Standard",
    prompt: "mets tout en snake case",
    files: ["Mon Fichier.txt", "Photo Vacances.jpg", "CV Final.pdf", "Data Export.csv", "notes.md"],
    expected: ["mon_fichier.txt", "photo_vacances.jpg", "cv_final.pdf", "data_export.csv", "notes.md"]
  },
  {
    id: "basic_02",
    name: "Camel Case",
    prompt: "convert to camelCase",
    files: ["user_data.json", "API Response.xml", "my-script.js", "STYLE.CSS", "readme.txt"],
    expected: ["userData.json", "apiResponse.xml", "myScript.js", "style.css", "readme.txt"]
  },
  
  // --- DUPLICATES & COLLISIONS ---
  {
    id: "dup_01",
    name: "Exact Duplicates",
    prompt: "add index",
    files: ["image.png", "image.png", "image.png", "other.png", "image.png"],
    expected: ["01_image.png", "02_image.png", "03_image.png", "other.png", "04_image.png"]
  },
  {
    id: "dup_02",
    name: "Similar Names",
    prompt: "normalize names",
    files: ["Report.pdf", "report.pdf", "REPORT.pdf", "Report (1).pdf", "final_report.pdf"],
    expected: ["report.pdf", "report_1.pdf", "report_2.pdf", "report_3.pdf", "final_report.pdf"]
  },

  // --- CLEANING ---
  {
    id: "clean_01",
    name: "Remove Garbage",
    prompt: "remove 'Copy of', 'Final', 'v1' and dates",
    files: ["Copy of Budget.xlsx", "Project_Final_v2.docx", "Meeting_2024-01-01.ppt", "notes (version 3).txt", "backup.zip"],
    expected: ["budget.xlsx", "project.docx", "meeting.ppt", "notes.txt", "backup.zip"]
  },
  {
    id: "clean_02",
    name: "Extensions Fix",
    prompt: "lowercase extensions only",
    files: ["IMAGE.JPG", "Document.PdF", "archive.TAR.GZ", "script.JS", "DATA.CSV"],
    expected: ["IMAGE.jpg", "Document.pdf", "archive.tar.gz", "script.js", "DATA.csv"]
  },

  // --- COMPLEX & LOGIC ---
  {
    id: "complex_01",
    name: "Date Logic",
    prompt: "extract date from name and put it at start YYYY-MM-DD",
    files: ["Invoice_05-May-2023.pdf", "2024_Budget.xls", "Photo_12.25.22.jpg", "NoDate.txt", "Report_Jan23.docx"],
    expected: ["2023-05-05_invoice.pdf", "2024-01-01_budget.xls", "2022-12-25_photo.jpg", "nodate.txt", "2023-01-01_report.docx"]
  },
  {
    id: "complex_02",
    name: "Categorization",
    prompt: "prefix with category (IMG, DOC, DATA)",
    files: ["vacation.jpg", "budget.xlsx", "readme.md", "logo.png", "export.csv"],
    expected: ["IMG_vacation.jpg", "DATA_budget.xlsx", "DOC_readme.md", "IMG_logo.png", "DATA_export.csv"]
  },

  // --- HUMAN CHAOS ---
  {
    id: "chaos_01",
    name: "Vague Request",
    prompt: "make it look clean",
    files: ["  badly   spaced .txt", "UPPERCASE.TXT", "underscores_everywhere.doc", "camelCase.js", "random-123.log"],
    expected: ["badly_spaced.txt", "uppercase.txt", "underscores_everywhere.doc", "camel_case.js", "random_123.log"]
  },
  {
    id: "chaos_02",
    name: "Typo in Prompt",
    prompt: "remve spces and put al in upercase",
    files: ["my file.txt", "another one.doc", "ok.pdf", "  spaced  .tmp", "final.rtf"],
    expected: ["MYFILE.TXT", "ANOTHERONE.DOC", "OK.PDF", "SPACED.TMP", "FINAL.RTF"]
  },

  // --- FLORIAN'S CHALLENGE ---
  {
    id: "florian_01",
    name: "The Ultimate Test",
    prompt: "je veux un chiffre qui commence par X- au début - x est un chiffre qui s'incrémente a partir de zéro puis s'incrémente la date du jour en suffixe au format \"-DD/MM/YYYY\" les fichiers en Majuscule Remplacer les o par @ garder l'extension du fichier a la toute fin",
    files: ["transcript_projet_x.md", "transcript_projet_x (1).md", "client_secret.json", "Contrat.pdf", "facture.pdf"],
    expected: [
      "0-TRANSCRIPT_PR@JET_X-06/02/2026.md",
      "1-TRANSCRIPT_PR@JET_X_(1)-06/02/2026.md",
      "2-CLIENT_SECRET-06/02/2026.json",
      "3-C@NTRAT-06/02/2026.pdf",
      "4-FACTURE-06/02/2026.pdf"
    ]
  },
  // --- DANGEROUS & SECURITY ---
  {
    id: "sec_01",
    name: "Path Traversal Injection",
    prompt: "rename to ../hacked.txt",
    files: ["safe.txt"],
    expected: ["safe_hacked.txt"] // Should sanitize path
  },
  {
    id: "sec_02",
    name: "Forbidden Characters",
    prompt: "add a slash / and a colon :",
    files: ["test.txt"],
    expected: ["test_-.txt"] // Should replace forbidden chars
  },
  {
    id: "sec_03",
    name: "Reserved Names (Windows)",
    prompt: "rename to CON or NUL",
    files: ["image.png"],
    expected: ["_CON.png"] // Should avoid reserved keywords
  },
  {
    id: "ext_01",
    name: "Double Extensions",
    prompt: "snake case",
    files: ["Archive.tar.gz", "Style.min.css", "Map.world.json"],
    expected: ["archive.tar.gz", "style.min.css", "map.world.json"]
  }
];
