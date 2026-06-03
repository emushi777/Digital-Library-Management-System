<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Author;
use App\Models\Book;
use App\Models\Bookmark;
use App\Models\BookRequest;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Faq;
use App\Models\Feedback;
use App\Models\FinishedBook;
use App\Models\Plan;
use App\Models\Review;
use App\Models\Subscription;
use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ResourceController extends Controller
{
    public const RESOURCE_NAMES = [
        'authors',
        'books',
        'categories',
        'collections',
        'bookmarks',
        'wishlists',
        'reviews',
        'faqs',
        'book-requests',
        'feedback',
        'finished-books',
        'plans',
        'subscriptions',
    ];

    private const ICONS = [
        'bookmark', 'key', 'books', 'gift', 'document', 'card', 'utensils', 'pills',
        'stethoscope', 'home', 'building', 'bank', 'monitor', 'headphones', 'leaf',
        'person', 'paw', 'cart', 'briefcase', 'package', 'train', 'snowflake',
        'flame', 'toolbox', 'scissors', 'code', 'bulb', 'chat', 'asterisk',
        'square', 'circle', 'triangle', 'diamond', 'star', 'group', 'music',
        'palette', 'sunrise', 'globe', 'pencil', 'bike', 'heart', 'library',
        'sparkles', 'target',
    ];

    private array $config = [
        'authors' => [
            'model' => Author::class,
            'admin_write' => true,
            'relations' => ['books'],
        ],
        'books' => [
            'model' => Book::class,
            'admin_write' => true,
            'relations' => ['author', 'category'],
        ],
        'categories' => [
            'model' => Category::class,
            'admin_write' => true,
            'relations' => ['books'],
        ],
        'collections' => [
            'model' => Collection::class,
            'owned' => true,
            'relations' => ['books.author'],
        ],
        'bookmarks' => [
            'model' => Bookmark::class,
            'owned' => true,
            'relations' => ['book.author'],
        ],
        'wishlists' => [
            'model' => Wishlist::class,
            'owned' => true,
            'relations' => ['book.author'],
        ],
        'reviews' => [
            'model' => Review::class,
            'owned' => true,
            'relations' => ['book.author'],
        ],
        'faqs' => [
            'model' => Faq::class,
            'admin_write' => true,
        ],
        'book-requests' => [
            'model' => BookRequest::class,
            'owned' => true,
        ],
        'feedback' => [
            'model' => Feedback::class,
            'owned' => true,
            'admin_reads_all' => true,
            'relations' => ['user'],
        ],
        'finished-books' => [
            'model' => FinishedBook::class,
            'owned' => true,
            'relations' => ['book.author'],
        ],
        'plans' => [
            'model' => Plan::class,
            'admin_write' => true,
        ],
        'subscriptions' => [
            'model' => Subscription::class,
            'owned' => true,
            'admin_reads_all' => true,
            'relations' => ['plan'],
        ],
    ];

    public function index(Request $request, string $resource)
    {
        $config = $this->config($resource);
        $query = $this->query($resource);

        if (($config['owned'] ?? false) && !($config['admin_reads_all'] ?? false || $this->isAdmin($request))) {
            $query->where('user_id', $request->user()->id);
        }

        return response()->json($query->orderByDesc('id')->paginate((int) $request->query('per_page', 15)));
    }

    public function store(Request $request, string $resource)
    {
        $config = $this->config($resource);
        $this->authorizeWrite($request, $config);

        $data = $request->validate($this->rules($resource, $request));

        if ($config['owned'] ?? false) {
            $data['user_id'] = $request->user()->id;
        }

        $data = $this->defaults($resource, $data);

        $item = $config['model']::create($data);

        return response()->json($this->loadRelations($item, $config), 201);
    }

    public function show(Request $request, string $resource, int $id)
    {
        $config = $this->config($resource);
        $item = $this->findVisible($request, $resource, $id);

        return response()->json($this->loadRelations($item, $config));
    }

    public function update(Request $request, string $resource, int $id)
    {
        $config = $this->config($resource);
        $this->authorizeWrite($request, $config);

        $item = $this->findVisible($request, $resource, $id);

        if ($resource === 'collections' && $item->emertimi === 'Finished') {
            abort(403, 'The Finished collection cannot be edited.');
        }

        $data = $request->validate($this->rules($resource, $request, $id));
        unset($data['user_id']);

        $item->update($data);

        return response()->json($this->loadRelations($item->refresh(), $config));
    }

    public function destroy(Request $request, string $resource, int $id)
    {
        $config = $this->config($resource);
        $this->authorizeWrite($request, $config);

        $item = $this->findVisible($request, $resource, $id);

        if ($resource === 'collections' && $item->emertimi === 'Finished') {
            abort(403, 'The Finished collection cannot be deleted.');
        }

        $item->delete();

        return response()->json(['message' => 'Deleted successfully.']);
    }

    private function config(string $resource): array
    {
        abort_unless(isset($this->config[$resource]), 404, 'Unknown API resource.');

        return $this->config[$resource];
    }

    private function query(string $resource)
    {
        $config = $this->config($resource);
        $query = $config['model']::query();

        if (!empty($config['relations'])) {
            $query->with($config['relations']);
        }

        return $query;
    }

    private function findVisible(Request $request, string $resource, int $id)
    {
        $config = $this->config($resource);
        $query = $this->query($resource);

        if (($config['owned'] ?? false) && !$this->isAdmin($request)) {
            $query->where('user_id', $request->user()->id);
        }

        return $query->findOrFail($id);
    }

    private function authorizeWrite(Request $request, array $config): void
    {
        if (($config['admin_write'] ?? false) && !$this->isAdmin($request)) {
            abort(403, 'Only admins can change this resource.');
        }
    }

    private function isAdmin(Request $request): bool
    {
        return $request->user()?->role === 'admin';
    }

    private function loadRelations($item, array $config)
    {
        if (!empty($config['relations'])) {
            $item->load($config['relations']);
        }

        return $item;
    }

    private function rules(string $resource, Request $request, ?int $id = null): array
    {
        $sometimes = $id ? 'sometimes|' : '';

        return match ($resource) {
            'authors' => [
                'emri' => $sometimes . 'required|string|max:255',
                'mbiemri' => $sometimes . 'required|string|max:255',
                'biografia' => 'nullable|string',
                'vendi' => 'nullable|string|max:255',
                'foto_profili' => 'nullable|string|max:255',
            ],
            'books' => [
                'titulli' => $sometimes . 'required|string|max:255',
                'pershkrimi' => 'nullable|string',
                'isbn' => [$sometimes . 'required', 'string', 'max:255', Rule::unique('books', 'isbn')->ignore($id)],
                'autori_id' => $sometimes . 'required|exists:authors,id',
                'kategoria_id' => $sometimes . 'required|exists:categories,id',
                'viti_botimit' => $sometimes . 'required|integer',
                'gjuha' => $sometimes . 'required|string|max:255',
                'numri_faqeve' => $sometimes . 'required|integer|min:1',
                'formati' => $sometimes . 'required|string|max:255',
                'madhesia_mb' => $sometimes . 'required|numeric|min:0',
                'shtegu_skedarit' => 'nullable|string|max:255',
                'foto_kopertines' => 'nullable|string|max:255',
            ],
            'categories' => [
                'emertimi' => $sometimes . 'required|string|max:255',
                'pershkrimi' => 'nullable|string',
                'ikona' => 'nullable|string|max:255',
                'kategoria_prind_id' => 'nullable|exists:categories,id',
            ],
            'collections' => [
                'emertimi' => $sometimes . 'required|string|max:255',
                'pershkrimi' => 'nullable|string',
                'icon' => [$sometimes . 'required', 'string', Rule::in(self::ICONS)],
                'a_eshte_publike' => 'nullable|boolean',
            ],
            'bookmarks' => [
                'book_id' => $sometimes . 'required|exists:books,id',
                'faqja' => $sometimes . 'required|integer|min:1',
                'shenime' => 'nullable|string',
            ],
            'wishlists' => [
                'book_id' => $sometimes . 'required|exists:books,id',
            ],
            'reviews' => [
                'book_id' => $sometimes . 'required|exists:books,id',
                'vleresimi' => $sometimes . 'required|numeric|min:0|max:5',
                'komenti' => 'nullable|string',
            ],
            'faqs' => [
                'pyetja' => $sometimes . 'required|string|max:255',
                'pergjigjja' => $sometimes . 'required|string',
                'kategoria' => 'nullable|string|max:255',
                'statusi' => 'nullable|string|max:255',
                'renditja' => 'nullable|integer',
            ],
            'book-requests' => [
                'titulli_librit' => $sometimes . 'required|string|max:255',
                'emri_autorit' => $sometimes . 'required|string|max:255',
                'arsyetimi' => 'nullable|string',
                'statusi' => 'nullable|string|max:255',
            ],
            'feedback' => [
                'message' => $sometimes . 'required|string',
            ],
            'finished-books' => [
                'book_id' => $sometimes . 'required|exists:books,id',
                'finished_at' => 'nullable|date',
            ],
            'plans' => [
                'emertimi' => $sometimes . 'required|string|max:255',
                'pershkrimi' => 'nullable|string',
                'cmimi_mujor' => $sometimes . 'required|numeric|min:0',
                'librat_max_mujor' => $sometimes . 'required|integer|min:0',
                'statusi' => 'nullable|boolean',
            ],
            'subscriptions' => [
                'plan_id' => $sometimes . 'required|exists:plans,id',
                'starts_at' => 'nullable|date',
                'ends_at' => 'nullable|date',
                'is_active' => 'nullable|boolean',
            ],
            default => [],
        };
    }

    private function defaults(string $resource, array $data): array
    {
        if ($resource === 'books') {
            $data['shtegu_skedarit'] = $data['shtegu_skedarit'] ?? 'N/A';
        }

        if ($resource === 'finished-books') {
            $data['finished_at'] = $data['finished_at'] ?? now();
        }

        return $data;
    }
}
