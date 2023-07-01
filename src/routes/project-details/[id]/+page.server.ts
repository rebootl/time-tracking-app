import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	if (!locals.user) throw redirect(302, `/login`);

  const id = params.id as string;
  if (!params.id) return fail(404, { id, missing: true });

  // get project from db
  const project = await prisma.project.findFirst({
    where: {
      userId: locals.user.id as number,
      id: parseInt(params.id as string),
    },
  });

  // -> include stints above
  const stints = await prisma.stint.findMany({
    where: {
      userId: locals.user.id as number,
      projectId: parseInt(params.id as string),
    },
    // sort by created date
    orderBy: {
      createdAt: 'desc'
    }
  });

  return {
    project: project,
    stints: stints,
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async () => {},
};
