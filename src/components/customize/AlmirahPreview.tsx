import { motion } from "framer-motion";

interface Config {
  height: number;
  width: number;
  color: string;
  shelves: number;
  mirror: string;
  lock: string;
  drawers: number;
  thickness: string;
  handle: string;
  doors: number;
}

const colorMap: Record<string, { body: string; accent: string; border: string }> = {
  grey: { body: "#8B8F94", accent: "#6D7278", border: "#5C6066" },
  ivory: { body: "#F5F0E8", accent: "#E8DFD0", border: "#C8BFA8" },
  brown: { body: "#8B6F4E", accent: "#6E5638", border: "#5A4630" },
  blue: { body: "#4A6FA5", accent: "#3A5A8A", border: "#2E4A72" },
  red: { body: "#B04040", accent: "#8E3030", border: "#752828" },
  green: { body: "#4A7A5A", accent: "#3A6248", border: "#2E5040" },
  black: { body: "#3A3A3E", accent: "#2A2A2E", border: "#1E1E22" },
  "wood-finish": { body: "#A67C52", accent: "#8B6240", border: "#704E32" },
};

const AlmirahPreview = ({ config }: { config: Config }) => {
  const c = colorMap[config.color] || colorMap.grey;

  // Scale SVG proportionally – base is 72H x 36W
  const svgW = 280;
  const svgH = (config.height / config.width) * svgW * 0.65;
  const clampH = Math.min(Math.max(svgH, 300), 480);

  const bodyX = 30;
  const bodyY = 20;
  const bodyW = svgW - 60;
  const bodyH = clampH - 50;

  const doorW = bodyW / config.doors;
  const drawerH = config.drawers > 0 ? 36 : 0;
  const shelfAreaH = bodyH - drawerH - 8;
  const shelfGap = shelfAreaH / (config.shelves + 1);

  const hasMirror = config.mirror !== "none";
  const mirrorType = config.mirror;

  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <svg
        viewBox={`0 0 ${svgW} ${clampH + 20}`}
        className="w-full max-w-[320px] drop-shadow-lg"
        style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.15))" }}
      >
        {/* Legs */}
        <rect x={bodyX + 6} y={bodyY + bodyH} width={8} height={16} rx={1} fill={c.border} />
        <rect x={bodyX + bodyW - 14} y={bodyY + bodyH} width={8} height={16} rx={1} fill={c.border} />

        {/* Main body */}
        <rect x={bodyX} y={bodyY} width={bodyW} height={bodyH} rx={4} fill={c.body} stroke={c.border} strokeWidth={2.5} />

        {/* Top decorative strip */}
        <rect x={bodyX} y={bodyY} width={bodyW} height={6} rx={2} fill={c.accent} />

        {/* Doors */}
        {Array.from({ length: config.doors }).map((_, i) => {
          const dx = bodyX + 4 + i * doorW;
          const dw = doorW - 8;
          const dy = bodyY + 8;
          const dh = shelfAreaH - 4;

          return (
            <g key={`door-${i}`}>
              <rect x={dx + 4} y={dy} width={dw} height={dh} rx={2} fill={c.accent} stroke={c.border} strokeWidth={1} />

              {/* Mirror */}
              {hasMirror && (
                <>
                  {mirrorType === "full" && (
                    <rect
                      x={dx + 12}
                      y={dy + 8}
                      width={dw - 16}
                      height={dh - 16}
                      rx={2}
                      fill="url(#mirror-grad)"
                      stroke="#B8C4D0"
                      strokeWidth={0.8}
                    />
                  )}
                  {mirrorType === "half" && (
                    <rect
                      x={dx + 12}
                      y={dy + 8}
                      width={dw - 16}
                      height={(dh - 16) / 2}
                      rx={2}
                      fill="url(#mirror-grad)"
                      stroke="#B8C4D0"
                      strokeWidth={0.8}
                    />
                  )}
                  {mirrorType === "oval" && (
                    <ellipse
                      cx={dx + 4 + dw / 2}
                      cy={dy + dh / 2 - 10}
                      rx={dw / 2 - 18}
                      ry={dh / 2 - 24}
                      fill="url(#mirror-grad)"
                      stroke="#B8C4D0"
                      strokeWidth={0.8}
                    />
                  )}
                </>
              )}

              {/* Handle */}
              {config.handle === "bar" && (
                <rect
                  x={i === 0 ? dx + dw - 2 : dx + 6}
                  y={dy + dh / 2 - 16}
                  width={3}
                  height={32}
                  rx={1.5}
                  fill="#B8B8B8"
                  stroke="#888"
                  strokeWidth={0.5}
                />
              )}
              {config.handle === "round" && (
                <circle
                  cx={i === 0 ? dx + dw + 1 : dx + 7}
                  cy={dy + dh / 2}
                  r={5}
                  fill="#C0C0C0"
                  stroke="#888"
                  strokeWidth={0.5}
                />
              )}
              {config.handle === "d-shape" && (
                <path
                  d={`M ${i === 0 ? dx + dw - 1 : dx + 7} ${dy + dh / 2 - 10} Q ${i === 0 ? dx + dw + 7 : dx - 1} ${dy + dh / 2} ${i === 0 ? dx + dw - 1 : dx + 7} ${dy + dh / 2 + 10}`}
                  fill="none"
                  stroke="#B0B0B0"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
              )}

              {/* Shelves inside door */}
              {Array.from({ length: config.shelves }).map((_, si) => (
                <line
                  key={`shelf-${i}-${si}`}
                  x1={dx + 6}
                  y1={dy + shelfGap * (si + 1)}
                  x2={dx + dw + 2}
                  y2={dy + shelfGap * (si + 1)}
                  stroke={c.border}
                  strokeWidth={1.2}
                  strokeDasharray="2 2"
                  opacity={0.5}
                />
              ))}
            </g>
          );
        })}

        {/* Drawers */}
        {config.drawers > 0 && (
          <>
            {Array.from({ length: config.drawers }).map((_, di) => {
              const dH = drawerH / config.drawers;
              return (
                <g key={`drawer-${di}`}>
                  <rect
                    x={bodyX + 8}
                    y={bodyY + shelfAreaH + 4 + di * dH}
                    width={bodyW - 16}
                    height={dH - 3}
                    rx={2}
                    fill={c.accent}
                    stroke={c.border}
                    strokeWidth={1}
                  />
                  {/* Drawer handle */}
                  <rect
                    x={bodyX + bodyW / 2 - 12}
                    y={bodyY + shelfAreaH + 4 + di * dH + dH / 2 - 2}
                    width={24}
                    height={3}
                    rx={1.5}
                    fill="#B8B8B8"
                  />
                </g>
              );
            })}
          </>
        )}

        {/* Lock */}
        {config.lock !== "none" && (
          <g>
            <circle cx={bodyX + bodyW / 2} cy={bodyY + bodyH / 2} r={4} fill="#888" stroke="#666" strokeWidth={0.8} />
            {config.lock === "digital" && (
              <rect x={bodyX + bodyW / 2 - 8} y={bodyY + bodyH / 2 - 12} width={16} height={10} rx={2} fill="#333" stroke="#555" strokeWidth={0.5} />
            )}
          </g>
        )}

        {/* Thickness indicator label */}
        <text x={svgW / 2} y={clampH + 14} textAnchor="middle" fontSize="9" fill="#888" fontFamily="DM Sans, sans-serif">
          {config.thickness} gauge • {config.height}" × {config.width}"
        </text>

        {/* Gradient defs */}
        <defs>
          <linearGradient id="mirror-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D8E8F0" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#F0F4F8" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#C0D0E0" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default AlmirahPreview;
