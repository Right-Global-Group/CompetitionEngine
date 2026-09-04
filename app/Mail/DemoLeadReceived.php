<?php

namespace App\Mail;

use App\Models\DemoLead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class DemoLeadReceived extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public DemoLead $lead
    ) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New demo request — ' . $this->lead->business,
            replyTo: [$this->lead->email],
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.demo-lead-received',
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
