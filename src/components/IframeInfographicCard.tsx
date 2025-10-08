import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { cn } from './ui/utils'
import React from 'react'


export function IframeInfographicCard({ title, src }: { title: string; src: string }) {
  const ref = React.useRef<HTMLIFrameElement | null>(null)
  const [height, setHeight] = React.useState(560)

  React.useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      if (e?.data?.type === 'FIG_IFRAME_HEIGHT' && typeof e.data.height === 'number') {
        setHeight(Math.max(420, Math.min(e.data.height, 1600))) // clamp
      }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [])

  return (
    <Card className="glass-card glass-card-hover border-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="rounded-lg overflow-hidden border border-border">
          <iframe
            ref={ref}
            src={src}
            title={title}
            className="w-full"
            style={{ height }}
            loading="lazy"
            allow="fullscreen; autoplay"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </CardContent>
    </Card>
  )
}

type Props = {
  title: string
  src: string
  height?: number
  allow?: string
  sandbox?: string
  className?: string
}
