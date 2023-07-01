import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import type { Project } from '@prisma/client';

export const load = (async ({ locals, params }) => {
	if (!locals.user) throw redirect(302, `/login`);

  // get projects for user from db
  const projects = await prisma.project.findMany({
    where: {
      userId: locals.user.id as number
    },
    // sort by created date
    orderBy: {
      updatedAt: 'desc'
    }
  });

  const lastStint = await prisma.stint.findFirst({
    where: {
      userId: locals.user.id as number
    },
    // get project as well
    include: {
      project: true
    },
    // sort by created date
    orderBy: {
      createdAt: 'desc'
    },
    // limit
    take: 1,
  });

  return {
    projects: projects,
    lastStint: lastStint,
  };
}) satisfies PageServerLoad;

// needed when coming from login via redirect (POST)
export const actions = {
	//default: async () => {},
  addProject: async ({ locals, request }) => {
    if (!locals.user) throw redirect(302, `/login`);

    const data = await request.formData();

    const name = data.get('name');
    if (typeof name !== 'string') return fail(400, { name, missing: true });

    const description = data.get('description');
    if (typeof description !== 'string') return fail(400, { description, missing: true });

    const color = data.get('color');
    if (typeof color !== 'string') return fail(400, { color, missing: true });
    // -> verify color is hex color

    let r;
    try {
      r = await prisma.project.create({
        data: {
          userId: locals.user.id as number,
          name: name,
          description: description,
          color: color,
        } as Project
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log("Error adding project", e.message);
        return fail(400, { error: e.message });
      }
      console.log("Unknown error adding project", e);
      return fail(400, { error: "Unknown error" });
    }

    console.log("addProject", r);
  },
  addStint: async ({ locals, request }) => {
    if (!locals.user) throw redirect(302, `/login`);

    const data = await request.formData();
    console.log("addStint", data);

    const projectId = data.get('projectId')?.toString();
    // -> check fail code 401??
    if (!projectId) return fail(401, { projectId, missing: true });
    const comment = data.get('comment')?.toString();

    const currentStint = await prisma.stint.findFirst({
      where: {
        userId: locals.user.id as number,
        end: null,
      },
    });

    if (currentStint) {
      // end current stint
      const r = await prisma.stint.update({
        where: {
          id: currentStint.id,
        },
        data: {
          end: new Date(),
        }
      });
    }

    const r = await prisma.stint.create({
      data: {
        userId: locals.user.id as number,
        projectId: parseInt(projectId),
        comment: comment,
      }
    });

    console.log("addStint", r);
    // -> check for errors
    // -> redirect?
  },
  endStint: async ({ locals, request }) => {
    if (!locals.user) throw redirect(302, `/login`);

    const data = await request.formData();
    console.log("endStint", data);

    const id = data.get('stintId')?.toString();
    // -> check fail code 401??
    if (!id) return fail(401, { id, missing: true });

    const r = await prisma.stint.update({
      where: {
        id: parseInt(id),
      },
      data: {
        end: new Date(),
      }
    });

    console.log("endStint", r);
    // -> check for errors
    // -> redirect?
  }
};
