
export async function load({ data }) {
  // -> how to do this better?
  const clientData = data as ClientLocals; // Type assertion

  //console.log(clientData);

  return {
    ...clientData
  };
}
