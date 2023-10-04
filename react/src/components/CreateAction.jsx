import Button from "@mui/material/Button";

export default function CreateAction({ handleCreateTask }) {
  return (
    <div className="title">
      <Button onClick={handleCreateTask} variant="contained">
        Crear
      </Button>
    </div>
  );
}

/* new */