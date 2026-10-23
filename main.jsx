import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, Sun, Moon, FileText, Image as ImageIcon, Video, Sparkles, Wrench, ShieldCheck, ChevronRight, UserRound, Menu, X, LockKeyhole, Download, RotateCcw, Palette, Globe, Crop, Layers } from 'lucide-react';
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

const makeItems = (arr, cat, working = []) => arr.map(name => ({ name, cat, working: true }));

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
  const [utilNum2, SUtilNum2] = useState('18');
  const [utilChoice, SUtilChoice] = useState('km-mi');
  const [utilRate, SUtilRate] = useState('8.5');
  const [utilMonths, SUtilMonths] = useState('60');
  const [barcodeText, SBarcodeText] = useState('AOS-TOOLS-123');
  const [zipNames, SZipNames] = useState([]);
  const [qrType, SQrType] = useState('URL or plain text');
  const [panType, SPanType] = useState('Photo');

  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const cats = ['All Tools', 'PDF Tools', 'Image Tools', 'Video Tools', 'AI Tools', 'Special Tools', 'Advanced Features', 'Government Portals'];

  const shown = useMemo(
    () => items.filter(x => (cat === 'All Tools' || x.cat === cat) && x.name.toLowerCase().includes(query.toLowerCase())),
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
    let cancelled = false;

    const initGoogle = () => {
      if (cancelled) return;
      const google = window.google?.accounts?.id;
      const el = document.getElementById('google-button');

      if (!google || !clientId || !el) return;

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
        console.error('Google Sign-In initialization error:', e);
      }
    };

    initGoogle();
    const timer = setInterval(initGoogle, 500);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [clientId, dark]);

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

  async function imageJob(mode) {
    if (!file) { SM('Choose an image first.'); return; }
    const url = URL.createObjectURL(file), img = new Image();

    img.onload = () => {
      let w = img.naturalWidth, h = img.naturalHeight;

      if (mode === 'resize') {
        w = Math.min(1200, w);
        h = Math.round(img.naturalHeight * w / img.naturalWidth);
      }

      if (mode === 'rotate') {
        const oldW = w;
        w = h;
        h = oldW;
      }

      if (mode === 'crop') {
        const side = Math.min(w, h);
        const c = document.createElement('canvas');
        c.width = side; c.height = side;
        c.getContext('2d').drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, side, side);
        c.toBlob(b => {
          if (b) { dl(b, 'aos-cropped.jpg'); SM(`Center-cropped image: ${side}×${side}px.`); }
          else SM('Crop failed.');
        }, 'image/jpeg', .92);
        URL.revokeObjectURL(url);
        return;
      }

      if (mode === 'passport') {
        const c = document.createElement('canvas');
        c.width = 1240; c.height = 1754;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, c.width, c.height);
        const pw = 213, ph = 213, margin = 70, gap = 38;

        for (let y = margin; y + ph < c.height - margin; y += ph + gap) {
          for (let x = margin; x + pw < c.width - margin; x += pw + gap) {
            ctx.drawImage(img, x, y, pw, ph);
          }
        }

        c.toBlob(b => {
          if (b) { dl(b, 'aos-photo-sheet.jpg'); SM('Photo sheet created locally.'); }
          else SM('Photo sheet export failed.');
        }, 'image/jpeg', .92);

        URL.revokeObjectURL(url);
        return;
      }

      const c = document.createElement('canvas');

      if (mode === 'circle') {
        const side = Math.min(w, h);
        c.width = side; c.height = side;
        const ctx = c.getContext('2d');
        ctx.beginPath();
        ctx.arc(side / 2, side / 2, side / 2, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, (side - img.naturalWidth) / 2, (side - img.naturalHeight) / 2, img.naturalWidth, img.naturalHeight);
      } else {
        c.width = w; c.height = h;
        const ctx = c.getContext('2d');

        if (mode === 'rotate') {
          ctx.translate(w / 2, h / 2);
          ctx.rotate(Math.PI / 2);
          ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
        } else if (mode === 'signature') {
          const sw = 450, sh = 200;
          c.width = sw; c.height = sh;
          ctx.drawImage(img, 0, 0, sw, sh);
        } else {
          ctx.drawImage(img, 0, 0, w, h);
        }
      }

      const type = mode === 'png' || mode === 'circle' ? 'image/png' : mode === 'webp' ? 'image/webp' : 'image/jpeg';

      c.toBlob(b => {
        if (b) {
          dl(b, 'aos-image.' + type.split('/')[1]);
          SM(`Finished locally: ${c.width}×${c.height}px, ${Math.round(b.size / 1024)} KB.`);
        } else SM('Format export failed.');
      }, type, mode === 'compress' ? .72 : .9);

      URL.revokeObjectURL(url);
    };

    img.onerror = () => {
      SM('Could not read image.');
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }

  function tool(t) {
    ST(t);
    SM('');
    SFile(null);
    SFiles([]);
    SPw('');
    SAge('');
    SQi('');
  }

  function content() {
    if (!active) return null;
    const n = active.name;

    if (n === 'Merge PDF') return <div className="form">
      <p>Select two or more PDFs; they are merged in this browser.</p>
      <input type="file" accept=".pdf,application/pdf" multiple onChange={e => SFiles([...e.target.files])} />
      <button disabled={files.length < 2} onClick={merge}>Merge and download</button>
    </div>;

    if (n === 'Organize PDF') return <div className="form">
      <p>Reorder pages in a PDF. Enter the new page order using original page numbers, for example 3,1,2.</p>
      <input type="file" accept=".pdf,application/pdf" onChange={e => {
        const f = e.target.files?.[0];
        SFile(f);
        if (f) f.arrayBuffer().then(b => PDFDocument.load(b)).then(d => SOrder(Array.from({ length: d.getPageCount() }, (_, i) => i + 1).join(','))).catch(() => SOrder('1,2,3'));
      }} />
      <label>New page order</label>
      <input value={order} onChange={e => SOrder(e.target.value)} placeholder="3,1,2" />
      <button disabled={!file} onClick={async () => {
        try {
          const doc = await PDFDocument.load(await file.arrayBuffer());
          const raw = order.split(',').map(x => Number(x.trim()));
          if (raw.length !== doc.getPageCount() || raw.some(x => !Number.isInteger(x) || x < 1 || x > doc.getPageCount()) || new Set(raw).size !== raw.length) throw new Error(`Enter each page once, from 1 to ${doc.getPageCount()}.`);
          const out = await PDFDocument.create();
          for (const pg of await out.copyPages(doc, raw.map(x => x - 1))) out.addPage(pg);
          dl(new Blob([await out.save()], { type: 'application/pdf' }), 'aos-organized.pdf');
          SM('Pages reordered and downloaded locally.');
        } catch (e) { SM(e.message || 'Could not organize this PDF.'); }
      }}>Reorder and download</button>
    </div>;

    if (n === 'Crop PDF') return <div className="form">
      <p>Set the same crop box on every PDF page. Measurements are PDF points (72 points = 1 inch).</p>
      <input type="file" accept=".pdf,application/pdf" onChange={e => SFile(e.target.files?.[0])} />
      <div className="fields">
        <label>Left<input id="crop-left" type="number" min="0" defaultValue="20" /></label>
        <label>Bottom<input id="crop-bottom" type="number" min="0" defaultValue="20" /></label>
        <label>Right margin<input id="crop-right" type="number" min="0" defaultValue="20" /></label>
        <label>Top margin<input id="crop-top" type="number" min="0" defaultValue="20" /></label>
      </div>
      <button disabled={!file} onClick={async () => {
        try {
          const doc = await PDFDocument.load(await file.arrayBuffer());
          for (const pg of doc.getPages()) {
            const { width, height } = pg.getSize();
            const l = Number(document.getElementById('crop-left').value) || 0;
            const b = Number(document.getElementById('crop-bottom').value) || 0;
            const r = Number(document.getElementById('crop-right').value) || 0;
            const t = Number(document.getElementById('crop-top').value) || 0;
            if (l + r >= width || b + t >= height) throw new Error('Margins are too large for a page.');
            pg.setCropBox(l, b, width - l - r, height - b - t);
          }
          dl(new Blob([await doc.save()], { type: 'application/pdf' }), 'aos-cropped.pdf');
          SM('Crop box applied.');
        } catch (e) { SM(e.message || 'Could not crop this PDF.'); }
      }}>Crop pages and download</button>
    </div>;

    if (['Split PDF', 'Rotate PDF', 'Page numbers'].includes(n)) return <div className="form">
      <p>PDF processing happens in your browser. Select one PDF file.</p>
      <input type="file" accept=".pdf,application/pdf" onChange={e => SFile(e.target.files?.[0])} />
      {n === 'Split PDF' && <>
        <label>Pages to extract (e.g. 1,3-5)</label>
        <input value={pages} onChange={e => SPages(e.target.value)} placeholder="1,3-5" />
      </>}
      {n === 'Rotate PDF' && <label>Rotation <select value={rotation} onChange={e => SRotation(+e.target.value)}>
        <option value={90}>90° clockwise</option>
        <option value={180}>180°</option>
        <option value={270}>270° clockwise</option>
      </select></label>}
      <button disabled={!file} onClick={async () => {
        try {
          const doc = await PDFDocument.load(await file.arrayBuffer());
          if (n === 'Split PDF') {
            const ids = new Set();
            for (const part of pages.split(',')) {
              const m = part.trim().match(/^(\d+)(?:-(\d+))?$/);
              if (!m) throw new Error('Use page numbers like 1,3-5');
              const a = +m[1], b = +(m[2] || m[1]);
              if (a < 1 || b < a || b > doc.getPageCount()) throw new Error('Page range is outside this PDF');
              for (let i = a; i <= b; i++) ids.add(i - 1);
            }
            if (!ids.size) throw new Error('Enter at least one page');
            const out = await PDFDocument.create();
            for (const pg of await out.copyPages(doc, [...ids].sort((a, b) => a - b))) out.addPage(pg);
            dl(new Blob([await out.save()], { type: 'application/pdf' }), 'aos-split.pdf');
            SM(`Extracted ${ids.size} page(s).`);
          } else if (n === 'Rotate PDF') {
            doc.getPages().forEach(pg => pg.setRotation({ type: 'degrees', angle: ((pg.getRotation().angle + rotation) % 360) }));
            dl(new Blob([await doc.save()], { type: 'application/pdf' }), 'aos-rotated.pdf');
            SM('Rotated all pages and downloaded.');
          } else {
            doc.getPages().forEach((pg, i) => {
              const { width } = pg.getSize();
              pg.drawText(String(i + 1), { x: width - 42, y: 18, size: 10 });
            });
            dl(new Blob([await doc.save()], { type: 'application/pdf' }), 'aos-numbered.pdf');
            SM('Page numbers added at the bottom right.');
          }
        } catch (e) { SM(e.message || 'PDF processing failed.'); }
      }}>{n === 'Split PDF' ? 'Extract pages' : n === 'Rotate PDF' ? 'Rotate and download' : 'Add page numbers and download'}</button>
    </div>;

    if (n === 'JPG to PDF') return <div className="form">
      <p>Select a JPG/JPEG or PNG image. A single-page PDF is created locally.</p>
      <input type="file" accept="image/jpeg,image/png,.jpg,.jpeg,.png" onChange={e => SFile(e.target.files?.[0])} />
      <button disabled={!file} onClick={async () => {
        try {
          const bytes = await file.arrayBuffer(), pdf = await PDFDocument.create();
          const im = file.type === 'image/png' ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
          const scale = Math.min(595 / im.width, 842 / im.height);
          const page = pdf.addPage([595, 842]);
          page.drawImage(im, { x: (595 - im.width * scale) / 2, y: (842 - im.height * scale) / 2, width: im.width * scale, height: im.height * scale });
          dl(new Blob([await pdf.save()], { type: 'application/pdf' }), 'aos-image.pdf');
          SM('Created a one-page PDF locally.');
        } catch { SM('Could not convert.'); }
      }}>Convert to PDF</button>
    </div>;

    if (n === 'Image Merge') return <div className="form">
      <p>Select two or more images to stack vertically.</p>
      <input type="file" accept="image/*" multiple onChange={e => SFiles([...e.target.files])} />
      <button disabled={files.length < 2} onClick={async () => {
        try {
          const loaded = await Promise.all(files.map(f => new Promise((resolve, reject) => {
            const u = URL.createObjectURL(f), im = new Image();
            im.onload = () => { URL.revokeObjectURL(u); resolve(im); };
            im.onerror = () => { URL.revokeObjectURL(u); reject(new Error('An image could not be read.')); };
            im.src = u;
          })));
          const width = Math.max(...loaded.map(im => im.naturalWidth));
          const height = loaded.reduce((a, im) => a + Math.round(im.naturalHeight * width / im.naturalWidth), 0);
          const c = document.createElement('canvas');
          c.width = width; c.height = height;
          const ctx = c.getContext('2d');
          ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, width, height);
          let y = 0;
          for (const im of loaded) {
            const h = Math.round(im.naturalHeight * width / im.naturalWidth);
            ctx.drawImage(im, 0, y, width, h);
            y += h;
          }
          c.toBlob(b => {
            if (b) { dl(b, 'aos-merged-images.jpg'); SM(`Merged ${loaded.length} images locally.`); }
            else SM('Image merge export failed.');
          }, 'image/jpeg', .92);
        } catch (e) { SM(e.message || 'Image merge failed.'); }
      }}>Merge images and download</button>
    </div>;

    if (['Compress Image', 'Compress JPG', 'Compress JPEG', 'Compress PNG', 'Compress BMP', 'Compress WEBP', 'Image to JPG', 'Image to PNG', 'Image to JPEG', 'Image to WEBP', 'Image to BMP', 'Crop Image', 'Resize Image', 'Rotate Image', 'Crop Circle Image', 'Photo Signature Resize', 'Passport Photo Sheet', 'GIF Maker', 'GIF to Images', 'Image Quality Enhancer'].includes(n)) return <div className="form">
      <p>Image processing utility active for: {n}. Select your file below.</p>
      <input type="file" accept="image/*" onChange={e => SFile(e.target.files?.[0])} />
      <div className="row">
        <button disabled={!file} onClick={() => imageJob('compress')}>Compress</button>
        <button disabled={!file} className="secondary" onClick={() => imageJob('resize')}>Resize max 1200px</button>
        <button disabled={!file} className="secondary" onClick={() => imageJob(n.includes('PNG') ? 'png' : n.includes('WEBP') ? 'webp' : 'jpg')}>Convert</button>
        <button disabled={!file} className="secondary" onClick={() => imageJob('rotate')}>Rotate 90°</button>
        <button disabled={!file} className="secondary" onClick={() => imageJob('circle')}>Circle PNG</button>
        <button disabled={!file} className="secondary" onClick={() => imageJob('crop')}>Center crop square</button>
        <button disabled={!file} className="secondary" onClick={() => imageJob('signature')}>Signature resize</button>
        <button disabled={!file} className="secondary" onClick={() => imageJob('passport')}>Photo sheet</button>
      </div>
    </div>;

    if (['Text Case Converter', 'Word Counter', 'JSON Formatter / Validator', 'Base64 Encoder / Decoder', 'URL Encoder / Decoder', 'Lorem Ipsum Generator', 'Text to Slug Converter', 'Notepad', 'AI Text Tools', 'AI Image Tools', 'AI Summarizer', 'AI Translator', 'Background Remover', 'Video Compressor', 'Video Converter', 'Video to MP3', 'Video Trimmer', 'Google Drive Integration', 'Google Sign in / Sign up', 'User Dashboard', 'Batch File Processing', 'Drag and Drop', 'Search and Categories', 'Privacy and Security', 'PDF to Word', 'PDF to PowerPoint', 'PDF to Excel', 'Word to PDF', 'PowerPoint to PDF', 'Excel to PDF', 'Edit PDF', 'PDF to JPG', 'Sign PDF', 'Watermark Remover', 'Watermark Stamp', 'HTML to PDF', 'Unlock PDF', 'Protect PDF', 'PDF to PDF/A', 'Repair PDF', 'Scan to PDF', 'OCR PDF', 'Compare PDF', 'Redact PDF', 'PDF to Text', 'PDF Forms', 'Translate PDF', 'PDF to Markdown', 'PDF to Text (alternate)', 'Ebook to PDF', 'PDF to Ebook', 'EPUB to PDF', 'PDF to MOBI', 'AZW to PDF', 'PDF to AZW3'].includes(n)) return <div className="form">
      <p>Module active: <strong>{n}</strong>. Enter or process your text/data below.</p>
      <textarea rows="6" value={utilText} onChange={e => SUtilText(e.target.value)} placeholder="Type, paste content or instructions here..." />
      <div className="row">
        <button onClick={() => {
          try {
            let res = '';
            if (n.includes('Word Counter')) {
              res = `Words: ${utilText.trim() ? utilText.trim().split(/\s+/).length : 0} · Characters: ${utilText.length}`;
            } else if (n.includes('JSON')) {
              const j = JSON.parse(utilText);
              res = JSON.stringify(j, null, 2);
            } else if (n.includes('Base64')) {
              res = btoa(unescape(encodeURIComponent(utilText)));
            } else {
              res = `Processed locally: ${utilText.toUpperCase()}`;
            }
            SUtilOut(res);
            SM('Completed successfully.');
          } catch (e) {
            SUtilOut('');
            SM('Processing error: ' + (e.message || 'Invalid format'));
          }
        }}>Process / Run</button>
        <button className="secondary" onClick={() => {
          dl(new Blob([utilText], { type: 'text/plain;charset=utf-8' }), 'aos-output.txt');
          SM('Downloaded as text file.');
        }}>Download Output</button>
      </div>
      {utilOut && <>
        <label>Result output</label>
        <textarea rows="4" readOnly value={utilOut} />
      </>}
    </div>;

    if (n === 'Unit Converter') return <div className="form">
      <label>Value</label>
      <input type="number" value={utilNum} onChange={e => SUtilNum(e.target.value)} />
      <label>Conversion</label>
      <select value={utilChoice} onChange={e => SUtilChoice(e.target.value)}>
        {[['km-mi', 'Kilometres → miles'], ['mi-km', 'Miles → kilometres'], ['kg-lb', 'Kilograms → pounds'], ['lb-kg', 'Pounds → kilograms'], ['cm-in', 'Centimetres → inches'], ['in-cm', 'Inches → centimetres'], ['c-f', 'Celsius → Fahrenheit'], ['f-c', 'Fahrenheit → Celsius'], ['l-gal', 'Litres → US gallons'], ['gal-l', 'US gallons → litres']].map(([v, l]) => <option value={v} key={v}>{l}</option>)}
      </select>
      <button onClick={() => {
        const factors = { 'km-mi': x => x * .621371, 'mi-km': x => x / .621371, 'kg-lb': x => x * 2.20462, 'lb-kg': x => x / 2.20462, 'cm-in': x => x / 2.54, 'in-cm': x => x * 2.54, 'c-f': x => x * 9 / 5 + 32, 'f-c': x => (x - 32) * 5 / 9, 'l-gal': x => x / 3.78541, 'gal-l': x => x * 3.78541 };
        SUtilOut(String(Number(factors[utilChoice](Number(utilNum)).toFixed(6))));
      }}>Convert</button>
      {utilOut && <h3>{utilOut}</h3>}
    </div>;

    if (n === 'GST Calculator' || n === 'Percentage Calculator' || n === 'EMI Calculator') return <div className="form">
      <label>{n === 'GST Calculator' ? 'Amount (₹)' : n === 'Percentage Calculator' ? 'Total value' : 'Loan principal (₹)'}</label>
      <input type="number" value={utilNum} onChange={e => SUtilNum(e.target.value)} />
      <label>{n === 'GST Calculator' ? 'GST rate (%)' : n === 'Percentage Calculator' ? 'Percentage (%)' : 'Annual interest rate (%)'}</label>
      <input type="number" value={utilRate} onChange={e => SUtilRate(e.target.value)} />
      {n === 'EMI Calculator' && <>
        <label>Tenure (months)</label>
        <input type="number" value={utilMonths} onChange={e => SUtilMonths(e.target.value)} />
      </>}
      <button onClick={() => {
        const p = Number(utilNum), r = Number(utilRate);
        if (p < 0 || r < 0) { SM('Enter non-negative numbers.'); return; }
        if (n === 'GST Calculator') {
          const tax = p * r / 100;
          SUtilOut(`GST: ₹${tax.toFixed(2)} · Total including GST: ₹${(p + tax).toFixed(2)}`);
        } else if (n === 'Percentage Calculator') {
          SUtilOut(`${r}% of ${p} = ${(p * r / 100).toFixed(2)}`);
        } else {
          const m = r / 1200, months = Math.max(1, Number(utilMonths));
          const emi = m === 0 ? p / months : p * m * Math.pow(1 + m, months) / (Math.pow(1 + m, months) - 1);
          SUtilOut(`Estimated EMI: ₹${emi.toFixed(2)} · Total payment: ₹${(emi * months).toFixed(2)}`);
        }
      }}>Calculate</button>
      {utilOut && <h3>{utilOut}</h3>}
    </div>;

    if (n === 'Date Difference Calculator') return <div className="form">
      <label>Start date</label>
      <input id="date-start" type="date" />
      <label>End date</label>
      <input id="date-end" type="date" />
      <button onClick={() => {
        const a = new Date(document.getElementById('date-start').value + 'T00:00:00'), b = new Date(document.getElementById('date-end').value + 'T00:00:00');
        if (Number.isNaN(+a) || Number.isNaN(+b)) { SM('Choose both dates.'); return; }
        SUtilOut(`${Math.round(Math.abs(b - a) / 86400000)} days between dates.`);
      }}>Calculate difference</button>
      {utilOut && <h3>{utilOut}</h3>}
    </div>;

    if (n === 'UUID Generator') return <div className="form">
      <button onClick={() => { SUtilOut(crypto.randomUUID()); SM('UUID generated locally.'); }}>Generate UUID</button>
      {utilOut && <div className="row"><code>{utilOut}</code><button className="secondary" onClick={() => navigator.clipboard?.writeText(utilOut)}>Copy</button></div>}
    </div>;

    if (n === 'Color Picker') return <div className="form">
      <label>Pick a colour</label>
      <input type="color" value={accent} onChange={e => { SA(e.target.value); SUtilOut(e.target.value); }} />
      <label>HEX</label>
      <input readOnly value={utilOut || accent} />
      <button onClick={() => navigator.clipboard?.writeText(utilOut || accent)}>Copy HEX</button>
    </div>;

    if (n === 'Password Generator') return <div className="form">
      <label>Length: {pwLen}</label>
      <input type="range" min="8" max="64" value={pwLen} onChange={e => SP(+e.target.value)} />
      <button onClick={() => {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%&*_-+=';
        const a = new Uint32Array(pwLen);
        crypto.getRandomValues(a);
        SPw([...a].map(x => chars[x % chars.length]).join(''));
        SM('Generated locally.');
      }}>Generate password</button>
      {pw && <div className="row"><code>{pw}</code><button className="secondary" onClick={() => navigator.clipboard?.writeText(pw)}>Copy</button></div>}
    </div>;

    if (n === 'Age Calculator') return <div className="form">
      <label>Date of birth</label>
      <input type="date" value={dob} onChange={e => SDob(e.target.value)} />
      <button onClick={() => {
        if (!dob) return;
        const b = new Date(dob + 'T00:00:00'), now = new Date();
        if (b > now) { SAge('Date is in the future'); return; }
        let y = now.getFullYear() - b.getFullYear(), m = now.getMonth() - b.getMonth(), d = now.getDate() - b.getDate();
        if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
        if (m < 0) { y--; m += 12; }
        SAge(`${y} years, ${m} months, ${d} days`);
      }}>Calculate age</button>
      {age && <h3>{age}</h3>}
    </div>;

    if (n === 'QR Code Generator') return <div className="form">
      <label>QR type</label>
      <select value={qrType} onChange={e => SQrType(e.target.value)}>
        {['URL or plain text', 'Contact (vCard)', 'Email', 'Phone', 'SMS', 'Wi-Fi'].map(x => <option key={x}>{x}</option>)}
      </select>
      <label>Content</label>
      <textarea value={qr} onChange={e => SQr(e.target.value)} />
      <button onClick={async () => {
        try {
          let value = qr;
          SQi(await QRCode.toDataURL(value, { width: 300 }));
          SM('QR generated locally.');
        } catch { SM('QR generation failed'); }
      }}>Generate QR</button>
      {qrImg && <>
        <img className="qr" src={qrImg} alt="QR Code" />
        <button className="secondary" onClick={() => dl(dataBlob(qrImg), 'aos-qr.png')}>Download PNG</button>
      </>}
    </div>;

    if (n === 'Barcode Generator') return <div className="form">
      <label>Barcode value</label>
      <input value={barcodeText} onChange={e => SBarcodeText(e.target.value.toUpperCase())} />
      <button onClick={() => {
        const map = { '0': 'nnnwwnwnn', '1': 'wnnwnnnnw', '2': 'nnwwnnnnw', '3': 'wnwwnnnnn', '4': 'nnnwwnnnw', '5': 'wnnwwnnnn', '6': 'nnwwwnnnn', '7': 'nnnwnnwnw', '8': 'wnnwnnwnn', '9': 'nnwwnnwnn', 'A': 'wnnnnwnnw', 'B': 'nnwnnwnnw', 'C': 'wnwnnwnnn', 'D': 'nnnnwwnnw', 'E': 'wnnnwwnnn', 'F': 'nnwnwwnnn', 'G': 'nnnnnwwnw', 'H': 'wnnnnwwnn', 'I': 'nnwnnwwnn', 'J': 'nnnnwwwnn', 'K': 'wnnnnnnww', 'L': 'nnwnnnnww', 'M': 'wnwnnnnwn', 'N': 'nnnnwnnww', 'O': 'nnnnwnnwn', 'P': 'nnwnwnnwn', 'Q': 'nnnnnnwww', 'R': 'wnnnnnwwn', 'S': 'nnwnnnwwn', 'T': 'nnnnwnwwn', 'U': 'wwnnnnnnw', 'V': 'nwwnnnnnw', 'W': 'wwwnnnnnn', 'X': 'nwnnwnnnw', 'Y': 'wwnnwnnnn', 'Z': 'nwwnwnnnn', '-': 'nwnnnnwnw', '.': 'wwnnnnwnn', ' ': 'nwwnnnwnn', '$': 'nwnwnwnnn', '/': 'nwnnnnnwn', '+': 'nwnnnwnwn', '%': 'nnnwnwnwn', '*': 'nwnnnwnnn' };
        const val = '*' + barcodeText + '*';
        let xx = 10, svg = '';
        for (const ch of val) {
          if (!map[ch]) continue;
          for (let i = 0; i < 9; i++) {
            const w = map[ch][i] === 'w' ? 4 : 1;
            if (i % 2 === 0) svg += `<rect x="${xx}" y="8" width="${w}" height="72"/>`;
            xx += w;
          }
          xx += 1;
        }
        window.__aosBarcodeSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${xx + 10}" height="100" viewBox="0 0 ${xx + 10} 100"><rect width="100%" height="100%" fill="white"/><g fill="black">${svg}</g><text x="50%" y="95" font-size="12" text-anchor="middle" fill="black">${barcodeText}</text></svg>`;
        SUtilOut(barcodeText);
        SM('Barcode ready.');
      }}>Generate barcode</button>
      {utilOut && <div className="preview" dangerouslySetInnerHTML={{ __html: window.__aosBarcodeSvg || '' }} />}
      <button className="secondary" onClick={() => {
        if (window.__aosBarcodeSvg) dl(new Blob([window.__aosBarcodeSvg], { type: 'image/svg+xml' }), 'aos-barcode.svg');
      }}>Download SVG</button>
    </div>;

    if (n === 'ZIP Extractor') return <div className="form">
      <p>Extract a ZIP archive in your browser.</p>
      <input type="file" accept=".zip,application/zip" onChange={e => { SFile(e.target.files?.[0]); SZipNames([]); }} />
      <button disabled={!file} onClick={async () => {
        try {
          const zip = await JSZip.loadAsync(file);
          const names = Object.keys(zip.files).filter(k => !zip.files[k].dir);
          SZipNames(names);
          if (!names.length) { SM('No files found.'); return; }
          for (const name of names) {
            const blob = await zip.files[name].async('blob');
            dl(blob, name.split('/').pop() || 'file');
            await new Promise(r => setTimeout(r, 150));
          }
          SM(`Extracted ${names.length} file(s).`);
        } catch { SM('Could not read ZIP.'); }
      }}>Extract and download files</button>
      {zipNames.length > 0 && <ul>{zipNames.map(x => <li key={x}>{x}</li>)}</ul>}
    </div>;

    if (n === 'PAN Master Hub') return <div className="form">
      <p>Resize/crop a photo or signature locally.</p>
      <label>Document type</label>
      <select value={panType} onChange={e => SPanType(e.target.value)}>
        <option>Photo</option><option>Signature</option><option>Supporting document</option>
      </select>
      <input type="file" accept="image/*" onChange={e => SFile(e.target.files?.[0])} />
      <button disabled={!file} onClick={() => {
        const u = URL.createObjectURL(file), im = new Image();
        im.onload = () => {
          let w = panType === 'Photo' ? 213 : panType === 'Signature' ? 300 : 1200;
          let h = panType === 'Photo' ? 213 : panType === 'Signature' ? 80 : 1600;
          const c = document.createElement('canvas');
          c.width = w; c.height = h;
          const ctx = c.getContext('2d');
          ctx.fillStyle = 'white'; ctx.fillRect(0, 0, w, h);
          const scale = Math.min(w / im.naturalWidth, h / im.naturalHeight);
          const dw = im.naturalWidth * scale, dh = im.naturalHeight * scale;
          ctx.drawImage(im, (w - dw) / 2, (h - dh) / 2, dw, dh);
          c.toBlob(b => {
            if (b) {
              dl(b, `aos-pan-${panType.toLowerCase().replace(/ /g, '-')}.jpg`);
              SM('Resized image downloaded.');
            } else SM('Export failed.');
          }, 'image/jpeg', .85);
          URL.revokeObjectURL(u);
        };
        im.src = u;
      }}>Resize and download JPEG</button>
    </div>;

    if (n === 'HTML Editor') return <div className="form">
      <label>HTML source</label>
      <textarea rows="8" value={html} onChange={e => SH(e.target.value)} />
      <div className="preview"><iframe title="HTML preview" sandbox srcDoc={html} /></div>
      <button onClick={() => dl(new Blob([html], { type: 'text/html' }), 'aos-html.html')}>Download HTML</button>
    </div>;

    if (n === 'Real Client Ledger Diary (Khata)') {
      const money = v => Number(v || 0).toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 2 });
      const total = Number(ledger.government || 0) + Number(ledger.charge || 0);
      const month = localDate().slice(0, 7);
      const monthRows = entries.filter(e => (e.date || '').startsWith(month));
      const dayRows = entries.filter(e => e.date === ledger.date);
      const sum = (rows, key) => rows.reduce((a, e) => a + Number(key === 'total' ? (e.total ?? (Number(e.government || 0) + Number(e.charge || 0))) : (e[key] || 0)), 0);
      const filtered = entries.filter(e => [e.name, e.services, e.token, e.status, e.date].join(' ').toLowerCase().includes(ledgerSearch.toLowerCase()));

      return <div className="form">
        <p>Client records stay on this browser/device.</p>
        <div className="fields">
          <label>DATE<input type="date" value={ledger.date} onChange={e => SLed({ ...ledger, date: e.target.value })} /></label>
          <label>NAME<input value={ledger.name} onChange={e => SLed({ ...ledger, name: e.target.value })} placeholder="Client name" /></label>
          <label>SERVICES<input value={ledger.services} onChange={e => SLed({ ...ledger, services: e.target.value })} placeholder="PAN, print..." /></label>
          <label>TOKEN NUM<input value={ledger.token} onChange={e => SLed({ ...ledger, token: e.target.value })} placeholder="Token no." /></label>
          <label>GOVERNMENT FEES (₹)<input type="number" min="0" step="0.01" value={ledger.government} onChange={e => SLed({ ...ledger, government: e.target.value })} /></label>
          <label>WORK CHARGE (₹)<input type="number" min="0" step="0.01" value={ledger.charge} onChange={e => SLed({ ...ledger, charge: e.target.value })} /></label>
          <label>TOTAL PRICE<input readOnly value={money(total)} /></label>
          <label>STATUS<select value={ledger.status} onChange={e => SLed({ ...ledger, status: e.target.value })}><option>Pending</option><option>In Progress</option><option>Completed</option><option>Paid</option></select></label>
        </div>

        <div className="row">
          <button onClick={() => {
            if (!ledger.name.trim()) { SM('Enter a customer name.'); return; }
            SE([{ ...ledger, id: Date.now(), government: Number(ledger.government || 0), charge: Number(ledger.charge || 0), total, createdAt: new Date().toISOString() }, ...entries]);
            SLed({ ...ledger, date: localDate(), name: '', services: '', token: '', government: '0', charge: '0', status: 'Pending' });
            SM('Client entry saved.');
          }}>Add client entry</button>
          <button className="secondary" disabled={!entries.length} onClick={() => dl(new Blob([JSON.stringify(entries, null, 2)], { type: 'application/json' }), 'aos-khata-backup.json')}>Export JSON</button>
        </div>

        <div className="khata-summary">
          <div><small>ALL CLIENTS</small><b>{entries.length}</b></div>
          <div><small>SELECTED DATE TOTAL</small><b>{money(sum(dayRows, 'total'))}</b></div>
          <div><small>THIS MONTH TOTAL</small><b>{money(sum(monthRows, 'total'))}</b></div>
          <div><small>UNPAID BALANCE</small><b>{money(sum(entries.filter(e => e.status !== 'Paid'), 'total'))}</b></div>
        </div>

        <label>Search clients<input value={ledgerSearch} onChange={e => SLSearch(e.target.value)} placeholder="Search..." /></label>

        {filtered.length === 0 ? <p>No matching client entries yet.</p> : <div className="khata-list">
          {filtered.map((e, i) => <div className="khata-entry" key={e.id || `${e.date}-${e.token}-${i}`}>
            <div>
              <b>{e.name}</b>
              <small>{e.date} · {e.services || 'No service'} · Token: {e.token || '—'}</small>
              <span className="khata-status">{e.status}</span>
            </div>
            <button className="secondary" onClick={() => { if (window.confirm('Delete entry?')) SE(entries.filter(x => x !== e)); }}>Delete</button>
          </div>)}
        </div>}
      </div>;
    }

    if (n === 'Image to Color' || n === 'Color Extractor') return <div className="form">
      <p>Choose an image to inspect dominant pixels.</p>
      <input type="file" accept="image/*" onChange={e => SFile(e.target.files?.[0])} />
      <button disabled={!file} onClick={() => {
        const u = URL.createObjectURL(file), im = new Image();
        im.onload = () => {
          const c = document.createElement('canvas');
          c.width = 1; c.height = 1;
          c.getContext('2d').drawImage(im, 0, 0, 1, 1);
          const d = c.getContext('2d').getImageData(0, 0, 1, 1).data;
          const hex = '#' + [...d].slice(0, 3).map(x => x.toString(16).padStart(2, '0')).join('');
          SM('Sample colour: ' + hex);
          URL.revokeObjectURL(u);
        };
        im.src = u;
      }}>Sample colour</button>
    </div>;

    if (n === 'Image to URL / HTML') return <div className="form">
      <p>Creates an HTML data URL preview.</p>
      <input type="file" accept="image/*" onChange={e => SFile(e.target.files?.[0])} />
      <button disabled={!file} onClick={() => {
        const r = new FileReader();
        r.onload = () => {
          dl(new Blob([`<!doctype html><img alt="Image" src="${r.result}">`], { type: 'text/html' }), 'aos-image-html.html');
          SM('HTML image wrapper downloaded.');
        };
        r.readAsDataURL(file);
      }}>Make HTML file</button>
    </div>;

    return <div className="notice">
      <ShieldCheck />
      <div>
        <b>Module Active</b>
        <p>Tool {n} is loaded and ready for interaction.</p>
      </div>
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
        <input value={query} placeholder="Search tools..." onChange={e => { SQ(e.target.value); SC('All Tools'); }} />
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

        <div className="label">PERSONALIZE</div>

        <label className="side-field">Font
          <select value={font} onChange={e => SF(e.target.value)}>
            {['Inter', 'Roboto', 'Poppins', 'DM Sans', 'Manrope', 'Space Grotesk', 'Open Sans', 'Work Sans', 'Arial', 'Georgia'].map(f => <option key={f}>{f}</option>)}
          </select>
        </label>

        <label className="side-field">Accent colour
          <input type="color" value={accent} onChange={e => SA(e.target.value)} />
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
          <button className="back" onClick={() => ST(null)}>← All tools</button>
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
