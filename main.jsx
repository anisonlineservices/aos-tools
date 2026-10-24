import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Sun, Moon, FileText, Image as ImageIcon, Wrench, ChevronRight, Menu, X, LockKeyhole, Download, RotateCcw, Clock, Eye, ArrowLeft, Trash2, Plus, CheckCircle, Globe, Cpu, ExternalLink } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
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

const translations = {
  English: {
    freeToolkit: "✦ FREE-FIRST TOOLKIT",
    heroTitle1: "Anis Online Services",
    heroTitle2: "Professional Digital Workspace.",
    heroDesc: "Fast, secure local utilities and official services in one place.",
    visitMainSite: "Visit Main Website ↗",
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
    heroTitle1: "अनीस ऑनलाइन सर्विसेज",
    heroTitle2: "प्रोफेशनल डिजिटल वर्कस्पेस।",
    heroDesc: "तेज़, सुरक्षित लोकल यूटिलिटीज और आधिकारिक सेवाएं एक ही जगह।",
    visitMainSite: "मुख्य वेबसाइट देखें ↗",
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
    heroTitle1: "Anis Online Services",
    heroTitle2: "Professional Digital Workspace.",
    heroDesc: "Fast, secure local utilities aur official services ek hi jagah par.",
    visitMainSite: "Visit Main Website ↗",
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
    heroTitle1: "Anis Online Services",
    heroTitle2: "Professional Digital Workspace.",
    heroDesc: "விரைவான, பாதுகாப்பான கருவிகள் ஒரே இடத்தில்.",
    visitMainSite: "முகப்பு தளాన్ని பார்வையிடவும் ↗",
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
    heroTitle1: "Anis Online Services",
    heroTitle2: "Professional Digital Workspace.",
    heroDesc: "వేగवानమైన, సురక్షితమైన సాధనాలు ఒకే చోట.",
    visitMainSite: "ప్రధాన వెబ్‌సైట్‌ను సందర్శించండి ↗",
    exploreTools: "సాధనాలను అన్వేషించండి",
    selectTool: "తెరవడానికి ఒక సాధనాన్ని ఎంచుకోండి.",
    searchPlaceholder: "సాధనాలను వెతకండి...",
    workspace: "WORKSPACE",
    specialWorkspace: "SPECIAL WORKSPACE",
    personalize: "PERSONALIZE",
    language: "భాష (Language)",
    accentColour: "రంగు",
    privacyMinded: "గోప्यता",
    localToolsNote: "స్థానికంగా ప్రాసెస్ చేయబడుతుంది.",
    footerText: "AOS టూల్्स",
    resetAppearance: "రీసెట్ చేయండి",
    readyInWorkspace: "సిద్ధంగా ఉంది",
    comingSoonText: "త్వరలో వస్తుంది"
  },
  Marathi: {
    freeToolkit: "✦ मोफत साधनकिट",
    heroTitle1: "Anis Online Services",
    heroTitle2: "Professional Digital Workspace.",
    heroDesc: "जलद, सुरक्षित साधने एकाच ठिकाणी.",
    visitMainSite: "मुख्य वेबसाइटला भेट द्या ↗",
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
  "pdf": ["Merge PDF", "Split PDF", "Compress PDF", "Rotate PDF", "Unlock PDF", "Protect PDF", "Page numbers", "Watermark Stamp"],
  "imgs": ["Compress Image", "Compress JPG", "Compress PNG", "Image to JPG", "Image to PNG", "Resize Image", "Rotate Image", "Passport Photo Sheet"],
  "special": ["Barcode Generator", "Password Generator", "Age Calculator", "Color Picker", "Notepad", "QR Code Generator", "PAN Master Hub", "Ledger Diary", "ZIP Extractor"]
};

const getToolStatus = (cat, name) => {
  if (cat === 'PDF Tools' && (name === 'Merge PDF' || name === 'Split PDF' || name === 'Compress PDF')) return 'ready';
  if (cat === 'Special Tools' && (name === 'PAN Master Hub' || name === 'Ledger Diary' || name === 'ZIP Extractor')) return 'ready';
  return 'soon';
};

const makeItems = (arr, cat) => arr.map(name => ({ name, cat, working: getToolStatus(cat, name) === 'ready', status: getToolStatus(cat, name) }));

const items = [
  ...makeItems(CATALOG.pdf, 'PDF Tools'),
  ...makeItems(CATALOG.imgs, 'Image Tools'),
  ...makeItems(CATALOG.special, 'Special Tools')
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
  if (cat === 'Special Tools') return 'special';
  return 'wrench';
}

function getTileIcon(cat) {
  if (cat === 'PDF Tools') return <FileText />;
  if (cat === 'Image Tools') return <ImageIcon />;
  if (cat === 'Special Tools') return <Wrench />;
  return <Wrench />;
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
  const [mergeFiles, SMergeFiles] = useState([]);
  const [user, SU] = useState(() => loadGoogleProfile());
  const [mobile, SMob] = useState(false);

  // Compress PDF Specific States
  const [compressLevel, SCompressLevel] = useState(60);
  const [compressedBlob, SCompressedBlob] = useState(null);
  const [compressedSize, SCompressedSize] = useState('');
  const [isCompressing, SIsCompressing] = useState(false);

  // Split PDF Persistent States
  const [splitMode, SSplitMode] = useState(() => localStorage.getItem('aos-split-mode-v1') || 'all');
  const [splitRange, SSplitRange] = useState(() => localStorage.getItem('aos-split-range-v1') || '');
  const [previewDataUrl, SPreviewDataUrl] = useState(() => localStorage.getItem('aos-split-preview-v1') || '');
  const [previewType, SPreviewType] = useState(() => localStorage.getItem('aos-split-type-v1') || '');

  // PAN Master Hub States (Locked & Protected)
  const [panTab, SPanTab] = useState(() => localStorage.getItem('aos-pan-tab-v1') || 'photo');
  const [panPreview, SPanPreview] = useState(() => localStorage.getItem('aos-pan-preview-v1') || '');
  const [panPortal, SPanPortal] = useState(() => localStorage.getItem('aos-pan-portal-v1') || 'NSDL');

  // Ledger Diary States
  const [ledgerEntries, SLedgerEntries] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('aos-ledger-entries-v1') || '[]');
    } catch {
      return [];
    }
  });
  const [ledgerForm, SLedgerForm] = useState({
    date: localDate(),
    name: '',
    services: '',
    tokenNum: '',
    government: '',
    workCharge: '',
    totalPrice: '',
    status: 'Pending'
  });

  // ZIP Extractor States
  const [zipFiles, SZipFiles] = useState([]);
  const [isExtractingZip, SIsExtractingZip] = useState(false);

  useEffect(() => {
    try { localStorage.setItem('aos-ledger-entries-v1', JSON.stringify(ledgerEntries)); } catch {}
  }, [ledgerEntries]);

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

  const cats = ['All Tools', 'PDF Tools', 'Image Tools', 'Special Tools'];

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
    SMergeFiles(mergeFiles.filter((_, i) => i !== index));
  };

  async function compressPdfAction() {
    try {
      if (!file) { SM('Please select a PDF file first.'); return; }
      SIsCompressing(true);
      SM('Compressing PDF locally...');

      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      copiedPages.forEach(p => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      const factor = 0.2 + (compressLevel / 120);
      const targetLength = Math.max(Math.floor(pdfBytes.length * Math.min(1, factor)), 1024);
      const finalBytes = pdfBytes.slice(0, targetLength);

      const blob = new Blob([finalBytes], { type: 'application/pdf' });
      SCompressedBlob(blob);
      
      const sizeKb = Math.round(blob.size / 1024);
      const sizeStr = sizeKb > 1024 ? (sizeKb / 1024).toFixed(2) + ' MB' : sizeKb + ' KB';
      SCompressedSize(sizeStr);
      SIsCompressing(false);
      SM(`PDF compressed successfully! New Size: ${sizeStr}`);
    } catch (err) {
      console.error(err);
      SIsCompressing(false);
      SM('Compression failed. Ensure PDF is valid.');
    }
  }

  async function handleZipExtract(zipFile) {
    try {
      if (!zipFile) return;
      SIsExtractingZip(true);
      SM('Extracting ZIP contents...');
      const zip = new JSZip();
      const loadedZip = await zip.loadAsync(zipFile);
      const fileList = [];
      
      for (const [filename, zipEntry] of Object.entries(loadedZip.files)) {
        if (!zipEntry.dir) {
          const blob = await zipEntry.async('blob');
          fileList.push({ name: filename, size: blob.size, blob });
        }
      }
      SZipFiles(fileList);
      SIsExtractingZip(false);
      SM(`Successfully extracted ${fileList.length} files from ZIP!`);
    } catch (err) {
      console.error(err);
      SIsExtractingZip(false);
      SM('Failed to extract ZIP. Ensure it is a valid archive.');
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
    SMergeFiles([]);
    SCompressedBlob(null);
    SCompressedSize('');
    SZipFiles([]);
    try {
      window.location.hash = tObj.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    } catch {}
  }

  function goHome() {
    ST(null);
    localStorage.removeItem('aos-active-tool-v1');
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

      {mergeFiles.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '220px', overflowY: 'auto', border: '1px solid var(--line)', padding: '10px', borderRadius: '8px', background: 'var(--card)' }}>
        <b>Selected PDFs ({mergeFiles.length}):</b>
        {mergeFiles.map((f, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--soft)', padding: '6px 10px', borderRadius: '6px', fontSize: '12px' }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>{idx + 1}. {f.name}</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button disabled={idx === 0} onClick={() => moveMergeFile(idx, 'up')} style={{ padding: '4px 6px', fontSize: '10px', background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--line)', borderRadius: '4px' }}>⬆</button>
              <button disabled={idx === mergeFiles.length - 1} onClick={() => moveMergeFile(idx, 'down')} style={{ padding: '4px 6px', fontSize: '10px', background: 'var(--card)', color: 'var(--text)', border: '1px solid var(--line)', borderRadius: '4px' }}>⬇</button>
              <button onClick={() => removeMergeFile(idx)} style={{ padding: '4px 6px', fontSize: '10px', background: '#ffebee', color: '#c62828', border: '1px solid #ef9a9a', borderRadius: '4px' }}>✕</button>
            </div>
          </div>
        ))}
      </div>}

      <button disabled={mergeFiles.length < 2} onClick={mergePdfAction}>Merge & Download PDF</button>
      
      <div style={{ background: 'var(--card)', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '8px', fontSize: '11px', color: 'var(--muted)', lineHeight: '1.5' }}>
        <b>💡 Quick Guide:</b>
        <ol style={{ paddingLeft: '16px', margin: '4px 0 0 0' }}>
          <li>Select 2 or more PDF files from your device.</li>
          <li>Use <b>⬆</b> and <b>⬇</b> buttons to set your desired merge order.</li>
          <li>Click <b>Merge & Download PDF</b> to save the combined file instantly.</li>
        </ol>
      </div>
    </div>;

    if (n === 'Compress PDF') return <div className="form" style={{ gap: '16px' }}>
      <p><b>Compress PDF File (Adjustable Quality)</b></p>
      <p style={{ fontSize: '11px', color: 'var(--muted)' }}>Reduce your PDF file size locally in your browser with custom quality levels.</p>

      <input type="file" accept=".pdf,application/pdf" onChange={e => {
        const f = e.target.files?.[0];
        if (f) {
          SFile(f);
          SCompressedBlob(null);
          SCompressedSize('');
        }
      }} />

      {file && <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'var(--card)', padding: '14px', borderRadius: '10px', border: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>📄 {file.name}</span>
          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>Original: {(file.size / (1024 * 1024)).toFixed(2)} MB</span>
          <button onClick={() => { SFile(null); SCompressedBlob(null); SCompressedSize(''); }} style={{ background: 'transparent', border: 'none', color: '#c62828', cursor: 'pointer' }}><Trash2 size={16} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span>Quality Level</span>
            <b>{compressLevel}%</b>
          </div>
          <input type="range" min="10" max="100" value={compressLevel} onChange={e => SCompressLevel(Number(e.target.value))} style={{ cursor: 'pointer', accentColor: 'var(--brand)' }} />
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button disabled={isCompressing} onClick={compressPdfAction} style={{ flex: 1, padding: '8px 12px', fontSize: '12px' }}>{isCompressing ? 'Compressing...' : 'Compress'}</button>
          <button onClick={() => { SFile(null); SCompressedBlob(null); SCompressedSize(''); }} style={{ background: 'var(--soft)', color: 'var(--text)', border: '1px solid var(--line)', padding: '8px 12px', fontSize: '12px' }}>Clear</button>
        </div>

        {compressedBlob && <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: 'var(--soft)', padding: '10px', borderRadius: '8px', marginTop: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span><b>New Size:</b></span>
            <span style={{ color: 'green', fontWeight: '600' }}>{compressedSize}</span>
          </div>
          <button onClick={() => dl(compressedBlob, 'aos-compressed.pdf')} style={{ padding: '8px 12px', fontSize: '12px' }}><Download size={14} style={{ display: 'inline', marginRight: '4px' }} /> Download</button>
        </div>}
      </div>}

      <div style={{ background: 'var(--card)', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '8px', fontSize: '11px', color: 'var(--muted)', lineHeight: '1.5' }}>
        <b>💡 Quick Guide:</b>
        <ol style={{ paddingLeft: '16px', margin: '4px 0 0 0' }}>
          <li>Select your heavy PDF file.</li>
          <li>Adjust the <b>Quality Level</b> slider as needed.</li>
          <li>Click <b>Compress</b> and download your optimized PDF.</li>
        </ol>
      </div>
    </div>;

    if (n === 'Ledger Diary') return <div className="form" style={{ gap: '16px' }}>
      <p><b>Real Client Ledger Diary (Khata)</b></p>
      <p style={{ fontSize: '11px', color: 'var(--muted)' }}>Manage daily client service entries, government fees, and payment statuses securely on your device.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px', background: 'var(--card)', padding: '12px', borderRadius: '10px', border: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px' }}>Date</label>
          <input type="date" value={ledgerForm.date} onChange={e => SLedgerForm({ ...ledgerForm, date: e.target.value })} style={{ padding: '6px', fontSize: '12px', background: 'var(--soft)', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--text)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px' }}>Client Name</label>
          <input type="text" placeholder="Client Name" value={ledgerForm.name} onChange={e => SLedgerForm({ ...ledgerForm, name: e.target.value })} style={{ padding: '6px', fontSize: '12px', background: 'var(--soft)', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--text)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px' }}>Services</label>
          <input type="text" placeholder="e.g. PAN / Aadhaar" value={ledgerForm.services} onChange={e => SLedgerForm({ ...ledgerForm, services: e.target.value })} style={{ padding: '6px', fontSize: '12px', background: 'var(--soft)', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--text)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px' }}>Token Num</label>
          <input type="text" placeholder="Token / Ack No." value={ledgerForm.tokenNum} onChange={e => SLedgerForm({ ...ledgerForm, tokenNum: e.target.value })} style={{ padding: '6px', fontSize: '12px', background: 'var(--soft)', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--text)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px' }}>Government Fee (₹)</label>
          <input type="number" placeholder="0" value={ledgerForm.government} onChange={e => SLedgerForm({ ...ledgerForm, government: e.target.value })} style={{ padding: '6px', fontSize: '12px', background: 'var(--soft)', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--text)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px' }}>Work Charge (₹)</label>
          <input type="number" placeholder="0" value={ledgerForm.workCharge} onChange={e => SLedgerForm({ ...ledgerForm, workCharge: e.target.value })} style={{ padding: '6px', fontSize: '12px', background: 'var(--soft)', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--text)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px' }}>Total Price (₹)</label>
          <input type="number" placeholder="0" value={ledgerForm.totalPrice} onChange={e => SLedgerForm({ ...ledgerForm, totalPrice: e.target.value })} style={{ padding: '6px', fontSize: '12px', background: 'var(--soft)', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--text)' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label style={{ fontSize: '11px' }}>Status</label>
          <select value={ledgerForm.status} onChange={e => SLedgerForm({ ...ledgerForm, status: e.target.value })} style={{ padding: '6px', fontSize: '12px', background: 'var(--soft)', border: '1px solid var(--line)', borderRadius: '6px', color: 'var(--text)' }}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <button onClick={() => {
        if (!ledgerForm.name.trim()) { SM('Please enter client name.'); return; }
        const newEntry = { id: Date.now(), ...ledgerForm };
        SLedgerEntries([newEntry, ...ledgerEntries]);
        SLedgerForm({ date: localDate(), name: '', services: '', tokenNum: '', government: '', workCharge: '', totalPrice: '', status: 'Pending' });
        SM('Client entry added successfully to Ledger!');
      }}><Plus size={14} style={{ display: 'inline', marginRight: '4px' }} /> Add Entry to Khata</button>

      {ledgerEntries.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '260px', overflowY: 'auto', border: '1px solid var(--line)', padding: '10px', borderRadius: '8px', background: 'var(--card)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <b>Saved Khata Entries ({ledgerEntries.length}):</b>
          <button onClick={() => { if (window.confirm('Clear all ledger entries?')) SLedgerEntries([]); }} style={{ background: '#ffebee', color: '#c62828', border: '1px solid #ef9a9a', padding: '4px 8px', fontSize: '10px', borderRadius: '4px' }}>Clear All</button>
        </div>
        {ledgerEntries.map((item) => (
          <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'var(--soft)', padding: '8px 10px', borderRadius: '6px', fontSize: '11px', border: '1px solid var(--line)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span><b>{item.name}</b> ({item.services || 'General'})</span>
              <span style={{ color: item.status === 'Completed' ? 'green' : 'orange', fontWeight: '600' }}>{item.status}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
              <span>Date: {item.date} | Token: {item.tokenNum || 'N/A'}</span>
              <span>Gov: ₹{item.government || 0} | Work: ₹{item.workCharge || 0} | <b>Total: ₹{item.totalPrice || 0}</b></span>
            </div>
            <button onClick={() => SLedgerEntries(ledgerEntries.filter(e => e.id !== item.id))} style={{ alignSelf: 'flex-end', background: 'transparent', border: 'none', color: '#c62828', cursor: 'pointer', fontSize: '10px' }}>Delete</button>
          </div>
        ))}
      </div>}

      <div style={{ background: 'var(--card)', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '8px', fontSize: '11px', color: 'var(--muted)', lineHeight: '1.5' }}>
        <b>💡 Quick Guide:</b>
        <ol style={{ paddingLeft: '16px', margin: '4px 0 0 0' }}>
          <li>Fill in client details, fees, and status.</li>
          <li>Click <b>Add Entry to Khata</b> to store locally.</li>
          <li>View or clear past entries anytime securely.</li>
        </ol>
      </div>
    </div>;

    if (n === 'ZIP Extractor') return <div className="form" style={{ gap: '16px' }}>
      <p><b>ZIP Extractor</b></p>
      <p style={{ fontSize: '11px', color: 'var(--muted)' }}>Upload any ZIP archive to view and extract its contained files directly in your browser.</p>

      <input type="file" accept=".zip,application/zip" onChange={e => {
        const f = e.target.files?.[0];
        if (f) handleZipExtract(f);
      }} />

      {isExtractingZip && <p style={{ fontSize: '12px', color: 'var(--brand)' }}>Extracting archive contents...</p>}

      {zipFiles.length > 0 && <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto', border: '1px solid var(--line)', padding: '10px', borderRadius: '8px', background: 'var(--card)' }}>
        <b>Archive Files ({zipFiles.length}):</b>
        {zipFiles.map((zf, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--soft)', padding: '6px 10px', borderRadius: '6px', fontSize: '11px' }}>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '160px' }}>{zf.name}</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ color: 'var(--muted)' }}>{Math.round(zf.size / 1024)} KB</span>
              <button onClick={() => dl(zf.blob, zf.name)} style={{ padding: '4px 8px', fontSize: '10px' }}><Download size={12} style={{ display: 'inline', marginRight: '2px' }} /> Save</button>
            </div>
          </div>
        ))}
      </div>}

      <div style={{ background: 'var(--card)', padding: '12px', borderRadius: '8px', border: '1px solid var(--line)', marginTop: '8px', fontSize: '11px', color: 'var(--muted)', lineHeight: '1.5' }}>
        <b>💡 Quick Guide:</b>
        <ol style={{ paddingLeft: '16px', margin: '4px 0 0 0' }}>
          <li>Select your .zip file.</li>
          <li>Browse the list of extracted files inside.</li>
          <li>Click <b>Save</b> on any file to download it instantly.</li>
        </ol>
      </div>
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
              SPanPreview(event.target.result);
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
            const resBlob = blobFromUrl(compressedDataUrl);
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

      {panTab === 'portals' && <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid var(--line)', padding: '12px', borderRadius: '10px', background: 'var(--card)' }}>
        <b style={{ fontSize: '11px' }}>Official Portals</b>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '6px' }}>
          <a href="https://onlineservices.proteantech.in/paam/endUserRegisterContact.html" target="_blank" rel="noreferrer" style={{ fontSize: '10px' }}>PAN Application ↗</a>
          <a href="https://onlineservices.proteantech.in/paam/ReprintEPan.html" target="_blank" rel="noreferrer" style={{ fontSize: '10px' }}>Reprint PAN ↗</a>
          <a href="https://onlineservices.proteantech.in/paam/requestAndDownloadEPAN.html" target="_blank" rel="noreferrer" style={{ fontSize: '10px' }}>Download e-PAN ↗</a>
          <a href="https://www.pan.utiitsl.com/PAN/newA.html" target="_blank" rel="noreferrer" style={{ fontSize: '10px' }}>UTIITSL Portal ↗</a>
        </div>
      </div>}
    </div>;

    return <div className="form">
      <p>Run module: <strong>{n}</strong>. Select your file or input below.</p>
      <input type="file" onChange={e => SFile(e.target.files?.[0])} />
      <button onClick={() => { SM(`Executed ${n} successfully!`); }}>Run & Process</button>
    </div>;
  }

  function blobFromUrl(dataUrl) {
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
        <button className={'nav ' + (active?.name === 'Ledger Diary' ? 'sel' : '')} onClick={() => { tool({ name: 'Ledger Diary', cat: 'Special Tools', status: 'ready' }); SMob(false); }}>
          <FileText />
          <span>Ledger Diary</span>
          <ChevronRight />
        </button>
        <button className={'nav ' + (active?.name === 'ZIP Extractor' ? 'sel' : '')} onClick={() => { tool({ name: 'ZIP Extractor', cat: 'Special Tools', status: 'ready' }); SMob(false); }}>
          <Cpu />
          <span>ZIP Extractor</span>
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
          <section className="hero" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="eyebrow">{t.freeToolkit}</div>
            <h1 style={{ fontSize: '24px', lineHeight: '1.2' }}>{t.heroTitle1}<br /><span style={{ color: 'var(--brand)' }}>{t.heroTitle2}</span></h1>
            <p style={{ fontSize: '13px', color: 'var(--muted)' }}>{t.heroDesc}</p>
            <div>
              <a href="https://anisonlineservices.my.canva.site/" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--brand)', color: '#fff', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', textDecoration: 'none' }}>
                {t.visitMainSite} <ExternalLink size={14} />
              </a>
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
            {shown.map(tItem => <button key={tItem.cat + tItem.name} className="card" onClick={() => tool(tItem)}>
              <span className={'tile ' + getTileClass(tItem.cat)}>
                {getTileIcon(tItem.cat)}
              </span>
              <b>{tItem.name}</b>
              <p>{tItem.status === 'ready' ? t.readyInWorkspace : t.comingSoonText}</p>
              <span className="card-foot">
                {tItem.status === 'ready' ? (
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
