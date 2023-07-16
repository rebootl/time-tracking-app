import type { Project, Stint } from '@prisma/client'

export interface ProjectWithStints extends Project {
  stints: Stint[];
}

export interface StintWithProject extends Stint {
  project: Project;
}

export interface ServerLocals extends App.Locals {
  user: {
    name: string,
    id: number,
  } | null,
};

export interface ClientLocals {
  loggedIn: boolean;
  username: string | null;
}
