<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TenantResource\Pages;
use App\Models\Tenant;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Actions\Action;

class TenantResource extends Resource
{
    protected static ?string $model = Tenant::class;

    protected static ?string $navigationIcon  = 'heroicon-o-building-office-2';
    protected static ?string $navigationLabel = 'Tenants';
    protected static ?string $navigationGroup = 'Tenant Portal';
    protected static ?int    $navigationSort  = 1;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\Section::make('Tenant Details')->schema([
                TextInput::make('name')
                    ->label('Display Name')
                    ->placeholder('e.g. Rita\'s Riches')
                    ->required()
                    ->maxLength(255),

                TextInput::make('tenant_key')
                    ->label('Tenant Key')
                    ->placeholder('e.g. ritas')
                    ->required()
                    ->unique(ignoreRecord: true)
                    ->maxLength(100)
                    ->helperText('Matches HUB_TENANT_KEY in the tenant\'s .env'),

                TextInput::make('domain')
                    ->label('Domain')
                    ->placeholder('e.g. ritasriches.co.uk')
                    ->maxLength(255),

                TextInput::make('contact_name')
                    ->label('Contact Name')
                    ->maxLength(255),

                TextInput::make('contact_email')
                    ->label('Contact Email')
                    ->email()
                    ->maxLength(255),

                Toggle::make('is_active')
                    ->label('Active')
                    ->default(true),
            ])->columns(2),

            Forms\Components\Section::make('Licensing')->schema([
                Forms\Components\TextInput::make('licensing_amount')
                    ->label('Licensing Fee (£)')
                    ->numeric()
                    ->prefix('£'),

                DatePicker::make('licensing_due_date')
                    ->label('Due Date')
                    ->displayFormat('d/m/Y'),

                Toggle::make('licensing_paid')
                    ->label('Paid')
                    ->reactive(),

                Forms\Components\DateTimePicker::make('licensing_paid_at')
                    ->label('Paid At')
                    ->displayFormat('d/m/Y H:i')
                    ->visible(fn ($get) => $get('licensing_paid')),

                Textarea::make('notes')
                    ->label('Notes')
                    ->rows(3)
                    ->columnSpanFull(),
            ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Tenant')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),

                TextColumn::make('tenant_key')
                    ->label('Key')
                    ->badge()
                    ->color('gray')
                    ->searchable(),

                TextColumn::make('domain')
                    ->label('Domain')
                    ->searchable()
                    ->toggleable(),

                IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->sortable(),

                IconColumn::make('licensing_paid')
                    ->label('Paid')
                    ->boolean()
                    ->trueColor('success')
                    ->falseColor('danger')
                    ->sortable(),

                TextColumn::make('licensing_due_date')
                    ->label('Due Date')
                    ->date('d/m/Y')
                    ->sortable()
                    ->color(fn (Tenant $record) =>
                        !$record->licensing_paid && $record->licensing_due_date?->isPast()
                            ? 'danger'
                            : null
                    ),

                TextColumn::make('licensing_amount')
                    ->label('Fee')
                    ->money('GBP')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\TernaryFilter::make('is_active')->label('Active'),
                Tables\Filters\TernaryFilter::make('licensing_paid')->label('Paid'),
            ])
            ->actions([
                Action::make('mark_paid')
                    ->label('Mark Paid')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (Tenant $record) => !$record->licensing_paid)
                    ->requiresConfirmation()
                    ->action(fn (Tenant $record) => $record->markPaid()),

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
            'index'  => Pages\ListTenants::route('/'),
            'create' => Pages\CreateTenant::route('/create'),
            'edit'   => Pages\EditTenant::route('/{record}/edit'),
        ];
    }

    public static function getNavigationBadge(): ?string
    {
        $unpaid = static::getModel()::where('licensing_paid', false)
            ->where('is_active', true)
            ->count();

        return $unpaid > 0 ? (string) $unpaid : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'danger';
    }
}
