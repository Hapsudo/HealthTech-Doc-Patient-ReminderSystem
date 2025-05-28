const form = document.getElementById('appointment-form');
const list = document.getElementById('appointments-list');
const API_URL = 'http://localhost:5000/api/appointments'; // Your backend API endpoint

// Fetch and display all appointments
async function fetchAppointments() {
  list.innerHTML = 'Loading...';
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    if (data.length === 0) {
      list.innerHTML = '<li>No appointments yet</li>';
      return;
    }
    list.innerHTML = data.map((app, i) => `
      <li style="--order: ${i}">
        <strong>${app.name}</strong><br />
        ${app.email} — ${new Date(app.datetime).toLocaleString()}
      </li>
    `).join('');
  } catch (error) {
    list.innerHTML = '<li>Error loading appointments</li>';
    console.error(error);
  }
}

// Handle form submission to create new appointment
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const appointment = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    datetime: form.datetime.value
  };

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment)
    });

    if (!res.ok) throw new Error('Failed to create appointment');

    form.reset();
    fetchAppointments(); // Refresh list
  } catch (error) {
    alert('Error: ' + error.message);
    console.error(error);
  }
});

// Initial load
fetchAppointments();
