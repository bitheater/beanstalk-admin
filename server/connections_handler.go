package server

import (
	"encoding/json"
	"fmt"
	"github.com/bitheater/beanstalk-admin/config"
	"github.com/tv42/slug"
	"net/http"
)

func connections(w http.ResponseWriter, r *http.Request) {
	names := instanceNames(cnf.Instances)
	jsonResponse, _ := json.Marshal(jsonResponse(w, 200, names))

	fmt.Fprint(w, string(jsonResponse))
}

func instanceNames(connections map[string]*config.Instance) map[string]string {
	keys := map[string]string{}
	for k := range connections {
		keys[slug.Slug(k)] = k
	}

	return keys
}
