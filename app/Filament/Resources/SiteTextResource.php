<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteTextResource\Pages;
use App\Models\SiteText;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;

class SiteTextResource extends Resource
{
    protected static ?string $model = SiteText::class;

    protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $navigationLabel = 'Site Text Manager';

    protected static ?string $navigationGroup = 'Content Management';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Select::make('section')
                    ->label('Section')
                    ->options(SiteText::getSections())
                    ->required()
                    ->searchable()
                    ->reactive(),
                
                TextInput::make('key')
                    ->label('Unique Key')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(255)
                    ->helperText('Format: section.identifier (e.g., hero.title)'),
                
                Select::make('type')
                    ->label('Text Type')
                    ->options(SiteText::getTypes())
                    ->required()
                    ->default('paragraph')
                    ->reactive(),
                
                // Conditional content field based on type
                Forms\Components\Group::make()
                    ->schema(function (callable $get) {
                        $type = $get('type');
                        
                        if ($type === 'number') {
                            return [
                                TextInput::make('content')
                                    ->label('Content')
                                    ->required()
                                    ->numeric()
                                    ->helperText('Enter a numeric value (e.g., 42000 or 99.9)')
                                    ->columnSpanFull(),
                            ];
                        }
                        
                        return [
                            Textarea::make('content')
                                ->label('Content')
                                ->required()
                                ->rows(3)
                                ->columnSpanFull(),
                        ];
                    })
                    ->columnSpanFull(),
                
                TextInput::make('order')
                    ->label('Display Order')
                    ->numeric()
                    ->default(0)
                    ->helperText('Lower numbers appear first'),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('section')
                    ->label('Section')
                    ->formatStateUsing(fn (string $state): string => SiteText::getSections()[$state] ?? $state)
                    ->badge()
                    ->color('purple')
                    ->sortable()
                    ->searchable(),
                
                TextColumn::make('key')
                    ->label('Key')
                    ->searchable()
                    ->copyable()
                    ->copyMessage('Key copied!')
                    ->sortable(),
                
                TextColumn::make('type')
                    ->label('Type')
                    ->formatStateUsing(fn (string $state): string => SiteText::getTypes()[$state] ?? $state)
                    ->badge()
                    ->color('orange')
                    ->sortable(),
                
                TextColumn::make('content')
                    ->label('Content')
                    ->limit(50)
                    ->searchable()
                    ->tooltip(function (TextColumn $column): ?string {
                        $state = $column->getState();
                        if (strlen($state) <= 50) {
                            return null;
                        }
                        return $state;
                    }),
                
                TextColumn::make('order')
                    ->label('Order')
                    ->sortable()
                    ->alignCenter(),
                
                TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime('M d, Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('section')
                    ->options(SiteText::getSections())
                    ->label('Filter by Section'),
                
                SelectFilter::make('type')
                    ->options(SiteText::getTypes())
                    ->label('Filter by Type'),
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
            ->defaultSort('section')
            ->poll('10s') // Auto-refresh every 10 seconds
            ->striped();
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSiteTexts::route('/'),
            'create' => Pages\CreateSiteText::route('/create'),
            'edit' => Pages\EditSiteText::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }
}