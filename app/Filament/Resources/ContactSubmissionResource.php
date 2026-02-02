<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactSubmissionResource\Pages;
use App\Models\ContactSubmission;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class ContactSubmissionResource extends Resource
{
    protected static ?string $model = ContactSubmission::class;

    protected static ?string $navigationIcon = 'heroicon-o-envelope';
    protected static ?string $navigationLabel = 'Contact Submissions';
    protected static ?string $navigationGroup = 'Content Management';
    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Contact Information')
                    ->schema([
                        Forms\Components\TextInput::make('first_name')
                            ->label('First Name')
                            ->disabled(),
                        
                        Forms\Components\TextInput::make('last_name')
                            ->label('Last Name')
                            ->disabled(),
                        
                        Forms\Components\TextInput::make('email')
                            ->label('Email')
                            ->email()
                            ->disabled()
                            ->copyable()
                            ->copyMessage('Email copied!'),
                        
                        Forms\Components\TextInput::make('phone')
                            ->label('Phone')
                            ->disabled()
                            ->copyable()
                            ->copyMessage('Phone copied!'),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Message')
                    ->schema([
                        Forms\Components\Textarea::make('message')
                            ->label('Message')
                            ->disabled()
                            ->rows(6)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Metadata')
                    ->schema([
                        Forms\Components\TextInput::make('ip_address')
                            ->label('IP Address')
                            ->disabled(),
                        
                        Forms\Components\Textarea::make('user_agent')
                            ->label('User Agent')
                            ->disabled()
                            ->rows(2),
                        
                        Forms\Components\Placeholder::make('created_at')
                            ->label('Submitted At')
                            ->content(fn (ContactSubmission $record): string => $record->created_at->format('F j, Y \a\t g:i A')),
                    ])
                    ->columns(2)
                    ->collapsible(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('full_name')
                    ->label('Name')
                    ->searchable(['first_name', 'last_name'])
                    ->sortable(['first_name', 'last_name'])
                    ->getStateUsing(fn (ContactSubmission $record): string => $record->full_name),
                
                TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->copyMessage('Email copied!')
                    ->icon('heroicon-m-envelope'),
                
                TextColumn::make('phone')
                    ->label('Phone')
                    ->searchable()
                    ->sortable()
                    ->copyable()
                    ->copyMessage('Phone copied!')
                    ->icon('heroicon-m-phone'),
                
                TextColumn::make('message')
                    ->label('Message')
                    ->limit(50)
                    ->searchable()
                    ->tooltip(function (TextColumn $column, ContactSubmission $record): ?string {
                        if (strlen($record->message) <= 50) {
                            return null;
                        }
                        return $record->message;
                    }),
                
                TextColumn::make('created_at')
                    ->label('Submitted')
                    ->dateTime('M d, Y H:i')
                    ->sortable()
                    ->since()
                    ->description(fn (ContactSubmission $record): string => $record->created_at->format('M d, Y H:i')),
                
                TextColumn::make('ip_address')
                    ->label('IP')
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('created_from')
                            ->label('From'),
                        Forms\Components\DatePicker::make('created_until')
                            ->label('Until'),
                    ])
                    ->query(function ($query, array $data) {
                        return $query
                            ->when($data['created_from'], fn ($q) => $q->whereDate('created_at', '>=', $data['created_from']))
                            ->when($data['created_until'], fn ($q) => $q->whereDate('created_at', '<=', $data['created_until']));
                    }),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\Action::make('email')
                    ->label('Reply')
                    ->icon('heroicon-o-envelope')
                    ->color('success')
                    ->url(fn (ContactSubmission $record): string => "mailto:{$record->email}")
                    ->openUrlInNewTab(),
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
            'index' => Pages\ListContactSubmissions::route('/'),
            'view' => Pages\ViewContactSubmission::route('/{record}'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::whereDate('created_at', today())->count() ?: null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'success';
    }
}