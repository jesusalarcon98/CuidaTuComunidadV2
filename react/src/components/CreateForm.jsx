import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Autocomplete from "@mui/material/Autocomplete";
import "../styles/styles.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CreateForm() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button onClick={handleOpen}>Crear nueva tarea.</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h1 className="title"> Formulario para crear una nueva tarea</h1>
            <div className="modal">
              <TextField
                id="outlined-basic"
                label="Inserte una tarea."
                variant="outlined"
                className="button"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ marginTop: "-8px" }}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker label="Ingrese la fecha." className="button" />
                  </DemoContainer>
                </div>
              </LocalizationProvider>
            </div>
            <TextField
              id="outlined-multiline-static"
              label="Describa con más detalle la tarea."
              multiline
              rows={4}
              className="button"
              style={{ marginTop: "8px" }}
            />
            <div className="modal">
              <Autocomplete
                className="button"
                style={{ marginTop: "15px" }}
                disablePortal
                id="combo-box-demo"
                options={top100Films}
                renderInput={(params) => (
                  <TextField {...params} label="ingrese su estado." />
                )}
              />
              <div>
                <TextField
                  id="outlined-basic"
                  label="Ingrese su nombre."
                  variant="outlined"
                  className="button"
                />
              </div>
            </div>
            <div className="title">
              <Button variant="contained">Crear</Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];
