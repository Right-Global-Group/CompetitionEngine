<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New demo request</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #f4a558 0%, #d97aa8 55%, #5b7fc4 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border: 1px solid #e0e0e0; border-radius: 0 0 8px 8px; }
        table { width: 100%; border-collapse: collapse; }
        th { text-align: left; color: #6A3FF4; padding: 8px 10px 8px 0; vertical-align: top; width: 38%; }
        td { padding: 8px 0; vertical-align: top; }
        tr + tr th, tr + tr td { border-top: 1px solid #e6e6e6; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0;">New demo request</h1>
        <p style="margin: 8px 0 0;">{{ $lead->business }}</p>
    </div>
    <div class="content">
        <table>
            <tr><th>Name</th><td>{{ $lead->name }}</td></tr>
            <tr><th>Business / site</th><td>{{ $lead->business }}</td></tr>
            <tr><th>Email</th><td><a href="mailto:{{ $lead->email }}">{{ $lead->email }}</a></td></tr>
            <tr><th>Phone</th><td><a href="tel:{{ $lead->phone }}">{{ $lead->phone }}</a></td></tr>
            <tr><th>Current platform</th><td>{{ $lead->current_platform }}</td></tr>
            <tr><th>Monthly orders</th><td>{{ $lead->monthly_orders }}</td></tr>
            @if($lead->package)
                <tr><th>Package chosen</th><td>{{ $lead->package }}</td></tr>
            @endif
            @if($lead->utm_source || $lead->utm_campaign || $lead->gclid || $lead->fbclid)
                <tr><th>Source</th><td>
                    {{ trim(implode(' / ', array_filter([$lead->utm_source, $lead->utm_medium, $lead->utm_campaign, $lead->utm_content, $lead->utm_term]))) ?: '—' }}
                    @if($lead->gclid)<br><small>gclid: {{ $lead->gclid }}</small>@endif
                    @if($lead->fbclid)<br><small>fbclid: {{ $lead->fbclid }}</small>@endif
                </td></tr>
            @endif
            @if($lead->landing_variant)
                <tr><th>Landing variant</th><td>{{ $lead->landing_variant }}</td></tr>
            @endif
            <tr><th>Submitted</th><td>{{ $lead->created_at->format('D j M Y, H:i') }}</td></tr>
        </table>
    </div>
    <div class="footer">
        Sent from the CompEngine homepage demo form. Leads are also listed in the admin under Demo Leads.
    </div>
</body>
</html>
