<x-filament-panels::page>

    <script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>

    {{-- Month navigation --}}
    <div class="flex items-center justify-between mb-6">
        <div>
            <h2 class="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">
                {{ $this->getMonthLabel() }}
            </h2>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {{ $this->getMonthRange() }}
            </p>
        </div>
        <div class="flex items-center gap-2">
            <x-filament::button wire:click="prevMonth" color="gray" icon="heroicon-m-chevron-left" icon-position="before">Prev</x-filament::button>
            <x-filament::button wire:click="nextMonth" color="gray" icon="heroicon-m-chevron-right" icon-position="after">Next</x-filament::button>
        </div>
    </div>

    @php
        $rows      = $this->getRows();
        $totals    = $this->getTotals();
        $chartData = $this->getChartData();
    @endphp

    {{-- Summary cards --}}
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total Owed</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">£{{ number_format($totals['total'], 2) }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ $totals['count'] }} report{{ $totals['count'] !== 1 ? 's' : '' }} received</p>
        </div>
        <div class="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 p-4">
            <p class="text-xs text-green-600 dark:text-green-400 uppercase tracking-wider mb-1">Paid</p>
            <p class="text-2xl font-bold text-green-700 dark:text-green-400">£{{ number_format($totals['paid'], 2) }}</p>
            <p class="text-xs text-green-600 dark:text-green-500 mt-1">{{ $totals['paid_count'] }} tenant{{ $totals['paid_count'] !== 1 ? 's' : '' }}</p>
        </div>
        <div class="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 p-4">
            <p class="text-xs text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">Outstanding</p>
            <p class="text-2xl font-bold text-red-700 dark:text-red-400">£{{ number_format($totals['outstanding'], 2) }}</p>
            <p class="text-xs text-red-600 dark:text-red-500 mt-1">{{ $totals['count'] - $totals['paid_count'] }} tenant{{ ($totals['count'] - $totals['paid_count']) !== 1 ? 's' : '' }}</p>
        </div>
        <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">VAT Total</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">£{{ number_format($totals['vat'], 2) }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Subtotal £{{ number_format($totals['subtotal'], 2) }}</p>
        </div>
    </div>

    {{-- Chart --}}
    @if (!empty($chartData['labels']))
        <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 mb-6"
            x-data="{
                init() {
                    const ctx = this.$refs.chart.getContext('2d');
                    new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: {{ json_encode($chartData['labels']) }},
                            datasets: [{
                                label: 'Total Owed (£)',
                                data: {{ json_encode($chartData['totals']) }},
                                backgroundColor: {{ json_encode($chartData['colors']) }},
                                borderRadius: 6,
                                borderSkipped: false,
                            }]
                        },
                        options: {
                            indexAxis: 'y',
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false },
                                tooltip: {
                                    callbacks: {
                                        label: ctx => '£' + ctx.parsed.x.toFixed(2)
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    ticks: {
                                        color: '#9ca3af',
                                        callback: val => '£' + val
                                    },
                                    grid: { color: 'rgba(255,255,255,0.05)' }
                                },
                                y: {
                                    ticks: { color: '#e5e7eb' },
                                    grid: { display: false }
                                }
                            }
                        }
                    });
                }
            }"
        >
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Fee Breakdown — {{ $this->getMonthLabel() }}</p>
            <div style="height: {{ max(200, count($chartData['labels']) * 36) }}px">
                <canvas x-ref="chart"></canvas>
            </div>
            <div class="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-green-500 inline-block"></span> Paid</span>
                <span class="flex items-center gap-1.5"><span class="w-3 h-3 rounded-sm bg-red-500 inline-block"></span> Unpaid</span>
            </div>
        </div>
    @endif

    {{-- Billing table --}}
    <div class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table class="w-full text-sm">
            <thead class="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                    <th class="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">#</th>
                    <th class="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-200">Tenant</th>
                    <th class="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">Scratch Orders</th>
                    <th class="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">Other Orders</th>
                    <th class="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">Subtotal</th>
                    <th class="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">VAT</th>
                    <th class="px-4 py-3 text-right font-semibold text-gray-700 dark:text-gray-200">Total</th>
                    <th class="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-200">Status</th>
                    <th class="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-200">Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                @foreach ($rows as $i => $row)
                    @php $report = $row['report']; $tenant = $row['tenant']; @endphp
                    <tr class="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td class="px-4 py-3 text-gray-400 dark:text-gray-500 text-xs font-mono">
                            {{ $report ? $i + 1 : '—' }}
                        </td>
                        <td class="px-4 py-3">
                            <div class="font-semibold text-gray-900 dark:text-white">{{ $tenant->name }}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">{{ $tenant->tenant_key }}</div>
                        </td>

                        @if ($report)
                            <td class="px-4 py-3 text-right text-gray-900 dark:text-gray-100">{{ number_format($report->scratchy_only_count) }}</td>
                            <td class="px-4 py-3 text-right text-gray-900 dark:text-gray-100">{{ number_format($report->other_count) }}</td>
                            <td class="px-4 py-3 text-right text-gray-900 dark:text-gray-100">£{{ number_format($report->subtotal, 2) }}</td>
                            <td class="px-4 py-3 text-right text-amber-600 dark:text-amber-400 font-medium">£{{ number_format($report->vat, 2) }}</td>
                            <td class="px-4 py-3 text-right font-bold text-lg {{ $report->is_paid ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400' }}">
                                £{{ number_format($report->total, 2) }}
                            </td>
                            <td class="px-4 py-3 text-center">
                                @if ($report->is_paid)
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400">
                                        <x-heroicon-m-check-circle class="w-3 h-3" /> Paid
                                    </span>
                                    @if ($report->paid_at)
                                        <div class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{{ $report->paid_at->format('d/m/Y') }}</div>
                                    @endif
                                @else
                                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400">
                                        <x-heroicon-m-clock class="w-3 h-3" /> Unpaid
                                    </span>
                                @endif
                            </td>
                            <td class="px-4 py-3 text-center">
                                @if ($report->is_paid)
                                    <x-filament::button wire:click="markUnpaid({{ $report->id }})" wire:confirm="Mark this as unpaid?" color="gray" size="xs">Unmark</x-filament::button>
                                @else
                                    <x-filament::button wire:click="markPaid({{ $report->id }})" wire:confirm="Mark this as paid?" color="success" size="xs">Mark Paid</x-filament::button>
                                @endif
                            </td>
                        @else
                            <td colspan="5" class="px-4 py-3 text-center text-gray-400 dark:text-gray-600 italic text-xs">No report submitted</td>
                            <td class="px-4 py-3 text-center">
                                <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-500">No data</span>
                            </td>
                            <td class="px-4 py-3"></td>
                        @endif
                    </tr>
                @endforeach
            </tbody>

            @if ($totals['count'] > 0)
                <tfoot class="bg-gray-50 dark:bg-gray-800 border-t-2 border-gray-300 dark:border-gray-600">
                    <tr>
                        <td class="px-4 py-3"></td>
                        <td class="px-4 py-3 font-bold text-gray-900 dark:text-white">Totals</td>
                        <td class="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
                            {{ number_format(collect($rows)->sum(fn($r) => $r['report']?->scratchy_only_count ?? 0)) }}
                        </td>
                        <td class="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
                            {{ number_format(collect($rows)->sum(fn($r) => $r['report']?->other_count ?? 0)) }}
                        </td>
                        <td class="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">£{{ number_format($totals['subtotal'], 2) }}</td>
                        <td class="px-4 py-3 text-right font-semibold text-amber-600 dark:text-amber-400">£{{ number_format($totals['vat'], 2) }}</td>
                        <td class="px-4 py-3 text-right font-bold text-gray-900 dark:text-white text-lg">£{{ number_format($totals['total'], 2) }}</td>
                        <td class="px-4 py-3 text-center text-xs text-gray-500 dark:text-gray-400">{{ $totals['paid_count'] }}/{{ $totals['count'] }} paid</td>
                        <td></td>
                    </tr>
                </tfoot>
            @endif
        </table>

        @if (count($rows) === 0)
            <div class="py-16 text-center text-gray-400 dark:text-gray-600">No active tenants found.</div>
        @endif
    </div>

</x-filament-panels::page>
