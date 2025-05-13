package main

import (
	"encoding/json"
	"fmt"
	"os"
)

func (cli *CLI) init() {
	cfg := Config{
		ComponentsDir: "components",
		StylesDir:     "styles",
	}

	os.MkdirAll(cfg.ComponentsDir, os.ModePerm)
	os.MkdirAll(cfg.StylesDir, os.ModePerm)

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
