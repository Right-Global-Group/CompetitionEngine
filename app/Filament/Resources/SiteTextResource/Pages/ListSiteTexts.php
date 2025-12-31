<?php

namespace App\Filament\Resources\SiteTextResource\Pages;

use App\Filament\Resources\SiteTextResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Resources\Components\Tab;
use Illuminate\Database\Eloquent\Builder;
use App\Models\SiteText;

class ListSiteTexts extends ListRecords
{
    protected static string $resource = SiteTextResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make()
                ->label('Add New Text')
                ->icon('heroicon-o-plus'),
        ];
    }

    public function getTabs(): array
    {
        $sections = SiteText::getSections();
        
        $tabs = [
            'all' => Tab::make('All Sections')
                ->badge(SiteText::count()),
        ];

        foreach ($sections as $key => $label) {
            $count = SiteText::where('section', $key)->count();
            if ($count > 0) {
                $tabs[$key] = Tab::make($label)
                    ->badge($count)
                    ->modifyQueryUsing(fn (Builder $query) => $query->where('section', $key));
            }
        }

        return $tabs;
    }
}