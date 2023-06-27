import prisma from '$lib/server/prisma';
import { COOKIENAME } from '$env/static/private';

export async function handle({ event, resolve }) {

  const sessionId = event.cookies.get(COOKIENAME);

  let r = null;
  if (sessionId) {
    r = await prisma.session.findFirst({
      where: {
        uuid: sessionId,
      },
      include: {
        user: true,
      }
    });
  }

  if (r) {
    event.locals.user = {
      name: r.user.name,
      id: r.user.id,
    };
  } else {
    event.locals.user = null;
  }

	return await resolve(event);
}
