<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background: linear-gradient(135deg, #6A3FF4 0%, #FF9900 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #e0e0e0;
            border-radius: 0 0 8px 8px;
        }
        .field {
            margin-bottom: 20px;
        }
        .field-label {
            font-weight: bold;
            color: #6A3FF4;
            margin-bottom: 5px;
        }
        .field-value {
            background: white;
            padding: 12px;
            border-radius: 4px;
            border: 1px solid #e0e0e0;
        }
        .message-box {
            background: white;
            padding: 15px;
            border-left: 4px solid #6A3FF4;
            margin-top: 10px;
            white-space: pre-wrap;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 style="margin: 0;">New Contact Form Submission</h1>
        <p style="margin: 10px 0 0 0;">Competition Engine</p>
    </div>

    <div class="content">
        <div class="field">
            <div class="field-label">Name:</div>
            <div class="field-value">{{ $submission->first_name }} {{ $submission->last_name }}</div>
        </div>

        <div class="field">
            <div class="field-label">Email:</div>
            <div class="field-value">
                <a href="mailto:{{ $submission->email }}">{{ $submission->email }}</a>
            </div>
        </div>

        <div class="field">
            <div class="field-label">Phone:</div>
            <div class="field-value">
                <a href="tel:{{ $submission->phone }}">{{ $submission->phone }}</a>
            </div>
        </div>

        <div class="field">
            <div class="field-label">Message:</div>
            <div class="message-box">{{ $submission->message }}</div>
        </div>

        <div class="field">
            <div class="field-label">Submitted:</div>
            <div class="field-value">{{ $submission->created_at->format('F j, Y \a\t g:i A') }}</div>
        </div>

    </div>

    <div class="footer">
        <p>This is an automated message from Competition Engine contact form.</p>
        <p>View submission in admin: <a href="{{ url('/admin/contact-submissions/' . $submission->id) }}">Click here</a></p>
    </div>
</body>
</html>