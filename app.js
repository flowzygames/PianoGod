const synth = new Tone.Synth().toDestination();

function createKeys() {
  const piano = document.getElementById('piano');
  ['C4','D4','E4','F4','G4','A4','B4','C5'].forEach(note => {
    const key = document.createElement('div');
    key.className = 'key';
    key.onclick = () => synth.triggerAttackRelease(note,'8n');
    piano.appendChild(key);
  });
}

function playAudio(){
  const file = document.getElementById('audioFile').files[0];
  const audio = new Audio(URL.createObjectURL(file));
  audio.play();
}

createKeys();