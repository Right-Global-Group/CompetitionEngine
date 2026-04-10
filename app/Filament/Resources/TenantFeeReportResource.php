<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TenantFeeReportResource\Pages;
use App\Models\TenantFeeReport;
use Carbon\Carbon;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Actions\Action;

class TenantFeeReportResource extends Resource
{
    protected static ?string $model = TenantFeeReport::class;

    protected static ?string $navigationIcon  = 'heroicon-o-currency-pound';
    protected static ?string $navigationLabel = 'Platform Fees';
    protected static ?string $navigationGroup = 'Tenant Portal';
    protected static ?int    $navigationSort  = 3;

    public static function table(Table $table): Table
    {
        $currentYear  = now()->year;
        $currentMonth = now()->month;

        return $table
            ->columns([
                TextColumn::make('tenant_key')
                    ->label('Tenant')
                    ->badge()
                    ->color('gray')
                    ->searchable()
                    ->sortable(),

                TextColumn::make('month_label')
                    ->label('Month')
                    ->getStateUsing(fn (TenantFeeReport $r) =>
                        Carbon::create($r->year, $r->month, 1)->format('M Y')
                    )
                    ->sortable(query: fn ($query, $direction) =>
                        $query->orderBy('year', $direction)->orderBy('month', $direction)
                    ),

                TextColumn::make('scratchy_only_count')
                    ->label('Scratch Orders')
                    ->numeric()
                    ->alignRight(),

                TextColumn::make('other_count')
                    ->label('Other Orders')
                    ->numeric()
                    ->alignRight(),

                TextColumn::make('subtotal')
                    ->label('Subtotal')
                    ->money('GBP')
                    ->alignRight(),

                TextColumn::make('vat')
                    ->label('VAT')
                    ->money('GBP')
                    ->alignRight()
                    ->color('warning'),

                TextColumn::make('total')
                    ->label('Total Owed')
                    ->money('GBP')
                    ->alignRight()
                    ->weight('bold')
                    ->color(fn (TenantFeeReport $r) => $r->is_paid ? 'success' : 'danger'),

                IconColumn::make('is_paid')
                    ->label('Paid')
                    ->boolean()
                    ->trueColor('success')
                    ->falseColor('danger'),

                TextColumn::make('paid_at')
                    ->label('Paid At')
                    ->dateTime('d/m/Y H:i')
                    ->placeholder('—')
                    ->toggleable(),

                TextColumn::make('reported_at')
                    ->label('Last Reported')
                    ->dateTime('d/m/Y H:i')
                    ->placeholder('Never')
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('tenant_key')
                    ->label('Tenant')
                    ->options(fn () =>
                        TenantFeeReport::distinct()->pluck('tenant_key', 'tenant_key')->sort()
                    ),

                Tables\Filters\SelectFilter::make('month')
                    ->label('Month')
                    ->options(fn () => collect(range(1, 12))->mapWithKeys(fn ($m) => [
                        $m => Carbon::create(null, $m)->format('F'),
                    ])),

                Tables\Filters\SelectFilter::make('year')
                    ->label('Year')
                    ->options(fn () =>
                        TenantFeeReport::distinct()->pluck('year', 'year')->sort()->reverse()
                    ),

                Tables\Filters\TernaryFilter::make('is_paid')->label('Paid'),
            ])
            ->actions([
                Action::make('mark_paid')
                    ->label('Mark Paid')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (TenantFeeReport $r) => !$r->is_paid)
                    ->requiresConfirmation()
                    ->action(fn (TenantFeeReport $r) => $r->markPaid()),

                Action::make('mark_unpaid')
                    ->label('Unmark Paid')
                    ->icon('heroicon-o-x-circle')
                    ->color('gray')
                    ->visible(fn (TenantFeeReport $r) => $r->is_paid)
                    ->requiresConfirmation()
                    ->action(fn (TenantFeeReport $r) => $r->update(['is_paid' => false, 'paid_at' => null])),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\BulkAction::make('mark_all_paid')
                        ->label('Mark Selected Paid')
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->action(fn ($records) => $records->each->markPaid()),
                ]),
            ])
            ->defaultSort('year', 'desc')
            ->striped();
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTenantFeeReports::route('/'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        $unpaid = static::getModel()::where('is_paid', false)->sum('total');
        return $unpaid > 0 ? '£' . number_format($unpaid, 2) : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }
}
