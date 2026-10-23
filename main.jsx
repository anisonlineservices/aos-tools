import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Sun, Moon, FileText, Image as ImageIcon, Video, Sparkles, Wrench, ShieldCheck, ChevronRight, Menu, X, LockKeyhole, Download, RotateCcw } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import QRCode from 'qrcode';
import JSZip from 'jszip';
import './style.css';

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
  const [font, SF] = useState(() => loadAppearance().font ?? 'Inter');
  const [accent, SA] = useState(() => loadAppearance().accent ?? '#052f52');

  const [active, ST] = useState(null);
  const [msg, SM] = useState('');
  const [file, SFile] = useState(null);
  const [files, SFiles] = useState([]);
  const [pwLen, SP] = useState(16);
  const [pw, SPw] = useState('');
  const [dob, SDob] = useState('');
  const [age, SAge] = useState('');
  const [qr, SQr] = useState('https://example.com');
  const [qrImg, SQi] = useState('');
  const [pages, SPages] = useState('1');
  const [rotation, SRotation] = useState(90);
  const [order, SOrder] = useState('1,2,3');
  const [html, SH] = useState('<h1>Hello AOS Tools</h1>\n<p>Preview your HTML here.</p>');

  const [entries, SE] = useState(() => {
    try { return JSON.parse(localStorage.getItem('aos-khata-v1') || '[]'); }
    catch { return []; }
  });

  const [ledger, SLed] = useState({ date: localDate(), name: '', services: '', token: '', government: '0', charge: '0', status: 'Pending' });
  const [ledgerSearch, SLSearch] = useState('');
  const [user, SU] = useState(() => loadGoogleProfile());
  const [mobile, SMob] = useState(false);
  const [utilText, SUtilText] = useState('');
  const [utilOut, SUtilOut] = useState('');
  const [utilNum, SUtilNum] = useState('100');
  const [barcodeText, SBarcodeText] = useState('AOS-TOOLS-123');
  const [zipNames, SZipNames] = useState([]);
  const [qrType, SQrType] = useState('URL or plain text');
  const [panType, SPanType] = useState('Photo (213x213 px, Max 20KB)');

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
    root.dataset.theme = dark ? 'dark' : 'light';
    root.style.setProperty('--brand', accent);

    const fonts = ['Inter', 'Roboto', 'Poppins', 'DM Sans', 'Manrope', 'Space Grotesk', 'Open Sans', 'Work Sans', 'Arial', 'Georgia'];
    const safeFont = fonts.includes(font) ? font : 'Inter';
    root.style.setProperty('--font', `"${safeFont}", system-ui, sans-serif`);
  }, [dark, accent, font]);

  useEffect(() => {
    try {
      localStorage.setItem('aos-appearance-v1', JSON.stringify({ dark, lang, font, accent }));
    } catch { }
  }, [dark, lang, font, accent]);

  useEffect(() => {
    try {
      localStorage.setItem('aos-khata-v1', JSON.stringify(entries));
    } catch { }
  }, [entries]);

  useEffect(() => {
    if (!clientId || user) return;

    const checkGoogleLoaded = setInterval(() => {
      const google = window.google?.accounts?.id;
      const el = document.getElementById('google-button');

      if (google && el) {
        clearInterval(checkGoogleLoaded);
        try {
          google.initialize({
            client_id: clientId,
            callback: (r) => {
              try {
                if (!r?.credential) {
                  SM('Google sign-in response was missing.');
                  return;
                }
                const payload = r.credential.split('.')[1];
                const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
                const p = JSON.parse(atob(base64));

                const profile = {
                  name: typeof p.name === 'string' ? p.name : '',
                  email: typeof p.email === 'string' ? p.email : '',
                  picture: typeof p.picture === 'string' ? p.picture : ''
                };

                if (!profile.name || !profile.email) {
                  SM('Google profile details were incomplete.');
                  return;
                }

                localStorage.setItem(GOOGLE_PROFILE_KEY, JSON.stringify(profile));
                SU(profile);
                SM('Signed in successfully.');
              } catch {
                SM('Unable to read Google sign-in response.');
              }
            }
          });

          el.replaceChildren();
          google.renderButton(el, {
            theme: dark ? 'filled_black' : 'outline',
            size: 'medium',
            shape: 'pill'
          });
        } catch (e) {
          console.error('Google Sign-In error:', e);
        }
      }
    }, 200);

    return () => clearInterval(checkGoogleLoaded);
  }, [clientId, dark, user]);

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

  function tool(t) {
    ST(t);
    SM('');
    SFile(null);
    SFiles([]);
    SPw('');
    SAge('');
    SQi('');
    SUtilText('');
    SUtilOut('');
  }

  function content() {
    if (!active) return null;
    const n = active.name;

    if (n === 'Merge PDF') return <div className="form">
      <p>Select two or more PDFs; they are merged in this browser.</p>
      <input type="file" accept=".pdf,application/pdf" multiple onChange={e => SFiles([...e.target.files])} />
      <button disabled={files.length < 2} onClick={merge}>Merge and download</button>
    </div>;

    if (n === 'PAN Master Hub') return <div className="form" style={{ gap: '20px' }}>
      <p><b>Anis Online Services — Official PAN Hub & Document Resizer</b></p>
      <p style={{ fontSize: '11px', color: 'var(--muted)', lineHeight: '1.6' }}>
        Quickly resize photos and signatures according to official NSDL/UTIITSL requirements, view document checklist guidelines, and access direct official portal links.
      </p>

      <div style={{ background: 'var(--soft)', padding: '15px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <b style={{ fontSize: '12px', color: 'var(--brand)' }}>Direct Official Portals & Services</b>
        <div className="portal" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '8px' }}>
          <a href="https://onlineservices.proteantech.in/paam/endUserRegisterContact.html" target="_blank" rel="noreferrer">Online PAN Application ↗</a>
          <a href="https://onlineservices.proteantech.in/paam/ReprintEPan.html" target="_blank" rel="noreferrer">Request Reprint of PAN ↗</a>
          <a href="https://onlineservices.proteantech.in/paam/requestAndDownloadEPAN.html" target="_blank" rel="noreferrer">Download e-PAN / XML ↗</a>
          <a href="https://tin.tin.proteantech.in/pantan/StatusTrack.html" target="_blank" rel="noreferrer">Track PAN Status ↗</a>
          <a href="https://www.pan.utiitsl.com/PAN/newA.html" target="_blank" rel="noreferrer">UTIITSL Portal ↗</a>
          <a href="https://www.incometax.gov.in/iec/foportal/" target="_blank" rel="noreferrer">Income Tax Department ↗</a>
        </div>
      </div>

      <hr />

      <div style={{ border: '1px solid var(--line)', padding: '15px', borderRadius: '12px' }}>
        <b style={{ fontSize: '12px' }}>Official Document Resizer & Cropper</b>
        <label>Select Document Type</label>
        <select value={panType} onChange={e => SPanType(e.target.value)}>
          <option>Photo (213x213 px, Max 20KB)</option>
          <option>Signature (300x80 px, Max 10KB)</option>
          <option>Supporting Document (PDF/A, Max 300KB)</option>
        </select>
        <input type="file" accept="image/*,.pdf" onChange={e => SFile(e.target.files?.[0])} style={{ marginTop: '10px' }} />
        <button style={{ marginTop: '10px' }} disabled={!file} onClick={async () => {
          if (panType.includes('Supporting')) {
            try {
              const u = URL.createObjectURL(file);
              const img = new Image();
              img.onload = async () => {
                const pdfDoc = await PDFDocument.create();
                const page = pdfDoc.addPage([595, 842]);
                
                const maxW = 600;
                let w = img.naturalWidth, h = img.naturalHeight;
                if (w > maxW) {
                  h = Math.round((h * maxW) / w);
                  w = maxW;
                }
                const canvas = document.createElement('canvas');
                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.fillStyle = '#fff';
                ctx.fillRect(0, 0, w, h);
                ctx.drawImage(img, 0, 0, w, h);
                
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.45); // Strong compression to ensure < 300KB
                const resBlob = dataBlob(compressedDataUrl);
                const imgBytes = await resBlob.arrayBuffer();
                const embedded = await pdfDoc.embedJpg(imgBytes);
                
                page.drawImage(embedded, { x: 30, y: 30, width: 535, height: 782 });
                const pdfBytes = await pdfDoc.save();
                
                dl(new Blob([pdfBytes], { type: 'application/pdf' }), 'aos-pan-supporting-doc.pdf');
                SM(`Supporting document compressed successfully (${Math.round(pdfBytes.size / 1024)} KB < 300KB). Ready for portal!`);
                URL.revokeObjectURL(u);
              };
              img.onerror = () => {
                SM('Kripya supporting document ke liye scanned PDF ki jagah photo/image (JPG/PNG) upload karein taaki tool use 300KB ke andar compress kar sake.');
                URL.revokeObjectURL(u);
              };
              img.src = u;
            } catch {
              SM('Could not process supporting document.');
            }
            return;
          }

          const u = URL.createObjectURL(file), im = new Image();
          im.onload = () => {
            const isPhoto = panType.includes('Photo');
            let w = isPhoto ? 213 : 300;
            let h = isPhoto ? 213 : 80;
            const c = document.createElement('canvas');
            c.width = w; c.height = h;
            const ctx = c.getContext('2d');
            ctx.fillStyle = 'white'; ctx.fillRect(0, 0, w, h);
            const scale = Math.min(w / im.naturalWidth, h / im.naturalHeight);
            const dw = im.naturalWidth * scale, dh = im.naturalHeight * scale;
            ctx.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
            c.toBlob(b => {
              if (b) {
                dl(b, `aos-pan-${isPhoto ? 'photo' : 'signature'}.jpg`);
                SM(`Resized successfully (${w}x${h}px, ${Math.round(b.size / 1024)} KB).`);
              } else SM('Export failed.');
            }, 'image/jpeg', .85);
            URL.revokeObjectURL(u);
          };
          im.src = u;
        }}>Resize & Download File</button>
      </div>

      <div style={{ fontSize: '11px', color: 'var(--muted)', background: 'var(--soft)', padding: '15px', borderRadius: '12px', lineHeight: '1.6' }}>
        <b>📋 Official PAN Document Guidelines Summary:</b>
        <br />• <b>Photograph:</b> 3.5 x 2.5 cm (213x213 pixels), Max 20 KB (JPEG).
        <br />• <b>Signature:</b> 2.0 x 4.5 cm (300x80 pixels), Max 10 KB (JPEG).
        <br />• <b>Supporting Docs:</b> PDF format, Max 300 KB per page.
        <br /><span style={{ color: '#b95b22' }}>⚠️ Note: Supporting documents ke liye image (JPG/PNG) upload karein taaki tool size 300 KB se kam kar sake.</span>
      </div>
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

      <button className="brand" onClick={() => { ST(null); SC('All Tools'); }}>
        <span className="logo">A</span>
        <span>AOS <b>TOOLS</b><small>FREE & SECURE</small></span>
      </button>

      <div className="search">
        <Search />
        <input value={query} placeholder="Search tools..." onChange={e => SQ(e.target.value)} />
      </div>

      <div className="head-actions">
        <select value={lang} onChange={e => SL(e.target.value)}>
          <option>English</option><option>Hindi</option><option>Hinglish</option><option>Tamil</option><option>Telugu</option><option>Marathi</option>
        </select>

        <button className="round" onClick={() => SD(!dark)}>{dark ? <Sun /> : <Moon />}</button>

        <div id="google-button">
          {!clientId && !user && <button className="signin" onClick={() => SM('Set VITE_GOOGLE_CLIENT_ID in .env.local')}>Sign in</button>}
        </div>

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
        <div className="label">WORKSPACE</div>

        {cats.map(c => <button className={'nav ' + (cat === c ? 'sel' : '')} key={c} onClick={() => { SC(c); ST(null); SMob(false); }}>
          {c === 'PDF Tools' ? <FileText /> : c === 'Image Tools' ? <ImageIcon /> : c === 'Video Tools' ? <Video /> : c === 'AI Tools' ? <Sparkles /> : <Wrench />}
          <span>{c}</span><ChevronRight />
        </button>)}

        <hr />

        <div className="label">SPECIAL WORKSPACE</div>
        <button className={'nav ' + (active?.name === 'PAN Master Hub' ? 'sel' : '')} onClick={() => { tool({ name: 'PAN Master Hub', cat: 'Special Tools' }); SMob(false); }}>
          <Wrench />
          <span>PAN Master Hub</span>
          <ChevronRight />
        </button>

        <hr />

        <div className="label">PERSONALIZE</div>

        <label className="side-field">Font
          <select value={font} onChange={e => SF(e.target.value)}>
            {['Inter', 'Roboto', 'Poppins', 'DM Sans', 'Manrope', 'Space Grotesk', 'Open Sans', 'Work Sans', 'Arial', 'Georgia'].map(f => <option key={f}>{f}</option>)}
          </select>
        </label>

        <label className="side-field">Accent colour
          <input type="color" value={accent} onChange={e => SA(e.target.value)}/>
        </label>

        <div className="privacy">
          <LockKeyhole />
          <span><b>Privacy-minded</b><small>Tools process locally.</small></span>
        </div>

        <small className="disclaimer">AOS Tools keeps tool workflows on this website.</small>
      </aside>

      <main>
        {!active ? <>
          <section className="hero">
            <div>
              <div className="eyebrow">✦ FREE-FIRST TOOLKIT</div>
              <h1>Free tools.<br /><span>One simple workspace.</span></h1>
              <p>PDF, image, video, AI and everyday utilities in one place.</p>
              <div className="stats">
                <span><b>{items.length}+</b> catalog modules</span>
                <span><b>Local</b> file processing</span>
                <span><b>Free-first</b> setup</span>
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
              <h2>{cat === 'All Tools' ? 'Explore tools' : cat}</h2>
              <p>{query ? `Results for "${query}"` : 'Select a tool to open it.'}</p>
            </div>
            <span>{shown.length} items</span>
          </div>

          <div className="grid">
            {shown.map(t => <button key={t.cat + t.name} className="card" onClick={() => t.url ? window.open(t.url, '_blank', 'noopener,noreferrer') : tool(t)}>
              <span className={'tile ' + t.cat.toLowerCase().split(' ')[0]}>
                {t.cat === 'PDF Tools' ? <FileText /> : t.cat === 'Image Tools' ? <ImageIcon /> : t.cat === 'Video Tools' ? <Video /> : t.cat === 'AI Tools' ? <Sparkles /> : <Wrench />}
              </span>
              <b>{t.name}</b>
              <p>{t.url ? 'Official portal · opens in a new tab' : 'Ready in your workspace'}</p>
              <span className="card-foot">
                <em className="ready">{t.url ? 'Portal link' : 'Ready'}</em>
                <ChevronRight size={15} />
              </span>
            </button>)}
          </div>
        </> : <section className="workspace">
          <button className="back" onClick={()=>ST(null)}>← All tools</button>
          <div className="tool-heading">
            <span className="tile"><Wrench /></span>
            <div><small>{active.cat}</small><h1>{active.name}</h1><p>Run this module in your AOS Tools workspace.</p></div>
          </div>
          {content()}
          {msg && <div className="message">{msg}</div>}
        </section>}
      </main>
    </div>

    <footer>
      <span>© {new Date().getFullYear()} AOS Tools · Free-first</span>
      <button onClick={() => {
        SD(false);
        SA('#052f52');
        SF('Inter');
        SL('English');
      }}> <RotateCcw size={14} /> Reset appearance</button>
    </footer>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
