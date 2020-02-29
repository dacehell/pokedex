$(document).ready(function () {
  var Next
  var Previous
  MostrarPokemon();

})

function next() {
  MostrarPokemon(Next);
}

function previous() {
  MostrarPokemon(Previous);
}


function MostrarPokemon(url) {

  $('.cartas').html('');

  if (!url) {
    url = ' https://pokeapi.co/api/v2/pokemon';
  }
  $.get(url, data => {
    Next = data.next
    Previous = data.previous
    console.log(Next, Previous)

    data.results.forEach(pokemones => {
      $.get(pokemones.url, dataPokemon => {
        let imgFront = dataPokemon.sprites.front_default
        let imgBack = dataPokemon.sprites.back_default
        let stats = dataPokemon.stats;


        nose(imgFront, imgBack, dataPokemon.name, stats[0].base_stat, stats[3].base_stat, stats[4].base_stat, stats[5].base_stat)
      })
    })
  })
}




(function () {
  $("#Imagen").hide();
});

function getPokemonId() {
  var id = $("#idPokemon").val();
  console.log(id);
  if (id !== undefined) {
    obtenerPokemonPorIdApi(id);

    $("#btnSearch").hide();
  } else {
    alert("El id está indefinido");
  }
}

function obtenerPokemonPorIdApi(id) {
  $('.cartas').html('');




  $.get("https://pokeapi.co/api/v2/pokemon/" + id, data => {
    console.log(data);

    let imgFront = data.sprites.front_default
    let imgBack = data.sprites.back_default
    let stats = data.stats;

    nose(imgFront, imgBack, data.name, stats[0].base_stat, stats[3].base_stat, stats[4].base_stat, stats[5].base_stat)


    $("#Nombre")[0].innerHTML = data.name.toUpperCase();
    $("#Imagen")[0].src = data.sprites.front_default;
    $("#Imagen").show();
  });
}



function nose(img, imgb, name, speed, defense, attack, hp) {
  $('.cartas').append(
    '<div class="card col-lg-2 col-md-4 col-sm-4  mx-2 my-2 card_with" >' +
    '<div class="flip-card">' +
    '<div class="flip-card-inner">' +
    '<div class="flip-card-front">' +
    '<img class="card-img-top" id="Imagen" src=" ' +
    img +
    '" alt="Card image cap">' +
    '</div> ' +
    '<div class="flip-card-back">' +
    '<img class="card-img-top" id="Imagen" src=" ' +
    imgb +
    '" alt="Card image cap">' +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="card-body">' +
    '<h5 style="text-align: center" class="card-title" id="Nombre">' +
    name +
    ' </h5>' +
    '<button onclick="Graficar(' + speed + ',' + defense + ',' + attack + ',' + hp + ')" type="button" class="btn btn-primary card-btn" data-toggle="modal" data-target="#myModal">' +
    'Ver Gráfica' +
    '</button>' +
    '</div>' +
    '</div>'
  )
}



function Graficar(speed, defense, attack, hp) {

  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "light2", // "light1", "light2", "dark1", "dark2"
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Stats Pokemons"
    },
    data: [{
      type: "pie",
      startAngle: 25,
      toolTipContent: "<b>{label}</b>: {y}",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}",
      dataPoints: [{
          y: speed,
          label: "Velocidad"
        },
        {
          y: defense,
          label: "Defensa"
        },
        {
          y: attack,
          label: "Ataque"
        },
        {
          y: hp,
          label: "Puntos de vida"
        }
      ]
    }]
  });
  chart.render();

}



$(document).ready(function () {
  $('input').keyup(function () {

    let input = document.getElementById("idPokemon").value;

    if (input === "") {
      MostrarPokemon();
      $(input).val("")
    } else {
      obtenerPokemonPorIdApi(input);

    }

  })
})