<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks'; // Nombre de la tabla en la base de datos

    protected $fillable = [
        'title',
        'description',
        'author',
        'date',
        'state_id',

    ];
}
