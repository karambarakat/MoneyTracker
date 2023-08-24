import { graphql } from "../gql/gql";

export default function gql(literals) {
  const rt = graphql(literals[0]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  rt.__as_str = literals[0];
  return graphql(literals[0]);
}

export function getAsString(rt: ReturnType<typeof gql>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return rt.__as_str;
}
