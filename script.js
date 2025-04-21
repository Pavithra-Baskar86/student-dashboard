if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }
  
  const studentForm = document.getElementById("studentForm");
  const studentTableBody = document.getElementById("studentTableBody");
  const studentCount = document.getElementById("studentCount");
  const maleCount = document.getElementById("maleCount");
  const femaleCount = document.getElementById("femaleCount");
  
  let students = JSON.parse(localStorage.getItem("students")) || [];
  
  studentForm.addEventListener("submit", function (e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const roll = document.getElementById("roll").value;
    const gender = document.getElementById("gender").value;
    const course = document.getElementById("course").value;

    students.push({ name, roll, gender,course });
    saveData();
    updateTable();
    studentForm.reset();
  });
  
  function updateTable() {
    studentTableBody.innerHTML = "";
    let males = 0, females = 0;
  
    students.forEach((student, index) => {
      if (student.gender === "Male") males++;
      if (student.gender === "Female") females++;
  
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.roll}</td>
        <td>${student.gender}</td>
        <td>${student.course}</td>

        <td><button onclick="deleteStudent(${index})">Delete</button></td>
      `;
      studentTableBody.appendChild(row);
    });
  
    studentCount.textContent = students.length;
    maleCount.textContent = males;
    femaleCount.textContent = females;
  }
  
  function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
      students.splice(index, 1);
      saveData();
      updateTable();
    }
  }
  
  function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
  }
  
  function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
  }
  
  updateTable();