// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/";
const COHORT = "2507-FTB-ET-WEB-FT";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
let parties = [];
let selectedParty = null;

// === Fetch Events ===
async function getParties() {
  try {
    const response = await fetch(API);
    const data = await response.json();
    parties = data.data;
  } catch (err) {
    console.error("Error fetching parties:", err);
  }
}

// === Fetch One Event ===
async function getParty(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    const json = await res.json();
    selectedParty = json.data;
    render();
  } catch (err) {
    console.error("Error fetching party:", err);
  }
}

// === Components ===

/** Party name that shows more details about the parties when clicked */

function PartyListItem(party) {
  const $li = document.createElement("li");
  const $a = document.createElement("a");
  $a.href = "#";
  $a.textContent = party.name;

  $a.addEventListener("click", (e) => {
    e.preventDefault();
    getParty(party.id);
  });

  $li.appendChild($a);
  return $li;
}

/** A list of names of all parties */
function PartyList() {
  const $ul = document.createElement("ul");
  for (let party of parties) {
    $ul.appendChild(PartyListItem(party));
  }
  return $ul;
}


/** Detailed information about the selected party */

function PartyDetails() {
  const $section = document.createElement("section");

  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event.";
    $section.appendChild($p);
    return $section;
  }

  const { name, id, date, location, description } = selectedParty;

  const $title = document.createElement("h3");
  $title.innerHTML = `${name} <span style="font-weight:normal">#${id}</span>`;

  const $date = document.createElement("p");
  $date.textContent = `Date: ${new Date(date).toLocaleString()}`;

  const $loc = document.createElement("p");
  $loc.innerHTML = `<em>${location}</em>`;

  const $desc = document.createElement("p");
  $desc.textContent = description;

  $section.append($title, $date, $loc, $desc);
  return $section;
}

// === Render ===
function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <div id="party-list"></div>
      </section>
      <section>
        <h2>Party Details</h2>
        <div id="party-details"></div>
      </section>
    </main>
  `;

  document.querySelector("#party-list").appendChild(PartyList());
  document.querySelector("#party-details").appendChild(PartyDetails());
}

// === Init ===
async function init() {
  await getParties();
  render();
}

init();
