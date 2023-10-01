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
}
