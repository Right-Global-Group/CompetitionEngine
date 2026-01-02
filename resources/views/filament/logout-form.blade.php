<form id="filament-logout-form" action="/filament-logout" method="POST" style="display: none;">
    @csrf
</form>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Find the logout button and override its behavior
        const logoutButton = document.querySelector('button[wire\\:click*="logout"], a[href*="logout"]');
        if (logoutButton) {
            logoutButton.addEventListener('click', function(e) {
                e.preventDefault();
                document.getElementById('filament-logout-form').submit();
            });
        }
    });
</script>