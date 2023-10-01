import { useState } from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

export function LikeButton(taskId) {
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    const taskID = taskId.taskId;

    if (!liked) {
      // Realiza la solicitud PUT cuando se da clic en "Like"
      axios
        .put(`http://localhost:8000/api/${taskID}/`)
        .then((response) => {
          console.log(response);
          // Actualiza el estado local si la solicitud es exitosa
          setLiked(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    /*  setLiked(!liked); */
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
