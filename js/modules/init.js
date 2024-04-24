export async function loadEmployeeData() {
    try {
      const response = await fetch('../data/employees.json')
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error loading data:', error)
      return null
    }
  }