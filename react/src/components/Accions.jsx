import { useState } from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export function LikeButton() {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  return (
    <Button variant="outlined" onClick={handleLikeClick} disabled={liked}>
      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      {liked ? "Liked" : "Like"}
    </Button>
  );
}

export function DeleteButton() {
  return (
    <IconButton color="warning" aria-label="Eliminar">
      <DeleteIcon />
    </IconButton>
  );
}
