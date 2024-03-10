const in_s = document.querySelector(".in_s");
const list = document.querySelector(".list");
let arr = new Array();

function GetData() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((country) => {
      for (const c of country) {
        if(c.name.common.toLowerCase() != 'israel')
        arr.push(c);
      }
    }).catch(err => {
      console.log(`Error happpend to the fetching of the data! ${err}`);
    });
}

GetData()

//for keeping the data up to date.
setInterval(() => {
  arr = new Array()
  GetData()
}, 60000)

//clear input
document.querySelector("svg").addEventListener("click", (e) => {
  in_s.value = "";
  list.style.display = "none";
  in_s.focus();
  document.querySelector("svg").style.display = "none";
});

function find(e) {
  list.style.display = "none";
  for (let c of arr) {
    if (
      c.name.common.toLowerCase() == in_s.value.toLowerCase() &&
      (e.type == "click" || e.key == "Enter")
    ) {
      let nf = Intl.NumberFormat();
      document.querySelector(".info").innerHTML = `
            <h3>${c.name.common}</h3><br>
            <img src=${c.flags.svg}><br>
            Population: ${nf.format(c.population)}`;
            in_s.value = ''
            document.querySelector("svg").style.display = "none";
            in_s.focus()
            break
    }
  }
}

function filter_result(text) {
  let res = arr.filter((e) => {
    if (e.name.common.toLowerCase().includes(text.toLowerCase())) return e;
  });
  return res;
}

function select_item(e) {
  if (e.type == "click" || e.key == "Enter") {
    in_s.value = e.currentTarget.querySelector(".name").innerHTML;
    list.style.display = "none";
    find(e);
  }
}

in_s.addEventListener("input", () => {
  let svg = document.querySelector("svg");
  list.innerHTML = "";
  let filtered = filter_result(in_s.value);
  res = "";
  if (filtered.length == 0 || in_s.value == "") {
    list.style.display = "none";
  } else {
    for (let c of filtered) {
      res += `<div tabindex=0 class="item" onclick="select_item(event)" onkeypress="select_item(event)">
            <img src=${c.flags.svg}>
            <span class="name">${c.name.common}</span>
            </div>`;
    }
    list.innerHTML = res;
    list.style.display = "block";
  }
  if (in_s.value == "") svg.style.display = "none";
  else svg.style.display = "block";
});
