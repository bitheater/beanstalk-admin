package server

import (
	"github.com/kr/beanstalk"
	"net/http"
	"strconv"
)

type Response map[string]interface{}

func jsonResponse(w http.ResponseWriter, code int, data interface{}) Response {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)

	success := false
	if code == 200 {
		success = true
	}

	return Response{"success": success, "data": data}
}

func connectByName(name string) (*beanstalk.Conn, error) {
	instance, err := cnf.FindConnectionByName(name)

	if err != nil {
		return nil, err
	}

	c, err := beanstalk.Dial("tcp", instance.Host+":"+strconv.Itoa(instance.Port))

	if err != nil {
		return nil, err
	}

	return c, nil
}
