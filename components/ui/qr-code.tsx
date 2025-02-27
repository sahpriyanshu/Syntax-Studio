"use client"

import { QRCodeSVG } from 'qrcode.react'

interface QRCodeProps {
  value: string
  size?: number
}

export function QRCode({ value, size = 256 }: QRCodeProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <QRCodeSVG
        value={value}
        size={size}
        bgColor="transparent"
        fgColor="#fff"
        level="L"
        includeMargin={false}
      />
    </div>
  )
}
