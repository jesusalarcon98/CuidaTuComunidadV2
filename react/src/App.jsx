import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import CustomPaginationActionsTable from "./components/table";
import CreateForm from "./components/CreateForm";
import "./styles/styles.css";
import axios from "axios";

function App() {
  const [nameFilter, setNameFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [tasks, setSelectedTasks] = useState([]);

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };
  const handleStateFilterChange = (event) => {
    setStateFilter(event.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/criteria`)
      .then((response) => {
        setSelectedTasks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1 className="title"> Cuida tu comunidad</h1>
      <div className="principal">
        <TextField
          id="filterName"
          label="Filtrar por nombre."
          variant="outlined"
          className="button"
          onChange={handleNameFilterChange} // Manejador de eventos para cambios en el filtro
        />
        <TextField
          id="outlined-basic"
          label="Filtrar por estado."
          variant="outlined"
          className="button"
          onChange={handleStateFilterChange}
        />
        <div className="button">
          <CreateForm
            className="button"
            tasks={tasks}
            setSelectedTasks={setSelectedTasks}
          />
        </div>
      </div>
      <CustomPaginationActionsTable
        nameFilter={nameFilter}
        stateFilter={stateFilter}
        tasks={tasks}
        setSelectedTasks={setSelectedTasks}
      />
    </div>
  );
}

export default App;
