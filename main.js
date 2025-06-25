function sortearTimes() {
  const input = document.getElementById('playerInput').value;
  const players = input
    .split('\n')
    .map((line) => line.replace(/^\d+\.\s*/, '').trim()) // remove número do início
    .filter((name) => name.length > 0); // remove linhas vazias

  if (players.length < 2) {
    alert("Adicione pelo menos 2 jogadores.");
    return;
  }

  const embaralhado = players.sort(() => Math.random() - 0.5);
  const teamsContainer = document.getElementById('teamsContainer');
  teamsContainer.innerHTML = '';

  const teamSize = 6;
  let timeNumero = 1;

  for (let i = 0; i < embaralhado.length; i += teamSize) {
    const time = embaralhado.slice(i, i + teamSize);
    const div = document.createElement('div');
    div.className = 'team';
    div.innerHTML = `
      <h3>Time ${timeNumero++}</h3>
      <ul>${time.map(p => `<li>${p}</li>`).join('')}</ul>
    `;
    teamsContainer.appendChild(div);
  }
}
