export default async function query(
  query: string,
  variables?: string,
  rest?: object
) {
  const req = await fetch("http://127.0.0.1:8812/graphql", {
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
      ...rest,
    }),
  });

  if (req.status !== 200) throw new Error("bad request");

  return await req.json();
}
