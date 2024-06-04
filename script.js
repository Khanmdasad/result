const dataUrl = "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";
let studentData = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            studentData = data;
            renderTable(studentData);
        });

    document.getElementById("searchButton").addEventListener("click", () => searchTable());
    document.getElementById("searchInput").addEventListener("input", () => searchTable());
    document.getElementById("sortAZ").addEventListener("click", () => sortTable('az'));
    document.getElementById("sortZA").addEventListener("click", () => sortTable('za'));
    document.getElementById("sortByMarks").addEventListener("click", () => sortTable('marks'));
    document.getElementById("sortByPassing").addEventListener("click", () => sortTable('passing'));
    document.getElementById("sortByClass").addEventListener("click", () => sortTable('class'));
    document.getElementById("sortByGender").addEventListener("click", () => sortTable('gender'));
});

function renderTable(data) {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";
    data.forEach(student => {
        const row = `<tr>
            <td>${student.id}</td>
            <td><img src="${student.img_src}" alt="Student Image" width="50" height="50"> ${student.first_name} ${student.last_name}</td>
            <td>${student.email}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? "Passing" : "Failed"}</td>
            <td>${student.gender}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}

function searchTable() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filteredData = studentData.filter(student => 
        student.first_name.toLowerCase().includes(query) ||
        student.last_name.toLowerCase().includes(query) ||
        student.email.toLowerCase().includes(query)
    );
    renderTable(filteredData);
}

function sortTable(criteria) {
    let sortedData;
    switch(criteria) {
        case 'az':
            sortedData = [...studentData].sort((a, b) => (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name));
            break;
        case 'za':
            sortedData = [...studentData].sort((a, b) => (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name));
            break;
        case 'marks':
            sortedData = [...studentData].sort((a, b) => a.marks - b.marks);
            break;
        case 'passing':
            sortedData = studentData.filter(student => student.passing);
            break;
        case 'class':
            sortedData = [...studentData].sort((a, b) => a.class - b.class);
            break;
        case 'gender':
            const maleStudents = studentData.filter(student => student.gender === 'Male');
            const femaleStudents = studentData.filter(student => student.gender === 'Female');
            renderGenderTables(maleStudents, femaleStudents);
            return;
        default:
            sortedData = studentData;
    }
    renderTable(sortedData);
}

function renderGenderTables(maleStudents, femaleStudents) {
    const tablesContainer = document.getElementById("tables");
    tablesContainer.innerHTML = `
        <table id="maleTable">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Class</th>
                    <th>Marks</th>
                    <th>Passing</th>
                    <th>Gender</th>
                </tr>
            </thead>
            <tbody id="maleTableBody"></tbody>
        </table>
        <table id="femaleTable">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Class</th>
                    <th>Marks</th>
                    <th>Passing</th>
                    <th>Gender</th>
                </tr>
            </thead>
            <tbody id="femaleTableBody"></tbody>
        </table>
    `;
    renderTableContent(maleStudents, "maleTableBody");
    renderTableContent(femaleStudents, "femaleTableBody");
}

function renderTableContent(data, tableBodyId) {
    const tableBody = document.getElementById(tableBodyId);
    tableBody.innerHTML = "";
    data.forEach(student => {
        const row = `<tr>
            <td></td>
            <td><img src="${student.img_src}" alt="Student Image" width="50" height="50"> ${student.first_name} ${student.last_name}</td>
            <td>${student.email}</td>
            <td>${student.class}</td>
            <td>${student.marks}</td>
            <td>${student.passing ? "Passing" : "Failed"}</td>
            <td>${student.gender}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
}
