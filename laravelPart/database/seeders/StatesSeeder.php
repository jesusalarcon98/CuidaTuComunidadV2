<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('states')->insert([
            ['name' => 'Aguascalientes'],
            ['name' => 'Baja California'],
            ['name' => 'Baja California Sur'],
            ['name' => 'Campeche'],
            ['name' => 'Coahuila'],
            ['name' => 'Colima'],
            ['name' => 'Chiapas'],
            ['name' => 'Chihuahua'],
            ['name' => 'Distrito Federal'],
            ['name' => 'Guanajuato'],
            ['name' => 'Guerrero'],
            ['name' => 'Hidalgo'],
            ['name' => 'Jalisco'],
            ['name' => 'México'],
            ['name' => 'Michoacán'],
            ['name' => 'Morelos'],
            ['name' => 'Nayarit'],
            ['name' => 'Nuevo León'],
            ['name' => 'Oaxaca'],
            ['name' => 'Puebla'],
            ['name' => 'Querétaro'],
            ['name' => 'Quintana Roo'],
            ['name' => 'San Luis Potosí'],
            ['name' => 'Sinaloa'],
            ['name' => 'Sonora'],
            ['name' => 'Tabasco'],
            ['name' => 'Tamaulipas'],
            ['name' => 'Tlaxcala'],
            ['name' => 'Veracruz'],
            ['name' => 'Yucatán'],
            ['name' => 'Zacatecas'],
        ]);
    }
}
