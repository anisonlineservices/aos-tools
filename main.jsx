import React,{useEffect,useMemo,useState} from 'react';
import{createRoot}from'react-dom/client';
import{Search,Sun,Moon,FileText,Image as ImageIcon,Video,Sparkles,Wrench,ShieldCheck,ChevronRight,UserRound,Menu,X,LockKeyhole,Download,RotateCcw,Palette,Globe,Crop,Layers}from'lucide-react';
import{PDFDocument}from'pdf-lib';
import QRCode from'qrcode';
import JSZip from'jszip';
import './style.css';

const CATALOG={"pdf":["Merge PDF","Split PDF","Compress PDF","PDF to Word","PDF to PowerPoint","PDF to Excel","Word to PDF","PowerPoint to PDF","Excel to PDF","Edit PDF","PDF to JPG","JPG to PDF","Sign PDF","Watermark Remover","Watermark Stamp","Rotate PDF","HTML to PDF","Unlock PDF","Protect PDF","Organize PDF","PDF to PDF/A","Repair PDF","Page numbers","Scan to PDF","OCR PDF","Compare PDF","Redact PDF","PDF to Text","Crop PDF","PDF Forms","AI Summarizer","Translate PDF","PDF to Markdown","PDF to Text (alternate)","Ebook to PDF","PDF to Ebook","EPUB to PDF","PDF to MOBI","AZW to PDF","PDF to AZW3"],"imgs":["Compress Image","Compress JPG","Compress JPEG","Compress PNG","Compress BMP","Compress WEBP","Image to JPG","Image to PNG","Image to JPEG","Image to WEBP","Image to BMP","Crop Image","Resize Image","Rotate Image","Crop Circle Image","Image Merge","Photo Signature Resize","GIF Maker","GIF to Images","Image Quality Enhancer","Passport Photo Sheet"],"special":["Barcode Generator","Password Generator","Image to Color","Color Extractor","ZIP Extractor","Real Client Ledger Diary (Khata)","Age Calculator","Image to URL / HTML","HTML Editor","QR Code Generator","PAN Master Hub"]};

const extraSpecial=['Text Case Converter','Word Counter','JSON Formatter / Validator','Unit Converter','GST Calculator','EMI Calculator','Percentage Calculator','Date Difference Calculator','Base64 Encoder / Decoder','URL Encoder / Decoder','UUID Generator','Lorem Ipsum Generator','Color Picker','Notepad','Text to Slug Converter'];
const video=['Video Compressor','Video Converter','Video to MP3','Video Trimmer','GIF Maker'];
const ai=['AI Text Tools','AI Image Tools','AI Summarizer','AI Translator','Background Remover'];
const advanced=['Google Drive Integration','Google Sign in / Sign up','User Dashboard','Batch File Processing','Drag and Drop','Search and Categories','Privacy and Security'];

const portals=[
['PAN Apply / UTIITSL','https://www.pan.utiitsl.com/'],
['PAN Apply / Protean (NSDL)','https://www.protean-tinpan.com/'],
['Income Tax e-Filing','https://www.incometax.gov.in/'],
['UIDAI Aadhaar','https://uidai.gov.in/'],
['Voter Services','https://voters.eci.gov.in/'],
['Passport Seva','https://www.passportindia.gov.in/'],
['EPFO','https://www.epfindia.gov.in/'],
['Tamil Nadu e-Sevai','https://www.tnesevai.tn.gov.in/'],
['Tamil Nadu Ration Card','https://www.tnpds.gov.in/'],
['Tamil Nadu RTI','https://rtionline.tn.gov.in/'],
['Tamil Nadu Property Tax','https://tnurbanepay.tn.gov.in/'],
['Tamil Nadu Electricity (TANGEDCO)','https://www.tangedco.org/'],
['Tamil Nadu Birth & Death Registration','https://crstn.org/'],
['e-Shram','https://eshram.gov.in/'],
['Ayushman Bharat PM-JAY','https://pmjay.gov.in/'],
['MSME Udyam Registration','https://udyamregistration.gov.in/'],
['FSSAI FoSCoS','https://foscos.fssai.gov.in/'],
['NPCI','https://www.npci.org.in/'],
['Common Service Centres','https://csc.gov.in/'],
['eGazette of India','https://egazette.gov.in/'],
['Tamil Nadu Gazette','https://www.stationeryprinting.tn.gov.in/'],
['Parivahan','https://parivahan.gov.in/'],
['DigiLocker','https://www.digilocker.gov.in/'],
['UPSC','https://upsc.gov.in/'],
['Railway Recruitment Boards','https://www.rrbcdg.gov.in/'],
['IRCTC','https://www.irctc.co.in/'],
['National Scholarship Portal','https://scholarships.gov.in/'],
['Bihar School Examination Board','https://secondary.biharboardonline.com/'],
['Bihar e-PDS','https://epds.bihar.gov.in/'],
['National Social Assistance Programme','https://nsap.nic.in/'],
['UMANG','https://web.umang.gov.in/'],
['Aaple Sarkar Maharashtra','https://aaplesarkar.mahaonline.gov.in/'],
['MahaDBT','https://mahadbt.maharashtra.gov.in/'],
['Maharashtra Social Justice','https://sjsa.maharashtra.gov.in/'],
['Maharashtra Gazette','https://egazzete.mahaonline.gov.in/'],
['Chennai Corporation','https://chennaicorporation.gov.in/'],
['Tamil Nadu e-Procurement','https://tntenders.gov.in/'],
['GST Portal','https://www.gst.gov.in/'],
['MCA Services','https://www.mca.gov.in/'],
['Bhuvan / ISRO','https://bhuvan.nrsc.gov.in/'],
['National Portal of India','https://www.india.gov.in/'],
['MyGov India','https://www.mygov.in/'],
['National Career Service','https://www.ncs.gov.in/'],
['Skill India Digital','https://www.skillindiadigital.gov.in/'],
['PM Kisan','https://pmkisan.gov.in/'],
['National Health Authority','https://nha.gov.in/'],
['GeM Government e-Marketplace','https://gem.gov.in/'],
['India Post','https://www.indiapost.gov.in/'],
['CBSE','https://www.cbse.gov.in/'],
['National Testing Agency','https://nta.ac.in/']
].map(([name,url])=>({name,cat:'Government Portals',url,working:true}));

const makeItems=(arr,cat,working=[])=>arr.map(name=>({name,cat,working:working.includes(name)}));

const items=[
...makeItems(CATALOG.pdf,'PDF Tools',['Merge PDF','Split PDF','Rotate PDF','Page numbers','JPG to PDF','Organize PDF','Crop PDF']),
...makeItems(CATALOG.imgs,'Image Tools',['Compress Image','Compress JPG','Compress JPEG','Compress PNG','Compress WEBP','Image to JPG','Image to PNG','Image to JPEG','Image to WEBP','Resize Image','Rotate Image','Crop Circle Image','Crop Image','Image Merge','Photo Signature Resize','Passport Photo Sheet']),
...makeItems([...CATALOG.special,...extraSpecial],'Special Tools',['Password Generator','Age Calculator','HTML Editor','QR Code Generator','Image to Color','Color Extractor','Image to URL / HTML','Barcode Generator','ZIP Extractor','PAN Master Hub',...extraSpecial]),
...makeItems(video,'Video Tools'),
...makeItems(ai,'AI Tools'),
...makeItems(advanced,'Advanced Features'),
...portals
];

function localDate(d=new Date()){
const y=d.getFullYear(),m=String(d.getMonth()+1).padStart(2,'0'),day=String(d.getDate()).padStart(2,'0');
return `${y}-${m}-${day}`;
}

function dataBlob(url){
const [m,b]=url.split(',');
const s=atob(b),a=new Uint8Array(s.length);
for(let i=0;i<s.length;i++)a[i]=s.charCodeAt(i);
return new Blob([a],{type:m.match(/:(.*?);/)[1]});
}

/* Appearance settings are separate from Khata data. */
function loadAppearance(){
try{
const saved=JSON.parse(localStorage.getItem('aos-appearance-v1')||'{}');
return saved&&typeof saved==='object'?saved:{};
}catch{
return {};
}
}

function App(){
const[query,SQ]=useState('');
const[cat,SC]=useState('All Tools');

const[dark,SD]=useState(()=>loadAppearance().dark??false);
const[lang,SL]=useState(()=>loadAppearance().lang??'English');
const[font,SF]=useState(()=>loadAppearance().font??'Inter');
const[accent,SA]=useState(()=>loadAppearance().accent??'#052f52');

const[active,ST]=useState(null);
const[msg,SM]=useState('');
const[file,SFile]=useState(null);
const[files,SFiles]=useState([]);
const[pwLen,SP]=useState(16);
const[pw,SPw]=useState('');
const[dob,SDob]=useState('');
const[age,SAge]=useState('');
const[qr,SQr]=useState('https://example.com');
const[qrImg,SQi]=useState('');
const[pages,SPages]=useState('1');
const[rotation,SRotation]=useState(90);
const[order,SOrder]=useState('1,2,3');
const[html,SH]=useState('<h1>Hello AOS Tools</h1>\n<p>Preview your HTML here.</p>');

const[entries,SE]=useState(()=>{
try{return JSON.parse(localStorage.getItem('aos-khata-v1')||'[]')}
catch{return []}
});

const[ledger,SLed]=useState({date:localDate(),name:'',services:'',token:'',government:'0',charge:'0',status:'Pending'});
const[ledgerSearch,SLSearch]=useState('');
const[user,SU]=useState(null);
const[mobile,SMob]=useState(false);
const[utilText,SUtilText]=useState('');
const[utilOut,SUtilOut]=useState('');
const[utilNum,SUtilNum]=useState('100');
const[utilNum2,SUtilNum2]=useState('18');
const[utilChoice,SUtilChoice]=useState('km-mi');
const[utilRate,SUtilRate]=useState('8.5');
const[utilMonths,SUtilMonths]=useState('60');
const[barcodeText,SBarcodeText]=useState('AOS-TOOLS-123');
const[zipNames,SZipNames]=useState([]);
const[qrType,SQrType]=useState('URL or plain text');
const[panType,SPanType]=useState('Photo');

const clientId=import.meta.env.VITE_GOOGLE_CLIENT_ID;

const cats=['All Tools','PDF Tools','Image Tools','Video Tools','AI Tools','Special Tools','Advanced Features','Government Portals'];

const shown=useMemo(
()=>items.filter(x=>(cat==='All Tools'||x.cat===cat)&&x.name.toLowerCase().includes(query.toLowerCase())),
[cat,query]
);

/* Apply appearance settings. */
useEffect(()=>{
const root=document.documentElement;
root.dataset.theme=dark?'dark':'light';
root.style.setProperty('--brand',accent);

const fonts=['Inter','Roboto','Poppins','DM Sans','Manrope','Space Grotesk','Open Sans','Work Sans','Arial','Georgia'];
const safeFont=fonts.includes(font)?font:'Inter';
root.style.setProperty('--font',`"${safeFont}",system-ui,sans-serif`);
},[dark,accent,font]);

/* Save appearance settings without touching Khata records. */
useEffect(()=>{
try{
localStorage.setItem('aos-appearance-v1',JSON.stringify({dark,lang,font,accent}));
}catch{}
},[dark,lang,font,accent]);

/* Preserve the existing Khata storage key. */
useEffect(()=>{
try{
localStorage.setItem('aos-khata-v1',JSON.stringify(entries));
}catch{}
},[entries]);

useEffect(()=>{
const timer=setInterval(()=>{
if(window.google?.accounts?.id&&clientId&&!document.querySelector('#google-button button')){
window.google.accounts.id.initialize({
client_id:clientId,
callback:r=>{
try{
const p=JSON.parse(atob(r.credential.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
SU({name:p.name,email:p.email,picture:p.picture});
SM('Signed in for display only. This is not secure backend authentication.');
}catch{
SM('Unable to read Google sign-in response');
}
}
});
const el=document.getElementById('google-button');
if(el)window.google.accounts.id.renderButton(el,{theme:dark?'filled_black':'outline',size:'medium',shape:'pill'});
}
},700);
return()=>clearInterval(timer);
},[clientId,dark]);

const dl=(blob,name)=>{
const u=URL.createObjectURL(blob),a=document.createElement('a');
a.href=u;
a.download=name;
a.click();
setTimeout(()=>URL.revokeObjectURL(u),1000);
};

async function merge(){
try{
if(files.length<2){SM('Select at least two PDF files.');return}
const out=await PDFDocument.create();
for(const f of files){
const p=await PDFDocument.load(await f.arrayBuffer());
(await out.copyPages(p,p.getPageIndices())).forEach(pg=>out.addPage(pg));
}
dl(new Blob([await out.save()],{type:'application/pdf'}),'aos-merged.pdf');
SM(`Merged ${files.length} PDFs locally.`);
}catch{
SM('Merge failed. Check that PDFs are valid and not encrypted.');
}
}

async function imageJob(mode){
if(!file){SM('Choose an image first.');return}
const url=URL.createObjectURL(file),img=new Image();

img.onload=()=>{
let w=img.naturalWidth,h=img.naturalHeight;

if(mode==='resize'){
w=Math.min(1200,w);
h=Math.round(img.naturalHeight*w/img.naturalWidth);
}

if(mode==='rotate'){
const oldW=w;
w=h;
h=oldW;
}

if(mode==='crop'){
const side=Math.min(w,h);
const c=document.createElement('canvas');
c.width=side;c.height=side;
c.getContext('2d').drawImage(img,(img.naturalWidth-side)/2,(img.naturalHeight-side)/2,side,side,0,0,side,side);
c.toBlob(b=>{
if(b){dl(b,'aos-cropped.jpg');SM(`Center-cropped image: ${side}×${side}px.`)}
else SM('Crop failed.');
},'image/jpeg',.92);
URL.revokeObjectURL(url);
return;
}

if(mode==='passport'){
const c=document.createElement('canvas');
c.width=1240;c.height=1754;
const ctx=c.getContext('2d');
ctx.fillStyle='#fff';
ctx.fillRect(0,0,c.width,c.height);
const pw=213,ph=213,margin=70,gap=38;

for(let y=margin;y+ph<c.height-margin;y+=ph+gap){
for(let x=margin;x+pw<c.width-margin;x+=pw+gap){
ctx.drawImage(img,x,y,pw,ph);
}
}

c.toBlob(b=>{
if(b){dl(b,'aos-photo-sheet.jpg');SM('Photo sheet created locally. Check the required photo dimensions before official use.')}
else SM('Photo sheet export failed.');
},'image/jpeg',.92);

URL.revokeObjectURL(url);
return;
}

const c=document.createElement('canvas');

if(mode==='circle'){
const side=Math.min(w,h);
c.width=side;c.height=side;
const ctx=c.getContext('2d');
ctx.beginPath();
ctx.arc(side/2,side/2,side/2,0,Math.PI*2);
ctx.clip();
ctx.drawImage(img,(side-img.naturalWidth)/2,(side-img.naturalHeight)/2,img.naturalWidth,img.naturalHeight);
}else{
c.width=w;c.height=h;
const ctx=c.getContext('2d');

if(mode==='rotate'){
ctx.translate(w/2,h/2);
ctx.rotate(Math.PI/2);
ctx.drawImage(img,-img.naturalWidth/2,-img.naturalHeight/2);
}else if(mode==='signature'){
const sw=450,sh=200;
c.width=sw;c.height=sh;
ctx.drawImage(img,0,0,sw,sh);
}else{
ctx.drawImage(img,0,0,w,h);
}
}

const type=mode==='png'||mode==='circle'?'image/png':mode==='webp'?'image/webp':'image/jpeg';

c.toBlob(b=>{
if(b){
dl(b,'aos-image.'+type.split('/')[1]);
SM(`Finished locally: ${c.width}×${c.height}px, ${Math.round(b.size/1024)} KB.`);
}else SM('Format export failed.');
},type,mode==='compress'?.72:.9);

URL.revokeObjectURL(url);
};

img.onerror=()=>{
SM('Could not read image.');
URL.revokeObjectURL(url);
};
img.src=url;
}

function tool(t){
ST(t);
SM('');
SFile(null);
SFiles([]);
SPw('');
SAge('');
SQi('');
}

function content(){
if(!active)return null;
const n=active.name;

if(n==='Merge PDF')return <div className="form">
<p>Select two or more PDFs; they are merged in this browser.</p>
<input type="file" accept=".pdf,application/pdf" multiple onChange={e=>SFiles([...e.target.files])}/>
<button disabled={files.length<2} onClick={merge}>Merge and download</button>
</div>;

if(n==='Organize PDF')return <div className="form">
<p>Reorder pages in a PDF. Enter the new page order using original page numbers, for example 3,1,2. Every page must appear exactly once.</p>
<input type="file" accept=".pdf,application/pdf" onChange={e=>{
const f=e.target.files?.[0];
SFile(f);
if(f)f.arrayBuffer().then(b=>PDFDocument.load(b)).then(d=>SOrder(Array.from({length:d.getPageCount()},(_,i)=>i+1).join(','))).catch(()=>SOrder('1,2,3'));
}}/>
<label>New page order</label>
<input value={order} onChange={e=>SOrder(e.target.value)} placeholder="3,1,2"/>
<button disabled={!file} onClick={async()=>{
try{
const doc=await PDFDocument.load(await file.arrayBuffer());
const raw=order.split(',').map(x=>Number(x.trim()));
if(raw.length!==doc.getPageCount()||raw.some(x=>!Number.isInteger(x)||x<1||x>doc.getPageCount())||new Set(raw).size!==raw.length)throw new Error(`Enter each page once, from 1 to ${doc.getPageCount()}.`);
const out=await PDFDocument.create();
for(const pg of await out.copyPages(doc,raw.map(x=>x-1)))out.addPage(pg);
dl(new Blob([await out.save()],{type:'application/pdf'}),'aos-organized.pdf');
SM('Pages reordered and downloaded locally.');
}catch(e){SM(e.message||'Could not organize this PDF.')}
}}>Reorder and download</button>
</div>;

if(n==='Crop PDF')return <div className="form">
<p>Set the same crop box on every PDF page. Measurements are PDF points (72 points = 1 inch).</p>
<input type="file" accept=".pdf,application/pdf" onChange={e=>SFile(e.target.files?.[0])}/>
<div className="fields">
<label>Left<input id="crop-left" type="number" min="0" defaultValue="20"/></label>
<label>Bottom<input id="crop-bottom
