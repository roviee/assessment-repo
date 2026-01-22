<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\UserResult;

class UserResultSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $users = [
            'Juan Dela Cruz',
            'Maria Santos',
            'Pedro Reyes'
        ];

        foreach ($users as $name) {
            $cleanName = preg_replace('/\s+/', '', $name);

            UserResult::create([
                'full_name' => $name,
                'result' => strlen($cleanName),
            ]);
        }
    }
}
