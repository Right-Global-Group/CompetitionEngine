<x-filament-panels::page>

    <script src="https://cdn.jsdelivr.net/npm/apexcharts@3.49.1/dist/apexcharts.min.js"></script>

    @php
        $kpis = $this->getKpis();
        $trend = $this->getTrendSeries();
        $snapshot = $this->getTenantSnapshot();
        $movers = $this->getMovers();

        $deltaColor = fn ($pct) => $pct === null ? 'text-gray-400' : ($pct >= 0 ? 'text-green-400' : 'text-red-400');
        $mixColor = fn ($m) => $m === null ? 'text-gray-400' : ($m < 30 ? 'text-red-400' : ($m < 60 ? 'text-amber-400' : 'text-green-400'));
        $mixBg = fn ($m) => $m === null ? 'bg-gray-700' : ($m < 30 ? 'bg-red-500' : ($m < 60 ? 'bg-amber-500' : 'bg-green-500'));
    @endphp

    {{-- Month navigation --}}
    <div class="flex items-center justify-between mb-4">
        <div>
            <h2 class="text-xl font-bold text-gray-950 dark:text-white">{{ $this->getMonthLabel() }}</h2>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                @if ($this->isCurrentMonth())
                    Live — day {{ now()->day }} of {{ now()->daysInMonth }}
                @else
                    Closed month
                @endif
            </p>
        </div>
        <div class="flex items-center gap-2">
            <x-filament::button wire:click="prevMonth" color="gray" icon="heroicon-m-chevron-left" icon-position="before">Prev</x-filament::button>
            <x-filament::button wire:click="nextMonth" color="gray" icon="heroicon-m-chevron-right" icon-position="after" :disabled="$this->isCurrentMonth()">Next</x-filament::button>
        </div>
    </div>

    {{-- KPI strip --}}
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">This Month (MTD)</p>
            <p class="text-3xl font-bold text-gray-900 dark:text-white">£{{ number_format($kpis['mtd_total'], 2) }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Day {{ $kpis['days_elapsed'] }} of {{ $kpis['days_in_month'] }} ·
                {{ $kpis['tenants_reporting'] }}/{{ $kpis['active_tenants'] }} tenants reporting
            </p>
        </div>

        <div class="rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-gray-900 p-4">
            <p class="text-xs text-purple-600 dark:text-purple-300 uppercase tracking-wider mb-1">Projected Month-End</p>
            <p class="text-3xl font-bold text-purple-700 dark:text-purple-300">£{{ number_format($kpis['projected_total'], 2) }}</p>
            <p class="text-xs text-purple-600 dark:text-purple-400/80 mt-1">
                vs Last Month: £{{ number_format($kpis['last_total'], 2) }}
                @if ($kpis['projected_vs_last_pct'] !== null)
                    <span class="{{ $kpis['projected_vs_last_pct'] >= 0 ? 'text-green-500' : 'text-red-500' }}">
                        ({{ $kpis['projected_vs_last_pct'] >= 0 ? '+' : '' }}{{ number_format($kpis['projected_vs_last_pct'], 1) }}%)
                    </span>
                @endif
            </p>
        </div>

        <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Platform Mix Score</p>
            @if ($kpis['platform_mix'] !== null)
                <p class="text-3xl font-bold {{ $mixColor($kpis['platform_mix']) }}">{{ number_format($kpis['platform_mix'], 1) }}%</p>
                <div class="mt-2 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div class="h-full rounded-full {{ $mixBg($kpis['platform_mix']) }}" style="width: {{ min(100, $kpis['platform_mix']) }}%"></div>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Avg rate {{ $kpis['platform_avg_rate'] !== null ? number_format($kpis['platform_avg_rate'] * 100, 1) . 'p' : '—' }} ·
                    {{ number_format($kpis['total_orders']) }} orders
                </p>
            @else
                <p class="text-3xl font-bold text-gray-400">—</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">No orders this month yet</p>
            @endif
        </div>

        <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
            <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">VAT (Inland Revenue)</p>
            <p class="text-3xl font-bold text-amber-600 dark:text-amber-400">£{{ number_format($kpis['mtd_vat'], 2) }}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">Subtotal £{{ number_format($kpis['mtd_subtotal'], 2) }}</p>
        </div>
    </div>

    {{-- Trend charts (split into two for readability) --}}
    <div class="flex items-center justify-between mb-3">
        <div>
            <h3 class="font-semibold text-gray-900 dark:text-white text-lg">Fee trend</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Platform total above · top 5 tenants below</p>
        </div>
        <div class="flex gap-1 text-xs bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            @foreach ([3, 6, 12, 24] as $r)
                <button wire:click="setRange({{ $r }})"
                    class="px-3 py-1 rounded-md font-medium transition {{ $rangeMonths === $r ? 'bg-purple-700 text-white' : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200' }}"
                >{{ $r }}M</button>
            @endforeach
        </div>
    </div>

    {{-- Chart 1: Platform total --}}
    <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 mb-4"
        wire:key="trend-total-{{ $rangeMonths }}"
        x-data="{
            labels: @js($trend['labels']),
            totals: @js($trend['platform_totals']),
            init() {
                const opts = {
                    chart: { type: 'area', height: 240, toolbar: { show: false }, background: 'transparent', animations: { enabled: true, speed: 400 } },
                    theme: { mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light' },
                    series: [{ name: 'Platform total', data: this.totals }],
                    colors: ['#facc15'],
                    stroke: { width: 3, curve: 'smooth' },
                    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [0, 90, 100] } },
                    markers: { size: 5, strokeColors: '#0b0f19', strokeWidth: 2, hover: { size: 7 } },
                    grid: { borderColor: 'rgba(148,163,184,0.15)', strokeDashArray: 4 },
                    dataLabels: { enabled: false },
                    xaxis: { categories: this.labels, labels: { style: { colors: '#9ca3af', fontSize: '12px' } } },
                    yaxis: { labels: { style: { colors: '#9ca3af', fontSize: '12px' }, formatter: v => '£' + v.toFixed(0) } },
                    tooltip: { theme: 'dark', y: { formatter: v => '£' + v.toFixed(2) } },
                };
                new ApexCharts(this.$refs.chart, opts).render();
            }
        }"
    >
        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Platform total</h4>
        <div x-ref="chart"></div>
    </div>

    {{-- Chart 2: Top 5 tenants as separate lines --}}
    <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 mb-6"
        wire:key="trend-top-{{ $rangeMonths }}"
        x-data="{
            labels: @js($trend['labels']),
            tenants: @js($trend['top_tenants']),
            othersTotals: @js($trend['others_totals']),
            othersCount: @js($trend['others_count']),
            init() {
                const series = [...this.tenants];
                if (this.othersCount > 0) {
                    series.push({ name: 'Others (' + this.othersCount + ')', data: this.othersTotals });
                }
                const palette = ['#a855f7','#3b82f6','#10b981','#f59e0b','#ef4444','#94a3b8'];
                const opts = {
                    chart: { type: 'line', height: 280, toolbar: { show: false }, background: 'transparent', animations: { enabled: true, speed: 400 } },
                    theme: { mode: document.documentElement.classList.contains('dark') ? 'dark' : 'light' },
                    series: series,
                    colors: palette.slice(0, series.length),
                    stroke: { width: series.map(s => s.name && s.name.startsWith('Others') ? 2 : 3), curve: 'smooth', dashArray: series.map(s => s.name && s.name.startsWith('Others') ? 5 : 0) },
                    markers: { size: 4, strokeColors: '#0b0f19', strokeWidth: 2, hover: { size: 6 } },
                    grid: { borderColor: 'rgba(148,163,184,0.15)', strokeDashArray: 4 },
                    dataLabels: { enabled: false },
                    xaxis: { categories: this.labels, labels: { style: { colors: '#9ca3af', fontSize: '12px' } } },
                    yaxis: { labels: { style: { colors: '#9ca3af', fontSize: '12px' }, formatter: v => '£' + v.toFixed(0) } },
                    legend: { position: 'top', horizontalAlign: 'left', labels: { colors: '#cbd5e1' }, markers: { width: 10, height: 10, radius: 2 } },
                    tooltip: { theme: 'dark', shared: true, intersect: false, y: { formatter: v => '£' + v.toFixed(2) } },
                };
                new ApexCharts(this.$refs.chart, opts).render();
            }
        }"
    >
        <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">Top 5 tenants <span class="text-xs text-gray-500 dark:text-gray-400 font-normal">— by total in range</span></h4>
        <div x-ref="chart"></div>
    </div>

    {{-- Leaderboard + Movers --}}
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

        {{-- Leaderboard --}}
        <div class="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 lg:col-span-1">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <x-heroicon-o-trophy class="w-5 h-5 text-amber-500" /> Top tenants — this month
            </h3>
            @if (count($snapshot) === 0)
                <p class="text-sm text-gray-500 dark:text-gray-400">No tenants reporting yet.</p>
            @else
                <ol class="space-y-2">
                    @foreach (array_slice($snapshot, 0, 5) as $i => $row)
                        <li class="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <div class="flex items-center gap-2 min-w-0">
                                <span class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                                    {{ $i === 0 ? 'bg-amber-400 text-amber-900' : ($i === 1 ? 'bg-gray-300 text-gray-700' : ($i === 2 ? 'bg-amber-700 text-amber-100' : 'bg-gray-700 text-gray-300')) }}">
                                    {{ $i + 1 }}
                                </span>
                                <span class="font-medium text-gray-900 dark:text-white truncate">{{ $row['name'] }}</span>
                            </div>
                            <div class="text-right shrink-0">
                                <span class="font-semibold text-gray-900 dark:text-white">£{{ number_format($row['current_total'], 0) }}</span>
                                @if ($row['mix_score'] !== null)
                                    <span class="text-xs ml-1 {{ $mixColor($row['mix_score']) }}">{{ number_format($row['mix_score'], 0) }}%</span>
                                @endif
                            </div>
                        </li>
                    @endforeach
                </ol>
            @endif
        </div>

        {{-- Risers --}}
        <div class="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-gray-900 p-5">
            <h3 class="font-semibold text-green-700 dark:text-green-400 mb-1 flex items-center gap-2">
                <x-heroicon-o-arrow-trending-up class="w-5 h-5" /> Biggest risers
            </h3>
            <p class="text-[10px] text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                @if ($movers['pace_adjusted']) Projected month-end vs last month @else This month vs last month @endif
            </p>
            @if (count($movers['risers']) === 0)
                <p class="text-sm text-gray-500 dark:text-gray-400">No comparable data yet.</p>
            @else
                <ol class="space-y-1.5">
                    @foreach ($movers['risers'] as $row)
                        @php $abs = $row['pace_delta_abs']; $pct = $row['pace_delta_pct']; @endphp
                        <li class="flex items-center justify-between text-sm gap-2">
                            <span class="text-gray-900 dark:text-white truncate">{{ $row['name'] }}</span>
                            <div class="text-right shrink-0">
                                <span class="font-semibold {{ $abs >= 0 ? 'text-green-600 dark:text-green-400' : 'text-gray-500' }}">
                                    {{ $abs >= 0 ? '+' : '' }}£{{ number_format($abs, 2) }}
                                </span>
                                @if ($pct !== null)
                                    <span class="text-xs ml-1 {{ $pct >= 0 ? 'text-green-700 dark:text-green-500' : 'text-gray-500' }}">
                                        {{ $pct >= 0 ? '+' : '' }}{{ number_format($pct, 1) }}%
                                    </span>
                                @endif
                            </div>
                        </li>
                    @endforeach
                </ol>
            @endif
        </div>

        {{-- Fallers --}}
        <div class="rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-gray-900 p-5">
            <h3 class="font-semibold text-red-700 dark:text-red-400 mb-1 flex items-center gap-2">
                <x-heroicon-o-arrow-trending-down class="w-5 h-5" /> Biggest fallers
            </h3>
            <p class="text-[10px] text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                @if ($movers['pace_adjusted']) Projected month-end vs last month @else This month vs last month @endif
            </p>
            @if (count($movers['fallers']) === 0)
                <p class="text-sm text-gray-500 dark:text-gray-400">No comparable data yet.</p>
            @else
                <ol class="space-y-1.5">
                    @foreach ($movers['fallers'] as $row)
                        @php $abs = $row['pace_delta_abs']; $pct = $row['pace_delta_pct']; @endphp
                        <li class="flex items-center justify-between text-sm gap-2">
                            <span class="text-gray-900 dark:text-white truncate">{{ $row['name'] }}</span>
                            <div class="text-right shrink-0">
                                <span class="font-semibold {{ $abs < 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-500' }}">
                                    {{ $abs >= 0 ? '+' : '' }}£{{ number_format($abs, 2) }}
                                </span>
                                @if ($pct !== null)
                                    <span class="text-xs ml-1 {{ $pct < 0 ? 'text-red-700 dark:text-red-500' : 'text-gray-500' }}">
                                        {{ $pct >= 0 ? '+' : '' }}{{ number_format($pct, 1) }}%
                                    </span>
                                @endif
                            </div>
                        </li>
                    @endforeach
                </ol>
            @endif
        </div>
    </div>

    {{-- Per-tenant snapshot matrix --}}
    <div class="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-2">
        <div class="px-5 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h3 class="font-semibold text-gray-900 dark:text-white">Per-tenant snapshot</h3>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Sorted by current-month fees · mix score colour-coded</p>
        </div>
        <table class="w-full text-sm">
            <thead class="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <tr>
                    <th class="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">#</th>
                    <th class="px-4 py-2 text-left font-semibold text-gray-700 dark:text-gray-200">Tenant</th>
                    <th class="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-200">This month</th>
                    <th class="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-200">Projected</th>
                    <th class="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-200">Last month</th>
                    <th class="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-200">Δ</th>
                    <th class="px-4 py-2 text-right font-semibold text-gray-700 dark:text-gray-200">Orders</th>
                    <th class="px-4 py-2 text-center font-semibold text-gray-700 dark:text-gray-200">Mix score</th>
                    <th class="px-4 py-2 text-center font-semibold text-gray-700 dark:text-gray-200">Paid</th>
                    <th class="px-4 py-2 text-center font-semibold text-gray-700 dark:text-gray-200">Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-gray-800">
                @foreach ($snapshot as $i => $row)
                    <tr class="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td class="px-4 py-2 text-gray-400 dark:text-gray-500 text-xs font-mono">{{ $i + 1 }}</td>
                        <td class="px-4 py-2">
                            <div class="font-medium text-gray-900 dark:text-white">{{ $row['name'] }}</div>
                            <div class="text-xs text-gray-500 dark:text-gray-400">{{ $row['tenant_key'] }}</div>
                        </td>
                        <td class="px-4 py-2 text-right font-semibold text-gray-900 dark:text-white">£{{ number_format($row['current_total'], 2) }}</td>
                        <td class="px-4 py-2 text-right text-purple-600 dark:text-purple-300">£{{ number_format($row['projected_total'], 2) }}</td>
                        <td class="px-4 py-2 text-right text-gray-500 dark:text-gray-400">£{{ number_format($row['previous_total'], 2) }}</td>
                        <td class="px-4 py-2 text-right {{ $deltaColor($row['delta_pct']) }} font-medium">
                            @if ($row['delta_pct'] !== null)
                                {{ $row['delta_pct'] >= 0 ? '+' : '' }}{{ number_format($row['delta_pct'], 1) }}%
                            @else
                                <span class="text-xs text-gray-500">new</span>
                            @endif
                        </td>
                        <td class="px-4 py-2 text-right text-gray-600 dark:text-gray-300">{{ number_format($row['orders']) }}</td>
                        <td class="px-4 py-2">
                            @if ($row['mix_score'] !== null)
                                <div class="flex items-center gap-2 justify-center">
                                    <span class="{{ $mixColor($row['mix_score']) }} font-semibold w-10 text-right">{{ number_format($row['mix_score'], 0) }}%</span>
                                    <div class="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div class="h-full rounded-full {{ $mixBg($row['mix_score']) }}" style="width: {{ min(100, $row['mix_score']) }}%"></div>
                                    </div>
                                </div>
                            @else
                                <span class="text-gray-500 text-xs">—</span>
                            @endif
                        </td>
                        <td class="px-4 py-2 text-center">
                            @if ($row['current_total'] > 0)
                                @if ($row['is_paid'])
                                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-400">Paid</span>
                                    @if ($row['paid_at'])
                                        <div class="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">{{ $row['paid_at'] }}</div>
                                    @endif
                                @else
                                    <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-400">Unpaid</span>
                                @endif
                            @else
                                <span class="text-xs text-gray-500">—</span>
                            @endif
                        </td>
                        <td class="px-4 py-2 text-center">
                            @if ($row['report_id'])
                                @if ($row['is_paid'])
                                    <x-filament::button wire:click="markUnpaid({{ $row['report_id'] }})" wire:confirm="Mark this as unpaid?" color="gray" size="xs">Unmark</x-filament::button>
                                @else
                                    <x-filament::button wire:click="markPaid({{ $row['report_id'] }})" wire:confirm="Mark this as paid?" color="success" size="xs">Mark Paid</x-filament::button>
                                @endif
                            @else
                                <span class="text-xs text-gray-500">—</span>
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
        @if (count($snapshot) === 0)
            <div class="py-12 text-center text-gray-400 dark:text-gray-600">No tenant fee reports yet.</div>
        @endif
    </div>

    <p class="text-xs text-gray-500 dark:text-gray-400 mt-3">
        <strong>Mix score</strong> = share of orders with a non-scratch game (10p fee).
        Higher score → more platform revenue per order.
        Red &lt; 30%, amber 30–60%, green ≥ 60%.
    </p>

</x-filament-panels::page>
