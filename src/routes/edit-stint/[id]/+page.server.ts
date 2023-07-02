import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	if (!locals.user) throw redirect(302, `/login`);

  const id = params.id;
  if (typeof id !== 'string') return fail(400, { id, missing: true });

  // get stint from db
  const stint = await prisma.stint.findFirst({
    where: {
      userId: locals.user.id as number,
      id: parseInt(id),
    },
    include: {
      project: true,
    }
  });

  return {
    stint: stint,
  };
}) satisfies PageServerLoad;

export const actions = {
  updateStint: async ({ locals, request }: { locals: App.Locals, request: Request }) => {
    if (!locals.user) throw redirect(302, `/login`);

    const data = await request.formData();

    const stintId = data.get('stintId');
    if (typeof stintId !== 'string') return fail(400, { stintId, missing: true });

    const comment = data.get('comment');
    if (typeof comment !== 'string') return fail(400, { comment, missing: true });

    const start = data.get('start');
    if (typeof start !== 'string') return fail(400, { start, missing: true });

    const end = data.get('end');
    if (typeof end !== 'string') return fail(400, { end, missing: true });

    let r;
    try {
      // verify the stint belongs to the user
      const stint = await prisma.stint.findFirst({
        where: {
          userId: locals.user.id as number,
          id: parseInt(stintId),
        },
      });
      if (!stint) return fail(400, { stintId, error: "Stint not found" });

      r = await prisma.stint.update({
        where: {
          id: parseInt(stintId),
        },
        data: {
          comment: comment,
          start: new Date(start),
          end: new Date(end),
        }
      });
    } catch (e) {
      if (e instanceof Error) {
        // Handle the error
        // Example:
        console.error("Error updating stint:", e);
        return fail(400, { error: e.message });
      }
      // Handle other types of errors
      console.error("Error updating stint:", e);
      return fail(400, { error: "Unknown error occurred" });
    }

    console.log("Updated stint:", r);
    throw redirect(302, '/project-details/' + r.projectId);
  },
  deleteStint: async ({ locals, request }: { locals: App.Locals, request: Request }) => {
    if (!locals.user) throw redirect(302, `/login`);

    const data = await request.formData();

    const stintId = data.get('stintId');
    if (typeof stintId !== 'string') return fail(400, { stintId, missing: true });

    let r;
    try {
      // verify the stint belongs to the user
      const stint = await prisma.stint.findFirst({
        where: {
          userId: locals.user.id as number,
          id: parseInt(stintId),
        },
      });
      if (!stint) return fail(400, { stintId, error: "Stint not found" });

      r = await prisma.stint.delete({
        where: {
          id: parseInt(stintId)
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        // Handle the error
        // Example: console.error("Error updating stint:", e);
        console.error("Error deleting stint:", e);
        return fail(400, { error: e.message });
      }
      // Handle other types of errors
      console.error("Error deleting stint:", e);
      return fail(400, { error: "Unknown error occurred" });
    }

    console.log("Deleted stint:", r);
    // Redirect to project page on successful update
    throw redirect(302, '/project-details/' + r.projectId);
  },
};
