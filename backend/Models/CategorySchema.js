const mongoose = require("mongoose");

var CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    enum: [
      "f8cd92",
      "6074ff",
      "ec7194",
      "4cbfbc",
      "d38ead",
      "d289f5",
      "1ca2ef",
      "a178fa",
    ],
    required: true,
  },
  icon: {
    type: String,
    enum: [
      "Star",
      "School",
      "SportsEsports",
      "Cake",
      "SportsSoccer",
      "SportsBasketball",
      "KingBed",
      "SportsTennis",
      "OutdoorGrill",
      "SportsMotorsports",
      "SportsBaseball",
      "SportsHandball",
      "SportsVolleyball",
      "SportsFootball",
      "House",
      "Casino",
      "Flight",
      "Restaurant",
      "LocalMall",
      "LocalLibrary",
      "LocalCafe",
      "LocalAtm",
      "LocalGroceryStore",
      "LocalFlorist",
      "LocalGasStation",
      "Train",
      "TwoWheeler",
      "DirectionsBoat",
      "LocalPizza",
      "LocalSee",
      "PhoneIphone",
      "DesktopWindows",
      "Laptop",
      "Tv",
      "Speaker",
      "SentimentSatisfiedAlt",
      "VpnKey",
      "PlayCircle",
      "Movie",
      "Error",
      "AddAlert",
      "CheckCircle",
      "Favorite",
      "Event",
      "AccountBalance",
      "Work",
      "Save",
      "ShoppingBasket",
      "Stars",
      "Extension",
      "GTranslate",
    ],
    required: true,
  },
  markedForDeletion: {
    type: Boolean,
    default: false,
  },
});

CategorySchema.methods.update = function ({ title, color, icon }) {
  if (title) this.title = title;
  if (color) this.color = color;
  if (icon) this.icon = icon;
  return this;
};

module.exports = CategorySchema;
