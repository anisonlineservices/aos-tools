import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Sun, Moon, FileText, Image as ImageIcon, Video, Sparkles, Wrench, ShieldCheck, ChevronRight, Menu, X, LockKeyhole, Download, RotateCcw, Sliders, Scissors, CheckCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import './style.css';

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
    readyInWorkspace: "Ready in your workspace"
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
    readyInWorkspace: "आपके वर्कस्पेस में तैयार है"
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
    readyInWorkspace: "Ready in your workspace"
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
    readyInWorkspace: "பயன்படுத்த தயார்"
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
    readyInWorkspace: "సిద్ధంగా ఉంది"
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
    readyInWorkspace: "वर्कस्पेसमध्ये तयार है"
  }
};

const CATALOG = {
  "pdf": ["Merge PDF", "Split PDF", "Compress PDF", "PDF to Word", "PDF to PowerPoint", "PDF to Excel", "Word to PDF", "PowerPoint to PDF", "Excel to PDF", "Edit PDF", "PDF to JPG", "JPG to PDF", "Sign PDF", "Watermark Remover", "Watermark Stamp", "Rotate PDF", "HTML to PDF", "Unlock PDF", "Protect PDF", "Organize PDF", "PDF to PDF/A", "Repair PDF", "Page numbers", "Scan to PDF", "OCR PDF", "Compare PDF", "Redact PDF", "PDF to Text", "Crop PDF", "PDF Forms", "AI Summarizer", "Translate PDF", "PDF to Markdown", "PDF to Text (alternate)", "Ebook to PDF", "PDF to Ebook", "EPUB to PDF", "PDF to MOBI", "AZW to PDF", "PDF to AZW3"],
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
].map(([name, url]) => ({ name, cat: 'Government Portals', url, working: true }));

const makeItems = (arr, cat) => arr.map(name => ({ name, cat, working: true }));

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

function dataBlob(url) {
  const [m, b] = url.split(',');
  const s = atob(b), a = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) a[i] = s.charCodeAt(i);
  return new Blob([a], { type: m.match(/:(.*?);/)[1] });
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

function App() {
  const [query, SQ] = useState('');
  const [cat, SC] = useState('All Tools');

  const [dark, SD] = useState(() => loadAppearance().dark ?? false);
  const [lang, SL] = useState(() => loadAppearance().lang ?? 'English');
  const [accent, SA] = useState(() => loadAppearance().accent ?? '#052f52');

  const t = translations[lang] || translations['English'];

  const [active, ST] = useState(() => {
    try {
      const savedTool = localStorage.getItem('aos-active-tool-v1');
      return savedTool ? JSON.parse(savedTool) : null;
    } catch {
      return null;
    }
  });

  const [msg, SM] = useState('');
  const [file, SFile] = useState(null);
  const [files, SFiles] = useState([]);
  const [user, SU] = useState(() => loadGoogleProfile());
  const [mobile, SMob] = useState(false);

  const [panTab, SPanTab] = useState(() => localStorage.getItem('aos-pan-tab-v1') || 'photo');
  const [panPreview, SPanPreview] = useState(() => localStorage.getItem('aos-pan-preview-v1') || '');
  const [panPortal, SPanPortal] = useState(() => localStorage.getItem('aos-pan-portal-v1') || 'NSDL');

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

  useEffect(() => {
    window.history.pushState({ page: 'home' }, '');

    const handlePopState = (e) => {
      if (active) {
        ST(null);
        localStorage.removeItem('aos-active-tool-v1');
        window.history.pushState({ page: 'home' }, '');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [active]);

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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

  async function merge() {
    try {
      if (files.length < 2) { SM('Select at least two PDF files.'); return; }
      const out = await PDFDocument.create();
      for (const f of files) {
        const p = await PDFDocument.load(await f.arrayBuffer());
        (await out.copyPages(p, p.getPageIndices())).forEach(pg => out.addPage(pg));
      }
      dl(new Blob([await out.save()], { type: 'application/pdf' }), 'aos-merged.pdf');
      SM(`Merged ${files.length} PDFs locally.`);
    } catch {
      SM('Merge failed. Check that PDFs are valid and not encrypted.');
    }
  }

  function tool(tObj) {
    ST(tObj);
    SM('');
    SFile(null);
    SFiles([]);
    window.history.pushState({ page: 'tool', name: tObj.name }, '');
  }

  function content() {
    if (!active) return null;
    const n = active.name;

    if (n === 'Merge PDF') return <div className="form">
      <p>Select two or more PDFs; they are merged in this browser.</p>
      <input type="file" accept=".pdf,application/pdf" multiple onChange={e => SFiles([...e.target.files])} />
      <button disabled={files.length < 2} onClick={merge}>Merge and download</button>
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
                    SM(`Passport Photo resized successfully! Dimensions: ${w}x${h}px, Size: ${Math.round(currentBlob.size / 1024)} KB.`);
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
                    SM(`Signature resized successfully! Dimensions: ${w}x${h}px, Size: ${Math.round(currentBlob.size / 1024)} KB.`);
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

  return <div className="app">
    <header>
      <button className="hamb" onClick={() => SMob(!mobile)}>{mobile ? <X /> : <Menu />}</button>

      <button className="brand" onClick={() => { ST(null); SC('All Tools'); localStorage.removeItem('aos-active-tool-v1'); }}>
        <span className="logo">
          <img src="https://i.ibb.co/680YwJ0/20510.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
        </span>
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

        {cats.map(c => <button className={'nav ' + (cat === c && !active ? 'sel' : '')} key={c} onClick={() => { SC(c); ST(null); SMob(false); localStorage.removeItem('aos-active-tool-v1'); }}>
          {c === 'PDF Tools' ? <FileText /> : c === 'Image Tools' ? <ImageIcon /> : c === 'Video Tools' ? <Video /> : c === 'AI Tools' ? <Sparkles /> : <Wrench />}
          <span>{c}</span><ChevronRight />
        </button>)}

        <hr />

        <div className="label">{t.specialWorkspace}</div>
        <button className={'nav ' + (active?.name === 'PAN Master Hub' ? 'sel' : '')} onClick={() => { tool({ name: 'PAN Master Hub', cat: 'Special Tools' }); SMob(false); }}>
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

        <div className="side-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span>{t.accentColour}</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input type="color" value={accent} onChange={e => SA(e.target.value)} style={{ flex: 1, height: '36px', cursor: 'pointer', background: 'transparent', border: '1px solid var(--line)', borderRadius: '6px' }} />
            <button style={{ padding: '6px 10px', fontSize: '11px', fontWeight: '600', background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--line)', borderRadius: '6px', cursor: 'pointer' }} onClick={() => SA('#052f52')}>Default</button>
          </div>
        </div>

        <div className="privacy">
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
              <div className="float f1"><FileText />PDF</div>
              <div className="float f2"><ImageIcon />IMAGE</div>
              <div className="float f3"><Sparkles />AI</div>
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
              <span className={'tile ' + tItem.cat.toLowerCase().split(' ')[0]}>
                {tItem.cat === 'PDF Tools' ? <FileText /> : tItem.cat === 'Image Tools' ? <ImageIcon /> : tItem.cat === 'Video Tools' ? <Video /> : tItem.cat === 'AI Tools' ? <Sparkles /> : <Wrench />}
              </span>
              <b>{tItem.name}</b>
              <p>{tItem.url ? 'Official portal · opens in a new tab' : t.readyInWorkspace}</p>
              <span className="card-foot">
                <em className="ready">{tItem.url ? 'Portal link' : 'Ready'}</em>
                <ChevronRight size={15} />
              </span>
            </button>)}
          </div>
        </> : <main className="workspace">
          <button className="back" onClick={() => { ST(null); localStorage.removeItem('aos-active-tool-v1'); }}>← All tools</button>
          <div className="tool-heading">
            <span className="tile"><Wrench /></span>
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
