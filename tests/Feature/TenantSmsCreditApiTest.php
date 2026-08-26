<?php

namespace Tests\Feature;

use App\Models\Tenant;
use App\Models\TenantSmsCredit;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TenantSmsCreditApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        config(['hub.api_key' => 'hub-key-123']);
    }

    public function test_a_valid_report_upserts_the_tenant_row(): void
    {
        $this->postJson('/api/sms-credit/report', [
            'tenant_key'     => 'ritas',
            'balance'        => 42.5,
            'portal_balance' => 40.0,
            'cost_per_part'  => 0.036,
            'anchor_at'      => '2026-08-25T10:00:00+01:00',
        ], ['X-Hub-Api-Key' => 'hub-key-123'])
            ->assertOk()
            ->assertJson(['success' => true]);

        $row = TenantSmsCredit::where('tenant_key', 'ritas')->firstOrFail();
        $this->assertSame('42.5000', $row->balance);
        $this->assertSame('40.0000', $row->portal_balance);
        $this->assertNotNull($row->reported_at);
        $this->assertTrue(Tenant::where('tenant_key', 'ritas')->exists());

        // Second report replaces, never duplicates
        $this->postJson('/api/sms-credit/report', [
            'tenant_key' => 'ritas',
            'balance'    => 30.0,
        ], ['X-Hub-Api-Key' => 'hub-key-123'])->assertOk();

        $this->assertSame(1, TenantSmsCredit::where('tenant_key', 'ritas')->count());
        $this->assertSame('30.0000', TenantSmsCredit::where('tenant_key', 'ritas')->value('balance'));
    }

    public function test_a_missing_or_wrong_api_key_is_rejected(): void
    {
        $this->postJson('/api/sms-credit/report', ['tenant_key' => 'ritas', 'balance' => 1])
            ->assertStatus(401);

        $this->postJson('/api/sms-credit/report', ['tenant_key' => 'ritas', 'balance' => 1], ['X-Hub-Api-Key' => 'wrong'])
            ->assertStatus(401);

        $this->assertSame(0, TenantSmsCredit::count());
    }

    public function test_estimated_messages_left_uses_balance_and_cost_per_part(): void
    {
        $credit = new TenantSmsCredit([
            'balance'       => 10.0,
            'cost_per_part' => 0.036,
        ]);

        $this->assertSame(277, $credit->estimatedMessagesLeft());
        $this->assertNull((new TenantSmsCredit(['balance' => 10.0]))->estimatedMessagesLeft());
        $this->assertNull((new TenantSmsCredit(['cost_per_part' => 0.036]))->estimatedMessagesLeft());
    }
}
