import { type Tag } from "@/types"

export function stringToTagsArray(str: string): string[] {
  return Array.from(
    new Set(
      str
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
    )
  )
}

export function tagsArrayToString(tags: string[]): string {
  return tags.join(";")
}