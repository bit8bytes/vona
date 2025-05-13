// main.go
package main

import (
	"fmt"
	"os"
)

const configFileName = "vona.config.json"

type CLI struct{}

func main() {
	cli := &CLI{}

	if len(os.Args) < 2 {
		fmt.Println("Usage: vona [init|add <component>]")
		os.Exit(1)
	}

	switch os.Args[1] {
	case "init":
		cli.init()
	case "version":
		cli.version()
	case "add":
		if len(os.Args) < 3 {
			fmt.Println("Usage: vona add <component>")
			os.Exit(1)
		}
		cli.add(os.Args[2])
	default:
		fmt.Println("Unknown command:", os.Args[1])
	}
}
