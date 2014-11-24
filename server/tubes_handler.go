package server

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/kr/beanstalk"
	"net/http"
	"strconv"
	"time"
)

func tubeStats(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	c, err := connectByName(params["name"])

	var response []byte

	if err != nil {
		response, _ = json.Marshal(jsonResponse(w, 404, err.Error()))
	} else {
		tube := beanstalk.Tube{Conn: c, Name: params["tube"]}
		result, err := tube.Stats()

		if err != nil {
			response, _ = json.Marshal(jsonResponse(w, 404, err.Error()))
		} else {
			response, _ = json.Marshal(jsonResponse(w, 200, createStatsSlice(result)))
		}

		c.Close()
	}

	fmt.Fprint(w, string(response))
}

func tubeJobs(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	limit, err := strconv.Atoi(r.FormValue("limit"))

	if err != nil || limit == 0 {
		limit = cnf.HTTP.Limit
	}

	c, err := connectByName(params["name"])

	var response []byte

	if err != nil {
		response, _ = json.Marshal(jsonResponse(w, 404, err.Error()))
		fmt.Fprint(w, string(response))
		return
	}

	tubeSet := beanstalk.NewTubeSet(c, params["tube"])

	tube := beanstalk.Tube{Conn: c, Name: params["tube"]}
	result, err := tube.Stats()

	amountJobs, _ := strconv.Atoi(result["current-jobs-ready"])

	if amountJobs > limit {
		amountJobs = limit
	}

	jobs := []string{}
	for i := 0; i < amountJobs; i++ {
		_, body, _ := tubeSet.Reserve(1 * time.Second)
		jobs = append(jobs, string(body))
	}

	response, err = json.Marshal(jsonResponse(w, 200, jobs))

	c.Close()

	fmt.Fprint(w, string(response))
}
