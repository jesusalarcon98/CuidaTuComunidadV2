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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import dayjs from "dayjs";

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

export default function CreateForm({ tasks, setSelectedTasks }) {
  const [open, setOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false); // Nuevo estado para el diálogo de éxito

  const handleOpen = () => {
    // Restablece el estado del formulario a sus valores iniciales
    setFormData({
      title: "",
      description: "",
      date: today,
      state_id: null,
      author: "",
      state_name: "",
    });
    setFormErrors({
      title: false,
      description: false,
      state_id: false,
      author: false,
      state_name: false,
    });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSuccessDialogOpen(false);
  };
  const today = dayjs();

  const [selectedState, setSelectedState] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: today,
    state_id: null,
    author: "",
    state_name: "",
  });
  const [formErrors, setFormErrors] = useState({
    title: false,
    description: false,
    state_id: false,
    author: false,
    state_name: false,
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
    if (!formData.title) {
      setFormErrors({ title: true });
      setTimeout(() => {
        setFormErrors({ title: false });
      }, 3000);
      return;
    }
    if (!formData.description) {
      setFormErrors({ description: true });
      setTimeout(() => {
        setFormErrors({ description: false });
      }, 3000);
      return;
    }
    if (!formData.state_name) {
      setFormErrors({ state_name: true });
      setTimeout(() => {
        setFormErrors({ state_name: false });
      }, 3000);
      return;
    }
    if (!formData.author) {
      setFormErrors({ author: true });
      setTimeout(() => {
        setFormErrors({ author: false });
      }, 3000);
      return;
    }

    axios
      .post("http://localhost:8000/api/", formData)
      .then((response) => {
        console.log("response", response);
        const stateValue = formData.state_name;
        const updatedTask = {
          ...response.data.task,
          state_name: stateValue,
        };
        setSelectedTasks([...tasks, updatedTask]);
        handleClose();
        setSuccessDialogOpen(true);

        setFormErrors({ title: true });
      })
      .catch((error) => {
        console.error("error", error);
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
                required
                error={formErrors.title}
                helperText={formErrors.title ? "Este campo es requerido" : ""}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ marginTop: "-8px" }}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      required
                      id="date"
                      label="Ingrese la fecha."
                      className="button"
                      value={formData.date}
                      onChange={(date) => setFormData({ ...formData, date })}
                      defaultValue={today}
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
              required
              error={formErrors.description}
              helperText={
                formErrors.description ? "Este campo es requerido" : ""
              }
            />
            <div className="modal">
              <Autocomplete
                className="button"
                style={{ marginTop: "15px" }}
                disablePortal
                id="combo-box-demo"
                options={selectedState.map((state_name) => state_name.name)}
                onChange={(event, newValue) => {
                  if (newValue) {
                    const selectedStateObject = selectedState.find(
                      (state_name) => state_name.name === newValue
                    );
                    if (selectedStateObject) {
                      setFormData({
                        ...formData,
                        state_id: selectedStateObject.id,
                        state_name: selectedStateObject.name,
                      });
                    }
                  } else {
                    setFormData({ ...formData, state_name: "" });
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ingrese su estado."
                    error={formErrors.state_name}
                    helperText={
                      formErrors.state_name ? "Este campo es requerido" : ""
                    }
                    required
                  />
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
                  error={formErrors.author}
                  helperText={
                    formErrors.author ? "Este campo es requerido" : ""
                  }
                  required
                />
              </div>
            </div>
            <div className="title">
              <CreateAction handleCreateTask={handleCreateTask} />
            </div>
          </Box>
        </Fade>
      </Modal>

      {/* Diálogo de éxito */}
      <Dialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
      >
        <DialogTitle>Tarea Creada con Éxito</DialogTitle>
        <DialogContent>
          <DialogContentText>
            La tarea se ha creado correctamente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSuccessDialogOpen(false)} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
