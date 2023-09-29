import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CustomPaginationActionsTable from "./components/tabla";

function App() {
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <div>
        <h1> Cuida tu comunidad</h1>
        <TextField
          id="outlined-basic"
          label="Filtrar por nombre."
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          label="Filtrar por estado."
          variant="outlined"
        />
        <Button variant="contained">Success</Button>
        <CustomPaginationActionsTable />
      </div>
    </>
  );
}

export default App;
