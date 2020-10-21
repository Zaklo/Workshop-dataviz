const file = 'src/assets/movies.json';
let movies = [];
let dates = [];
let titles = [];
let formatedMovies = []
let myFont;
let MAX_LENGTH_TITLE

function preload() {

    myFont = loadFont("src/assets/SharpGrotesk-Book20.otf");
    movies = loadJSON(file, () => {
        console.log("done")
    });

}

function setup() {
    textSize(10)
    background(123);
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    let filterMovies = Object.values(movies).filter((entry) => entry.release_date)
    let sortedMovies = filterMovies.sort((a, b) => new Date(a.release_date) < new Date(b.release_date))

    for (let i = 0; i < sortedMovies.length; i++) {
        const dateIndex = dates.indexOf(movies[i].release_date)
        if (dateIndex > -1) {
            titles[dateIndex].push(`${movies[i].title}`)
        } else {
            dates[dates.length] = movies[i].release_date
            titles[titles.length] = [`${movies[i].title}`]
        }
    }

    formatedMovies = dates.map((entry, currentIndex) => {
        return {
            date: entry,
            titles: titles[currentIndex]
        }
    })

    formatedMovies.sort((a, b) => new Date(a.date) < new Date(b.date))

    for (let i = 0; i < 150; i++) {
        let temp = formatedMovies[i].titles.length;
        if (MAX_LENGTH_TITLE < temp || MAX_LENGTH_TITLE === undefined) MAX_LENGTH_TITLE = temp
    }


}

function draw() {
    smooth()
    background('#0c0c0c');
    curveDetail(20)
    orbitControl(0.5, 0.5);
    strokeWeight(2)

    fill(255, 30)
    stroke(255, 50)

    drawCircleGraph(0, 150, 0)
    drawCircleGraph(150, 300, 2000)
    drawCircleGraph(300, 450, 4000)

    /*for (let i = 0; i < 150; i++) {
        let nbTitles = formatedMovies[i].titles.length
        let titre = formatedMovies[i].titles[0]
        let x = map(i,0,149,-width,width)
        let y = map(nbTitles, 1, 10, 0, height * .3)
        //textFont(myFont);
        //text(titre,x,y)
    }*/
}

function drawCircleGraph(min, max, z) {

    beginShape();
    for (let i = min; i < max; i++) {
        let nbTitles = formatedMovies[i].titles.length
        angle = map(i, min, max - 1, 0, TWO_PI)
        let R = map(nbTitles, 1, MAX_LENGTH_TITLE, 300, 1000)
        let x = R * cos(angle)
        let y = R * sin(angle)
        curveVertex(x, y, z)
    }
    endShape(CLOSE);
}
