import { graphql } from "../gql/gql";

export default function gql(literals, ...placeholders) {
  // const input = literals.join("");
  const input = literals.reduce((acc, cur, idx) => {
    return acc + cur + (placeholders[idx] || "");
  }, "");

  const rt = graphql(input);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  rt.__my_input = input;
  return graphql(input);
}

export function getGqlInput(rt: ReturnType<typeof gql>) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return rt.__my_input;
}
