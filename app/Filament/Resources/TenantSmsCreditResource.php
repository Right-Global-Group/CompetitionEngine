<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TenantSmsCreditResource\Pages;
use App\Models\TenantSmsCredit;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;

class TenantSmsCreditResource extends Resource
{
    protected static ?string $model = TenantSmsCredit::class;

    protected static ?string $navigationIcon  = 'heroicon-o-chat-bubble-left-right';
    protected static ?string $navigationLabel = 'SMS Credits';
    protected static ?string $navigationGroup = 'Tenant Portal';
    protected static ?int    $navigationSort  = 4;

    protected static ?string $modelLabel       = 'SMS credit';
    protected static ?string $pluralModelLabel = 'SMS credits';

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('tenant.name')
                    ->label('Tenant')
                    ->default(fn (TenantSmsCredit $record) => $record->tenant_key)
                    ->searchable()
                    ->sortable(),

                TextColumn::make('balance')
                    ->label('Credit Left')
                    ->money('GBP')
                    ->sortable()
                    ->placeholder('Unknown')
                    ->color(fn (TenantSmsCredit $record) => match (true) {
                        $record->balance === null            => 'gray',
                        (float) $record->balance < 10        => 'danger',
                        (float) $record->balance < 25        => 'warning',
                        default                              => 'success',
                    }),

                TextColumn::make('portal_balance')
                    ->label('QuickSMS Portal')
                    ->money('GBP')
                    ->sortable()
                    ->placeholder('—')
                    ->tooltip('Live balance from the QuickSMS API, where the tenant\'s account has it enabled.'),

                TextColumn::make('estimated_messages_left')
                    ->label('Est. Texts Left')
                    ->state(fn (TenantSmsCredit $record) => $record->estimatedMessagesLeft())
                    ->numeric()
                    ->placeholder('—')
                    ->tooltip('Credit left divided by cost per part, at one part per text.'),

                TextColumn::make('cost_per_part')
                    ->label('Cost / Part')
                    ->money('GBP')
                    ->placeholder('—')
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('reported_at')
                    ->label('Last Reported')
                    ->since()
                    ->sortable()
                    ->color(fn (TenantSmsCredit $record) => $record->reported_at && $record->reported_at->lt(now()->subDay()) ? 'warning' : null)
                    ->tooltip(fn (TenantSmsCredit $record) => $record->reported_at?->format('d/m/Y H:i')),
            ])
            ->defaultSort('balance', 'asc')
            ->paginated(false)
            ->actions([])
            ->bulkActions([]);
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTenantSmsCredits::route('/'),
        ];
    }
}
