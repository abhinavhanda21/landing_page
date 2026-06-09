/*
Generate PNG Open Graph images for each page using Puppeteer.

Usage:
  npm install
  npm run generate-og

This script creates assets/og-<page>.png files.
*/
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const outDir = path.join(__dirname, 'assets');
if(!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive:true});

const pages = [
  {path:'index.html', slug:'index', title: 'AI‑Powered Fraud Detection', subtitle: 'Detect fraud earlier. Reduce losses.'},
  {path:'features.html', slug:'features', title: 'Features — AI Fraud Detection', subtitle: 'Real-time scoring, narrative & image analysis.'},
  {path:'how.html', slug:'how', title: 'How It Works — AI Fraud Detection', subtitle: 'Ingestion, scoring, SIU integration.'},
  {path:'brochure.html', slug:'brochure', title: 'Brochure — AI Fraud Detection', subtitle: 'Printable overview for carriers and MGAs.'}
];

(async ()=>{
  const browser = await puppeteer.launch();
  try{
    for(const p of pages){
      const svg = makeSvg(p.title, p.subtitle);
      const html = `<!doctype html><html><head><meta charset="utf-8"></head><body style="margin:0">${svg}</body></html>`;
      const page = await browser.newPage();
      await page.setViewport({width:1200,height:630});
      await page.setContent(html);
      const outPath = path.join(outDir, `og-${p.slug}.png`);
      await page.screenshot({path:outPath, type:'png'});
      console.log('Wrote', outPath);
      await page.close();
    }
  }catch(err){
    console.error(err);
  }finally{
    await browser.close();
  }
})();

function escapeXml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function makeSvg(title, subtitle){
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="g" x1="0" x2="1">
        <stop offset="0" stop-color="#06b6d4"/>
        <stop offset="1" stop-color="#0ea5a0"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="#0f1724" />
    <rect x="60" y="70" width="1080" height="490" rx="24" fill="url(#g)" opacity="0.95" />
    <text x="120" y="220" font-family="Inter, Arial, Helvetica, sans-serif" font-size="52" fill="#fff" font-weight="700">${escapeXml(title)}</text>
    <text x="120" y="290" font-family="Inter, Arial, Helvetica, sans-serif" font-size="28" fill="#f0f9fb">${escapeXml(subtitle)}</text>
    <g transform="translate(120,420)">
      <rect width="220" height="44" rx="8" fill="#071126" opacity="0.12"/>
      <text x="18" y="30" font-family="Inter, Arial, Helvetica, sans-serif" font-size="18" fill="#fff">Book a Consultation</text>
    </g>
  </svg>
  `;
}
