<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Books;

class CreateListBooksSeeder extends Seeder
{
    protected $faker;
    public function __construct() {
        $this->faker = \Faker\Factory::create();
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Books::truncate();

        $book = [
            'name' => '',
            'price' => 0,
            'description' => '',
            'image' => null,
            'content' => '',
            'views' => 0,
            'created_at' => now()
        ];

        $bookCreates = [];
        for ($i = 1; $i <= 50; $i++) {
            $m = $book;
            
            $m['name'] = $this->faker->realText(rand(10, 20));
            $m['price'] = rand(200, 1500);
            $m['description'] = $this->faker->realText(rand(20, 80));
            $m['content'] = $this->faker->realText(rand(600, 1500));

            $bookCreates[] = $m;
        }
        Books::insert($bookCreates);
    }
}
