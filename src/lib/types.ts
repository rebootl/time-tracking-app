import type { Project, Stint } from '@prisma/client'

export interface ProjectWithStints extends Project {
  stints: Stint[];
}
