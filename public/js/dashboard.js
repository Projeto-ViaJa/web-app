
document.addEventListener('DOMContentLoaded', function() {
    const visitantesData = {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
            label: 'Visitantes',
            data: [1200, 1500, 1800, 2000, 2200, 2500],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            tension: 0.1
        }]
    };

    const receitaData = {
        labels: ['Destino A', 'Destino B', 'Destino C', 'Destino D'],
        datasets: [{
            label: 'Receita (R$)',
            data: [50000, 75000, 60000, 80000],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
        }]
    };

    const tendenciasData = {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [{
            label: 'Crescimento (%)',
            data: [5, 10, 15, 20, 25],
            fill: false,
            borderColor: 'rgba(153, 102, 255, 1)',
            tension: 0.1
        }]
    };

    const investimentosData = {
        labels: ['Hotelaria', 'Transporte', 'Alimentação', 'Entretenimento'],
        datasets: [{
            label: 'Investimento Recomendado (%)',
            data: [30, 25, 20, 25],
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
        }]
    };
    new Chart(document.getElementById('chart-visitantes'), {
        type: 'line',
        data: visitantesData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Visitantes por Mês'
                }
            }
        }
    });

    new Chart(document.getElementById('chart-receita'), {
        type: 'bar',
        data: receitaData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Receita por Destino'
                }
            }
        }
    });

    new Chart(document.getElementById('chart-tendencias'), {
        type: 'line',
        data: tendenciasData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Tendências de Mercado'
                }
            }
        }
    });

    new Chart(document.getElementById('chart-investimentos'), {
        type: 'doughnut',
        data: investimentosData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Investimentos Recomendados'
                }
            }
        }
    });
});
