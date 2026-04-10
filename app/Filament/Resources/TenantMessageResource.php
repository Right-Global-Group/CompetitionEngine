<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TenantMessageResource\Pages;
use App\Models\Tenant;
use App\Models\TenantMessage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\DateTimePicker;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\IconColumn;

class TenantMessageResource extends Resource
{
    protected static ?string $model = TenantMessage::class;

    protected static ?string $navigationIcon  = 'heroicon-o-megaphone';
    protected static ?string $navigationLabel = 'Messages & Warnings';
    protected static ?string $navigationGroup = 'Tenant Portal';
    protected static ?int    $navigationSort  = 2;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Message')->schema([
                TextInput::make('title')
                    ->required()
                    ->maxLength(255)
                    ->placeholder('e.g. Your licensing fee is overdue')
                    ->columnSpanFull(),

                Textarea::make('body')
                    ->label('Body')
                    ->required()
                    ->rows(4)
                    ->columnSpanFull(),

                Select::make('type')
                    ->options([
                        'update'  => 'Update',
                        'warning' => 'Warning',
                        'info'    => 'Info',
                    ])
                    ->required()
                    ->default('update')
                    ->reactive(),

                Select::make('severity')
                    ->options([
                        'low'      => 'Low',
                        'medium'   => 'Medium',
                        'critical' => 'Critical',
                    ])
                    ->default('low')
                    ->visible(fn ($get) => $get('type') === 'warning')
                    ->required(fn ($get) => $get('type') === 'warning'),

                Select::make('category')
                    ->options([
                        'feature'     => 'Feature',
                        'improvement' => 'Improvement',
                        'bug'         => 'Bug Fix',
                        'design'      => 'Design',
                        'licensing'   => 'Licensing',
                        'general'     => 'General',
                    ])
                    ->default('general')
                    ->required(),
            ])->columns(2),

            Forms\Components\Section::make('Targeting')->schema([
                Select::make('target')
                    ->options([
                        'all'      => 'All Tenants',
                        'specific' => 'Specific Tenants',
                    ])
                    ->default('all')
                    ->required()
                    ->reactive(),

                Select::make('tenant_keys')
                    ->label('Target Tenants')
                    ->multiple()
                    ->options(fn () => Tenant::where('is_active', true)->orderBy('name')->pluck('name', 'tenant_key'))
                    ->visible(fn ($get) => $get('target') === 'specific')
                    ->required(fn ($get) => $get('target') === 'specific')
                    ->columnSpanFull(),
            ])->columns(2),

            Forms\Components\Section::make('Scheduling')->schema([
                DatePicker::make('published_at')
                    ->label('Publish Date')
                    ->required()
                    ->default(now())
                    ->displayFormat('d/m/Y'),

                DateTimePicker::make('expires_at')
                    ->label('Expires At')
                    ->displayFormat('d/m/Y H:i')
                    ->helperText('Leave blank to never expire'),

                Toggle::make('is_published')
                    ->label('Published')
                    ->default(true),
            ])->columns(2),

            Forms\Components\Section::make('Licensing Payment')
                ->visible(fn ($get) => $get('category') === 'licensing')
                ->schema([
                    Toggle::make('is_paid')
                        ->label('Marked as Paid')
                        ->reactive(),

                    DateTimePicker::make('paid_at')
                        ->label('Paid At')
                        ->displayFormat('d/m/Y H:i')
                        ->visible(fn ($get) => $get('is_paid')),
                ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->searchable()
                    ->limit(40)
                    ->weight('bold'),

                TextColumn::make('type')
                    ->badge()
                    ->color(fn (string $state) => match($state) {
                        'warning' => 'danger',
                        'info'    => 'info',
                        default   => 'success',
                    })
                    ->sortable(),

                TextColumn::make('severity')
                    ->badge()
                    ->color(fn (string $state) => match($state) {
                        'critical' => 'danger',
                        'medium'   => 'warning',
                        default    => 'gray',
                    })
                    ->visible(fn ($record) => $record?->type === 'warning'),

                TextColumn::make('target')
                    ->badge()
                    ->color(fn (string $state) => $state === 'all' ? 'primary' : 'gray'),

                TextColumn::make('published_at')
                    ->label('Published')
                    ->date('d/m/Y')
                    ->sortable(),

                TextColumn::make('expires_at')
                    ->label('Expires')
                    ->dateTime('d/m/Y H:i')
                    ->sortable()
                    ->placeholder('Never'),

                IconColumn::make('is_published')
                    ->label('Live')
                    ->boolean(),

                IconColumn::make('is_paid')
                    ->label('Paid')
                    ->boolean()
                    ->trueColor('success')
                    ->falseColor('gray'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('type')
                    ->options([
                        'update'  => 'Update',
                        'warning' => 'Warning',
                        'info'    => 'Info',
                    ]),
                Tables\Filters\TernaryFilter::make('is_published')->label('Published'),
                Tables\Filters\TernaryFilter::make('is_paid')->label('Paid'),
            ])
            ->actions([
                Tables\Actions\Action::make('mark_paid')
                    ->label('Mark Paid')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (TenantMessage $record) => $record->category === 'licensing' && !$record->is_paid)
                    ->requiresConfirmation()
                    ->action(function (TenantMessage $record) {
                        $record->update(['is_paid' => true, 'paid_at' => now()]);
                    }),

                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListTenantMessages::route('/'),
            'create' => Pages\CreateTenantMessage::route('/create'),
            'edit'   => Pages\EditTenantMessage::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        $active = static::getModel()::active()
            ->where('type', 'warning')
            ->where('is_paid', false)
            ->count();

        return $active > 0 ? (string) $active : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'danger';
    }
}
