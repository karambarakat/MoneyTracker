import React from "react";
import { green, blue, purple } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

// default icon
import Icon_cat from "@material-ui/icons/Category";
// catagory icons
import Icon_Fastfood from "@material-ui/icons/Fastfood"; // fastFood
import Icon_Kitchen from "@material-ui/icons/Kitchen"; //localFood
import Icon_LocalCafe from "@material-ui/icons/LocalCafe"; //cafe
import Icon_LocalBar from "@material-ui/icons/LocalBar"; //bar
// transtspot
import Icon_LocalGasStation from "@material-ui/icons/LocalGasStation"; //gas
import Icon_DirectionsCar from "@material-ui/icons/DirectionsCar"; //personalCar
import Icon_Flight from "@material-ui/icons/Flight"; //flight
import Icon_Train from "@material-ui/icons/Train"; //publicTransportation
// shopping
import Icon_ShoppingCart from "@material-ui/icons/ShoppingCart"; //shopping
import Icon_ShoppingBasket from "@material-ui/icons/ShoppingBasket"; //groceries
// Entertainment
import Icon_SportsEsports from "@material-ui/icons/SportsEsports"; //gaming
import Icon_SportsBaseball from "@material-ui/icons/SportsBaseball"; //sport
import Icon_CardGiftcard from "@material-ui/icons/CardGiftcard"; //gift

const useStyle = makeStyles((theme) => {
  return {
    Box: {
      backgroundColor: theme.palette.grey[100],
    },
    normal: {
      color: "white",
    },
    green: {
      color: green[400],
    },
    purple: {
      color: purple[400],
    },
    blue: {
      color: blue[400],
    },
    greenbg: {
      backgroundColor: green[400],
      "&:hover": {
        backgroundColor: green[500],
      },
    },
    purplebg: {
      backgroundColor: purple[400],
      "&:hover": {
        backgroundColor: purple[500],
      },
    },
    bluebg: {
      backgroundColor: blue[400],
      "&:hover": {
        backgroundColor: blue[500],
      },
    },
  };
});

const myList = [{}, {}, {}];

const GetIconFromCatName = ({ catName, on, ...props }) => {
  let color = figureColor(catName);
  const classes = useStyle();
  return (
    <IconButton className={on ? classes[`${color}bg`] : classes.Box}>
      <SwitchCase
        props={props}
        catName={catName}
        className={on ? classes.normal : classes[color]}
      ></SwitchCase>
    </IconButton>
  );
};
const figureColor = (catName) => {
  switch (catName) {
    case "cat2": {
      return "green";
    }
    case "cat3": {
      return "blue";
    }
    case "cat1": {
      return "purple";
    }
  }
};
// className={classes[color]}
const SwitchCase = ({ catName, on, className, props }) => {
  let color;
  switch (catName) {
    case "cat2": {
      return (
        <Icon_Fastfood
          fontSize="large"
          color={color}
          on={on}
          className={className}
          {...props}
        />
      );
    }
    case "cat1": {
      return (
        <Icon_ShoppingCart
          fontSize="large"
          color={color}
          on={on}
          className={className}
          {...props}
        />
      );
    }
    case "cat3": {
      return (
        <Icon_LocalBar
          fontSize="large"
          color={color}
          on={on}
          className={className}
          {...props}
        />
      );
    }
    default: {
      return (
        <Icon_cat
          fontSize="large"
          color={color}
          on={on}
          className={className}
          {...props}
        />
      );
    }
  }
};

export default GetIconFromCatName;
