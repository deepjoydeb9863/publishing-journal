const apiUrl = 'http://localhost:5000/api';
let token = '';

async function register() {
  const email = document.getElementById('registerEmail').value;
  const password = document.getElementById('registerPassword').value;
  const res = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  alert((await res.json()).message);
}

async function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.token) {
    token = data.token;
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('journal-section').style.display = 'block';
    fetchJournals();
  } else {
    alert(data.message || 'Login failed');
  }
}

async function submitJournal() {
  const title = document.getElementById('journalTitle').value;
  const content = document.getElementById('journalContent').value;
  const res = await fetch(`${apiUrl}/journals/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ title, content })
  });
  const journal = await res.json();
  alert('Journal submitted');
  fetchJournals();
}

async function fetchJournals() {
  const res = await fetch(`${apiUrl}/journals/all`);
  const journals = await res.json();
  const container = document.getElementById('journals');
  container.innerHTML = '';
  journals.forEach(j => {
    container.innerHTML += `
      <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
        <h3>${j.title}</h3>
        <p>${j.content}</p>
        <small>By: ${j.authorId?.email || 'Unknown'} | ${new Date(j.createdAt).toLocaleString()}</small>
      </div>`;
  });
}
