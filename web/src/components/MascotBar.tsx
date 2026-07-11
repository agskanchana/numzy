"use client";

import Image from "next/image";

/**
 * Matific-style dialogue banner: mascot + speech text on a warm strip.
 */
export default function MascotBar({
  children,
  action,
}: {
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-amber-100 border-2 border-amber-300/70 shadow-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4 animate-rise">
      <div className="relative size-14 sm:size-16 shrink-0 rounded-full overflow-hidden ring-2 ring-amber-400/60 bg-cream animate-float">
        <Image
          src="/images/mascot.jpg"
          alt="Numzy the elephant"
          fill
          sizes="64px"
          className="object-cover scale-110"
        />
      </div>
      <div className="flex-1 text-sm sm:text-base font-semibold text-amber-950">
        {children}
      </div>
      {action}
    </div>
  );
}
