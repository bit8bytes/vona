# ==================================================================================== #
# HELPERS
# ==================================================================================== #

## help: print this help message
.PHONY: help
help:
	@echo 'Usage:'
	@sed -n 's/^##//p' ${MAKEFILE_LIST} | column -t -s ':' |  sed -e 's/^/ /'

.PHONY: confirm
confirm:
	@echo 'Are you sure? [y/N] ' && read ans && [ $${ans:-N} = y ]

# ==================================================================================== #
# DEVELOPMENT
# ==================================================================================== #

## install: install all dev dependencies
.PHONY: install
install: confirm
	go mod download

## run c=$1: run the app
.PHONY: run
run:
	go run ./cmd $c

# ==================================================================================== #
# QUALITY CONTROL
# ==================================================================================== #

## audit: tidy and vendor dependencies and format, vet and test all code
.PHONY: audit
audit:
	@echo 'Formatting code...'
	go fmt ./...
	@echo 'Vetting code...'
	go vet ./...
	@echo 'Running tests...'
	go test -race -vet=off ./...

## vendor: tidy and vendor dependencies
.PHONY: vendor
vendor:
	@echo 'Tidying and verifying module dependencies...'
	go mod tidy
	go mod verify
	@echo 'Vendoring dependencies...'
	GOWORK=off go mod vendor

## cover: test coverage
.PHONY: cover
cover:
	@echo 'Test coverage...'
	go test -covermode=count -coverprofile=/tmp/profile.out ./... 

## analyze: analyze the test coverage in your browser
.PHONY: analyze
analyze: cover
	@echo 'Analyue test coverage...'
	go tool cover -html=/tmp/profile.out

# ==================================================================================== #
# BUILD
# ==================================================================================== #

## build/linux_amd64: build the service
.PHONY: build/linux_amd64
build/linux_amd64: audit
	@echo 'Building cmd/vona...'
	go build -ldflags='-s' -o=./bin/vona ./cmd
	CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags='-s' -o=./bin/linux_amd64/vona ./cmd

## build/linux_arm64: build the service
.PHONY: build/linux_arm64
build/linux_arm64: audit
	@echo 'Building cmd/app ...'
	go build -ldflags='-s' -o=./bin/vona ./cmd
	CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -ldflags='-s' -o=./bin/linux_arm64/vona ./cmd