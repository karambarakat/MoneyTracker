import Typography from "@material-ui/core/Typography";
import {
  CategoryIconsField,
  CategoryColorsField,
  CategoryListField,
} from "./Fields-Lists";

export const IconsField = ({ label, children }) => {
  return (
    <>
      <Typography
        color="textSecondary"
        style={{ transform: "scale(0.75)" }}
        variant="body1"
      >
        {label}
      </Typography>
      <CategoryIconsField>{children}</CategoryIconsField>;
    </>
  );
};

export const ColorsField = ({ children }) => {
  return <CategoryColorsField>{children}</CategoryColorsField>;
};

export const ListField = ({ children }) => {
  return <CategoryListField>{children}</CategoryListField>;
};
