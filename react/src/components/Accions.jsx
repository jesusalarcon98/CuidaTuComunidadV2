import { useState } from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export function LikeButton({ taskId, likes, updateTaskLikes }) {
  const [liked, setLiked] = useState(false);
  const [likeUpdatedDialogOpen, setLikeUpdatedDialogOpen] = useState(false);

  const handleLikeClick = () => {
    const taskID = taskId;
    if (!liked) {
      axios
        .put(`http://localhost:8000/api/${taskID}/`)
        .then((response) => {
          setTimeout(() => {
            setLiked(true);
            updateTaskLikes(taskID, likes + 1);
            setLikeUpdatedDialogOpen(true);
          }, 1000);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleCloseLikeUpdatedDialog = () => {
    setLikeUpdatedDialogOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleLikeClick} disabled={liked}>
        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        {liked ? "Liked" : "Like"}
      </Button>

      <Dialog
        open={likeUpdatedDialogOpen}
        onClose={handleCloseLikeUpdatedDialog}
      >
        <DialogTitle>Likes Actualizados</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Los likes se han actualizado correctamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLikeUpdatedDialog} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function DeleteButton({ taskId, deleteTask, likes }) {
  console.log("likes son", likes);
  const [open, setOpen] = useState(false);
  const [cannotDeleteDialogOpen, setCannotDeleteDialogOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseCannotDeleteDialog = () => {
    setCannotDeleteDialogOpen(false);
  };

  const handleDeleteTask = () => {
    const taskID = taskId;
    if (likes === 0) {
      axios
        .delete(`http://localhost:8000/api/${taskID}`)
        .then((response) => {
          console.log("Tarea eliminada con éxito", response);
          deleteTask(taskID);
          setOpen(false);
        })
        .catch((error) => {
          console.error("Error al eliminar la tarea", error);
        });
    } else {
      setCannotDeleteDialogOpen(true);
      setOpen(false);
    }
  };

  return (
    <div>
      <IconButton
        color="warning"
        aria-label="Eliminar"
        onClick={handleClickOpen}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta tarea?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteTask} color="primary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={cannotDeleteDialogOpen}
        onClose={handleCloseCannotDeleteDialog}
      >
        <DialogTitle>No se puede eliminar</DialogTitle>
        <DialogContent>
          <DialogContentText>
            No puedes eliminar esta tarea porque tiene likes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCannotDeleteDialog} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
