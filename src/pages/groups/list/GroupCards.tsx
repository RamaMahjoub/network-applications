import { Grid } from "@mui/material";
import { CardDataType } from "./type";
import GroupItem from "./GroupItem";

const cardData: CardDataType[] = [
  { id: 1, totalUsers: 4, name: "Group 1" },
  { id: 2, totalUsers: 7, name: "Group 2" },
  { id: 3, totalUsers: 5, name: "Group 3" },
  { id: 4, totalUsers: 3, name: "Group 4" },
  { id: 5, totalUsers: 2, name: "Group 5" },
];
const GroupCards = () => {
  return (
    <Grid container spacing={4}>
      {cardData.map((card) => (
        <GroupItem card={card} key={card.id} />
      ))}
    </Grid>
  );
};

export default GroupCards;
