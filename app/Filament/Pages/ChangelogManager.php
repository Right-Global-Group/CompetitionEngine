<?php

namespace App\Filament\Pages;

use App\Models\ChangelogEntry;
use App\Services\ChangelogService;
use Carbon\Carbon;
use Filament\Actions\Action;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Illuminate\Support\Str;

class ChangelogManager extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $navigationIcon  = 'heroicon-o-clock';
    protected static ?string $navigationLabel = 'Changelog Entries';
    protected static ?string $navigationGroup = 'Content Management';
    protected static ?int    $navigationSort  = 2;
    protected static string  $view            = 'filament.pages.changelog-manager';

    public array  $entries   = [];
    public bool   $showForm  = false;
    public ?string $editingSha = null;

    // Form fields
    public string $entryTitle = '';
    public string $body     = '';
    public string $category = 'general';
    public string $tenant   = 'all';
    public string $date     = '';

    public function mount(): void
    {
        $this->entries = ChangelogEntry::all();
        $this->date    = now()->format('Y-m-d');
    }

    public function openCreate(): void
    {
        $this->reset(['entryTitle', 'body', 'category', 'tenant', 'editingSha']);
        $this->date     = now()->format('Y-m-d');
        $this->showForm = true;
    }

    public function openEdit(string $sha): void
    {
        $entry = ChangelogEntry::find($sha);
        if (! $entry) return;

        $this->editingSha = $sha;
        $this->entryTitle = $entry['title'];
        $this->body       = $entry['body'] ?? '';
        $this->category   = $entry['category'];
        $this->tenant     = $entry['tenants'][0] ?? 'all';
        $this->date       = $entry['date'];
        $this->showForm   = true;
    }

    public function save(): void
    {
        $this->validate([
            'entryTitle' => 'required|string|max:255',
            'body'     => 'nullable|string',
            'category' => 'required|string',
            'date'     => 'required|date',
        ]);

        $categoryMap = ChangelogEntry::categoryMap();
        $dt          = Carbon::parse($this->date);
        $sha         = $this->editingSha ?? Str::lower(Str::random(7));

        $entry = [
            'sha'        => $sha,
            'source'     => 'commit',
            'title' => $this->entryTitle,
            'body'       => $this->body ?? '',
            'category'   => $this->category,
            'tenants'    => [$this->tenant],
            'date'       => $dt->toDateString(),
            'date_label' => $dt->format('j M Y'),
            'year'       => (int) $dt->format('Y'),
            'month'      => (int) $dt->format('n'),
            'timestamp'  => $dt->timestamp,
            'author'     => 'admin',
            'meta'       => $categoryMap[$this->category] ?? $categoryMap['general'],
        ];

        ChangelogEntry::upsert($entry);

        // Flush service cache so page reflects immediately
        app(ChangelogService::class)->flush();

        $this->entries  = ChangelogEntry::all();
        $this->showForm = false;

        Notification::make()->title($this->editingSha ? 'Entry updated' : 'Entry added')->success()->send();
        $this->reset(['entryTitle', 'body', 'category', 'tenant', 'editingSha']);
    }

    public function deleteEntry(string $sha): void
    {
        ChangelogEntry::delete($sha);
        app(ChangelogService::class)->flush();
        $this->entries = ChangelogEntry::all();
        Notification::make()->title('Entry deleted')->success()->send();
    }

    public function cancel(): void
    {
        $this->showForm = false;
        $this->reset(['title', 'body', 'category', 'tenant', 'editingSha']);
    }

    protected function getHeaderActions(): array
    {
        return [
            Action::make('add')
                ->label('Add Entry')
                ->icon('heroicon-o-plus')
                ->action('openCreate'),
        ];
    }
}