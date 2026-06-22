<x-filament-panels::page>

    {{-- Inline create / edit form --}}
    @if ($showForm)
        <x-filament::section :heading="$editingSha ? 'Edit Entry' : 'New Entry'">
            <form wire:submit="save">
                {{ $this->form }}

                <div class="flex items-center gap-3 mt-6">
                    <x-filament::button type="submit">
                        {{ $editingSha ? 'Update Entry' : 'Add Entry' }}
                    </x-filament::button>

                    <x-filament::button
                        color="gray"
                        type="button"
                        wire:click="cancel"
                    >
                        Cancel
                    </x-filament::button>
                </div>
            </form>
        </x-filament::section>
    @endif

    {{-- Entries table --}}
    <x-filament::section heading="Changelog Entries">
        <x-filament-tables::container>
            <table class="fi-ta-table w-full table-fixed divide-y divide-gray-200 dark:divide-white/5 text-sm">
                <thead class="bg-gray-50 dark:bg-white/5">
                    <tr>
                        <x-filament-tables::header-cell>Date</x-filament-tables::header-cell>
                        <x-filament-tables::header-cell>Title</x-filament-tables::header-cell>
                        <x-filament-tables::header-cell>Category</x-filament-tables::header-cell>
                        <x-filament-tables::header-cell>Product</x-filament-tables::header-cell>
                        <x-filament-tables::header-cell alignment="end">Actions</x-filament-tables::header-cell>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-white/5">
                    @forelse ($entries as $entry)
                        <x-filament-tables::row>
                            <x-filament-tables::cell>
                                <div class="px-3 py-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                    {{ $entry['date_label'] ?? $entry['date'] }}
                                </div>
                            </x-filament-tables::cell>

                            <x-filament-tables::cell>
                                <div class="px-3 py-4 font-medium text-gray-900 dark:text-white truncate">
                                    {{ $entry['title'] }}
                                </div>
                            </x-filament-tables::cell>

                            <x-filament-tables::cell>
                                <div class="px-3 py-4">
                                    <x-filament::badge
                                        :color="match($entry['category']) {
                                            'feature'     => 'success',
                                            'improvement' => 'info',
                                            'bugfix'      => 'danger',
                                            'design'      => 'primary',
                                            'performance' => 'warning',
                                            'security'    => 'warning',
                                            default       => 'gray',
                                        }"
                                    >
                                        {{ $entry['meta']['label'] ?? ucfirst($entry['category']) }}
                                    </x-filament::badge>
                                </div>
                            </x-filament-tables::cell>

                            <x-filament-tables::cell>
                                <div class="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                    {{ $entry['tenants'][0] ?? 'all' }}
                                </div>
                            </x-filament-tables::cell>

                            <x-filament-tables::cell>
                                <div class="px-3 py-4 flex items-center justify-end gap-2">
                                    <x-filament::icon-button
                                        icon="heroicon-m-pencil-square"
                                        wire:click="openEdit('{{ $entry['sha'] }}')"
                                        tooltip="Edit"
                                        color="gray"
                                        size="sm"
                                    />
                                    <x-filament::icon-button
                                        icon="heroicon-m-trash"
                                        wire:click="deleteEntry('{{ $entry['sha'] }}')"
                                        wire:confirm="Are you sure you want to delete this entry?"
                                        tooltip="Delete"
                                        color="danger"
                                        size="sm"
                                    />
                                </div>
                            </x-filament-tables::cell>
                        </x-filament-tables::row>
                    @empty
                        <tr>
                            <td colspan="5" class="py-12 text-center text-gray-500 dark:text-gray-400">
                                No changelog entries yet.
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </x-filament-tables::container>
    </x-filament::section>

</x-filament-panels::page>
