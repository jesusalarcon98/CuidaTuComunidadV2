<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use Illuminate\Support\Facades\Log;


class TaskController extends Controller
{
    public function create(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'author' => 'required|string|max:255',
                'date' => 'required|date',
                'state_id' => 'required',
            ]);
            $task = new Task();
            $task->title = $validatedData['title'];
            $task->description = $validatedData['description'];
            $task->author = $validatedData['author'];
            $task->date = $validatedData['date'];
            $task->state_id = $validatedData['state_id'];

            $task->save();

            return response()->json(['message' => 'Tarea creada con éxito'], 201);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ha ocurrido un error al crear la tarea'], 500);
        }
    }
    public function getTasks()
    {
        $tasks = Task::select('tasks.*', 'states.name as state_name')
            ->join('states', 'tasks.state_id', '=', 'states.id')
            ->get();

        return response()->json($tasks);
    }
    public function updateLikes($id)
    {
        try {
            $task = Task::find($id);

            if (!$task) {
                return response()->json(['error' => 'Tarea no encontrada'], 404);
            }

            $task->likes += 1;
            $task->save();

            return response()->json(['message' => 'Like agregado con éxito', 'data' => $task]);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ha ocurrido un error al dar like'], 500);
        }
    }
    public function deleteTask($taskId)
    {
        try {
            // Busca la tarea por su ID
            $task = Task::find($taskId);

            if (!$task) {
                return response()->json(['error' => 'La tarea no fue encontrada'], 404);
            }

            // Elimina la tarea
            $task->delete();

            return response()->json(['message' => 'Tarea eliminada con éxito']);
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ha ocurrido un error al eliminar la tarea'], 500);
        }
    }
}
