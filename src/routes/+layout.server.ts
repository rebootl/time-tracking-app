
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {

  if (locals.user) {
    return {
      loggedIn: true,
      username: locals.user.name,
    }
  } else {
    return {
      loggedIn: false,
      username: null,
    }
  }
}) satisfies LayoutServerLoad;
