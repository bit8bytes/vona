package main

import (
	"encoding/json"
	"os"
)

type Config struct {
	ComponentsDir string `json:"components_dir"`
	StylesDir     string `json:"styles_dir"`
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
