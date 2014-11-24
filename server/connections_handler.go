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

func instanceNames(connections map[string]*config.Instance) []map[string]string {
	instances := []map[string]string{}

	for k := range connections {
		instance := map[string]string{}
		instance["name"] = k
		instance["realName"] = slug.Slug(k)

		instances = append(instances, instance)
	}

	return instances
}
