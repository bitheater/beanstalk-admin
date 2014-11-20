package config

import (
	"testing"
)

var config Config

var fixturesErrorProvider = []string{
	"conf_error_1",
	"conf_error_2",
	"conf_error_3",
	"conf_error_not_exists",
}

func TestCreationWithErrors(t *testing.T) {
	for _, file := range fixturesErrorProvider {
		_, err := config.Load("fixtures/" + file + ".conf")

		if err == nil {
			t.Errorf("TestCreationWithErrors(%s), expected error, got nothing", file)
		}
	}
}
