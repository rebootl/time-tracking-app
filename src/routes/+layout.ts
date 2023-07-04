
export async function load({ data }: { data: ClientLocals }) {
  // -> how to do this better?
  const clientData = data; // as ClientLocals; // Type assertion

  //console.log(clientData);

  return {
    ...clientData
  };
}
