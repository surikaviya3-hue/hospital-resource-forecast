// script.js
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

function setTheme(isLight) {
    if (isLight) {
        body.classList.add('light');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

if (localStorage.getItem('theme') === 'light') {
    setTheme(true);
} else {
    setTheme(false);
}

themeToggle.addEventListener('click', () => {
    setTheme(!body.classList.contains('light'));
});

// Initialize Charts
let patientTrendChart, resourcePieChart;

function initializeCharts() {
    // Patient Trend Chart (Line)
    const trendCtx = document.getElementById('patientTrendChart');
    if (trendCtx) {
        patientTrendChart = new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['May 10', 'May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16'],
                datasets: [{
                    label: 'Total Patients',
                    data: [680, 950, 1150, 1220, 1180, 1250, 1480],
                    borderColor: '#38bdf8',
                    backgroundColor: 'rgba(56, 189, 248, 0.1)',
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } },
                    x: { grid: { color: '#334155' }, ticks: { color: '#94a3b8' } }
                }
            }
        });
    }

    // Resource Usage Pie Chart - FIXED
    const pieCtx = document.getElementById('resourcePieChart');
    if (pieCtx) {
        resourcePieChart = new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Beds', 'ICU', 'Oxygen'],
                datasets: [{
                    data: [65, 20, 15],
                    backgroundColor: [
                        '#38bdf8',  // Blue
                        '#f97316',  // Orange
                        '#8b5cf6'   // Purple
                    ],
                    borderWidth: 0,
                    hoverOffset: 12
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#e2e8f0',
                            usePointStyle: true,
                            padding: 15,
                            font: { size: 13 }
                        }
                    }
                }
            }
        });
    }
}

// Prediction Function
async function predictResources() {
    const patient_count = document.getElementById("patient_count").value;
    const disease_type = document.getElementById("disease_type").value;
    const season = document.getElementById("season").value;
    const occupancy_rate = document.getElementById("occupancy_rate").value;
    const available_beds = document.getElementById("available_beds").value;

    if (!patient_count) {
        alert("Please enter Expected Patients");
        return;
    }

    try {
        const response = await fetch("https://hospital-resource-forecast.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                patient_count: parseInt(patient_count),
                disease_type: parseInt(disease_type),
                season: parseInt(season),
                occupancy_rate: parseFloat(occupancy_rate),
                available_beds: parseInt(available_beds)
            })
        });

        const data = await response.json();

        document.getElementById("bedsResult").innerText = data["Beds Required"] || "-";
        document.getElementById("icuResult").innerText = data["ICU Required"] || "-";
        document.getElementById("oxygenResult").innerText = data["Oxygen Required"] || "-";
        document.getElementById("doctorResult").innerText = data["Doctors Required"] || "-";
        document.getElementById("medicineResult").innerText = data["Medicine Units"] || "-";
        document.getElementById("emergencyResult").innerText = data["Emergency Level"] || "-";

    } catch (error) {
        console.error(error);
        alert("Error connecting to backend.");
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
});