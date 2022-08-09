import { Box } from "@mantine/core";

function Separator({ direction = "y" }: { direction?: "x" | "y" }) {
  return (
    <Box
      sx={(theme) => ({
        padding:
          direction === "x"
            ? `0px ${theme.spacing.lg}px`
            : `${theme.spacing.lg}px 0px`,
      })}
    >
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2],
          minHeight: "1px",
          minWidth: "1px",
          width: "100%",
          height: "100%",
        })}
      />
    </Box>
  );
}

export default Separator;
