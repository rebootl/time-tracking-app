import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

//import type { PageServerLoad } from './$types';

import type { Project } from '@prisma/client';
import type { ProjectWithStints } from '$lib/types';

export const load = (async ({ locals, params }) => {
	if (!locals.user) throw redirect(302, `/login`);

  // get projects for user from db
  const projects : ProjectWithStints[] = await prisma.project.findMany({
    where: {
      userId: locals.user.id as number
    },
    include: {
      stints: true
    },
    // sort by created date
    orderBy: {
      updatedAt: 'desc'
    }
  });

  return {
    projects: projects,
  };
});

// needed when coming from login via redirect (POST)
export const actions = {
  addProject: async ({ locals, request }: { locals: App.Locals, request: Request }) => {
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

    console.log("added Project", r);
  },
  addStint: async ({ locals, request }: { locals: App.Locals, request: Request }) => {
    if (!locals.user) throw redirect(302, `/login`);

    const data = await request.formData();

    const projectId = data.get('projectId');
    if (typeof projectId !== 'string') return fail(400, { projectId, missing: true });

    const comment = data.get('comment');
    if (typeof comment !== 'string') return fail(400, { comment, missing: true });

    const currentStint = await prisma.stint.findFirst({
      where: {
        userId: locals.user.id as number,
        end: null,
      },
    });

    if (currentStint) {
      // end current stint
      let r;
      try {
        r = await prisma.stint.update({
          where: {
            id: currentStint.id,
          },
          data: {
            end: new Date(),
          }
        });
      } catch (e) {
        if (e instanceof Error) {
          console.log("Error ending current stint", e.message);
          return fail(400, { error: e.message });
        }
        console.log("Unknown error ending current stint", e);
        return fail(400, { error: "Unknown error" });
      }
    }

    let r;
    try {
      r = await prisma.stint.create({
        data: {
          userId: locals.user.id as number,
          projectId: parseInt(projectId),
          comment: comment,
        }
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log("Error adding stint", e.message);
        return fail(400, { error: e.message });
      }
      console.log("Unknown error adding stint", e);
      return fail(400, { error: "Unknown error" });
    }

    console.log("added Stint", r);
  },
  endStint: async ({ locals, request }: { locals: App.Locals, request: Request }) => {
    if (!locals.user) throw redirect(302, `/login`);

    const data = await request.formData();

    const id = data.get('stintId');
    if (typeof id !== 'string') return fail(400, { id, missing: true });

    let r;
    try {
      r = await prisma.stint.update({
        where: {
          id: parseInt(id),
        },
        data: {
          end: new Date(),
        }
      });
    } catch (e) {
      if (e instanceof Error) {
        console.log("Error ending stint", e.message);
        return fail(400, { error: e.message });
      }
      console.log("Unknown error ending stint", e);
      return fail(400, { error: "Unknown error" });
    }

    console.log("ended Stint", r);
  }
};
