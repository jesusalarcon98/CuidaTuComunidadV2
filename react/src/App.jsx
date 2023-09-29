import TextField from "@mui/material/TextField";
import CustomPaginationActionsTable from "./components/tabla";
import TransitionsModal from "./components/modal";


function App() {
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
        <TransitionsModal />
      
        <CustomPaginationActionsTable />
      </div>
    </>
  );
}

export default App;
