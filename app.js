let synth = new Tone.Synth().toDestination();
let analyser = new Tone.Analyser("fft",64);
synth.connect(analyser);

const notes=["C4","D4","E4","F4","G4","A4","B4","C5"];

function createKeys(){
 const piano=document.getElementById("piano");
 piano.innerHTML="";
 notes.forEach(note=>{
  const key=document.createElement("div");
  key.className="key";
  key.innerText=note;
  key.onmousedown=()=>{
   key.style.background="#6c8cff";
   synth.triggerAttack(note);
  };
  key.onmouseup=()=>{
   key.style.background="white";
   synth.triggerRelease();
  };
  piano.appendChild(key);
 });
}

createKeys();

let audio;

document.getElementById("playAudioBtn").onclick=()=>{
 const file=document.getElementById("audioFile").files[0];
 if(!file)return;
 audio=new Audio(URL.createObjectURL(file));
 audio.play();
};

document.getElementById("stopAudioBtn").onclick=()=>{
 if(audio)audio.pause();
};

const canvas=document.getElementById("visualizer");
const ctx=canvas.getContext("2d");

function draw(){
 requestAnimationFrame(draw);
 const values=analyser.getValue();
 ctx.clearRect(0,0,canvas.width,canvas.height);
 values.forEach((v,i)=>{
  ctx.fillStyle="#6c8cff";
  ctx.fillRect(i*6,canvas.height-Math.abs(v)*2,4,Math.abs(v)*2);
 });
}

draw();