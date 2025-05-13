package main

import (
	"encoding/json"
	"os"
)

type Config struct {
	Components string `json:"components"`
	Styles     string `json:"styles"`
}

func loadConfig() (Config, error) {
	var cfg Config
	data, err := os.ReadFile(configFileName)
	if err != nil {
		return cfg, err
	}
	err = json.Unmarshal(data, &cfg)
	return cfg, err
}
