<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserResource\Pages;
use App\Models\User;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;

class UserResource extends Resource
{
    protected static ?string $model = User::class;

    protected static ?string $navigationIcon  = 'heroicon-o-users';
    protected static ?string $navigationLabel = 'Users';
    protected static ?string $navigationGroup = 'Team';
    protected static ?int    $navigationSort  = 1;

    public static function canViewAny(): bool
    {
        return auth()->user()?->isSuperSuperAdmin() ?? false;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Account')->schema([
                TextInput::make('name')
                    ->required()
                    ->maxLength(255),

                TextInput::make('email')
                    ->email()
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255),

                TextInput::make('password')
                    ->password()
                    ->revealable()
                    ->maxLength(255)
                    ->dehydrateStateUsing(fn (?string $state) => filled($state) ? $state : null)
                    ->dehydrated(fn (?string $state) => filled($state))
                    ->helperText(fn (string $operation) => $operation === 'edit'
                        ? 'Leave blank to keep the current login password.'
                        : null)
                    ->required(fn (string $operation) => $operation === 'create'),
            ])->columns(2),

            Forms\Components\Section::make('Help Center Docs Password')
                ->description('Controls the password used to unlock /docs (the customer-facing Help Center) for this user.')
                ->schema([
                    Toggle::make('use_custom_docs_password')
                        ->label('Use a custom password for this user')
                        ->helperText('Off = this user unlocks the Help Center with the shared DOCUMENTATION_PASSWORD from .env.')
                        ->live()
                        ->afterStateHydrated(function (Toggle $component, ?User $record) {
                            $component->state(filled($record?->docs_password));
                        }),

                    TextInput::make('docs_password')
                        ->label('Custom docs password')
                        ->password()
                        ->revealable()
                        ->maxLength(255)
                        ->visible(fn (Forms\Get $get) => $get('use_custom_docs_password'))
                        ->helperText('Leave blank when editing to keep the existing custom password.'),
                ])->columns(1),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('email')
                    ->searchable()
                    ->sortable(),

                IconColumn::make('admin')
                    ->label('Admin Access')
                    ->boolean()
                    ->getStateUsing(fn (User $record) => $record->isAdmin()),

                IconColumn::make('docs_password')
                    ->label('Custom Docs Password')
                    ->boolean()
                    ->getStateUsing(fn (User $record) => filled($record->docs_password)),

                TextColumn::make('created_at')
                    ->label('Joined')
                    ->date('d/m/Y')
                    ->sortable(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('name');
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListUsers::route('/'),
            'create' => Pages\CreateUser::route('/create'),
            'edit'   => Pages\EditUser::route('/{record}/edit'),
        ];
    }
}
