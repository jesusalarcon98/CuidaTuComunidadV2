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
      axios
        .put(`http://localhost:8000/api/${taskID}/`)
        .then((response) => {
          console.log(response);

          setLiked(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <Button variant="outlined" onClick={handleLikeClick} disabled={liked}>
      {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      {liked ? "Liked" : "Like"}
    </Button>
  );
}

export function DeleteButton(taskId) {
  const deleteTask = () => {
    const taskID = taskId.taskId;
    axios
      .delete(`http://localhost:8000/api/${taskID}`)
      .then((response) => {
        console.log("Tarea eliminada con éxito", response);
        // Llamar a la función onDelete para actualizar la lista de tareas
      })
      .catch((error) => {
        console.error("Error al eliminar la tarea", error);
      });
  };

  return (
    <IconButton color="warning" aria-label="Eliminar" onClick={deleteTask}>
      <DeleteIcon />
    </IconButton>
  );
}
