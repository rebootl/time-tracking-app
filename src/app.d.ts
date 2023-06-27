// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
      user: User | null;
    }
		// interface PageData {}
		// interface Platform {}
	}
  interface User {
    id: number;
    name: string;
  }
  interface ClientLocals {
    loggedIn: boolean;
    username: string | null;
  }
}

export {};
