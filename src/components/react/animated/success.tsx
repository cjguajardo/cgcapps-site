import React, { memo } from 'react'
import './success.css'

const Success = () => {
  return <svg viewBox="0 0 100 100" className="animate" id="success">
    <filter id="dropshadow" height="100%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
      <feFlood floodColor="rgba(76, 175, 80, 1)" floodOpacity="0.5" result="color" />
      <feComposite in="color" in2="blur" operator="in" result="blur" />
      <feMerge>
        <feMergeNode />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <circle cx="50" cy="50" r="46.5" fill="none" stroke="rgba(76, 175, 80, 1)" strokeWidth="8" />

    <path d="M67,93 A46.5,46.5 0,1,0 7,32 L43,67 L88,19" fill="none"
      stroke="rgba(76, 175, 80, 1)" strokeWidth="8"
      strokeLinecap="round" strokeDasharray="80 1000"
      strokeDashoffset="-220" style={{ filter: 'url(#dropshadow)' }} />
  </svg>
}

export default memo(Success)
