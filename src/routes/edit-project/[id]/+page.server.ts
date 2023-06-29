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

  return {
    project: project,
  };
}) satisfies PageServerLoad;

export const actions = {
  updateProject: async ({ locals, request }) => {
    if (!locals.user) throw redirect(302, `/login`);

    const data = await request.formData();

    const projectId = data.get('projectId')?.toString();
    if (!projectId) return fail(401, { projectId, missing: true });
    const name = data.get('name')?.toString();
    if (!name) return fail(401, { name, missing: true });
    const description = data.get('description')?.toString();
    const color = data.get('color');
    // -> verify color is hex color

    const r = await prisma.project.update({
      where: {
        id_userId: {
          id: parseInt(projectId as string),
          userId: locals.user.id as number,
        }
      },
      data: {
        name: name,
        description: description,
        color: color as string,
      }
    });

    if (r) {
      console.log("Updated project:", r);
      // Redirect to the main page on successful update
      throw redirect(302, '/');
    } else {
      console.error("Error updating project");
      // Handle the error appropriately (e.g., show an error message)
      // You can choose to redirect to an error page if desired
    }
  },
  deleteProject: async ({ locals, request }) => {
    if (!locals.user) throw redirect(302, `/login`);

    const data = await request.formData();

    const projectId = data.get('projectId')?.toString();
    if (!projectId) return fail(401, { projectId, missing: true });

    const r = await prisma.project.delete({
      where: {
        id_userId: {
          id: parseInt(projectId as string),
          userId: locals.user.id as number,
        }
      },
    });

    if (r) {
      console.log("Deleted project:", r);
      // Redirect to the main page on successful update
      throw redirect(302, '/');
    } else {
      console.error("Error deleting project");
      // Handle the error appropriately (e.g., show an error message)
      // You can choose to redirect to an error page if desired
    }
  }
};
