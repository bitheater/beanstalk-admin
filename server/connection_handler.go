package server

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

func connectionStats(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	c, err := connectByName(params["name"])

	var response []byte

	if err != nil {
		response, _ = json.Marshal(jsonResponse(w, 404, err.Error()))
	} else {
		result, _ := c.Stats()
		response, _ = json.Marshal(jsonResponse(w, 200, result))
		c.Close()
	}

	fmt.Fprint(w, string(response))
}

func tubes(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	c, err := connectByName(params["name"])

	var response []byte

	if err != nil {
		response, _ = json.Marshal(jsonResponse(w, 404, err.Error()))
	} else {
		result, _ := c.ListTubes()
		response, _ = json.Marshal(jsonResponse(w, 200, result))
	}

	c.Close()
	fmt.Fprint(w, string(response))
}

func jobInfo(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	c, err := connectByName(params["name"])

	var response []byte

	if err != nil {
		response, _ = json.Marshal(jsonResponse(w, 404, err.Error()))
	} else {
		jobId, _ := strconv.ParseUint(params["job"], 0, 64)
		result, err := c.StatsJob(jobId)

		if err != nil {
			response, _ = json.Marshal(jsonResponse(w, 404, err.Error()))
		} else {
			response, _ = json.Marshal(jsonResponse(w, 200, result))
		}

		c.Close()
	}

	fmt.Fprint(w, string(response))
}
