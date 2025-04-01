export default function Wave() {
  return (
    <div className="waves md:h-[15vh] h-[40px] md:min-h-28 min-h-[40px] md:max-h-40">
      <svg
        className="relative w-full h-full -mb-2"
        preserveAspectRatio="none"
        shapeRendering="auto"
        viewBox="0 24 150 28"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <path
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            id="gentle-wave"
          />
        </defs>
        <g className="parallax">
          <use
            className="animate-wave-1 text-main/70"
            fill="currentColor"
            x="48"
            xlinkHref="#gentle-wave"
            y="0"
          />
          <use
            className="animate-wave-2 text-main/50"
            fill="currentColor"
            x="48"
            xlinkHref="#gentle-wave"
            y="3"
          />
          <use
            className="animate-wave-3 text-main/30"
            fill="currentColor"
            x="48"
            xlinkHref="#gentle-wave"
            y="5"
          />
          <use
            className="animate-wave-4 text-main"
            fill="currentColor"
            x="48"
            xlinkHref="#gentle-wave"
            y="7"
          />
        </g>
      </svg>
    </div>
  );
}
