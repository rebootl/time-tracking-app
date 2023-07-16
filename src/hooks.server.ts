import prisma from '$lib/server/prisma';
import { COOKIENAME } from '$env/static/private';

import type { Handle } from '@sveltejs/kit';

export const handle = (async ({ event, resolve }) => {

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
    event.locals = {
      user: {
        name: r.user.name,
        id: r.user.id,
      }
    };
  } else {
    event.locals = {
      user: null,
    };
  }

  const response = await resolve(event);
  return response;
}) satisfies Handle;
