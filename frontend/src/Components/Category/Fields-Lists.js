import React, { useState } from "react";
import { getCategories } from "../../redux/Actions/categoriesAtions";
import { HttpHandler } from "../Http/HttpHandler";

// Material UI
import Typography from "@material-ui/core/Typography";
import { CatBoxStatic, CatBoxDynamic, CatBoxDynamicSmall } from "./CatBox";
// import CatBoxDynamic from "./CatBoxDynamic";
import LinkTo from "../LinkTo";
import CategoryIcon from "./CategoryIcon";
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from "react-redux";
import { List } from "@material-ui/core";

// todo: how to deal with empty category list
// now it just loading foreaver

const CategoryList = () => {
  return (
    <HttpHandler
      errorVariant="onlyText?noPaper"
      loadingVariant="spinner?noPaper"
      selector={(s) => s.categories}
      action={getCategories()}
    >
      {(data) => (
        <CatBoxStatic>
          {data.map((item) => (
            <LinkTo key={item._id} to={`/category/${item._id}`}>
              <CategoryIcon iconName={item.icon} color={item.color} />
              <Typography variant="body1">{item.title}</Typography>
            </LinkTo>
          ))}
        </CatBoxStatic>
      )}
    </HttpHandler>
  );
};

const fakeEvent = (id, name) => ({
  target: {
    name,
    value: id,
  },
});

const CategoryListField = ({ error, helperText, name, value, onChange }) => {
  const [selected, setSelected] = useState(value);

  const onClick = (id) => {
    setSelected(id);
    onChange(fakeEvent(id, name));
  };

  return (
    <HttpHandler
      errorVariant="onlyText?noPaper"
      loadingVariant="spinner?noPaper"
      selector={(s) => s.categories}
      action={getCategories()}
    >
      {(data) => (
        <CatBoxDynamic error={error} helperText={helperText}>
          {data.map((item) => (
            <div key={item._id}>
              <CategoryIcon
                onClick={() => onClick(item._id)}
                on={item._id === selected}
                iconName={item.icon}
                color={item.color}
              />
              <Typography variant="body1">{item.title}</Typography>
            </div>
          ))}
        </CatBoxDynamic>
      )}
    </HttpHandler>
  );
};

const CategoryIconsField = ({
  error,
  helperText,
  name,
  colorValue,
  value,
  onChange,
}) => {
  const icons = useSelector((state) => state.meta.icons);
  const [selected, setSelected] = useState("");

  const onClick = (id) => {
    setSelected(id);
    onChange(fakeEvent(id));
  };

  return (
    <CatBoxDynamicSmall
      error={error}
      helperText={helperText}
      label="Icon"
      grid={8}
    >
      {icons.map((item) => (
        <div key={item}>
          <CategoryIcon
            onClick={() => onClick(item)}
            iconName={item}
            on={item === selected}
            color={colorValue}
            size={16}
          />
        </div>
      ))}
    </CatBoxDynamicSmall>
  );
};

const CategoryColorsField = ({ error, helperText, name, value, onChange }) => {
  const colors = useSelector((state) => state.meta.colors);

  const onClick = (id) => {
    const event = {
      target: {
        name,
        value: id,
      },
    };
    onChange(event);
  };

  return (
    <CatBoxDynamicSmall
      error={error}
      helperText={helperText}
      label="Color"
      grid={8}
      fixHieght
    >
      {colors.map((item, key) => (
        <div key={key}>
          <IconButton
            onClick={() => onClick(item)}
            style={{ width: 32, height: 32 }}
            className={`C${item} on`}
          />
        </div>
      ))}
    </CatBoxDynamicSmall>
  );
};

export {
  CategoryList,
  CategoryListField,
  CategoryIconsField,
  CategoryColorsField,
};
