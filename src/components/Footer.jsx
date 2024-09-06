// components/Footer.js
const Footer = () => {
  return (
    <div className="border-t-[1px_solid_rgba(255,255,255,0.1)] flex flex-row justify-around p-[25px_0] w-full box-sizing-border bg-black absolute bottom-0">
      <div className="flex flex-col box-sizing-border">
        <div className="inline-block break-words font-['Inter'] font-medium text-[12.8px] leading-[1.15] text-[#FFFFFF]">
          Product
        </div>
        <div className="opacity-60 inline-block break-words font-['Inter'] font-normal text-[12.8px] tracking-[0.1px] leading-[1.562] text-[#FFFFFF]">
          Home
        </div>
        <div className="opacity-60 inline-block break-words font-['Inter'] font-normal text-[12.8px] tracking-[0.1px] leading-[1.562] text-[#FFFFFF]">
          Download
        </div>
        <span className="opacity-60 inline-block break-words font-['Inter'] font-normal text-[12.8px] tracking-[0.1px] leading-[1.562] text-[#FFFFFF]">
          FAQ
        </span>
      </div>
      <div className="flex flex-col items-center box-sizing-border">
        <div className="inline-block break-words font-['Inter'] font-medium text-[12.8px] leading-[1.15] text-[#FFFFFF]">
          About
        </div>
        <div className="opacity-60 inline-block break-words font-['Inter'] font-normal text-[12.8px] tracking-[0.1px] leading-[1.562] text-[#FFFFFF]">
          Khush
        </div>
        <div className="opacity-60 inline-block break-words font-['Inter'] font-normal text-[12.8px] tracking-[0.1px] leading-[1.562] text-[#FFFFFF]">
          Sairantri
        </div>
        <div className="opacity-60 inline-block break-words font-['Inter'] font-normal text-[12.8px] tracking-[0.1px] leading-[1.562] text-[#FFFFFF]">
          Pratik
        </div>
        <span className="opacity-60 inline-block break-words font-['Inter'] font-normal text-[12.8px] tracking-[0.1px] leading-[1.562] text-[#FFFFFF]">
          Atreyee
        </span>
      </div>
    </div>
  );
};

export default Footer;
