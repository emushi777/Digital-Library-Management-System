<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plan::create([
            'emertimi' => 'Basic Plan',
            'pershkrimi' => 'Read up to 5 books per month',
            'cmimi_mujor' => 0.00,
            'librat_max_mujor' => 5,
            'statusi' => true,
        ]);

        Plan::create([
            'emertimi' => 'Premium Plan',
            'pershkrimi' => 'Unlimited access to all digital books',
            'cmimi_mujor' => 9.99,
            'librat_max_mujor' => 999,
            'statusi' => true,
        ]);
    }
}