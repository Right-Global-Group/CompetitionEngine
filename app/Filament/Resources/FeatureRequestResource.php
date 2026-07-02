<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FeatureRequestResource\Pages;
use App\Models\FeatureRequest;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Illuminate\Support\Facades\Schema;

class FeatureRequestResource extends Resource
{
    protected static ?string $model = FeatureRequest::class;

    protected static ?string $navigationIcon = 'heroicon-o-light-bulb';
    protected static ?string $navigationLabel = 'Feature Requests';
    protected static ?string $navigationGroup = 'Tenant Portal';
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Request')
                    ->schema([
                        Forms\Components\TextInput::make('tenant_key')
                            ->label('Tenant')
                            ->disabled(),

                        Forms\Components\TextInput::make('title')
                            ->label('Title')
                            ->disabled()
                            ->columnSpanFull(),

                        Forms\Components\Textarea::make('body')
                            ->label('Description')
                            ->disabled()
                            ->rows(6)
                            ->columnSpanFull(),

                        Forms\Components\TextInput::make('category')
                            ->label('Category')
                            ->disabled(),

                        Forms\Components\TextInput::make('submitted_by_name')
                            ->label('Submitted By')
                            ->disabled(),

                        Forms\Components\TextInput::make('submitted_by_email')
                            ->label('Email')
                            ->disabled(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Triage')
                    ->description('Managed by the platform team — not visible to the tenant.')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->label('Status')
                            ->options(FeatureRequest::STATUSES)
                            ->required()
                            ->native(false),

                        Forms\Components\Select::make('priority')
                            ->label('Priority')
                            ->options(FeatureRequest::PRIORITIES)
                            ->required()
                            ->native(false),

                        Forms\Components\Textarea::make('admin_notes')
                            ->label('Internal Notes')
                            ->rows(4)
                            ->columnSpanFull(),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('tenant_key')
                    ->label('Tenant')
                    ->badge()
                    ->color('gray')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('title')
                    ->label('Title')
                    ->limit(50)
                    ->searchable()
                    ->tooltip(fn (FeatureRequest $record): ?string => strlen($record->title) > 50 ? $record->title : null),

                TextColumn::make('category')
                    ->label('Category')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => FeatureRequest::CATEGORIES[$state] ?? $state)
                    ->color(fn (string $state): string => match ($state) {
                        'bug'         => 'danger',
                        'feature'     => 'primary',
                        'improvement' => 'success',
                        'integration' => 'warning',
                        default       => 'gray',
                    }),

                TextColumn::make('priority')
                    ->label('Priority')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => FeatureRequest::PRIORITIES[$state] ?? $state)
                    ->color(fn (string $state): string => match ($state) {
                        'high'   => 'danger',
                        'medium' => 'warning',
                        default  => 'gray',
                    }),

                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->formatStateUsing(fn (string $state): string => FeatureRequest::STATUSES[$state] ?? $state)
                    ->color(fn (string $state): string => match ($state) {
                        'new'         => 'info',
                        'under_review'=> 'warning',
                        'planned'     => 'primary',
                        'in_progress' => 'warning',
                        'completed'   => 'success',
                        'declined'    => 'danger',
                        default       => 'gray',
                    }),

                TextColumn::make('created_at')
                    ->label('Submitted')
                    ->dateTime('M d, Y H:i')
                    ->sortable()
                    ->since(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(FeatureRequest::STATUSES),
                Tables\Filters\SelectFilter::make('category')
                    ->options(FeatureRequest::CATEGORIES),
                Tables\Filters\SelectFilter::make('tenant_key')
                    ->label('Tenant')
                    ->options(fn (): array => FeatureRequest::query()
                        ->distinct()
                        ->orderBy('tenant_key')
                        ->pluck('tenant_key', 'tenant_key')
                        ->toArray()),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc')
            ->poll('30s');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFeatureRequests::route('/'),
            'edit'  => Pages\EditFeatureRequest::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        // Guard against the table not existing yet (e.g. before the migration
        // has run on a fresh deploy) so a missing table never blanks the panel.
        if (!Schema::hasTable('feature_requests')) {
            return null;
        }

        return static::getModel()::where('status', 'new')->count() ?: null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'info';
    }
}
