<?php

namespace App\Filament\Resources;

use App\Filament\Resources\BlogPostResource\Pages;
use App\Models\BlogPost;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use FilamentTiptapEditor\TiptapEditor;
use FilamentTiptapEditor\Enums\TiptapOutput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class BlogPostResource extends Resource
{
    protected static ?string $model = BlogPost::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';
    protected static ?string $navigationLabel = 'Blog Posts';
    protected static ?string $navigationGroup = 'Content Management';

    public static function canViewAny(): bool
    {
        return auth()->user()?->isSuperSuperAdmin() ?? false;
    }

    public static function canCreate(): bool
    {
        return auth()->user()?->isSuperSuperAdmin() ?? false;
    }

    public static function canEdit($record): bool
    {
        return auth()->user()?->isSuperSuperAdmin() ?? false;
    }

    public static function canDelete($record): bool
    {
        return auth()->user()?->isSuperSuperAdmin() ?? false;
    }

    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('title')
                ->required()
                ->maxLength(255)
                ->live(onBlur: true)
                ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug($state)))
                ->columnSpanFull(),

            TextInput::make('slug')
                ->required()
                ->maxLength(255)
                ->unique(ignoreRecord: true)
                ->columnSpanFull(),

            Textarea::make('excerpt')
                ->rows(3)
                ->maxLength(500)
                ->helperText('Short summary shown on the blog list page.')
                ->columnSpanFull(),

            TiptapEditor::make('content')
                ->output(TiptapOutput::Html)
                ->tools([
                    'heading', 'paragraph', 'bullet-list', 'ordered-list', 'checked-list',
                    'blockquote', 'hr', 'code-block',
                    'bold', 'italic', 'underline', 'strike', 'superscript', 'subscript',
                    'color', 'highlight', 'remove-color',
                    'align-left', 'align-center', 'align-right', 'align-justify',
                    'link', 'media', 'oembed',
                    'table',
                    'erase', 'source', 'fullscreen',
                    'undo', 'redo',
                ])
                ->columnSpanFull(),

            DateTimePicker::make('published_at')
                ->label('Publish At')
                ->helperText('Leave blank to save as draft.'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')->searchable()->sortable(),
                TextColumn::make('slug')->searchable(),
                TextColumn::make('published_at')
                    ->label('Published')
                    ->dateTime('d M Y')
                    ->sortable()
                    ->placeholder('Draft'),
                TextColumn::make('created_at')->dateTime('d M Y')->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index'  => Pages\ListBlogPosts::route('/'),
            'create' => Pages\CreateBlogPost::route('/create'),
            'edit'   => Pages\EditBlogPost::route('/{record}/edit'),
        ];
    }
}
