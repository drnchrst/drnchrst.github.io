const form = document.querySelector('#contact-form');
const successMessage = document.querySelector('#contact-success');
const errorMessage = document.querySelector('#contact-error');
const submitButton = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  successMessage.hidden = true;
  errorMessage.hidden = true;
  submitButton.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) {
      errorMessage.hidden = false;
      return;
    }

    form.reset();
    successMessage.hidden = false;
  } catch (error) {
    console.error('Contact form submission failed:', error);
    errorMessage.hidden = false;
  } finally {
    submitButton.disabled = false;
  }
});
