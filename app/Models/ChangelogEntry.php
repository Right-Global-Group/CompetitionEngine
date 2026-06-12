<?php

namespace App\Models;

use Illuminate\Support\Str;

class ChangelogEntry
{
    public string $sha;
    public string $source;
    public string $title;
    public string $body;
    public string $category;
    public array  $tenants;
    public string $date;
    public string $date_label;
    public int    $year;
    public int    $month;
    public int    $timestamp;
    public array  $meta;

    public static function filePath(): string
    {
        return storage_path('app/changelog.json');
    }

    public static function all(): array
    {
        if (! file_exists(self::filePath())) return [];
        $data = json_decode(file_get_contents(self::filePath()), true);
        return is_array($data) ? $data : [];
    }

    public static function save(array $entries): void
    {
        file_put_contents(
            self::filePath(),
            json_encode(array_values($entries), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
    }

    public static function find(string $sha): ?array
    {
        return collect(self::all())->firstWhere('sha', $sha);
    }

    public static function upsert(array $entry): void
    {
        $entries = collect(self::all());
        $idx     = $entries->search(fn ($e) => $e['sha'] === $entry['sha']);

        if ($idx !== false) {
            $entries[$idx] = $entry;
        } else {
            $entries->prepend($entry);
        }

        // Re-sort by timestamp descending
        $sorted = $entries->sortByDesc('timestamp')->values()->all();
        self::save($sorted);
    }

    public static function delete(string $sha): void
    {
        $entries = collect(self::all())->filter(fn ($e) => $e['sha'] !== $sha)->values()->all();
        self::save($entries);
    }

    public static function categoryMap(): array
    {
        return [
            'feature'     => ['label' => 'Feature',     'color' => '#22c55e', 'bg' => '34,197,94'],
            'improvement' => ['label' => 'Improvement', 'color' => '#6366f1', 'bg' => '99,102,241'],
            'bugfix'      => ['label' => 'Bug Fix',     'color' => '#ef4444', 'bg' => '239,68,68'],
            'design'      => ['label' => 'Design',      'color' => '#a855f7', 'bg' => '168,85,247'],
            'performance' => ['label' => 'Performance', 'color' => '#f59e0b', 'bg' => '245,158,11'],
            'security'    => ['label' => 'Security',    'color' => '#f97316', 'bg' => '249,115,22'],
            'general'     => ['label' => 'Update',      'color' => '#71717a', 'bg' => '113,113,122'],
        ];
    }
}