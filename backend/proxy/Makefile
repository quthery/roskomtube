APP_NAME := proxy
SRC := cmd/main.go

.PHONY: build run clean

build:
	go build -o $(APP_NAME) $(SRC)

run: 
	go run $(APP_NAME)

clean:
	rm -f $(APP_NAME)