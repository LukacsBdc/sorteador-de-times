const modeSelect = document.getElementById("mode-select");
const namesInputSection = document.getElementById("names-inputs");
const numbersInputSection = document.getElementById("numbers-inputs");
const namesTextarea = document.getElementById("names");
const totalNumbersInput = document.getElementById("total-numbers");
const teamSizeInput = document.getElementById("team-size");
const drawButton = document.getElementById("draw-teams");
const teamsContainer = document.getElementById("teams");

modeSelect.addEventListener("change", () => {
  const mode = modeSelect.value;
  if (mode === "names") {
    namesInputSection.style.display = "block";
    numbersInputSection.style.display = "none";
  } else {
    namesInputSection.style.display = "none";
    numbersInputSection.style.display = "block";
  }
});

drawButton.addEventListener("click", () => {
  const mode = modeSelect.value;
  const teamSize = parseInt(teamSizeInput.value);

  if (isNaN(teamSize) || teamSize < 1) {
    alert("Informe um número válido de jogadores por time.");
    return;
  }

  let items = [];

  if (mode === "names") {
    const names = namesTextarea.value
      .split("\n")
      .map(name => name.trim())
      .filter(name => name !== "");

    if (names.length === 0) {
      alert("Digite ao menos um nome.");
      return;
    }

    items = names;
  } else {
    const total = parseInt(totalNumbersInput.value);
    if (isNaN(total) || total < 1) {
      alert("Informe um número total de jogadores válido.");
      return;
    }

    items = Array.from({ length: total }, (_, i) => (i + 1).toString());
  }

  shuffle(items);

  const teams = [];
  for (let i = 0; i < items.length; i += teamSize) {
    teams.push(items.slice(i, i + teamSize));
  }

  displayTeams(teams);
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayTeams(teams) {
  teamsContainer.innerHTML = "";

  teams.forEach((team, index) => {
    const teamDiv = document.createElement("div");
    teamDiv.classList.add("team");

    const teamTitle = document.createElement("h3");
    teamTitle.textContent = `Time ${index + 1}`;
    teamDiv.appendChild(teamTitle);

    const ul = document.createElement("ul");
    team.forEach(player => {
      const li = document.createElement("li");
      li.textContent = player;
      ul.appendChild(li);
    });

    teamDiv.appendChild(ul);
    teamsContainer.appendChild(teamDiv);
  });
}
