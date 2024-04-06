console.log("hey i am script");

const BASE_URL = 'http://localhost:3000';


const fetchData = async () => {
    try {
        const res = await fetch(`${BASE_URL}/fetchData`);
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        const { data } = await res.json();
        populateTable(data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
// fetchData();

const populateTable = (data) => {
    const tableBody = document.querySelector('.table table tbody');
    const totalElement = document.getElementById('total');
    tableBody.innerHTML = ''; // Clear existing table rows

    let total = 0;

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.category}</td>
            <td>${item.amount}</td>
            <td>${item.info}</td>
            <td>${new Date(item.date).toISOString().split('T')[0]}</td>
            <td>
            <button type="button" class="ubuntu-regular table-btn" onclick="deleteItem('${item._id}')">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);

        // Update total based on income and expense categories
        if (item.category === 'income') {
            total += parseFloat(item.amount);
        } else if (item.category === 'expense') {
            total -= parseFloat(item.amount);
        }
    });

    // Update total element
    totalElement.textContent = total.toFixed(2);
}

const deleteItem = async (itemId) => {
    try {
        const res = await fetch(`${BASE_URL}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ _id: itemId })
        });
        if (!res.ok) {
            throw new Error('Failed to delete item');
        }
        // If deletion is successful, refetch data and repopulate the table
        fetchData();
    } catch (error) {
        console.error('Error deleting item:', error);
    }
}



fetchData()
