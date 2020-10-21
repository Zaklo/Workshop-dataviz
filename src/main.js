const file = 'src/assets/movies.json';
let movies = [];
let dates = [];
let titles = [];
let formatedMovies = []
let myFont;
let MAX_LENGTH_TITLE
let angle, r, step, angle1, min = 0, max = 150;
let tabMois = ['juillet', 'juin', 'mai', 'avril', 'mars', 'février', 'janvier', 'décembre', 'novembre', 'octobre', 'septembre', 'août']
let positionAnne = []
let pos = 7000
let cam, alphaColor = 0;

function preload() {

    myFont = loadFont("src/assets/SharpGrotesk-Book20.otf");
    movies = loadJSON(file, () => {
        console.log("done")
    });

}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    cam = createCamera();
    cam.move(0, 0, 7000)

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

    let startDate = 2015;

    for (let i = 0; i < formatedMovies.length; i++) {
        if (formatedMovies[i].date.substr(0, 4) == startDate) {
            positionAnne.push(i - 1)
            startDate -= 1
        }
    }
}

function draw() {
    smooth()
    background('#0c0c0c');
    stroke(255)
    noFill()
    orbitControl(.01, .01, .0001)
    drawCircleGraph(0, positionAnne[0], 0, "2016")
    drawCircleGraph(positionAnne[0], positionAnne[1], -1300, "2015")
    drawCircleGraph(positionAnne[1], positionAnne[2], -2600, "2014")
    drawCircleGraph(positionAnne[2], positionAnne[3], -3900, "2013")
    drawCircleGraph(positionAnne[3], positionAnne[4], -5100, "2012")
    drawCircleGraph(positionAnne[4], positionAnne[5], -6400, "2011")
}

function drawCircleGraph(min, max, z, annee) {

    let mx = 8800;
    let mn = 6200;
    alphaColor = ((pos + z) - mn) / (mx - mn) * 255
    fill(255, alphaColor)


    textFont(myFont)
    push()
    translate(0, 0, z + pos)
    textSize(50)
    text(annee, -60, -80)
    pop()

    noFill()
    beginShape();
    for (let i = min; i < max; i++) {
        let nbTitles = formatedMovies[i].titles.length
        angle = map(i, min, max - 1, 0, TWO_PI)
        let R = map(nbTitles, 1, MAX_LENGTH_TITLE, 400, 1000)
        let x = R * cos(angle)
        let y = R * sin(angle)
        vertex(x, y, z + pos)
    }
    endShape(CLOSE);
}

function drawCalendar() {
    r = 800;
    angle1 = 0;
    step = TWO_PI / 12;
    for (let i = 0; i < 12; i++) {
        let x = r * sin(angle1);
        let y = r * cos(angle1);
        fill('white');
        textFont(myFont)
        text(tabMois[i].toUpperCase(), x, y);
        angle1 = angle1 + step;
    }
}

function mouseWheel(event) {
    pos += event.delta;
}
