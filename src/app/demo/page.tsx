"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import UnifiedNavBar from '@/components/UnifiedNavBar';

type PresetKey = "eco" | "retail" | "motorsport";
const PRESETS: Record<PresetKey, {brand:string; voice:string; type:string; prompt:string; output:string}> = {
  eco: {
    brand:"EcoLife Sustainable",
    voice:"Friendly · Environmental · Inspiring",
    type:"Instagram Post",
    prompt:"Create a post about reducing carbon footprint.",
    output:`🌿 Small changes, big impact! Try these 3 swaps to cut your carbon footprint this week:

1) Drive less → walk/bike 2km trips
2) Meat every other day → plant-based 2x/week  
3) Standby off → switch off at the wall

Every small action counts! What's your eco-swap this week? 💚

#EcoLife #SustainableLiving #CarbonFootprint #GreenLiving #EcoWarrior`
  },
  retail: {
    brand:"CityCenter Mall",
    voice:"Clear · Helpful · Polite",
    type:"Kiosk Answer",
    prompt:`Visitor asks: "Where is H&M and is there any promo today?"`,
    output:`👋 H&M is on Level 1, Unit 114, next to ZARA. Take the escalator by the South Entrance, turn left, 40m ahead.

🎟️ Today's Special: Buy 2 tees, get 1 free (till 18:00)
📱 Show this message at checkout for instant discount

Need directions? I can send a map to your phone!

[Send map to my device] [View store hours]`
  },
  motorsport: {
    brand:"T4 Velocity Racing",
    voice:"Confident · Energetic · Professional",
    type:"Weekly Pack",
    prompt:"Race recap + sponsor email + 3 TikTok hooks.",
    output:`**Race Recap**
P7 → P3 podium at Emmen! Fastest lap 1:02.41. 🏁
Team executed perfect strategy, overtook on Lap 6 chicane.

**Sponsor Email**
Subject: Podium finish + 128k weekly reach
Hi [Name], we placed P3 and hit 128k social reach this week. 
Quick 15-min call Tuesday/Wednesday to discuss Q2 activation?

**TikTok Hooks**
1) "From P7 to podium—here's the Lap 6 move that changed everything"
2) "T4 setup tweak that found us 0.3 seconds per lap"  
3) "Mic'd up: listen to our last-lap radio comms under pressure"`
  },
};

export default function DemoPage() {
  const [preset, setPreset] = useState<PresetKey>("eco");
  const [brand, setBrand] = useState(PRESETS.eco.brand);
  const [voice, setVoice] = useState(PRESETS.eco.voice);
  const [type, setType] = useState(PRESETS.eco.type);
  const [prompt, setPrompt] = useState(PRESETS.eco.prompt);
  const [output, setOutput] = useState(PRESETS.eco.output);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error"|"invalid">("idle");

  useEffect(()=>{
    const saved = localStorage.getItem("emerlya_demo_output");
    if (saved) setOutput(saved);
  },[]);

  function loadPreset(k: PresetKey){
    const p = PRESETS[k];
    setPreset(k);
    setBrand(p.brand); setVoice(p.voice); setType(p.type);
    setPrompt(p.prompt); setOutput(p.output);
    localStorage.setItem("emerlya_demo_output", p.output);
    // analytics: console.log('demo_preset_selected', k);
  }

  async function sendEmail(){
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus("invalid"); return; }
    setStatus("sending");
    const html = `
      <div style="font-family:system-ui;line-height:1.55;max-width:600px;margin:0 auto;padding:20px;">
        <h2 style="color:#1e40af;margin-bottom:20px;">Your Emerlya Demo</h2>
        <div style="background:#f8fafc;padding:16px;border-radius:8px;margin-bottom:20px;">
          <p><strong>Brand:</strong> ${escapeHtml(brand)}</p>
          <p><strong>Voice:</strong> ${escapeHtml(voice)}</p>
          <p><strong>Content Type:</strong> ${escapeHtml(type)}</p>
          <p><strong>Prompt:</strong> ${escapeHtml(prompt)}</p>
        </div>
        <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;margin-bottom:20px;">
          <h3 style="margin-top:0;color:#374151;">Generated Content:</h3>
          <pre style="white-space:pre-wrap;font-family:system-ui;line-height:1.5;margin:0;">${escapeHtml(output)}</pre>
        </div>
        <p style="color:#6b7280;font-size:14px;">— Cosmin @ Emerlya</p>
        <p style="color:#6b7280;font-size:12px;margin-top:20px;">Ready to create your own? <a href="https://emerlya.com/login" style="color:#1e40af;">Get started with Emerlya AI</a></p>
      </div>`;
    try{
      const res = await fetch("/api/send-demo-email", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ to: email, subject: "Your Emerlya Demo", html })
      });
      setStatus(res.ok ? "sent" : "error");
      if (res.ok) {
        // analytics: console.log('demo_email_submit', { success: true });
      }
    }catch{ 
      setStatus("error"); 
      // analytics: console.log('demo_email_submit', { success: false });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-white to-neutral">
      {/* Navigation */}
      <UnifiedNavBar />

      {/* Content */}
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/80 rounded-2xl p-6 md:p-8 shadow-xl border border-white/50">
            <div className="flex justify-center mb-4">
              <img 
                src="/emerlya-logo.svg" 
                alt="Emerlya AI Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold font-heading text-primary mb-6 text-center">
              Emerlya — Interactive Demo
            </h1>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(["eco","retail","motorsport"] as PresetKey[]).map(k=>(
                <button key={k}
                  onClick={()=>loadPreset(k)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                    preset===k 
                      ? "bg-primary text-white border-primary shadow-lg" 
                      : "bg-white text-gray-700 border-gray-300 hover:border-primary hover:text-primary"
                  }`}>
                  {k==="eco"?"🌿 Eco brand":k==="retail"?"🏪 Retail kiosk":"🏁 Motorsport team"}
                </button>
              ))}
            </div>

            {/* Main Demo Area */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Left Side - Inputs */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-4 border border-primary/10">
                  <h2 className="font-semibold text-primary mb-3">Brand Profile</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                      <input 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                        value={brand} 
                        onChange={e=>setBrand(e.target.value)} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Brand Voice</label>
                      <input 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                        value={voice} 
                        onChange={e=>setVoice(e.target.value)} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                      <input 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
                        value={type} 
                        onChange={e=>setType(e.target.value)} 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prompt</label>
                      <textarea 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[80px] resize-none" 
                        value={prompt} 
                        onChange={e=>setPrompt(e.target.value)} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Output */}
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-200">
                <h2 className="font-semibold text-primary mb-3">AI Generated Content</h2>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary min-h-[280px] font-mono text-sm leading-relaxed resize-none" 
                  value={output} 
                  onChange={e=>{ 
                    setOutput(e.target.value); 
                    localStorage.setItem("emerlya_demo_output", e.target.value); 
                  }} 
                />
                
                {/* Email Section */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">📧 Send to my email</h3>
                  <div className="flex gap-2">
                    <input 
                      type="email" 
                      placeholder="your@email.com" 
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      value={email} 
                      onChange={e=>setEmail(e.target.value)} 
                    />
                    <button 
                      onClick={sendEmail} 
                      disabled={status === "sending"}
                      className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "sending" ? "Sending..." : "Send"}
                    </button>
                  </div>
                  <div className="mt-2 min-h-[20px]">
                    {status==="invalid" && <p className="text-sm text-red-600">Enter a valid email address.</p>}
                    {status==="sending" && <p className="text-sm text-blue-600">Sending email...</p>}
                    {status==="sent" && <p className="text-sm text-green-600">✅ Email sent! Check your inbox.</p>}
                    {status==="error" && <p className="text-sm text-red-600">Could not send email. Try again.</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg font-semibold text-primary mb-2">Ready to create your own?</h3>
                <p className="text-gray-600 mb-4">Join thousands of teams using Emerlya AI for consistent, high-quality content.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link href="/login">
                    <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5">
                      Start Free Trial
                    </button>
                  </Link>
                  <Link href="/pricing">
                    <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:border-primary hover:text-primary transition-all duration-200">
                      View Pricing
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-primary py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <span className="text-primary font-bold font-heading">E</span>
                </div>
                <span className="text-xl font-semibold font-heading text-white">Emerlya AI</span>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Intelligent content generation for modern teams.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold font-heading text-white mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/features" className="text-white/80 hover:text-accent transition-colors text-sm">Features</Link></li>
                <li><Link href="/pricing" className="text-white/80 hover:text-accent transition-colors text-sm">Pricing</Link></li>
                <li><Link href="/api-docs" className="text-white/80 hover:text-accent transition-colors text-sm">API</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold font-heading text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-white/80 hover:text-accent transition-colors text-sm">About</Link></li>
                <li><Link href="/blog" className="text-white/80 hover:text-accent transition-colors text-sm">Blog</Link></li>
                <li><Link href="/contact" className="text-white/80 hover:text-accent transition-colors text-sm">Contact</Link></li>
                <li><a href="mailto:hello@emerlya.com" className="text-white/80 hover:text-accent transition-colors text-sm">📩 hello@emerlya.com</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold font-heading text-white mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-white/80 hover:text-accent transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-white/80 hover:text-accent transition-colors text-sm">Terms of Service</Link></li>
                <li><Link href="/gdpr" className="text-white/80 hover:text-accent transition-colors text-sm">GDPR</Link></li>
                <li><Link href="/cookies" className="text-white/80 hover:text-accent transition-colors text-sm">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm text-white/60">
            <p>© 2025 Emerlya AI. All rights reserved. | Built with ❤️ in the EU 🇪🇺</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function escapeHtml(s:string){return s.replace(/[&<>"']/g,(m)=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" } as any)[m]);}
