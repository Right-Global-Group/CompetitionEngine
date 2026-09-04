<?php

namespace App\Filament\Resources;

use App\Filament\Resources\DemoLeadResource\Pages;
use App\Models\DemoLead;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class DemoLeadResource extends Resource
{
    protected static ?string $model = DemoLead::class;

    protected static ?string $navigationIcon = 'heroicon-o-calendar-days';
    protected static ?string $navigationLabel = 'Demo Leads';
    protected static ?string $navigationGroup = 'Content Management';
    protected static ?int $navigationSort = 0;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Lead')
                    ->schema([
                        Forms\Components\TextInput::make('name')->disabled(),
                        Forms\Components\TextInput::make('business')->label('Business / site')->disabled(),
                        Forms\Components\TextInput::make('email')->email()->disabled(),
                        Forms\Components\TextInput::make('phone')->disabled(),
                        Forms\Components\TextInput::make('current_platform')->label('Current platform')->disabled(),
                        Forms\Components\TextInput::make('monthly_orders')->label('Monthly orders')->disabled(),
                        Forms\Components\TextInput::make('package')->label('Package chosen')->disabled()->columnSpanFull(),
                    ])
                    ->columns(2),

                Forms\Components\Section::make('Attribution')
                    ->schema([
                        Forms\Components\TextInput::make('utm_source')->disabled(),
                        Forms\Components\TextInput::make('utm_medium')->disabled(),
                        Forms\Components\TextInput::make('utm_campaign')->disabled(),
                        Forms\Components\TextInput::make('utm_content')->disabled(),
                        Forms\Components\TextInput::make('utm_term')->disabled(),
                        Forms\Components\TextInput::make('landing_variant')->label('Landing variant')->disabled(),
                        Forms\Components\TextInput::make('gclid')->disabled(),
                        Forms\Components\TextInput::make('fbclid')->disabled(),
                        Forms\Components\Textarea::make('page')->label('Landing URL')->disabled()->rows(2)->columnSpanFull(),
                    ])
                    ->columns(2)
                    ->collapsible(),

                Forms\Components\Section::make('Metadata')
                    ->schema([
                        Forms\Components\TextInput::make('ip_address')->label('IP Address')->disabled(),
                        Forms\Components\Textarea::make('user_agent')->label('User Agent')->disabled()->rows(2),
                        Forms\Components\Placeholder::make('created_at')
                            ->label('Submitted At')
                            ->content(fn (DemoLead $record): string => $record->created_at->format('F j, Y \a\t g:i A')),
                    ])
                    ->columns(2)
                    ->collapsible(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')->searchable()->sortable(),
                TextColumn::make('business')->label('Business')->searchable()->sortable(),
                TextColumn::make('email')->searchable()->icon('heroicon-m-envelope'),
                TextColumn::make('phone')->searchable()->icon('heroicon-m-phone'),
                TextColumn::make('monthly_orders')->label('Orders / mo')->sortable(),
                TextColumn::make('current_platform')->label('Platform')->toggleable(),
                TextColumn::make('package')->label('Package')->limit(40)->toggleable(),
                TextColumn::make('utm_source')->label('Source')->toggleable(),
                TextColumn::make('created_at')
                    ->label('Submitted')
                    ->dateTime('M d, Y H:i')
                    ->sortable()
                    ->since()
                    ->description(fn (DemoLead $record): string => $record->created_at->format('M d, Y H:i')),
                TextColumn::make('ip_address')->label('IP')->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('created_from')->label('From'),
                        Forms\Components\DatePicker::make('created_until')->label('Until'),
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
                    ->url(fn (DemoLead $record): string => "mailto:{$record->email}")
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
            'index' => Pages\ListDemoLeads::route('/'),
            'view' => Pages\ViewDemoLead::route('/{record}'),
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
