
// GET DOM ELEMENTS
let empTable    = document.querySelector('#employees')
let empCount    = document.querySelector('#empCount')

import { loadEmployeeData } from './modules/init.js'

async function buildGrid() {
    try {
        const employees = await loadEmployeeData()
        empTable.lastElementChild.remove()
        let tbody = document.createElement('tbody')
        for (const [id, employee] of Object.entries(employees)) {
            tbody.innerHTML += 
            `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.extension}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td><button class="btn btn-sm btn-danger delete" data-id="${id}">X</button></td>
            </tr>
            `
        }
        empTable.appendChild(tbody);
        empCount.value = `(${Object.keys(employees).length})`
    } catch (error) {
        console.error('Error building grid:', error)
    }
}

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure you want to delete this employee?')) {
            const id = e.target.dataset.id
            deleteEmployee(id)
            e.target.closest('tr').remove()
        }
    }
})
function deleteEmployee(id) {
    delete employees[id]
}
buildGrid()