function calculateMetrics() {
    // Get input values arrivalRate landa y service rate mu
    const arrivalRate = parseFloat(document.getElementById('arrivalRate').value);
    const serviceRate = parseFloat(document.getElementById('serviceRate').value);
    if (arrivalRate > serviceRate) {
        return;
    }
    // Check if input values are valid
    if (isNaN(arrivalRate) || isNaN(serviceRate) || arrivalRate <= 0 || serviceRate <= 0) {
        alert('Por favor, ingresa tasas de llegada y servicio válidas.');
        return;
    }

    // Calculate metrics
    const utilization = arrivalRate / serviceRate;
    const emptySystemProbability = 1 - utilization;
    const oneCustomerProbability = utilization * (1 - utilization);
    const expectedCustomersInQueue = (utilization * utilization) / (1 - utilization);
    const expectedCustomersInSystem = utilization / (1 - utilization); // L
    const expectedTimeInQueue = expectedCustomersInQueue / arrivalRate;
    const expectedTimeInSystem = expectedCustomersInSystem / arrivalRate;
    const pw = arrivalRate / serviceRate;

    // Display results in modal
    displayResults(`
        <h3>Resultados:</h3>
        <p>Factor de Utilización (ρ): ${utilization.toFixed(4)}</p>
        <p>Probabilidad de encontrar el sistema vacío (P₀): ${emptySystemProbability.toFixed(4)}</p>
        <p>Probabilidad de encontrar 1 cliente en el sistema (P₁): ${oneCustomerProbability.toFixed(4)}</p>
        <p>Número esperado de clientes en la cola (Lq): ${expectedCustomersInQueue.toFixed(4)}</p>
        <p>Número esperado de clientes en el sistema (L): ${expectedCustomersInSystem.toFixed(4)}</p>
        <p>Tiempo esperado de clientes en la cola (Wq): ${expectedTimeInQueue.toFixed(4)} horas</p>
        <p>Tiempo esperado de clientes en el sistema (W): ${expectedTimeInSystem.toFixed(4)} horas</p>
        <p>Probabilidad de que una unidad que llega no tenga que esperar (Pw): ${pw.toFixed(4)}</p>
    `);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////

function calculate() {
    // Obtener valores de entrada
    const arrivalRate = parseFloat(document.getElementById('arrival-rate').value);
    const serviceRate = parseFloat(document.getElementById('service-rate').value);
    const numServers = parseInt(document.getElementById('num-servers').value);

    // Calcular utilización del sistema (rho)
    const rho = (arrivalRate / (serviceRate * numServers));

    // Calcular probabilidad de encontrar el sistema vacío (P0)
    const P0 = 1 / calculateSum(rho, numServers);

    // Calcular número promedio de procesos en la cola (Lq)
    const Lq = (P0 * Math.pow((arrivalRate / serviceRate), numServers) * rho) /
               (factorial(numServers) * Math.pow((1 - rho), 2));

     
 
 



    // Calcular tiempo promedio que un proceso pasa en la cola (Wq)
    const Wq = Lq / arrivalRate;

    // Calcular tiempo promedio que un proceso pasa en el sistema (W)
    const W = Wq + 1/serviceRate;
    const L = (arrivalRate * W) / (1 - rho)*0.1;

    // Mostrar resultados en modal
    displayResults(`
        <h3>Resultados:</h3>
        <p>Utilización del sistema (ρ): ${rho.toFixed(4)}</p>
        <p>Probabilidad de encontrar el sistema vacío (P₀): ${P0.toFixed(4)}</p>
        <p>Número promedio de procesos en la cola (Lq): ${Lq.toFixed(4)}</p>
        <p>Número promedio de procesos en el sistema (L): ${L.toFixed(4)}</p>
        <p>Tiempo promedio que un proceso pasa en la cola (Wq): ${Wq.toFixed(4)} horas</p>
        <p>Tiempo promedio que un proceso pasa en el sistema (W): ${W.toFixed(4)} horas</p>
    `);
}

function calculateSum(rho, numServers) {
    let sum = 0;
    for (let k = 0; k < numServers; k++) {
        sum += Math.pow(rho * numServers, k) / factorial(k);
    }
    sum += Math.pow(rho * numServers, numServers) / (factorial(numServers) * (1 - rho));
    return sum;
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}

function displayResults(resultMessage) {
    // Mostrar resultados en modal
    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = resultMessage;

    // Mostrar el modal
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

function closeModal() {
    // Cerrar el modal
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}
