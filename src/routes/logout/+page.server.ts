import { fail, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { COOKIENAME } from '$env/static/private';

export async function load({ locals }) {
	if (!locals.loggedIn) throw redirect(307, '/login');
}

export const actions = {
	default: async ({ cookies, locals }) => {

    const sessionId = cookies.get(COOKIENAME);
    if (!sessionId) return fail(401, { message: 'Session not found' });

    const r = await prisma.session.delete({
      where: {
        uuid: sessionId
      }
    });
    if (!r) return fail(401, { message: 'Session not found' });

    cookies.delete(COOKIENAME);

    locals.username = null;
    locals.loggedIn = false;
  }
};
