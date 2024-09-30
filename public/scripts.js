$(document).ready(function() {
    $('#password').on('input', function() {
      const password = $(this).val();
      let score = 0;
  
      if (password.length >= 8) score += 25;
      if (/[A-Z]/.test(password)) score += 25;
      if (/[a-z]/.test(password)) score += 25;
      if (/[0-9]/.test(password)) score += 25;
      if (/[^A-Za-z0-9]/.test(password)) score += 25;
  
      $('#password-strength').text(`Strength: ${score}%`);
    });
  });
  