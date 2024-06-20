// Passagiers array met objecten, inclusief telefoonnummer
let passengers = [
    // Object voor elke passagier met kaartnummer, naam, saldo, stad, incheckstatus en telefoonnummer
    { cardNumber: 163821, name: "Leo Daams", balance: 34, city: "Den Bosch", checkedIn: false, phone: "0612345678" },
    { cardNumber: 145032, name: "Nicole Hops", balance: 18, city: "Maastricht", checkedIn: false, phone: "0698765432" }
];

const stations = {
    'Amsterdam Centraal': 2.90,
    'Amsterdam Zuid': 2.80,
    'Amsterdam Sloterdijk': 2.70,
    'Utrecht Centraal': 3.20,
    'Utrecht Overvecht': 3.10,
    'Den Bosch': 3.60,
    'Den Bosch Oost': 3.50,
    'Maastricht': 4.10,
    'Maastricht Randwyck': 4.00,
    'Rotterdam Centraal': 3.30,
    'Rotterdam Blaak': 3.20,
    'Eindhoven Centraal': 3.00,
    'Eindhoven Strijp-S': 2.90,
    'Groningen': 3.70,
    'Groningen Europapark': 3.60,
    'Nijmegen': 3.40,
    'Nijmegen Dukenburg': 3.30,
    'Arnhem Centraal': 3.50,
    'Arnhem Presikhaaf': 3.40,
    'Leiden Centraal': 3.10,
    'Leiden Lammenschans': 3.00,
    'Haarlem': 2.80,
    'Haarlem Spaarnwoude': 2.70,
    // Voeg meer stations toe naar wens
};

// Genereert HTML-opties voor elk station voor de dropdown-menu's
function generateStationOptions() {
    // Maakt een array van stationsopties en voegt ze samen tot een enkele string
    return Object.keys(stations).map(station => `<option value="${station}">${station}</option>`).join('');
}

// Functie om berichten te tonen in de console
function showConsoleMessage(message) {
    const consoleElement = document.querySelector('.console-scroll');
    if (consoleElement) {
        // Maakt een nieuw div-element voor elk console bericht
        const messageDiv = document.createElement('span');
        messageDiv.className = 'console-log';
        messageDiv.textContent = message;
        consoleElement.appendChild(messageDiv);
    }
}

// Wisselt de incheckstatus van een passagier en berekent de reiskosten
function toggleCheckInOrOut(cardNumber) {
    // Vindt het select-element voor het gekozen station
    const stationSelect = document.getElementById(`station-select-${cardNumber}`);
    // Controleert of het select-element bestaat
    if (stationSelect) {
        // Haalt het geselecteerde station uit het dropdown-menu
        const station = stationSelect.value;
        // Vindt de passagier met het meegegeven kaartnummer
        const passenger = passengers.find(p => p.cardNumber === cardNumber);
        // Controleert of de passagier bestaat en het station geldig is
        if (passenger && stations.hasOwnProperty(station)) {
            // Als de passagier niet ingecheckt is, check dan in
            if (!passenger.checkedIn) {
                passenger.checkedIn = true;
                passenger.lastCheckInStation = station;
                showConsoleMessage(`${passenger.name} heeft ingecheckt bij ${station}.`);
            } else {
                // Anders, check uit en bereken de reiskosten
                const travelCost = Math.abs(stations[station] - stations[passenger.lastCheckInStation]);
                passenger.balance -= travelCost;
                passenger.checkedIn = false;
                showConsoleMessage(`${passenger.name} heeft uitgecheckt bij ${station}. Tarief: €${travelCost.toFixed(2)}, Nieuw saldo: €${passenger.balance.toFixed(2)}`);
            }
            // Werk de passagierslijst bij
            updatePassengerList();
        } else {
            console.log('Actie mislukt. Kaartnummer niet gevonden of station niet geselecteerd.');
        }
    }
}

// Werkt de weergave van de passagierslijst bij in de DOM
function updatePassengerList() {
    // Vindt het element voor de passagierslijst
    const passengerListElement = document.getElementById('passengerList');
    // Stelt de HTML in voor de passagierslijst gebaseerd op de passagiersgegevens
    passengerListElement.innerHTML = passengers.map(passenger => `
      <li class="passenger">
        <span>${passenger.name}</span> - 
        <span>Saldo: €${passenger.balance.toFixed(2)}</span> - 
        <span>${passenger.city}</span> - 
        <span>Telefoon: ${passenger.phone}</span>
        <select id="station-select-${passenger.cardNumber}" onchange="toggleCheckInOrOut(${passenger.cardNumber})">
          <option value="">Selecteer Station</option>
          ${generateStationOptions()}
        </select>
      </li>
    `).join('');
}

// Voegt een event listener toe die de passagierslijst bijwerkt wanneer het document geladen is
document.addEventListener('DOMContentLoaded', updatePassengerList);
