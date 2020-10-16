const computerTag = document.querySelector("#computer");
computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) 0 0`;
let coord = '0';
setInterval(()=>{
  if(coord === '0'){
    coord = '-142px';
  } else if(coord === '-142px'){
    coord = '-284px';
  } else if(coord === '-284px'){
    coord = '0';
}
computerTag.style.background = `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${coord} 0`;
}, 1000)

//setInterval - 얼마의 간격으로 계속 실행