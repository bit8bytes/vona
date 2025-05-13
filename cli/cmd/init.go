package main

import (
	"encoding/json"
	"fmt"
	"os"
)

func (cli *CLI) init() {
	cfg := Config{
		Components: "components",
		Styles:     "styles",
	}

	os.MkdirAll(cfg.Components, os.ModePerm)
	os.MkdirAll(cfg.Styles, os.ModePerm)

	file, err := os.Create(configFileName)
	if err != nil {
		fmt.Println("Error creating config:", err)
		os.Exit(1)
	}
	defer file.Close()

	encoder := json.NewEncoder(file)
	encoder.SetIndent("", "  ")
	if err := encoder.Encode(cfg); err != nil {
		fmt.Println("Error writing config:", err)
		os.Exit(1)
	}

	fmt.Println("Initialized Vona project.")
}
