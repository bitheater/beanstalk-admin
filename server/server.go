package server

import (
	"encoding/json"
	"flag"
	"fmt"
	"github.com/bitheater/beanstalk-admin/config"
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"strconv"
)

var cnf *config.Config

func Run() {
	log.Println("Starting process...")

	var configFile string

	flag.StringVar(&configFile, "config", config.CONFIG_FILE_LOCATION, "beanstalk admin config file")
	flag.Parse()

	log.Println("Config file set to " + configFile)

	var err error
	cnf, err = config.NewConfig().Load(configFile)

	if err != nil {
		panic(err)
	}

	configureRouting()
}

func configureRouting() {
	r := mux.NewRouter()

	r.HandleFunc("/instances", connections).Methods("GET")
	r.HandleFunc("/instances/{name:[a-z0-9-]+}/stats", connectionStats).Methods("GET")
	r.HandleFunc("/instances/{name:[a-z0-9-]+}/jobs/{job:[0-9]+}", jobInfo).Methods("GET")
	r.HandleFunc("/instances/{name:[a-z0-9-]+}/tubes", tubes).Methods("GET")
	r.HandleFunc("/instances/{name:[a-z0-9-]+}/tubes/{tube}/stats", tubeStats).Methods("GET")
	r.HandleFunc("/instances/{name:[a-z0-9-]+}/tubes/{tube}/jobs", tubeJobs).Methods("GET")

	r.NotFoundHandler = http.HandlerFunc(notFound)

	http.Handle("/", r)

	err := http.ListenAndServe(":"+strconv.Itoa(cnf.HTTP.Port), nil)

	if err != nil {
		log.Fatal(err)
		return
	}
}

func notFound(w http.ResponseWriter, r *http.Request) {
	response, _ := json.Marshal(jsonResponse(w, 404, "Not found"))
	fmt.Fprint(w, string(response))
}
