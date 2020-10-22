const file = 'src/assets/movies.json';
let movies = [];
let dates = [];
let titles = [];
let formatedMovies = []
let ProximaFont, RajdhaniFont;
let MAX_LENGTH_TITLE
let angle, r, step, angle1, min = 0, max = 150;
let tabMois = ['juillet', 'juin', 'mai', 'avril', 'mars', 'février', 'janvier', 'décembre', 'novembre', 'octobre', 'septembre', 'août']
let positionAnne = []
let pos = 6000
let cam, alphaColor = 0;
let rotateVar;

function preload() {
    ProximaFont = loadFont("src/assets/Mark Simonson - Proxima Nova Regular.otf");
    RajdhaniFont = loadFont("src/assets/Rajdhani-Light.ttf");
    movies = loadJSON(file, () => {
        console.log("file loaded")
    });
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    cam = createCamera();
    cam.move(0, 0, 7600)

    r = 600;
    angle1 = 0;
    step = TWO_PI / 12;

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


    fill(255)
    textSize(50)
    push()
    textFont(RajdhaniFont)
    translate(0, 0, pos)
    text('Le cinéscope vous permet de révéler différentes données imperceptibles à l’œil nu. Générez ainsi une vision d’ensemble permetant de comparer les chiffres gravitants autour du monde du cinéma.', width - 600, -height + 100, 1100)
    pop()

    fill('#F5DCA1')
    textSize(200)
    push()
    textFont(ProximaFont)
    translate(0, 0, pos)
    text('cinéscope'.toUpperCase(), width - 600, -height)
    pop()




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
    let mx = 8500;
    let mn = 6500;
    alphaColor = ((pos + z) - mn) / (mx - mn) * 255
    fill(255, alphaColor)
    textFont(RajdhaniFont)
    textSize(50)
    push()
    translate(0, 0, z + pos)
    text(annee, -55, -80)
    pop()


    textSize(30)
    push()
    fill(245,220,161,alphaColor)
    textFont(RajdhaniFont)
    translate(0,0,pos + z)
    for (let i = 0; i < 12; i++) {
        let x1 = r * sin(angle1);
        let y1 = r * cos(angle1);
        text(tabMois[i].toUpperCase(), x1 - 40, y1);
        angle1 = angle1 + step;
    }
    //drawCalendar()
    pop()

    noFill()
    beginShape();
    /*rotateVar = (pos+z) * .00001 - mn / (mx - mn) * .0001
    rotate(rotateVar)*/
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


function mouseWheel(event) {
    pos += event.delta;
}

function drawCalendar() {

}
