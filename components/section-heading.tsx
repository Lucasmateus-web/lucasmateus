import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  titleClassName?: string
  align?: "left" | "center"
}

export function SectionHeading({
  title,
  description,
  className,
  titleClassName,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Reveal delayIndex={1}>
        <h2
          className={cn(
            "font-display text-balance text-3xl font-bold leading-tight sm:text-4xl md:text-5xl",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delayIndex={2}>
          <p
            className={cn(
              "max-w-2xl text-pretty leading-relaxed text-text-secondary",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  )
}
