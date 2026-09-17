import "./gtloader.css";

export default function Gtloader() {
  return (
    <div className="gt-loader">
      <svg
        className="gt-loader__svg"
        viewBox="0 0 220 90"
        role="img"
      >
        <rect x="80" y="40" width="60" height="10" rx="2.5" className="gt-loader__bar" />

        <g className="gt-loader__plate gt-loader__plate--l">
          <rect x="60" y="16" width="14" height="58" rx="2" className="gt-loader__disc" />
        </g>
        <g className="gt-loader__plate gt-loader__plate--l" style={{ animationDelay: "0.2s" }}>
          <rect x="40" y="24" width="12" height="42" rx="2" className="gt-loader__disc" />
        </g>
        <g className="gt-loader__plate gt-loader__plate--l" style={{ animationDelay: "0.4s" }}>
          <rect x="22" y="30" width="10" height="30" rx="2" className="gt-loader__disc" />
        </g>

        <g className="gt-loader__plate gt-loader__plate--r">
          <rect x="146" y="16" width="14" height="58" rx="2" className="gt-loader__disc" />
        </g>
        <g className="gt-loader__plate gt-loader__plate--r" style={{ animationDelay: "0.2s" }}>
          <rect x="168" y="24" width="12" height="42" rx="2" className="gt-loader__disc" />
        </g>
        <g className="gt-loader__plate gt-loader__plate--r" style={{ animationDelay: "0.4s" }}>
          <rect x="188" y="30" width="10" height="30" rx="2" className="gt-loader__disc" />
        </g>
      </svg>

    </div>
  );
}