"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="top-right"
      offset={56}
      icons={{
        success: <CircleCheckIcon className="size-4 text-emerald-600" />,
        info: <InfoIcon className="size-4 text-blue-600" />,
        warning: <TriangleAlertIcon className="size-4 text-amber-600" />,
        error: <OctagonXIcon className="size-4 text-red-600" />,
        loading: <Loader2Icon className="size-4 animate-spin text-blue-600" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group-[.toaster]:bg-white dark:group-[.toaster]:bg-slate-900 group-[.toaster]:text-slate-900 dark:group-[.toaster]:text-white group-[.toaster]:border group-[.toaster]:border-slate-200 dark:group-[.toaster]:border-slate-700 group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl",
          title: "group-[.toast]:text-slate-900 dark:group-[.toast]:text-white group-[.toast]:font-semibold group-[.toast]:text-sm",
          description: "group-[.toast]:text-slate-600 dark:group-[.toast]:text-slate-300 group-[.toast]:text-xs",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-white group-[.toast]:font-semibold group-[.toast]:rounded-md",
          cancelButton: "group-[.toast]:bg-slate-100 dark:group-[.toast]:bg-slate-800 group-[.toast]:text-slate-600 dark:group-[.toast]:text-slate-300 group-[.toast]:font-medium group-[.toast]:rounded-md",
          success: "group-[.toaster]:border-emerald-300 dark:group-[.toaster]:border-emerald-700 group-[.toaster]:bg-emerald-50 dark:group-[.toaster]:bg-emerald-950",
          warning: "group-[.toaster]:border-amber-300 dark:group-[.toaster]:border-amber-700 group-[.toaster]:bg-amber-50 dark:group-[.toaster]:bg-amber-950",
          error: "group-[.toaster]:border-red-300 dark:group-[.toaster]:border-red-700 group-[.toaster]:bg-red-50 dark:group-[.toaster]:bg-red-950",
          info: "group-[.toaster]:border-blue-300 dark:group-[.toaster]:border-blue-700 group-[.toaster]:bg-blue-50 dark:group-[.toaster]:bg-blue-950",
        },
      }}
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "#1e293b",
          "--normal-border": "#e2e8f0",
          "--border-radius": "0.75rem",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
