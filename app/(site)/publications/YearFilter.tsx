'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function YearFilter({ years, activeYear, label }: { years: number[]; activeYear: string; label: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    const value = e.target.value;
    if (value) {
      params.set('year', value);
    } else {
      params.delete('year');
    }
    params.set('page', '1');
    router.push(`/publications?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-[20px] border border-[#e8efe8] p-6">
      <h3 className="font-bold text-[#111A13] text-[18px] mb-5">{label}</h3>
      <div className="relative">
        <select
          className="w-full appearance-none bg-white border border-[#d1d5db] rounded-lg px-4 py-3 text-[15px] font-semibold text-[#111a13] outline-none cursor-pointer"
          onChange={handleChange}
          value={activeYear}
        >
          <option value="">All Years</option>
          {years.map(y => (
            <option key={y} value={String(y)}>{y}</option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-black">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
        </div>
      </div>
    </div>
  );
}
