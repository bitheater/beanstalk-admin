package config

import (
	"code.google.com/p/gcfg"
	"errors"
	"github.com/tv42/slug"
)

var (
	ErrAbsentParameter     = errors.New("config: required parameter not present")
	ErrConnectionNotExists = errors.New("config: connection does not exist")
)

type Instance struct {
	Host string
	Port int
}

const CONFIG_FILE_LOCATION = "/etc/beanstalk-admin/beanstalk-admin.conf"

type Config struct {
	HTTP struct {
		Port  int
		Limit int
	}

	Instances map[string]*Instance `gcfg:"Instance"`
}

func NewConfig() *Config {
	return &Config{}
}

func (c *Config) Load(file string) (*Config, error) {
	err := gcfg.ReadFileInto(c, file)

	if err != nil {
		return nil, err
	}

	if isInstancesMapEmpty(c) || !areAllParametersDefined(c) {
		return nil, ErrAbsentParameter
	}

	return c, nil
}

func (c *Config) FindConnectionByName(name string) (*Instance, error) {
	for k, v := range c.Instances {
		if slug.Slug(k) == name {
			return v, nil
		}
	}

	return nil, ErrConnectionNotExists
}

func isInstancesMapEmpty(c *Config) bool {
	return len(c.Instances) == 0
}

func areAllParametersDefined(c *Config) bool {
	for _, v := range c.Instances {
		if v.Host == "" || v.Port == 0 {
			return false
		}
	}

	return true
}
