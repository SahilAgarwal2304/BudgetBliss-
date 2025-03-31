// frontend/assets/app.js
// Function to calculate budgets based on user input
function calculateBudgets(source) {
    let yearlyBudget = parseFloat(document.getElementById('yearlyBudget').value) || 0;
    let monthlyBudget = parseFloat(document.getElementById('monthlyBudget').value) || 0;
    let weeklyBudget = parseFloat(document.getElementById('weeklyBudget').value) || 0;
    let dailyBudget = parseFloat(document.getElementById('dailyBudget').value) || 0;

    if (source === 'yearly' && yearlyBudget > 0) {
        document.getElementById('monthlyBudget').placeholder = (yearlyBudget / 12).toFixed(2);
        document.getElementById('weeklyBudget').placeholder = (yearlyBudget / 52).toFixed(2);
        document.getElementById('dailyBudget').placeholder = (yearlyBudget / 365).toFixed(2);
    } else if (source === 'monthly' && monthlyBudget > 0) {
        document.getElementById('yearlyBudget').placeholder = (monthlyBudget * 12).toFixed(2);
        document.getElementById('weeklyBudget').placeholder = (monthlyBudget * (365 / 52)).toFixed(2);
        document.getElementById('dailyBudget').placeholder = (monthlyBudget * (365 / 30)).toFixed(2);
    } else if (source === 'weekly' && weeklyBudget > 0) {
        document.getElementById('yearlyBudget').placeholder = (weeklyBudget * (365 / 7)).toFixed(2);
        document.getElementById('monthlyBudget').placeholder = (weeklyBudget * (30 / 7)).toFixed(2);
        document.getElementById('dailyBudget').placeholder = (weeklyBudget * 7).toFixed(2);
    } else if (source === 'daily' && dailyBudget > 0) {
        document.getElementById('yearlyBudget').placeholder = (dailyBudget * 365).toFixed(2);
        document.getElementById('monthlyBudget').placeholder = (dailyBudget * 30).toFixed(2);
        document.getElementById('weeklyBudget').placeholder = (dailyBudget * 7).toFixed(2);
    }
}

// Function to save budgets to local storage or database as needed.
function saveBudgets() {
    let yearlyBudget = parseFloat(document.getElementById('yearlyBudget').value) || parseFloat(document.getElementById('yearlyBudget').placeholder) || 0;
    let monthlyBudget = parseFloat(document.getElementById('monthlyBudget').value) || parseFloat(document.getElementById('monthlyBudget').placeholder) || 0;
    let weeklyBudget = parseFloat(document.getElementById('weeklyBudget').value) || parseFloat(document.getElementById('weeklyBudget').placeholder) || 0;
    let dailyBudget = parseFloat(document.getElementById('dailyBudget').value) || parseFloat(document.getElementById('dailyBudget').placeholder) || 0;

    if (yearlyBudget <= 0 && monthlyBudget <= 0 && weeklyBudget <= 0 && dailyBudget <= 0) {
        alert("❌ Please enter at least one valid budget!");
        return;
    }

    localStorage.setItem('yearlyBudget', yearlyBudget);
    localStorage.setItem('monthlyBudget', monthlyBudget);
    localStorage.setItem('weeklyBudget', weeklyBudget);
    localStorage.setItem('dailyBudget', dailyBudget);

    alert(`✅ Budgets saved successfully!\nYearly: ₹${yearlyBudget}, Monthly: ₹${monthlyBudget}, Weekly: ₹${weeklyBudget}, Daily: ₹${dailyBudget}`);
}

// Function to fetch expenses from the backend API.
function fetchExpenses() {
    fetch('/api/expenses')
        .then(response => response.json())
        .then(data => {
            let list = document.getElementById('expenseList');
            list.innerHTML = '';
            let totalSpending = 0;

            data.forEach(expense => {
                let item = document.createElement('li');
                item.textContent = `${expense.category}: ₹${expense.amount} (${expense.date})`;
                list.appendChild(item);
                totalSpending += parseFloat(expense.amount);
            });

            document.getElementById('totalSpending').textContent = totalSpending.toFixed(2);
        })
        .catch(error => console.error("Error fetching expenses:", error));
}

// Function to filter expenses based on selected category.
function filterExpenses() {
    const filterCategoryValue = document.getElementById("filterCategory").value;
    const allExpensesListItems = document.querySelectorAll("#expenseList li");

    allExpensesListItems.forEach(item => {
        if (filterCategoryValue === "All Categories") {
            item.style.display = "";
        } else {
            const categoryTextContent = item.textContent.split(":")[0];
            item.style.display = categoryTextContent === filterCategoryValue ? "" : "none";
        }
    });
}