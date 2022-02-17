function genreColor(genre) {
  switch (genre) {
    case "Fantasy":
      return "green";
    case "Thriller":
      return "grape";
    case "Adventure":
      return "indigo";
    case "Historical":
      return "orange";
    case "SciFi":
      return "yellow";
    case "Horror":
      return "teal";
    case "Romance":
      return "red";
    case "FanFiction":
      return "lime";
    case "Others":
      return "gray";
    default:
      return "gray";
  }
}

const ratingColor = {
    Mature: "violet",
    Teen: "orange",
    Everyone: "blue",
  };
  const statusColor = {
    Completed: "green",
    Ongoing: "yellow",
  };

const bannerObj = [
  {
    value:
      "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    label: "Light shining on Book",
  },
  {
    value:
      "https://images.pexels.com/photos/1165982/pexels-photo-1165982.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    label: "Tree tunnel",
  },
  {
    value:
      "https://images.pexels.com/photos/109998/pexels-photo-109998.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    label: "Neon sign",
  },
  {
    value:
      "https://images.pexels.com/photos/427900/pexels-photo-427900.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    label: "Person looking at moon",
  },
  {
    value:
      "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    label: "City in the clouds",
  },
  {
    value:
      "https://images.pexels.com/photos/5952651/pexels-photo-5952651.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    label: "Man in hoodie",
  },
  {
    value:
      "https://images.pexels.com/photos/3075993/pexels-photo-3075993.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    label: "City at night",
  },
  {
    value:
      "https://images.pexels.com/photos/316080/pexels-photo-316080.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    label: "Dreary ballroom",
  },
  {
    value:
      "https://images.pexels.com/photos/776647/pexels-photo-776647.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    label: "Rose on wooden surface",
  },
  {
    value:
      "https://images.pexels.com/photos/907485/pexels-photo-907485.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    label: "Pink sky",
  },
];

export default { genreColor, bannerObj, ratingColor, statusColor };
