<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class CreateAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();

        $listUsers = [
            [
                'name' => 'admin',
                'email' => 'admin@gmail.com',
                'password' => bcrypt('admin'),
                'created_at' => now()
            ],
            [
                'name' => 'staff',
                'email' => 'staff@gmail.com',
                'password' => bcrypt('staff'),
                'created_at' => now()
            ]
        ];

        User::insert($listUsers);
    }
}
