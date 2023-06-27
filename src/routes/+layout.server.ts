
export async function load({ locals }) {

  if (locals.user) {
    return {
      loggedIn: true,
      username: locals.user.name,
    } satisfies ClientLocals
  } else {
    return {
      loggedIn: false,
      username: null,
    } satisfies ClientLocals
  }
}
