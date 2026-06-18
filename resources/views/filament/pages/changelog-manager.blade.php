<x-filament-panels::page>

    {{-- Inline form --}}
    @if ($showForm)
        <div class="bg-gray-800 rounded-xl p-6 mb-6 border border-gray-700">
            <h3 class="text-base font-semibold text-white mb-4">
                {{ $editingSha ? 'Edit Entry' : 'New Entry' }}
            </h3>
            <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2">
                    <label class="block text-xs text-gray-400 mb-1">Title</label>
                    <input wire:model="entryTitle" type="text" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm" />
                    @error('entryTitle') <p class="text-red-400 text-xs mt-1">{{ $message }}</p> @enderror
                </div>
                <div class="col-span-2">
                    <label class="block text-xs text-gray-400 mb-1">Body</label>
                    <textarea wire:model="body" rows="3" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm"></textarea>
                </div>
                <div>
                    <label class="block text-xs text-gray-400 mb-1">Category</label>
                    <select wire:model="category" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                        <option value="feature">Feature</option>
                        <option value="improvement">Improvement</option>
                        <option value="bugfix">Bug Fix</option>
                        <option value="design">Design</option>
                        <option value="performance">Performance</option>
                        <option value="security">Security</option>
                        <option value="general">General</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs text-gray-400 mb-1">Product</label>
                    <select wire:model="tenant" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm">
                        <option value="all">All products</option>
                        <option value="games">Games</option>
                        <option value="racing">Racing</option>
                        <option value="sports">Sports</option>
                        <option value="charity">Charity</option>
                        <option value="admin">Admin</option>
                        <option value="api">API</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs text-gray-400 mb-1">Date</label>
                    <input wire:model="date" type="date" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm" />
                </div>
            </div>
            <div class="flex gap-3 mt-4">
                <button wire:click="save" class="px-4 py-2 bg-primary-600 hover:bg-primary-500 text-white text-sm font-semibold rounded-lg transition-colors">
                    {{ $editingSha ? 'Update' : 'Add Entry' }}
                </button>
                <button wire:click="cancel" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    @endif

    {{-- Entries table --}}
    <div class="rounded-xl border border-gray-700 overflow-hidden">
        <table class="w-full text-sm text-left">
            <thead class="bg-gray-800 text-gray-400 text-xs uppercase tracking-wider">
                <tr>
                    <th class="px-4 py-3">Title</th>
                    <th class="px-4 py-3">Category</th>
                    <th class="px-4 py-3">Product</th>
                    <th class="px-4 py-3">Date</th>
                    <th class="px-4 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-700">
                @forelse ($entries as $entry)
                    <tr class="bg-gray-900 hover:bg-gray-800 transition-colors">
                        <td class="px-4 py-3 text-white font-medium max-w-xs truncate">
                            {{ $entry['title'] }}
                        </td>
                        <td class="px-4 py-3">
                            <span class="px-2 py-0.5 rounded-full text-xs font-semibold"
                                style="background:rgba({{ $entry['meta']['bg'] }},0.15);color:{{ $entry['meta']['color'] }}">
                                {{ $entry['meta']['label'] }}
                            </span>
                        </td>
                        <td class="px-4 py-3 text-gray-400 text-xs">
                            {{ implode(', ', $entry['tenants']) }}
                        </td>
                        <td class="px-4 py-3 text-gray-400 text-xs">
                            {{ $entry['date_label'] }}
                        </td>
                        <td class="px-4 py-3 text-right">
                            <div class="flex items-center justify-end gap-2">
                                <button
                                    wire:click="openEdit('{{ $entry['sha'] }}')"
                                    class="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-lg transition-colors"
                                >Edit</button>
                                <button
                                    wire:click="deleteEntry('{{ $entry['sha'] }}')"
                                    wire:confirm="Delete this entry?"
                                    class="px-3 py-1 bg-red-900 hover:bg-red-800 text-red-300 text-xs rounded-lg transition-colors"
                                >Delete</button>
                            </div>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                            No entries yet. Add one above.
                        </td>
                    </tr>
                @endforelse
            </tbody>
        </table>
    </div>

</x-filament-panels::page>