import TextField from "@mui/material/TextField";
import CustomPaginationActionsTable from "./components/table";
import CreateForm from "./components/CreateForm";
import "./styles/styles.css"; // Importa tu archivo CSS personalizado

function App() {
  return (
    <div>
      <h1 className="title"> Cuida tu comunidad</h1>
      <div className="principal">
        <TextField
          id="outlined-basic"
          label="Filtrar por nombre."
          variant="outlined"
          className="button"
        />
        <TextField
          id="outlined-basic"
          label="Filtrar por estado."
          variant="outlined"
          className="button"
        />
        <div className="button">
          <CreateForm className="button" />
        </div>
      </div>
      <CustomPaginationActionsTable />
    </div>
  );
}

export default App;
