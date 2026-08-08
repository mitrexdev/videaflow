import { Card, CardContent } from "@/components/ui/card"

/** Filler for dashboard sections that aren't built yet. */
export function SectionPlaceholder({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <Card className="flex flex-1 items-center justify-center">
      <CardContent className="py-16 text-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      </CardContent>
    </Card>
  )
}
