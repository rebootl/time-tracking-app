import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

import type { PageServerLoad, Actions } from './$types';

export const load = (async ({ locals, params }) => {
	if (!locals.user) throw redirect(302, `/login`);

  const id = params.id;
  if (typeof id !== 'string') return fail(400, { id, missing: true });

  // get project from db
  const project = await prisma.project.findFirst({
    where: {
      userId: locals.user.id,
      id: parseInt(id),
    },
  });

  if (!project) return fail(400, { id, error: "Project not found" });
  return {
    project: project,
  };
}) satisfies PageServerLoad;

export const actions = {
  updateProject: async ({ locals, request }) => {
    if (!locals.user) throw redirect(302, `/login`);

    const data = await request.formData();

    const projectId = data.get('projectId');
    if (typeof projectId !== 'string') return fail(400, { projectId, missing: true });

    const name = data.get('name');
    if (typeof name !== 'string') return fail(400, { name, missing: true })

    const description = data.get('description');
    if (typeof description !== 'string') return fail(400, { description, missing: true })

    const color = data.get('color');
    if (typeof color !== 'string') return fail(400, { color, missing: true })
    // -> verify color is hex color

    let r;
    try {
      // verify the project belongs to the user
      const project = await prisma.project.findFirst({
        where: {
          userId: locals.user.id,
          id: parseInt(projectId),
        },
      });
      if (!project) return fail(400, { projectId, error: "Project not found" });

      r = await prisma.project.update({
        where: {
          id: parseInt(projectId),
        },
        data: {
          name: name,
          description: description,
          color: color,
        }
      });
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        return fail(400, { error: e.message });
      }
      console.error(e);
      return fail(400, { error: "Unknown error" });
    }

    console.log("Updated project:", r);
    throw redirect(302, '/');
  },
  deleteProject: async ({ locals, request }) => {
    if (!locals.user) throw redirect(302, `/login`);

    const data = await request.formData();

    const projectId = data.get('projectId');
    if (typeof projectId !== 'string') return fail(400, { projectId, missing: true });

    let r;
    try {
      // verify the project belongs to the user
      const project = await prisma.project.findFirst({
        where: {
          userId: locals.user.id,
          id: parseInt(projectId),
        },
      });
      if (!project) return fail(400, { projectId, error: "Project not found" });

      r = await prisma.project.delete({
        where: {
          id: parseInt(projectId),
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        console.error(e);
        return fail(400, { error: e.message });
      }
      console.error(e);
      return fail(400, { error: "Unknown error" });
    }

    console.log("Deleted project:", r);
    throw redirect(302, '/');
  },
} satisfies Actions;
