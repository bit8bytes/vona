package main

import (
	"fmt"
	"os"
	"path/filepath"
)

func (cli *CLI) add(name string) {
	cfg, err := loadConfig()
	if err != nil {
		fmt.Println("Error loading config:", err)
		os.Exit(1)
	}

	componentFile := filepath.Join(cfg.ComponentsDir, name+".js")

	// TODO: fetch the component from a remote repository or embedded source
	err = os.WriteFile(componentFile, []byte("Hello"), 0644)
	if err != nil {
		fmt.Println("Error writing component file:", err)
		os.Exit(1)
	}

	fmt.Println("Component added:", name)
}
