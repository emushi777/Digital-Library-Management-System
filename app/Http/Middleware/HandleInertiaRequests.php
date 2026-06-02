<?php

namespace App\Http\Middleware;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        if ($user) {
            $user->load('subscription.plan');
        }

        return [
            ...parent::share($request),

            'auth' => [
                'user' => $user,
            ],

            'allBooks' => Book::select('id', 'titulli')->get(),
        ];
    }
}