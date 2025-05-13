package main

import (
	"fmt"

	"github.com/bit8bytes/toolbox/vcs"
)

func (cli *CLI) version() {
	fmt.Println(vcs.Version())
}
