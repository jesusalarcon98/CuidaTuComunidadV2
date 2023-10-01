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
                'state_id' => 'required|exists:states,id',

            ]);
            // Validar los datos del formulario aquí si es necesario.
            $task = new Task();
            $task->title = $validatedData['title'];
            $task->description = $validatedData['description'];
            $task->author = $validatedData['author'];
            $task->date = $validatedData['date'];
            $task->state_id = $validatedData['state_id'];
            /*  
            
            
            $task->likes = 0; // Inicializa los "likes" en cero */
            /* print_r($task); */
            $task->save();

            return response()->json(['message' => 'Tarea creada con éxito'], 201);
        } catch (\Exception $e) {
            // Maneja la excepción aquí y devuelve una respuesta de error adecuada
            Log::error($e->getMessage());
            return response()->json(['error' => 'Ha ocurrido un error al crear la tarea'], 500);
        }
    }
}
