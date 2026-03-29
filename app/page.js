<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Imóveis Premium</title>

<style>
body{
  margin:0;
  font-family:Arial;
  background:#f2f2f2;
}

/* TELA INICIAL */
.hero{
  height:100vh;
  display:flex;
  align-items:center;
  justify-content:center;
}

.card{
  background:linear-gradient(135deg,#fff,#eef3ff);
  padding:30px;
  border-radius:20px;
  text-align:center;
  width:320px;
  box-shadow:0 15px 40px rgba(0,0,0,0.1);
}

.card img{
  width:100px;
  height:100px;
  border-radius:50%;
  border:3px solid #0070f3;
}

.btn{
  margin-top:20px;
  padding:15px;
  background:#0070f3;
  color:#fff;
  border:none;
  border-radius:12px;
  width:100%;
  font-weight:bold;
  cursor:pointer;
}

/* IMÓVEIS */
.container{
  display:none;
  padding:20px;
}

.imovel{
  background:#fff;
  border-radius:15px;
  margin-bottom:20px;
  overflow:hidden;
  box-shadow:0 5px 15px rgba(0,0,0,0.1);
}

.carousel{
  position:relative;
  overflow:hidden;
}

.carousel img{
  width:100%;
  display:none;
}

.carousel img.active{
  display:block;
}

/* bolinhas */
.dots{
  text-align:center;
  position:absolute;
  bottom:10px;
  width:100%;
}

.dot{
  height:8px;
  width:8px;
  margin:3px;
  background:#fff;
  border-radius:50%;
  display:inline-block;
  opacity:0.5;
}

.dot.active{
  opacity:1;
}

/* info */
.info{
  padding:15px;
}

.whats{
  display:block;
  margin-top:10px;
  background:green;
  color:#fff;
  text-align:center;
  padding:12px;
  border-radius:10px;
  text-decoration:none;
  font-weight:bold;
}
</style>
</head>

<body>

<!-- TELA INICIAL -->
<div class="hero" id="hero">
  <div class="card">
    <img src="corretor.jpg">
    <h2>Encontre seu imóvel ideal</h2>
    <p>Selecionamos as melhores oportunidades 👇</p>
    <p>⭐ +120 clientes atendidos</p>
    <button class="btn" onclick="entrar()">Ver imóveis</button>
  </div>
</div>

<!-- IMÓVEIS -->
<div class="container" id="app">

  <!-- IMÓVEL 1 -->
  <div class="imovel">
    <div class="carousel" ontouchstart="startTouch(event,0)" ontouchend="endTouch(event,0)">
      <img src="imovel1-1.jpg" class="active">
      <img src="imovel1-2.jpg">
      <img src="imovel1-3.jpg">
      <div class="dots"></div>
    </div>

    <div class="info">
      <h3>Casa moderna</h3>
      <p>💰 R$ 250.000</p>
      <p id="pessoas0">👀 8 pessoas vendo agora</p>
      <a class="whats" href="https://wa.me/5511999999999?text=Tenho%20interesse%20no%20imóvel">
        Falar no WhatsApp
      </a>
    </div>
  </div>

  <!-- IMÓVEL 2 -->
  <div class="imovel">
    <div class="carousel" ontouchstart="startTouch(event,1)" ontouchend="endTouch(event,1)">
      <img src="imovel2-1.jpg" class="active">
      <img src="imovel2-2.jpg">
      <img src="imovel2-3.jpg">
      <div class="dots"></div>
    </div>

    <div class="info">
      <h3>Apartamento</h3>
      <p>💰 R$ 180.000</p>
      <p id="pessoas1">👀 6 pessoas vendo agora</p>
      <a class="whats" href="https://wa.me/5511999999999?text=Tenho%20interesse%20no%20imóvel">
        Falar no WhatsApp
      </a>
    </div>
  </div>

</div>

<script>

/* ENTRAR */
function entrar(){
  document.getElementById("hero").style.display="none";
  document.getElementById("app").style.display="block";
}

/* CARROSSEL */
let index=[0,0];
let startX=0;

function showSlide(i){
  let carousel = document.querySelectorAll(".carousel")[i];
  let imgs = carousel.querySelectorAll("img");
  let dotsDiv = carousel.querySelector(".dots");

  dotsDiv.innerHTML="";

  imgs.forEach((img,idx)=>{
    img.classList.remove("active");

    let dot=document.createElement("span");
    dot.classList.add("dot");

    if(idx===index[i]){
      img.classList.add("active");
      dot.classList.add("active");
    }

    dotsDiv.appendChild(dot);
  });
}

function startTouch(e){
  startX=e.changedTouches[0].screenX;
}

function endTouch(e,i){
  let endX=e.changedTouches[0].screenX;

  if(startX>endX){
    index[i]++;
  }else{
    index[i]--;
  }

  let imgs=document.querySelectorAll(".carousel")[i].querySelectorAll("img");

  if(index[i]<0) index[i]=imgs.length-1;
  if(index[i]>=imgs.length) index[i]=0;

  showSlide(i);
}

/* AUTOPLAY CORRIGIDO */
setInterval(()=>{
  document.querySelectorAll(".carousel").forEach((c,i)=>{
    let imgs=c.querySelectorAll("img");
    index[i]=(index[i]+1)%imgs.length;
    showSlide(i);
  });
},3000);

/* ESCASSEZ CORRIGIDA */
function atualizarPessoas(id){
  let el=document.getElementById("pessoas"+id);

  let match = el.innerText.match(/\d+/);
  let num = match ? parseInt(match[0]) : 10;

  let novo=num+(Math.random()>0.5?1:-1);

  if(novo<5) novo=5;
  if(novo>15) novo=15;

  el.innerText="👀 "+novo+" pessoas vendo agora";
}

setInterval(()=>{
  atualizarPessoas(0);
  atualizarPessoas(1);
},2000);

/* INICIAR */
showSlide(0);
showSlide(1);

</script>

</body>
</html>
