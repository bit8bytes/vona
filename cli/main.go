package main

import (
	"bytes"
	"flag"
	"log/slog"
	"os"
	"path/filepath"
	"strings"

	"github.com/tdewolff/minify/v2"
	"github.com/tdewolff/minify/v2/css"
)

type config struct {
	inputDir  string
	outputCSS string
}

func main() {
	var cfg config

	flag.StringVar(&cfg.inputDir, "input", "../dist/blocks", "directory with CSS files")
	flag.StringVar(&cfg.outputCSS, "output", "../dist/vona.min.css", "output minified CSS file")
	flag.Parse()

	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))

	m := minify.New()
	m.AddFunc("text/css", css.Minify)

	var combined bytes.Buffer

	err := filepath.Walk(cfg.inputDir, func(path string, info os.FileInfo, err error) error {
		if err != nil || info.IsDir() || !strings.HasSuffix(path, ".css") {
			return nil
		}

		logger.Debug("Adding css file", "path", path)
		in, err := os.ReadFile(path)
		if err != nil {
			return err
		}

		combined.Write(in)
		combined.WriteString("\n")
		return nil
	})

	if err != nil {
		panic(err)
	}

	minified, err := m.Bytes("text/css", combined.Bytes())
	if err != nil {
		panic(err)
	}

	if err := os.MkdirAll(filepath.Dir(cfg.outputCSS), 0755); err != nil {
		panic(err)
	}

	if err := os.WriteFile(cfg.outputCSS, minified, 0644); err != nil {
		panic(err)
	}

	logger.Info("Combined and minified CSS written to output", "output", cfg.outputCSS)
}
