// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// Pre-fill product dropdown from URL query param (?product=slug)
const params = new URLSearchParams(window.location.search);
const productParam = params.get('product');
const productSelect = document.getElementById('product');
if (productParam && productSelect) {
  productSelect.value = productParam;
}

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusEl = document.getElementById('formStatus');
    const data = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      product: document.getElementById('product').value,
      message: document.getElementById('message').value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok) {
        window.location.href = 'thank-you.html';
      } else {
        statusEl.textContent = result.error || 'Something went wrong. Please try again.';
        statusEl.style.color = 'red';
      }
    } catch (err) {
      statusEl.textContent = 'Network error. Please check your connection.';
      statusEl.style.color = 'red';
    }
  });
}
