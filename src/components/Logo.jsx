/**
 * OATH wordmark, rebuilt as vector from the brand asset.
 * O = ring · A = three ascending chevrons · T · H · period.
 * strokeWidth/caps chosen to match the thin geometric original.
 */
export default function Logo({ className = '', title = 'OATH' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 2338 824"
      role="img"
      aria-label={title}
      fill="none"
      stroke="currentColor"
      strokeWidth="36"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="247" cy="453" rx="203" ry="200" />
      <polyline points="697,270 837,8 978,270" strokeLinejoin="miter" strokeLinecap="square" />
      <polyline points="697,537 837,275 978,537" strokeLinejoin="miter" strokeLinecap="square" />
      <polyline points="697,805 837,543 978,805" strokeLinejoin="miter" strokeLinecap="square" />
      <path d="M1192 259 H1562 M1377 259 V665" strokeLinecap="square" />
      <path d="M1753 242 V665 M2087 242 V665 M1753 453 H2087" strokeLinecap="square" />
      <circle cx="2273" cy="633" r="37" fill="currentColor" stroke="none" />
    </svg>
  )
}
