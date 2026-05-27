import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-black text-white py-12 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-mono uppercase tracking-widest text-white/45">
        <span>ROMEL LIGLIGON PORTFOLIO SYSTEM. ALL RIGHTS RESERVED. MMXXVI</span>
        <div className="flex items-center gap-1">
          <span>FULLSTACK EXPRESS ENGAGED</span>
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
        </div>
        <button
          onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="hover:text-white duration-150 underline decoration-1 cursor-pointer"
        >
          Back to Top ↑
        </button>
      </div>
    </footer>
  );
}
