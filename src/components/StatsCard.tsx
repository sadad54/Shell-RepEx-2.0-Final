import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { cn } from './ui/utils'

interface StatsCardProps {
  title: string
  value: string | number
  trend?: {
    value: number
    label: string
    direction: 'up' | 'down'
  }
  icon?: LucideIcon
  variant?: 'default' | 'warning' | 'success' | 'danger'
  children?: React.ReactNode
  className?: string
}

const variantStyles = {
  default: 'glass-card glass-card-hover shell-accent-subtle',
  warning: 'glass-card glass-card-hover status-card-warning shell-accent-medium',
  success: 'glass-card glass-card-hover status-card-success',
  danger: 'glass-card glass-card-hover status-card-danger'
}

export function StatsCard({
  title,
  value,
  trend,
  icon: Icon,
  variant = 'default',
  children,
  className
}: StatsCardProps) {
  return (
    <Card className={cn(
      "border-0",
      variantStyles[variant],
      className
    )}>
      <CardContent className="p-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-foreground">{value}</p>
              {trend && (
                <div className={cn(
                  "flex items-center space-x-1 text-sm font-medium",
                  trend.direction === 'up' ? "text-success" : "text-destructive"
                )}>
                  {trend.direction === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{trend.value > 0 ? '+' : ''}{trend.value}%</span>
                </div>
              )}
            </div>
            {trend && (
              <p className="text-xs text-muted-foreground">{trend.label}</p>
            )}
          </div>

          {Icon && (
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center backdrop-blur-sm",
              variant === 'warning' && "icon-glow-accent",
              variant === 'success' && "bg-success/10 border border-success/20 hover:bg-success/20 hover:border-success/40 hover:shadow-[0_0_16px_rgba(22,163,74,0.3)]",
              variant === 'danger' && "bg-danger/10 border border-danger/20 hover:bg-danger/20 hover:border-danger/40 hover:shadow-[0_0_16px_rgba(220,38,38,0.3)]",
              variant === 'default' && "icon-glow-primary"
            )}>
              <Icon className={cn(
                "w-6 h-6 transition-all duration-300",
                variant === 'warning' && "text-accent-foreground",
                variant === 'success' && "text-success",
                variant === 'danger' && "text-danger",
                variant === 'default' && "text-primary"
              )} />
            </div>
          )}
        </div>

        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  )
}