const file = 'src/assets/movies.json';
let movies = [];
let dates = [];
let titles = [];
let formatedMovies = []
let ProximaFont, RajdhaniFont;
let MAX_LENGTH_TITLE
let angle, r, step, angle1;
let tabMois = ['juillet', 'juin', 'mai', 'avril', 'mars', 'février', 'janvier', 'décembre', 'novembre', 'octobre', 'septembre', 'août']
let positionAnne = []
let pos = 6000
let cam, alphaColor = 0;
let rotateVar;
let alpha = 255;
let angleText = [180, 150, 120, 90, 60, 30, 0, 330, 300, 270, 240, 210];

function preload() {
    movies = loadJSON(file, () => {
        console.log("file loaded")
    });
    ProximaFont = loadFont("src/assets/Mark Simonson - Proxima Nova Regular.otf");
    RajdhaniFont = loadFont("src/assets/Rajdhani-Light.ttf");
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

    fill(255)
    textSize(50)
    push()
    textFont(RajdhaniFont)
    translate(0, 0, pos)
    text('Bon voyage intercinéral.', width, -height + 400)
    pop()

    fill(255)
    textSize(50)
    push()
    textFont(RajdhaniFont)
    translate(0, 0, pos)
    text('2020 Gobelins BDDI', -width - 400, height, 1100)
    pop()

    fill(255)
    textSize(50)
    push()
    textFont(RajdhaniFont)
    translate(0, 0, pos)
    text('Sortie de films, le long d\'une année',  600, 500, 400)
    pop()

    push()
    noFill()
    translate(575, 430, pos)
    rect(0,0,400,170)
    pop()

    fill('#F5DCA1')
    textSize(50)
    push()
    textFont(RajdhaniFont)
    translate(0, 0, pos)
    text('Antoine Lozach & Victor Soulié', -width - 400, height + 70, 1100)
    pop()

    fill('#F5DCA1')
    textSize(200)
    push()
    textFont(ProximaFont)
    translate(0, 0, pos)
    text('cinéscope'.toUpperCase(), width - 600, -height)
    pop()

    let macolor = color(245, 220, 161)
    macolor.setAlpha(128 + 128 * sin(millis() / 1000))
    textSize(30)
    push()
    fill(macolor)
    textFont(ProximaFont)
    translate(0, 0, pos + 300)
    text('scroll and drag'.toUpperCase(), -140, height)
    pop()

    stroke(255, 150)
    strokeWeight(2)
    noFill()
    orbitControl(.01, .01, .0001)


    drawCircleGraph(0, positionAnne[0], 0, "2016")
    drawCircleGraph(positionAnne[0], positionAnne[1], -1300, "2015")
    drawCircleGraph(positionAnne[1], positionAnne[2], -2600, "2014")
    drawCircleGraph(positionAnne[2], positionAnne[3], -3900, "2013")
    drawCircleGraph(positionAnne[3], positionAnne[4], -5100, "2012")
    drawCircleGraph(positionAnne[4], positionAnne[5], -6400, "2011")

    textSize(50)
    fill(245, 220, 161,alphaColor - 500)
    push()
    textFont(RajdhaniFont)
    translate(0, 0, pos - 9000)
    text('Dev : Antoine LOZACH / Design : Victor Soulié', -454, 0)
    pop()
}


function drawCircleGraph(min, max, z, annee) {
    let mx = 7000;
    let mn = 6000;
    alphaColor = ((pos + z) - mn) / (mx - mn) * 255
    console.log(alphaColor)
    fill(255, alphaColor)
    textFont(RajdhaniFont)
    textSize(50)
    push()
    translate(0, 0, z + pos)
    text(annee, -39, -80)
    pop()

    textSize(30)
    fill(245, 220, 161, alphaColor)
    textFont(RajdhaniFont)
    push()
    rotate(-.01)
    for (let i = 0; i < 12; i++) {
        let x1 = r * sin(angle1);
        let y1 = r * cos(angle1);
        push()
        translate(x1 - 10, y1, pos + z)
        rotate(radians(angleText[i]))
        text(tabMois[i].toUpperCase(), 0, 0);
        pop()
        angle1 = angle1 + step;
    }
    pop()


    noFill()
    beginShape();
    //rotate(-.29)
    //rotateVar = (pos+z) * .000027 - mn / (mx - mn) * .00001
    //rotate(rotateVar)
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
    if (pos < 6000) {
        pos = 6000
    }

    if (pos > 16000) {
        pos = 16000
    }
}
