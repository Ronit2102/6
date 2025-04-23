document.getElementById("regForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const age = document.getElementById("age").value.trim();
  const event = document.getElementById("event").value;
  const msg = document.getElementById("msg");

  if (!name || !email || !phone || !age) {
    msg.style.color = "red";
    msg.textContent = "All fields are required.";
    return;
  }

  try {
    const res = await fetch("/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, age, event })
    });

    if (res.status === 201) {
      msg.style.color = "green";
      msg.textContent = "Registration successful!";
      document.getElementById("regForm").reset();
      loadUsers();
    } else {
      const text = await res.text();
      msg.style.color = "red";
      msg.textContent = text;
    }
  } catch (err) {
    msg.style.color = "red";
    msg.textContent = "Server error";
  }
});

async function loadUsers() {
  const res = await fetch("/users");
  const users = await res.json();
  const list = document.getElementById("userList");
  list.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.name} (Age: ${user.age}) - ${user.email} - ${user.event}`;
    list.appendChild(li);
  });
}

document.getElementById("clearBtn").addEventListener("click", () => {
  document.getElementById("regForm").reset();
  document.getElementById("msg").textContent = "";
});
