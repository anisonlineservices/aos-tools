import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Sun, Moon, FileText, Image as ImageIcon, Video, Sparkles, Wrench, ShieldCheck, ChevronRight, Menu, X, LockKeyhole, Download, RotateCcw, Sliders, Scissors, CheckCircle, Globe, Cpu, Clock, Eye, ArrowLeft } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import './style.css';

// Instant Theme Loader to prevent white flash on refresh
try {
  const savedApp = JSON.parse(localStorage.getItem('aos-appearance-v1') || '{}');
  if (savedApp.dark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
  }
  if (savedApp.accent) {
    document.documentElement.style.setProperty('--brand', savedApp.accent);
  }
} catch {}

// Complete Language Dictionary for Instant UI Translation
const translations = {
  English: {
    freeToolkit: "✦ FREE-FIRST TOOLKIT",
    heroTitle1: "Free tools.",
    heroTitle2: "One simple workspace.",
    heroDesc: "PDF, image, video, AI and everyday utilities in one place.",
    catalogModules: "catalog modules",
    localProcessing: "Local file processing",
    freeFirstSetup: "Free-first setup",
    exploreTools: "Explore tools",
    selectTool: "Select a tool to open it.",
    searchPlaceholder: "Search tools...",
    workspace: "WORKSPACE",
    specialWorkspace: "SPECIAL WORKSPACE",
    personalize: "PERSONALIZE",
    language: "Language",
    accentColour: "Accent colour",
    privacyMinded: "Privacy-minded",
    localToolsNote: "Tools process locally.",
    footerText: "AOS Tools · Free-first",
    resetAppearance: "Reset appearance",
    readyInWorkspace: "Ready in your workspace",
    comingSoonText: "Coming Soon"
  },
  Hindi: {
    freeToolkit: "✦ निःशुल्क टूलकिट",
    heroTitle1: "मुफ्त टूल्स।",
    heroTitle2: "एक साधारण वर्कस्पेस।",
    heroDesc: "पीडीएफ, इमेज, वीडियो, एआई और रोजमर्रा के टूल्स एक ही जगह पर।",
    catalogModules: "कैटलॉग मॉड्यूल",
    localProcessing: "लोकल फाइल प्रोसेसिंग",
    freeFirstSetup: "फ्री-फर्स्ट सेटअप",
    exploreTools: "टूल्स खोजें",
    selectTool: "खोलने के लिए किसी टूल का चयन करें।",
    searchPlaceholder: "टूल्स खोजें...",
    workspace: "वर्कस्पेस",
    specialWorkspace: "विशेष वर्कस्पेस",
    personalize: "कस्टमाइज करें",
    language: "भाषा (Language)",
    accentColour: "रंग (Accent)",
    privacyMinded: "गोपनीयता सुरक्षित",
    localToolsNote: "टूल्स आपके डिवाइस पर चलते हैं।",
    footerText: "AOS टूल · फ्री-फर्स्ट",
    resetAppearance: "रीसेट करें",
    readyInWorkspace: "आपके वर्कस्पेस में तैयार है",
    comingSoonText: "जल्द आ रहा है"
  },
  Hinglish: {
    freeToolkit: "✦ FREE-FIRST TOOLKIT",
    heroTitle1: "Free tools.",
    heroTitle2: "Ek simple workspace.",
    heroDesc: "PDF, image, video, AI aur sabhi utilities ek hi jagah par.",
    catalogModules: "catalog modules",
    localProcessing: "Local file processing",
    freeFirstSetup: "Free-first setup",
    exploreTools: "Tools explore karein",
    selectTool: "Open karne ke liye tool select karein.",
    searchPlaceholder: "Tools search karein...",
    workspace: "WORKSPACE",
    specialWorkspace: "SPECIAL WORKSPACE",
    personalize: "PERSONALIZE",
    language: "Language",
    accentColour: "Accent colour",
    privacyMinded: "Privacy-minded",
    localToolsNote: "Tools locally process hote hain.",
    footerText: "AOS Tools · Free-first",
    resetAppearance: "Reset appearance",
    readyInWorkspace: "Ready in your workspace",
    comingSoonText: "Coming Soon"
  },
  Tamil: {
    freeToolkit: "✦ இலவச கருவிகள் தொகுப்பு",
    heroTitle1: "இலவச கருவிகள்.",
    heroTitle2: "எளிய பணிமனை.",
    heroDesc: "PDF, படம், வீடியோ, AI மற்றும் பல சேவைகள் ஒரே இடத்தில்.",
    catalogModules: "தொகுதிகள்",
    localProcessing: "உள்ளூர் கோப்பு செயலாக்கம்",
    freeFirstSetup: "இலவச அமைப்பு",
    exploreTools: "கருவிகளை ஆராயுங்கள்",
    selectTool: "திறக்க ஒரு கருவியைத் தேர்ந்தெடுக்கவும்.",
    searchPlaceholder: "கருவிகளைத் தேடு...",
    workspace: "WORKSPACE",
    specialWorkspace: "SPECIAL WORKSPACE",
    personalize: "PERSONALIZE",
    language: "மொழி (Language)",
    accentColour: "நிறம்",
    privacyMinded: "தனியுரிமை",
    localToolsNote: "கோப்புகள் உங்கள் சாதனத்தில் செயலாக்கப்படும்.",
    footerText: "AOS Tools · இலவசம்",
    resetAppearance: "அமைப்புகளை மீட்டமை",
    readyInWorkspace: "பயன்படுத்த தயார்",
    comingSoonText: "விரைவில் வருகிறது"
  },
  Telugu: {
    freeToolkit: "✦ ఉచిత టూల్‌కిట్",
    heroTitle1: "ఉచిత సాధనాలు.",
    heroTitle2: "ఒక సాధారణ వర్క్‌స్పేస్.",
    heroDesc: "PDF, ఇమేజ్, వీడియో, AI మరియు ఇతర యుటిలిటీలు ఒకే చోట.",
    catalogModules: "మాడ్యూల్స్",
    localProcessing: "స్థానిక ఫైల్ ప్రాసెసింగ్",
    freeFirstSetup: "ఉచిత సెటప్",
    exploreTools: "సాధనాలను అన్వేషించండి",
    selectTool: "తెరవడానికి ఒక సాధనాన్ని ఎంచుకోండి.",
    searchPlaceholder: "సాధనాలను వెతకండి...",
    workspace: "WORKSPACE",
    specialWorkspace: "SPECIAL WORKSPACE",
    personalize: "PERSONALIZE",
    language: "భాష (Language)",
    accentColour: "రంగు",
    privacyMinded: "గోప్యత",
    localToolsNote: "స్థానికంగా ప్రాసెస్ చేయబడుతుంది.",
    footerText: "AOS టూల్्स",
    resetAppearance: "రీసెట్ చేయండి",
    readyInWorkspace: "సిద్ధంగా ఉంది",
    comingSoonText: "త్వరలో వస్తుంది"
  },
  Marathi: {
    freeToolkit: "✦ मोफत साधनकिट",
    heroTitle1: "मोफत टूल्स.",
    heroTitle2: "एक साधे workspace.",
    heroDesc: "PDF, इमेज, व्हिडिओ, AI आणि इतर टूल्स एकाच ठिकाणी.",
    catalogModules: "मॉड्यूल्स",
    localProcessing: "लोकल फाईल प्रक्रिया",
    freeFirstSetup: "मोफत सेटअप",
    exploreTools: "टूल्स तपासा",
    selectTool: "उघडण्यासाठी टूल निवडा.",
    searchPlaceholder: "टूल्स शोधा...",
    workspace: "WORKSPACE",
    specialWorkspace: "SPECIAL WORKSPACE",
    personalize: "PERSONALIZE",
    language: "भाषा (Language)",
    accentColour: "रंग",
    privacyMinded: "गोपनीयता सुरक्षित",
    localToolsNote: "टूल्स लोकल डिवाईसवर चालतात.",
    footerText: "AOS Tools · फ्री-फर्स्ट",
    resetAppearance: "रीसेट करा",
    readyInWorkspace: "वर्कस्पेसमध्ये तयार है",
    comingSoonText: "लवकरच येत आहे"
  }
};

const CATALOG = {
  "pdf": ["Merge PDF", "Split PDF", "Compress PDF", "PDF to Word", "PDF to PowerPoint", "PDF to Excel", "Word to PDF", "PowerPoint to PDF", "Excel to PDF", "Edit PDF", "PDF to JPG", "JPG to PDF", "Sign PDF", "Watermark Remover", "Watermark Stamp", "Rotate PDF", "HTML to PDF", "Unlock PDF", "Protect PDF", "Organize PDF", "PDF to PDF/A", "Repair PDF", "Page numbers", "Scan to PDF", "OCR PDF", "Compare PDF", "Redact PDF", "PDF to Text", "Crop PDF", "PDF Forms", "AI Summarizer", "Translate PDF", "PDF to Markdown", "PDF to Text (alternate)", "Ebook to PDF", "PDF to Ebook", "EPUB to PDF", "PDF to MOBI", "AZW to PDF", "AZW to AZW3"],
  "imgs": ["Compress Image", "Compress JPG", "Compress JPEG", "Compress PNG", "Compress BMP", "Compress WEBP", "Image to JPG", "Image to PNG", "Image to JPEG", "Image to WEBP", "Image to BMP", "Crop Image", "Resize Image", "Rotate Image", "Crop Circle Image", "Image Merge", "Photo Signature Resize", "GIF Maker", "GIF to Images", "Image Quality Enhancer", "Passport Photo Sheet"],
  "special": ["Barcode Generator", "Password Generator", "Image to Color", "Color Extractor", "ZIP Extractor", "Real Client Ledger Diary (Khata)", "Age Calculator", "Image to URL / HTML", "HTML Editor", "QR Code Generator", "PAN Master Hub"]
};

const extraSpecial = ['Text Case Converter', 'Word Counter', 'JSON Formatter / Validator', 'Unit Converter', 'GST Calculator', 'EMI Calculator', 'Percentage Calculator', 'Date Difference Calculator', 'Base64 Encoder / Decoder', 'URL Encoder / Decoder', 'UUID Generator', 'Lorem Ipsum Generator', 'Color Picker', 'Notepad', 'Text to Slug Converter'];
const video = ['Video Compressor', 'Video Converter', 'Video to MP3', 'Video Trimmer', 'GIF Maker'];
const ai = ['AI Text Tools', 'AI Image Tools', 'AI Summarizer', 'AI Translator', 'Background Remover'];
const advanced = ['Google Drive Integration', 'Google Sign in / Sign up', 'User Dashboard', 'Batch File Processing', 'Drag and Drop', 'Search and Categories', 'Privacy and Security'];

const portals = [
  ['PAN Apply / UTIITSL', 'https://www.pan.utiitsl.com/'],
  ['PAN Apply / Protean (NSDL)', 'https://www.protean-tinpan.com/'],
  ['Income Tax e-Filing', 'https://www.incometax.gov.in/'],
  ['UIDAI Aadhaar', 'https://uidai.gov.in/'],
  ['Voter Services', 'https://voters.eci.gov.in/'],
  ['Passport Seva', 'https://www.passportindia.gov.in/'],
  ['EPFO', 'https://www.epfindia.gov.in/'],
  ['Tamil Nadu e-Sevai', 'https://www.tnesevai.tn.gov.in/'],
  ['Tamil Nadu Ration Card', 'https://www.tnpds.gov.in/'],
  ['Tamil Nadu RTI', 'https://rtionline.tn.gov.in/'],
  ['Tamil Nadu Property Tax', 'https://tnurbanepay.tn.gov.in/'],
  ['Tamil Nadu Electricity (TANGEDCO)', 'https://www.tangedco.org/'],
  ['Tamil Nadu Birth & Death Registration', 'https://crstn.org/'],
  ['e-Shram', 'https://eshram.gov.in/'],
  ['Ayushman Bharat PM-JAY', 'https://pmjay.gov.in/'],
  ['MSME Udyam Registration', 'https://udyamregistration.gov.in/'],
  ['FSSAI FoSCoS', 'https://foscos.fssai.gov.in/'],
  ['NPCI', 'https://www.npci.org.in/'],
  ['Common Service Centres', 'https://csc.gov.in/'],
  ['eGazette of India', 'https://egazette.gov.in/'],
  ['Tamil Nadu Gazette', 'https://www.stationeryprinting.tn.gov.in/'],
  ['Parivahan', 'https://parivahan.gov.in/'],
  ['DigiLocker', 'https://www.digilocker.gov.in/'],
  ['UPSC', 'https://upsc.gov.in/'],
  ['Railway Recruitment Boards', 'https://www.rrbcdg.gov.in/'],
  ['IRCTC', 'https://www.irctc.co.in/'],
  ['National Scholarship Portal', 'https://scholarships.gov.in/'],
  ['Bihar School Examination Board', 'https://secondary.biharboardonline.com/'],
  ['Bihar e-PDS', 'https://epds.bihar.gov.in/'],
  ['National Social Assistance Programme', 'https://nsap.nic.in/'],
  ['UMANG', 'https://web.umang.gov.in/'],
  ['Aaple Sarkar Maharashtra', 'https://aaplesarkar.mahaonline.gov.in/'],
  ['MahaDBT', 'https://mahadbt.maharashtra.gov.in/'],
  ['Maharashtra Social Justice', 'https://sjsa.maharashtra.gov.in/'],
  ['Maharashtra Gazette', 'https://egazzete.mahaonline.gov.in/'],
  ['Chennai Corporation', 'https://chennaicorporation.gov.in/'],
  ['Tamil Nadu e-Procurement', 'https://tntenders.gov.in/'],
  ['GST Portal', 'https://www.gst.gov.in/'],
  ['MCA Services', 'https://www.mca.gov.in/'],
  ['Bhuvan / ISRO', 'https://bhuvan.nrsc.gov.in/'],
  ['National Portal of India', 'https://www.india.gov.in/'],
  ['MyGov India', 'https://www.mygov.in/'],
  ['National Career Service', 'https://www.ncs.gov.in/'],
  ['Skill India Digital', 'https://www.skillindiadigital.gov.in/'],
  ['PM Kisan', 'https://pmkisan.gov.in/'],
  ['National Health Authority', 'https://nha.gov.in/'],
  ['GeM Government e-Marketplace', 'https://gem.gov.in/'],
  ['India Post', 'https://www.indiapost.gov.in/'],
  ['CBSE', 'https://www.cbse.gov.in/'],
  ['National Testing Agency', 'https://nta.ac.in/']
].map(([name, url]) => ({ name, cat: 'Government Portals', url, working: true, status: 'portal' }));

function getToolStatus(cat, name) {
  if (cat === 'PDF Tools' && (name === 'Merge PDF' || name === 'Split PDF')) return 'ready';
  if (cat === 'Special Tools' && name === 'PAN Master Hub') return 'ready';
  if (cat === 'Government Portals') return 'portal';
  return 'soon';
}

const makeItems = (arr, cat) => arr.map(name => ({ name, cat, working: getToolStatus(cat, name) === 'ready', status: getToolStatus(cat, name) }));

const items = [
  ...makeItems(CATALOG.pdf, 'PDF Tools'),
  ...makeItems(CATALOG.imgs, 'Image Tools'),
  ...makeItems([...CATALOG.special, ...extraSpecial], 'Special Tools'),
  ...makeItems(video, 'Video Tools'),
  ...makeItems(ai, 'AI Tools'),
  ...makeItems(advanced, 'Advanced Features'),
  ...portals
];

function localDate(d = new Date()) {
  const y = d.getFullYear(), m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function loadAppearance() {
  try {
    const saved = JSON.parse(localStorage.getItem('aos-appearance-v1') || '{}');
    return saved && typeof saved === 'object' ? saved : {};
  } catch {
    return {};
  }
}

const GOOGLE_PROFILE_KEY = 'aos-google-profile-v1';

function loadGoogleProfile() {
  try {
    const saved = JSON.parse(localStorage.getItem(GOOGLE_PROFILE_KEY) || 'null');
    if (saved && typeof saved.name === 'string' && typeof saved.email === 'string') {
      return {
        name: saved.name,
        email: saved.email,
        picture: typeof saved.picture === 'string' ? saved.picture : ''
      };
    }
    return null;
  } catch {
    return null;
  }
}

function getTileClass(cat) {
  if (cat === 'PDF Tools') return 'pdf';
  if (cat === 'Image Tools') return 'image';
  if (cat === 'Video Tools') return 'video';
  if (cat === 'AI Tools') return 'ai';
  if (cat === 'Special Tools') return 'special';
  if (cat === 'Advanced Features') return 'advanced';
  if (cat === 'Government Portals') return 'portals';
  return 'wrench';
}

function getTileIcon(cat) {
  if (cat === 'PDF Tools') return <FileText />;
  if (cat === 'Image Tools') return <ImageIcon />;
  if (cat === 'Video Tools') return <Video />;
  if (cat === 'AI Tools') return <Sparkles />;
  if (cat === 'Special Tools') return <Wrench />;
  if (cat === 'Advanced Features') return <Cpu />;
  if (cat === 'Government Portals') return <Globe />;
  return <Wrench />;
}

function App() {
  const [query, SQ] = useState('');
  const [cat, SC] = useState('All Tools');

  const [dark, SD] = useState(() => loadAppearance().dark ?? false);
  const [lang, SL] = useState(() => loadAppearance().lang ?? 'English');
  const [accent, SA] = useState(() => loadAppearance().accent ?? '#052f52');

  const t = translations[lang] || translations['English'];

  // Persistent Active Tool state synchronized with URL hash & localStorage
  const [active, ST] = useState(() => {
    try {
      const hash = window.location.hash.replace('#', '').trim();
      if (hash) {
        const found = items.find(i => i.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === hash);
        if (found) return found;
      }
      const savedTool = localStorage.getItem('aos-active-tool-v1');
      return savedTool ? JSON.parse(savedTool) : null;
    } catch {
      return null;
    }
  });

  const [msg, SM] = useState('');
  const [file, SFile] = useState(null);
  
  // Persistent Merge Files Metadata & State
  const [mergeFilesMeta, SMergeFilesMeta] = useState(() => {
    try {
      const saved = localStorage.getItem('aos-merge-meta-v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [mergeFiles, SMergeFiles] = useState([]);

  const [user, SU] = useState(() => loadGoogleProfile());
  const [mobile, SMob] = useState(false);

  // Split PDF Persistent States
  const [splitMode, SSplitMode] = useState(() => localStorage.getItem('aos-split-mode-v1') || 'all');
  const [splitRange, SSplitRange] = useState(() => localStorage.getItem('aos-split-range-v1') || '');
  const [previewDataUrl, SPreviewDataUrl] = useState(() => localStorage.getItem('aos-split-preview-v1') || '');
  const [previewType, SPreviewType] = useState(() => localStorage.getItem('aos-split-type-v1') || '');

  const [panTab, SPanTab] = useState(() => localStorage.getItem('aos-pan-tab-v1') || 'photo');
  const [panPreview, SPanPreview] = useState(() => localStorage.getItem('aos-pan-preview-v1') || '');
  const [panPortal, SPanPortal] = useState(() => localStorage.getItem('aos-pan-portal-v1') || 'NSDL');

  useEffect(() => {
    try {
      const meta = mergeFiles.map(f => ({ name: f.name, size: f.size, type: f.type }));
      localStorage.setItem('aos-merge-meta-v1', JSON.stringify(meta));
    } catch {}
  }, [mergeFiles]);

  useEffect(() => {
    try { localStorage.setItem('aos-split-mode-v1', splitMode); } catch {}
  }, [splitMode]);

  useEffect(() => {
    try { localStorage.setItem('aos-split-range-v1', splitRange); } catch {}
  }, [splitRange]);

  useEffect(() => {
    try {
      if (previewDataUrl) localStorage.setItem('aos-split-preview-v1', previewDataUrl);
      else localStorage.removeItem('aos-split-preview-v1');
    } catch {}
  }, [previewDataUrl]);

  useEffect(() => {
    try {
      if (previewType) localStorage.setItem('aos-split-type-v1', previewType);
      else localStorage.removeItem('aos-split-type-v1');
    } catch {}
  }, [previewType]);

  useEffect(() => {
    try { localStorage.setItem('aos-pan-tab-v1', panTab); } catch {}
  }, [panTab]);

  useEffect(() => {
    try {
      if (panPreview) localStorage.setItem('aos-pan-preview-v1', panPreview);
      else localStorage.removeItem('aos-pan-preview-v1');
    } catch {}
  }, [panPreview]);

  useEffect(() => {
    try { localStorage.setItem('aos-pan-portal-v1', panPortal); } catch {}
  }, [panPortal]);

  // URL Hash Sync for Refresh Persistence
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        ST(null);
        localStorage.removeItem('aos-active-tool-v1');
      } else {
        const found = items.find(i => i.name.toLowerCase().replace(/[^a-z0-9]/g, '-') === hash);
        if (found) {
          ST(found);
          localStorage.setItem('aos-active-tool-v1', JSON.stringify(found));
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const cats = ['All Tools', 'PDF Tools', 'Image Tools', 'Video Tools', 'AI Tools', 'Special Tools', 'Advanced Features', 'Government Portals'];

  const shown = useMemo(
    () => items.filter(x => {
      const matchQuery = x.name.toLowerCase().includes(query.toLowerCase());
      if (cat === 'All Tools') return matchQuery;
      return x.cat === cat && matchQuery;
    }),
    [cat, query]
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
    }
    root.style.setProperty('--brand', accent);
  }, [dark, accent]);

  useEffect(() => {
    try {
      localStorage.setItem('aos-appearance-v1', JSON.stringify({ dark, lang, accent }));
    } catch { }
  }, [dark, lang, accent]);

  useEffect(() => {
    try {
      if (active) {
        localStorage.setItem('aos-active-tool-v1', JSON.stringify(active));
      } else {
        localStorage.removeItem('aos-active-tool-v1');
      }
    } catch { }
  }, [active]);

  const dl = (blob, name) => {
    const u = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = u;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(u), 1000);
  };

  async function mergePdfAction() {
    try {
      if (mergeFiles.length < 2) { SM('Please select at least 2 PDF files to merge.'); return; }
      const out = await PDFDocument.create();
      for (const f of mergeFiles) {
        const p = await PDFDocument.load(await f.arrayBuffer());
        (await out.copyPages(p, p.getPageIndices())).forEach(pg => out.addPage(pg));
      }
      dl(new Blob([await out.save()], { type: 'application/pdf' }), 'aos-merged.pdf');
      SM(`Successfully merged ${mergeFiles.length} PDFs in your custom order!`);
    } catch (err) {
      console.error(err);
      SM('Merge failed. Check that all PDFs are valid and not encrypted.');
    }
  }

  const moveMergeFile = (index, direction) => {
    const newFiles = [...mergeFiles];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newFiles.length) return;
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    SMergeFiles(newFiles);
  };

  const removeMergeFile = (index) => {
    const updated = mergeFiles.filter((_, i) => i !== index);
    SMergeFiles(updated);
    if (updated.length === 0) {
      localStorage.removeItem('aos-merge-meta-v1');
    }
  };

  const blobToDataUrl = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  async function splitPdfAction(shouldPreview = false) {
    try {
      if (!file) { SM('Please select a PDF file first.'); return; }
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();

      if (splitMode === 'all') {
        const zip = new JSZip();
        for (let i = 0; i < totalPages; i++) {
          const subPdf = await PDFDocument.create();
          const [copiedPage] = await subPdf.copyPages(pdfDoc, [i]);
          subPdf.addPage(copiedPage);
          const pdfBytes = await subPdf.save();
          zip.file(`page_${i + 1}.pdf`, pdfBytes);
        }
        const content = await zip.generateAsync({ type: 'blob' });
        if (shouldPreview) {
          const dataUrl = await blobToDataUrl(content);
          SPreviewDataUrl(dataUrl);
          SPreviewType('zip');
          SM(`Generated ZIP containing ${totalPages} pages ready for preview & download.`);
        } else {
          dl(content, 'aos-split-pages.zip');
          SM(`Successfully split PDF into ${totalPages} individual pages and downloaded as ZIP.`);
        }
      } else if (splitMode === 'range') {
        if (!splitRange.trim()) { SM('Please enter a valid page range (e.g. 1-7 or 2,4,5).'); return; }
        const subPdf = await PDFDocument.create();
        const pagesToExtract = [];
        
        const parts = splitRange.split(',');
        for (const part of parts) {
          if (part.includes('-')) {
            const [start, end] = part.split('-').map(n => parseInt(n.trim(), 10));
            if (!isNaN(start) && !isNaN(end)) {
              for (let p = start; p <= end; p++) {
                if (p >= 1 && p <= totalPages) pagesToExtract.push(p - 1);
              }
            }
          } else {
            const p = parseInt(part.trim(), 10);
            if (!isNaN(p) && p >= 1 && p <= totalPages) pagesToExtract.push(p - 1);
          }
        }

        if (pagesToExtract.length === 0) {
          SM('Invalid page range specified based on total pages.');
          return;
        }

        const copiedPages = await subPdf.copyPages(pdfDoc, pagesToExtract);
        copiedPages.forEach(pg => subPdf.addPage(pg));
        const pdfBytes = await subPdf.save();
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });

        if (shouldPreview) {
          const dataUrl = await blobToDataUrl(blob);
          SPreviewDataUrl(dataUrl);
          SPreviewType('pdf');
          SM(`Extracted ${pagesToExtract.length} pages successfully. Ready for preview!`);
        } else {
          dl(blob, 'aos-split-range.pdf');
          SM(`Successfully extracted ${pagesToExtract.length} pages into a new PDF.`);
        }
      }
    } catch (err) {
      console.error(err);
      SM('Split failed. Ensure the PDF file is valid and not password protected.');
    }
  }

  function tool(tObj) {
    if (tObj.status === 'soon') {
      SM(`Tool "${tObj.name}" is coming soon! We are building it.`);
      return;
    }
    ST(tObj);
    SM('');
    SFile(null);
    try {
      window.location.hash = tObj.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    } catch {}
  }

  function goHome() {
    ST(null);
    localStorage.removeItem('aos-active-tool-v1');
    localStorage.removeItem('aos-merge-meta-v1');
    SMergeFiles([]);
    SMergeFilesMeta([]);
    try {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    } catch {}
  }

  function content() {
    if (!active) return null;
    const n = active.name;

    if (n === 'Merge PDF') return <div className="form" style={{ gap: '14px' }}>
      <p><b>Merge Multiple PDFs (With Custom Reordering)</b></p>
      <p style={{ fontSize: '11px', color: 'var(--muted)' }}>Select multiple PDFs below. Use the up/down arrows to arrange them in your desired sequence before merging.</p>
      
      <input type="file" accept=".pdf,application/pdf" multiple onChange={e => {
        if (e.target.files) {
          SMergeFiles(prev => [...prev, ...Array.from(e.target.files)]);
        }
      }} />

      {(mergeFiles.length > 0 || mergeFilesMeta.length > 0) && <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto', border: '1px solid var(--line)', padding: '10px', borderRadius: '8px', background: 'var(--card)' }}>
        <b>Selected PDFs ({mergeFiles.length || mergeFilesMeta.length}):</b>
        {(mergeFiles.length > 0 ? mergeFiles : mergeFilesMeta).map((f, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--soft)', padding: '6px 10px', borderRadius: '6px', fontSize: '12px' }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{idx + 1}. {f.name}</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button disabled={idx === 0} onClick={() => moveMergeFile(idx, 'up')} style={{ padding: '4px 6px', fontSize: '10px', background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--line)', borderRadius: '4px' }}>⬆</button>
              <button disabled={idx === (mergeFiles.length || mergeFilesMeta.length) - 1} onClick={() => moveMergeFile(idx, 'down')} style={{ padding: '4px 6px', fontSize: '10px', background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--line)', borderRadius: '4px' }}>⬇</button>
              <button onClick={() => removeMergeFile(idx)} style={{ padding: '4px 6px', fontSize: '10px', background: '#ffebee', color: '#c62828', border: '1px solid #ef9a9a', borderRadius: '4px' }}>✕</button>
            </div>
          </div>
        ))}
      </div>}

      <button disabled={mergeFiles.length < 2 && mergeFilesMeta.length < 2} onClick={mergePdfAction}>Merge & Download PDF</button>
      <small style={{ color: 'var(--muted)', fontSize: '10px' }}>Tip: Select at least 2 PDF files and arrange them in order.</small>
    </div>;

    if (n === 'Split PDF') return <div className="form" style={{ gap: '14px' }}>
      <p><b>Split PDF File Locally</b></p>
      <p style={{ fontSize: '11px', color: 'var(--muted)' }}>Extract individual pages or specific page ranges from your PDF securely in your browser.</p>
      
      <input type="file" accept=".pdf,application/pdf" onChange={e => SFile(e.target.files?.[0])} />

      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <input type="radio" name="splitMode" checked={splitMode === 'all'} onChange={() => SSplitMode('all')} /> Extract every page into separate PDFs (ZIP)
        </label>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <input type="radio" name="splitMode" checked={splitMode === 'range'} onChange={() => SSplitMode('range')} /> Extract custom page range
        </label>
        {splitMode === 'range' && <>
          <input type="text" placeholder="e.g. 1-7 or 1,3,5" value={splitRange} onChange={e => SSplitRange(e.target.value)} style={{ background: 'var(--card)', border: '1px solid var(--line)', padding: '8px', borderRadius: '6px', color: 'var(--text)', fontSize: '12px' }} />
          <small style={{ color: 'var(--muted)', fontSize: '10px' }}>Tip: Use <b>1-7</b> to extract from page 1 to 7.</small>
        </>}
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button disabled={!file} onClick={() => splitPdfAction(false)}>Split & Download</button>
        <button disabled={!file} style={{ background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--line)' }} onClick={() => splitPdfAction(true)}><Eye size={14} style={{ display: 'inline', marginRight: '4px' }} /> Preview Result</button>
      </div>

      {previewDataUrl && <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: 'var(--card)', padding: '14px', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '10px' }}>
        <b>👀 Output Preview Ready</b>
        <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{previewType === 'pdf' ? 'Extracted pages PDF generated successfully.' : 'ZIP archive generated with all split pages successfully.'}</p>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => dl(dataBlobFromUrl(previewDataUrl), previewType === 'pdf' ? 'aos-split-range.pdf' : 'aos-split-pages.zip')}><Download size={14} style={{ display: 'inline', marginRight: '4px' }} /> Download File</button>
          <button style={{ background: 'var(--soft)', color: 'var(--text)', border: '1px solid var(--line)' }} onClick={() => { SPreviewDataUrl(''); SPreviewType(''); localStorage.removeItem('aos-split-preview-v1'); localStorage.removeItem('aos-split-type-v1'); }}>Clear Preview</button>
        </div>
      </div>}
    </div>;

    if (n === 'PAN Master Hub') return <div className="form" style={{ gap: '16px' }}>
      <p><b>Anis Online Services — Professional PAN Master Hub & Resizer</b></p>
      
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
        <button style={{ background: panTab === 'photo' ? 'var(--brand)' : 'var(--card)', color: panTab === 'photo' ? '#fff' : 'var(--text)', border: '1px solid var(--line)', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '600' }} onClick={() => SPanTab('photo')}>Passport Photo Resizer</button>
        <button style={{ background: panTab === 'signature' ? 'var(--brand)' : 'var(--card)', color: panTab === 'signature' ? '#fff' : 'var(--text)', border: '1px solid var(--line)', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '600' }} onClick={() => SPanTab('signature')}>Signature Resizer</button>
        <button style={{ background: panTab === 'pdf' ? 'var(--brand)' : 'var(--card)', color: panTab === 'pdf' ? '#fff' : 'var(--text)', border: '1px solid var(--line)', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '600' }} onClick={() => SPanTab('pdf')}>PDF Compressor (&lt;300KB)</button>
        <button style={{ background: panTab === 'portals' ? 'var(--brand)' : 'var(--card)', color: panTab === 'portals' ? '#fff' : 'var(--text)', border: '1px solid var(--line)', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '600' }} onClick={() => SPanTab('portals')}>Official Portals</button>
      </div>

      {panTab === 'photo' && <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid var(--line)', padding: '16px', borderRadius: '12px', background: 'var(--card)' }}>
        <b>📷 Passport Size Photo Resizer (Exact Portal Standards)</b>
        <p style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: '1.5' }}>
          • <b>NSDL / Protean:</b> 197 × 276 pixels (Max 50 KB, JPEG).<br />
          • <b>UTIITSL:</b> 213 × 213 pixels (Max 30 KB, JPEG).
        </p>
        <label>Select Application Portal</label>
        <select value={panPortal} onChange={e => SPanPortal(e.target.value)}>
          <option value="NSDL">NSDL / Protean (197x276 px, Max 50KB)</option>
          <option value="UTI">UTIITSL (213x213 px, Max 30KB)</option>
        </select>
        <input type="file" accept="image/*" onChange={e => {
          const f = e.target.files?.[0];
          if (f) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const resUrl = event.target.result;
              SPanPreview(resUrl);
            };
            reader.readAsDataURL(f);
          }
        }} />
        {panPreview && <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', background: 'var(--soft)', padding: '12px', borderRadius: '8px' }}>
          <img src={panPreview} alt="Preview" style={{ width: '120px', height: '140px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--line)' }} />
          <button onClick={() => {
            const im = new Image();
            im.onload = () => {
              const w = panPortal === 'NSDL' ? 197 : 213;
              const h = panPortal === 'NSDL' ? 276 : 213;
              const maxKb = panPortal === 'NSDL' ? 50 : 30;

              const c = document.createElement('canvas');
              c.width = w; c.height = h;
              const ctx = c.getContext('2d');
              
              const imRatio = im.naturalWidth / im.naturalHeight;
              const targetRatio = w / h;
              let sw, sh, sx, sy;

              if (imRatio > targetRatio) {
                sh = im.naturalHeight;
                sw = im.naturalHeight * targetRatio;
                sx = (im.naturalWidth - sw) / 2;
                sy = 0;
              } else {
                sw = im.naturalWidth;
                sh = im.naturalWidth / targetRatio;
                sx = 0;
                sy = (im.naturalHeight - sh) / 2;
              }

              ctx.drawImage(im, sx, sy, sw, sh, 0, 0, w, h);

              c.toBlob(blob => {
                if (!blob) return;
                let q = 0.9;
                const checkSize = (currentBlob) => {
                  if (currentBlob.size / 1024 <= maxKb || q <= 0.2) {
                    dl(currentBlob, `aos-pan-photo-${panPortal.toLowerCase()}.jpg`);
                    SM(`Passport Photo resized successfully! Dimensions: ${w}x{h}px, Size: ${Math.round(currentBlob.size / 1024)} KB.`);
                  } else {
                    q -= 0.1;
                    c.toBlob(nextBlob => checkSize(nextBlob), 'image/jpeg', q);
                  }
                };
                checkSize(blob);
              }, 'image/jpeg', 0.9);
            };
            im.src = panPreview;
          }}>Resize & Download Photo</button>
        </div>}
      </div>}

      {panTab === 'signature' && <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid var(--line)', padding: '16px', borderRadius: '12px', background: 'var(--card)' }}>
        <b>✍️ Signature Resizer (Exact Portal Standards)</b>
        <p style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: '1.5' }}>
          • <b>NSDL / Protean:</b> 354 × 157 pixels (Max 50 KB, JPEG).<br />
          • <b>UTIITSL:</b> 200 × 400 pixels (Max 60 KB, JPEG).
        </p>
        <label>Select Application Portal</label>
        <select value={panPortal} onChange={e => SPanPortal(e.target.value)}>
          <option value="NSDL">NSDL / Protean (354x157 px, Max 50KB)</option>
          <option value="UTI">UTIITSL (200x400 px, Max 60KB)</option>
        </select>
        <input type="file" accept="image/*" onChange={e => {
          const f = e.target.files?.[0];
          if (f) {
            const reader = new FileReader();
            reader.onload = (event) => {
              SPanPreview(event.target.result);
            };
            reader.readAsDataURL(f);
          }
        }} />
        {panPreview && <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', background: 'var(--soft)', padding: '12px', borderRadius: '8px' }}>
          <img src={panPreview} alt="Signature Preview" style={{ width: '220px', height: '80px', objectFit: 'contain', background: '#fff', borderRadius: '6px', border: '1px solid var(--line)' }} />
          <button onClick={() => {
            const im = new Image();
            im.onload = () => {
              const w = panPortal === 'NSDL' ? 354 : 200;
              const h = panPortal === 'NSDL' ? 157 : 400;
              const maxKb = panPortal === 'NSDL' ? 50 : 60;

              const c = document.createElement('canvas');
              c.width = w; c.height = h;
              const ctx = c.getContext('2d');
              ctx.fillStyle = '#ffffff';
              ctx.fillRect(0, 0, w, h);
              const scale = Math.min(w / im.naturalWidth, h / im.naturalHeight);
              const dw = im.naturalWidth * scale, dh = im.naturalHeight * scale;
              ctx.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);

              c.toBlob(blob => {
                if (!blob) return;
                let q = 0.9;
                const checkSize = (currentBlob) => {
                  if (currentBlob.size / 1024 <= maxKb || q <= 0.2) {
                    dl(currentBlob, `aos-pan-signature-${panPortal.toLowerCase()}.jpg`);
                    SM(`Signature resized successfully! Dimensions: ${w}x{h}px, Size: ${Math.round(currentBlob.size / 1024)} KB.`);
                  } else {
                    q -= 0.1;
                    c.toBlob(nextBlob => checkSize(nextBlob), 'image/jpeg', q);
                  }
                };
                checkSize(blob);
              }, 'image/jpeg', 0.9);
            };
            im.src = panPreview;
          }}>Resize & Download Signature</button>
        </div>}
      </div>}

      {panTab === 'pdf' && <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid var(--line)', padding: '16px', borderRadius: '12px', background: 'var(--card)' }}>
        <b>📑 Official Supporting Document PDF Compressor (&lt;300KB Strict)</b>
        <p style={{ fontSize: '11px', color: 'var(--muted)' }}>Upload any scanned document or image/PDF. This tool strictly compresses the file into a lightweight PDF under 300 KB.</p>
        <input type="file" accept="image/*,.pdf" onChange={e => SFile(e.target.files?.[0])} />
        <button disabled={!file} onClick={async () => {
          try {
            if (!file) return;
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([595, 842]);

            const u = URL.createObjectURL(file);
            const img = new Image();
            await new Promise((res, rej) => {
              img.onload = res;
              img.onerror = rej;
              img.src = u;
            });

            const maxW = 800;
            let w = img.naturalWidth, h = img.naturalHeight;
            if (w > maxW) {
              h = Math.round((h * maxW) / w);
              w = maxW;
            }
            const canvas = document.createElement('canvas');
            canvas.width = w; canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.25);
            const resBlob = dataBlob(compressedDataUrl);
            const imgBytes = await resBlob.arrayBuffer();
            const embedded = await pdfDoc.embedJpg(imgBytes);

            page.drawImage(embedded, { x: 20, y: 20, width: 555, height: 802 });
            URL.revokeObjectURL(u);

            const pdfBytes = await pdfDoc.save();
            dl(new Blob([pdfBytes], { type: 'application/pdf' }), 'aos-pan-supporting-compressed.pdf');
            SM(`PDF compressed successfully! Final size: ${Math.round(pdfBytes.size / 1024)} KB (&lt;300KB). Ready for upload.`);
          } catch (err) {
            console.error(err);
            SM('Compression failed. Please ensure file is valid.');
          }
        }}>Compress PDF & Download (&lt;300KB)</button>
      </div>}

      {panTab === 'portals' && <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid var(--line)', padding: '16px', borderRadius: '12px', background: 'var(--card)' }}>
        <b>🔗 Direct Official Portals & Services</b>
        <div className="portal" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
          <a href="https://onlineservices.proteantech.in/paam/endUserRegisterContact.html" target="_blank" rel="noreferrer">Online PAN Application ↗</a>
          <a href="https://onlineservices.proteantech.in/paam/ReprintEPan.html" target="_blank" rel="noreferrer">Request Reprint of PAN ↗</a>
          <a href="https://onlineservices.proteantech.in/paam/requestAndDownloadEPAN.html" target="_blank" rel="noreferrer">Download e-PAN / XML ↗</a>
          <a href="https://tin.tin.proteantech.in/pantan/StatusTrack.html" target="_blank" rel="noreferrer">Track PAN Status ↗</a>
          <a href="https://www.pan.utiitsl.com/PAN/newA.html" target="_blank" rel="noreferrer">UTIITSL Portal ↗</a>
          <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noreferrer">Income Tax Department ↗</a>
        </div>
      </div>}
    </div>;

    return <div className="form">
      <p>Run module: <strong>{n}</strong>. Select your file or input below.</p>
      <input type="file" onChange={e => SFile(e.target.files?.[0])} />
      <button onClick={() => { SM(`Executed ${n} successfully!`); }}>Run & Process</button>
    </div>;
  }

  function dataBlobFromUrl(dataUrl) {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  }

  return <div className="app">
    <header style={{ gap: '12px' }}>
      <button className="hamb" onClick={() => SMob(!mobile)}>{mobile ? <X /> : <Menu />}</button>

      <button className="brand" onClick={() => goHome()}>
        <span className="logo">A</span>
        <span>AOS <b>TOOLS</b><small>FREE & SECURE</small></span>
      </button>

      <div className="search">
        <Search />
        <input value={query} placeholder={t.searchPlaceholder} onChange={e => SQ(e.target.value)} />
      </div>

      <div className="head-actions">
        <button className="round" onClick={() => SD(!dark)}>{dark ? <Sun /> : <Moon />}</button>

        <div id="google-button"></div>

        {user && <span className="profile">
          {user.picture && <img src={user.picture} alt="" />}
          {user.name}
          <button onClick={() => {
            try { localStorage.removeItem(GOOGLE_PROFILE_KEY); } catch { }
            SU(null);
            SM('Signed out.');
          }}>Sign out</button>
        </span>}
      </div>
    </header>

    <div className="layout">
      <aside className={mobile ? 'open' : ''}>
        <div className="label">{t.workspace}</div>

        {cats.map(c => <button className={'nav ' + (cat === c && !active ? 'sel' : '')} key={c} onClick={() => { SC(c); goHome(); SMob(false); }}>
          {getTileIcon(c)}
          <span>{c}</span><ChevronRight />
        </button>)}

        <hr />

        <div className="label">{t.specialWorkspace}</div>
        <button className={'nav ' + (active?.name === 'PAN Master Hub' ? 'sel' : '')} onClick={() => { tool({ name: 'PAN Master Hub', cat: 'Special Tools', status: 'ready' }); SMob(false); }}>
          <Wrench />
          <span>PAN Master Hub</span>
          <ChevronRight />
        </button>

        <hr />

        <div className="label">{t.personalize}</div>

        <label className="side-field">{t.language}
          <select value={lang} onChange={e => SL(e.target.value)}>
            <option>English</option>
            <option>Hindi</option>
            <option>Hinglish</option>
            <option>Tamil</option>
            <option>Telugu</option>
            <option>Marathi</option>
          </select>
        </label>

        <div className="side-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
          <span>{t.accentColour}</span>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input type="color" value={accent} onChange={e => SA(e.target.value)} style={{ flex: 1, height: '36px', cursor: 'pointer', background: 'transparent', border: '1px solid var(--line)', borderRadius: '6px' }} />
            <button style={{ padding: '6px 12px', fontSize: '11px', fontWeight: '600', background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--line)', borderRadius: '6px', cursor: 'pointer' }} onClick={() => SA('#052f52')}>Default</button>
          </div>
        </div>

        <div className="privacy" style={{ marginTop: '14px' }}>
          <LockKeyhole />
          <span><b>{t.privacyMinded}</b><small>{t.localToolsNote}</small></span>
        </div>

        <small className="disclaimer">AOS Tools keeps tool workflows on this website.</small>
      </aside>

      <main>
        {!active ? <>
          <section className="hero">
            <div>
              <div className="eyebrow">{t.freeToolkit}</div>
              <h1>{t.heroTitle1}<br /><span>{t.heroTitle2}</span></h1>
              <p>{t.heroDesc}</p>
              <div className="stats">
                <span><b>{items.length}+</b> {t.catalogModules}</span>
                <span><b>Local</b> {t.localProcessing}</span>
                <span><b>Free-first</b> {t.freeFirstSetup}</span>
              </div>
            </div>
            <div className="hero-graphic">
              <div className="float"><FileText size={18} />PDF</div>
              <div className="float"><ImageIcon size={18} />IMAGE</div>
              <div className="float"><Sparkles size={18} />AI</div>
            </div>
          </section>

          <div className="section-head">
            <div>
              <h2>{cat === 'All Tools' ? t.exploreTools : cat}</h2>
              <p>{query ? `Results for "${query}"` : t.selectTool}</p>
            </div>
            <span>{shown.length} items</span>
          </div>

          <div className="grid">
            {shown.map(tItem => <button key={tItem.cat + tItem.name} className="card" onClick={() => tItem.url ? window.open(tItem.url, '_blank', 'noopener,noreferrer') : tool(tItem)}>
              <span className={'tile ' + getTileClass(tItem.cat)}>
                {getTileIcon(tItem.cat)}
              </span>
              <b>{tItem.name}</b>
              <p>{tItem.url ? 'Official portal · opens in a new tab' : (tItem.status === 'ready' ? t.readyInWorkspace : t.comingSoonText)}</p>
              <span className="card-foot">
                {tItem.status === 'portal' ? (
                  <>
                    <em className="ready">Portal link</em>
                    <ChevronRight size={15} />
                  </>
                ) : tItem.status === 'ready' ? (
                  <>
                    <em className="ready">Ready</em>
                    <ChevronRight size={15} />
                  </>
                ) : (
                  <>
                    <em className="soon" style={{ color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '3px' }}><Clock size={12} /> Coming Soon</em>
                    <ChevronRight size={15} style={{ opacity: 0.4 }} />
                  </>
                )}
              </span>
            </button>)}
          </div>
        </> : <main className="workspace">
          <button className="back" onClick={() => goHome()} style={{ background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--line)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '16px', fontWeight: '600', fontSize: '12px' }}>
            <ArrowLeft size={14} /> All tools
          </button>
          <div className="tool-heading">
            <span className={'tile ' + getTileClass(active.cat)}>{getTileIcon(active.cat)}</span>
            <div><small>{active.cat}</small><h1>{active.name}</h1><p>Run this module in your AOS Tools workspace.</p></div>
          </div>
          {content()}
          {msg && <div className="message">{msg}</div>}
        </main>}
      </main>
    </div>

    <footer>
      <span>© {new Date().getFullYear()} {t.footerText}</span>
      <button onClick={() => {
        SD(false);
        SA('#052f52');
        SL('English');
      }}> <RotateCcw size={14} /> {t.resetAppearance}</button>
    </footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
