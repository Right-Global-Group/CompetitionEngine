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
use Filament\Forms\Form;
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

    public array   $data      = [];
    public array   $entries   = [];
    public bool    $showForm  = false;
    public ?string $editingSha = null;

    public function mount(): void
    {
        $this->entries = ChangelogEntry::all();
        $this->form->fill(['category' => 'general', 'tenant' => 'all', 'date' => now()->format('Y-m-d')]);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('entryTitle')
                    ->label('Title')
                    ->required()
                    ->maxLength(255)
                    ->columnSpanFull(),

                Textarea::make('body')
                    ->label('Body')
                    ->rows(3)
                    ->columnSpanFull(),

                Select::make('category')
                    ->label('Category')
                    ->options([
                        'feature'     => 'Feature',
                        'improvement' => 'Improvement',
                        'bugfix'      => 'Bug Fix',
                        'design'      => 'Design',
                        'performance' => 'Performance',
                        'security'    => 'Security',
                        'general'     => 'General',
                    ])
                    ->required()
                    ->default('general'),

                Select::make('tenant')
                    ->label('Product')
                    ->options([
                        'all'     => 'All products',
                        'games'   => 'Games',
                        'racing'  => 'Racing',
                        'sports'  => 'Sports',
                        'charity' => 'Charity',
                        'admin'   => 'Admin',
                        'api'     => 'API',
                    ])
                    ->default('all'),

                DatePicker::make('date')
                    ->label('Date')
                    ->required()
                    ->default(now()),
            ])
            ->columns(2)
            ->statePath('data');
    }

    public function openCreate(): void
    {
        $this->editingSha = null;
        $this->form->fill(['category' => 'general', 'tenant' => 'all', 'date' => now()->format('Y-m-d')]);
        $this->showForm = true;
    }

    public function openEdit(string $sha): void
    {
        $entry = ChangelogEntry::find($sha);
        if (! $entry) return;

        $this->editingSha = $sha;
        $this->form->fill([
            'entryTitle' => $entry['title'],
            'body'       => $entry['body'] ?? '',
            'category'   => $entry['category'],
            'tenant'     => $entry['tenants'][0] ?? 'all',
            'date'       => $entry['date'],
        ]);
        $this->showForm = true;
    }

    public function save(): void
    {
        $data = $this->form->getState();

        $categoryMap = ChangelogEntry::categoryMap();
        $dt          = Carbon::parse($data['date']);
        $sha         = $this->editingSha ?? Str::lower(Str::random(7));

        ChangelogEntry::upsert([
            'sha'        => $sha,
            'source'     => 'commit',
            'title'      => $data['entryTitle'],
            'body'       => $data['body'] ?? '',
            'category'   => $data['category'],
            'tenants'    => [$data['tenant']],
            'date'       => $dt->toDateString(),
            'date_label' => $dt->format('j M Y'),
            'year'       => (int) $dt->format('Y'),
            'month'      => (int) $dt->format('n'),
            'timestamp'  => $dt->timestamp,
            'author'     => 'admin',
            'meta'       => $categoryMap[$data['category']] ?? $categoryMap['general'],
        ]);

        app(ChangelogService::class)->flush();

        $this->entries  = ChangelogEntry::all();
        $this->showForm = false;

        Notification::make()
            ->title($this->editingSha ? 'Entry updated' : 'Entry added')
            ->success()
            ->send();

        $this->editingSha = null;
        $this->form->fill(['category' => 'general', 'tenant' => 'all', 'date' => now()->format('Y-m-d')]);
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
        $this->showForm   = false;
        $this->editingSha = null;
        $this->form->fill(['category' => 'general', 'tenant' => 'all', 'date' => now()->format('Y-m-d')]);
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
