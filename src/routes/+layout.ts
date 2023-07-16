import type { ClientLocals } from '$lib/types';

export async function load({ data }) {

  const clientData = data;

  //console.log(clientData);

  return {
    ...clientData
  };
}
