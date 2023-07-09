package main

import (
	"bufio"
	"flag"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gorilla/mux"
)

var (
	root     = flag.String("root", "/home/steam/SatisfactoryDedicatedServer", "game folder root")
	savePath = flag.String("save", "/home/steam/.config/Epic/FactoryGame/Saved", "save folder")
	port     = flag.String("port", ":8080", "port to listen on")
	s3store  = flag.String("s3", "", "s3 bucket to store save files in")
)

func main() {
	flag.Parse()

	var game = Game{
		Root: *root,
	}

	game.Listen(*port)
}

type Game struct {
	*mux.Router
	Root string
}

// init initializes the game server
func (g *Game) init() error {
	// ...
	if g.Router != nil {
		return nil
	}

	g.Router = mux.NewRouter()

	g.Router.HandleFunc("/api/saves", g.GamesavingsHandler)

	return nil
}

// Listen starts the game server
func (g *Game) Listen(port string) error {
	g.init()

	go g.streamLogs(func(s string) {

	})

	// ...

	return http.ListenAndServe(port, g)
}

type LineFunc func(string)

// streamLogs streams the game logs to the client
func (g *Game) streamLogs(fn LineFunc) error {
	logfile := filepath.Join(g.Root, "FactoryGame/Saved/Logs/FactoryGame.log")

	f, err := os.OpenFile(logfile, os.O_RDONLY, os.ModePerm)
	if err != nil {
		return err
	}
	defer f.Close()

	var scan = bufio.NewScanner(f)
	scan.Split(bufio.ScanLines)

	for scan.Scan() {
		fn(scan.Text())
	}

	return scan.Err()
}

// GamesavingsHandler
func (g *Game) GamesavingsHandler(w http.ResponseWriter, r *http.Request) {

}
