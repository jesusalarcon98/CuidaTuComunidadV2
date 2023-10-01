import { useState, useEffect } from "react";
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
import axios from "axios";
import CreateAction from "./CreateAction";

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
  const [selectedState, setSelectedState] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: null,
    state_id: null,
    author: "",
  });

  useEffect(() => {
    if (open) {
      axios
        .get("http://localhost:8000/api/")
        .then((response) => {
          setSelectedState(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [open]);

  const handleCreateTask = () => {
    axios
      .post("http://localhost:8000/api/", formData)
      .then((response) => {
        console.log("datooos", response.data);

        handleClose();
      })
      .catch((error) => {
        // Maneja errores si es necesario
        console.error(error);
      });
  };

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
                id="title"
                label="Inserte una tarea."
                variant="outlined"
                className="button"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ marginTop: "-8px" }}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      id="date"
                      label="Ingrese la fecha."
                      className="button"
                      value={formData.date}
                      onChange={(date) => setFormData({ ...formData, date })}
                    />
                  </DemoContainer>
                </div>
              </LocalizationProvider>
            </div>
            <TextField
              id="description"
              label="Describa con más detalle la tarea."
              multiline
              rows={4}
              className="button"
              style={{ marginTop: "8px" }}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
            <div className="modal">
              <Autocomplete
                className="button"
                style={{ marginTop: "15px" }}
                disablePortal
                id="combo-box-demo"
                options={selectedState.map((state) => state.name)}
                onChange={(event, newValue) => {
                  if (newValue) {
                    const selectedStateObject = selectedState.find(
                      (state) => state.name === newValue
                    );
                    if (selectedStateObject) {
                      setFormData({
                        ...formData,
                        state_id: selectedStateObject.id,
                      });
                    }
                  } else {
                    setFormData({ ...formData, state: "" });
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Ingrese su estado." />
                )}
              />
              <div>
                <TextField
                  id="author"
                  value={formData.author}
                  onChange={(e) =>
                    setFormData({ ...formData, author: e.target.value })
                  }
                  label="Ingrese su nombre."
                  variant="outlined"
                  className="button"
                />
              </div>
            </div>
            <div className="title">
              <CreateAction handleCreateTask={handleCreateTask} />
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
