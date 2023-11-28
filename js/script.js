function calculateMetrics() {
    // Get input values arrivalRate landa y service rate mu
    const arrivalRate = parseFloat(document.getElementById('arrivalRate').value);
    const serviceRate = parseFloat(document.getElementById('serviceRate').value);
    if (arrivalRate>serviceRate){
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
    const expectedCustomersInSystem = utilization / (1 - utilization);// L
    const expectedTimeInQueue = expectedCustomersInQueue / arrivalRate;
    const expectedTimeInSystem = expectedCustomersInSystem / arrivalRate;

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
    `);
}

function calculate() {
    // Obtener valores de entrada
    const arrivalRate = parseFloat(document.getElementById('arrival-rate').value);//landa 
    const serviceRate = parseFloat(document.getElementById('service-rate').value);// mu 
    const numServers = parseInt(document.getElementById('num-servers').value);// numero de servidores
    const costPerServer = parseFloat(document.getElementById('cost-per-server').value);
    const waitingCost = parseFloat(document.getElementById('waiting-cost').value);

    // Realizar cálculos
    const lambdaE = arrivalRate / numServers; /// cantidad de promedio de llegadas al sistema
    const utilization = lambdaE / serviceRate; //esto oculte 
    //const utilization = arrivalRate/serviceRate;
    //const L = arrivalRate/serviceRate-arrivalRate;
    const L = lambdaE / (1 - utilization); // modifique lambdaE por utilization
    const W = L / lambdaE;
    const Lq = (utilization * utilization) / (1 - utilization);
    const Wq = Lq / lambdaE;

    // Calcular el costo total
    const totalCost = (costPerServer * numServers) + (waitingCost * Lq);

    // Métricas adicionales
    const rho = utilization; // Factor de Utilización
    const P0 = 1 / (1 + (Lq / numServers)); // Probabilidad de encontrar el sistema vacío
    const P1 = (utilization ** numServers) * (1 - utilization); // Probabilidad de encontrar 1 cliente en el sistema

    // Mostrar resultados en modal
    displayResults(`
        <h3>Resultados:</h3>
        <p>Utilización del sistema (ρ): ${rho.toFixed(2)}</p>
        <p>Probabilidad de encontrar el sistema vacío (P₀): ${P0.toFixed(4)}</p>
        <p>Probabilidad de encontrar 1 cliente en el sistema (P₁): ${P1.toFixed(4)}</p>
        <p>Número promedio de procesos en la cola (Lq): ${Lq.toFixed(2)}</p>
        <p>Número promedio de procesos en el sistema (L): ${L.toFixed(2)}</p>
        <p>Tiempo promedio que un proceso pasa en la cola (Wq): ${Wq.toFixed(2)} horas</p>
        <p>Tiempo promedio que unproceso pasa en el sistema (W): ${W.toFixed(2)} horas</p>
        <p>Costo total del sistema: $${totalCost.toFixed(2)}</p>
    `);
    // error en lq
    // error en wp 
    // error en w   
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
