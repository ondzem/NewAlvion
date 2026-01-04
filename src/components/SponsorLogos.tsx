import React from "react";

export interface SponsorLogo {
  name: string;
  src: string;
}

export const sponsorLogos: SponsorLogo[] = [
  { name: "Pinterest", src: "/Sponsor - Pinterest.png" },
  { name: "Supabase", src: "/Sponsor - Supabase.png" },
  { name: "Elektrika", src: "/Sponsor - Elektrika.png" },
  { name: "Raška", src: "/Sponsor - Raska.png" },
  { name: "Spilar", src: "/Sponsor - Spilar.png" },
  { name: "Štorek", src: "/Sponsor - Storek.png" },
];

export const SponsorLogos = (): JSX.Element => {
  return (
    <div className="absolute left-0 w-full overflow-hidden" style={{ bottom: '-10px' }}>
      <div className="relative h-[160px] flex items-center">
        <div className="flex animate-scroll-left">
          {[...sponsorLogos, ...sponsorLogos, ...sponsorLogos].map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center h-28 opacity-100 transition-opacity duration-300 flex-shrink-0 mx-0"
              style={{ width: '180px' }}
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};