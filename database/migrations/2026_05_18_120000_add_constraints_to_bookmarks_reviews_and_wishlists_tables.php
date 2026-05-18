<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->setAutoIncrement('bookmarks');
        $this->setAutoIncrement('reviews');
        $this->setAutoIncrement('wishlists');

        $this->addUniqueIndex(
            'bookmarks',
            'bookmarks_user_id_book_id_faqja_unique',
            ['user_id', 'book_id', 'faqja']
        );

        $this->addUniqueIndex(
            'reviews',
            'reviews_user_id_book_id_unique',
            ['user_id', 'book_id']
        );

        $this->addUniqueIndex(
            'wishlists',
            'wishlists_user_id_book_id_unique',
            ['user_id', 'book_id']
        );
    }

    public function down(): void
    {
        $this->dropIndex('bookmarks', 'bookmarks_user_id_book_id_faqja_unique');
        $this->dropIndex('reviews', 'reviews_user_id_book_id_unique');
        $this->dropIndex('wishlists', 'wishlists_user_id_book_id_unique');
    }

    private function setAutoIncrement(string $table): void
    {
        if (!Schema::hasTable($table) || !Schema::hasColumn($table, 'id')) {
            return;
        }

        $hasPrimaryKey = DB::table('information_schema.TABLE_CONSTRAINTS')
            ->where('TABLE_SCHEMA', DB::getDatabaseName())
            ->where('TABLE_NAME', $table)
            ->where('CONSTRAINT_TYPE', 'PRIMARY KEY')
            ->exists();

        if (! $hasPrimaryKey) {
            DB::statement("ALTER TABLE `{$table}` ADD PRIMARY KEY (`id`)");
        }

        DB::statement("ALTER TABLE `{$table}` MODIFY `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT");
    }

    private function addUniqueIndex(string $table, string $indexName, array $columns): void
    {
        if (!Schema::hasTable($table)) {
            return;
        }

        $exists = DB::table('information_schema.STATISTICS')
            ->where('TABLE_SCHEMA', DB::getDatabaseName())
            ->where('TABLE_NAME', $table)
            ->where('INDEX_NAME', $indexName)
            ->exists();

        if ($exists) {
            return;
        }

        $columnList = collect($columns)
            ->map(fn (string $column) => "`{$column}`")
            ->implode(', ');

        DB::statement("ALTER TABLE `{$table}` ADD UNIQUE `{$indexName}` ({$columnList})");
    }

    private function dropIndex(string $table, string $indexName): void
    {
        if (!Schema::hasTable($table)) {
            return;
        }

        $exists = DB::table('information_schema.STATISTICS')
            ->where('TABLE_SCHEMA', DB::getDatabaseName())
            ->where('TABLE_NAME', $table)
            ->where('INDEX_NAME', $indexName)
            ->exists();

        if ($exists) {
            DB::statement("ALTER TABLE `{$table}` DROP INDEX `{$indexName}`");
        }
    }
};
